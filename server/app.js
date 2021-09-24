const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

//nFgmKHeEvz8622sa
//mongodb+srv://Dhriteshpatel:<password>@cluster0.bfnex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const MONGOURI = "mongodb+srv://Dhriteshpatel:nFgmKHeEvz8622sa@cluster0.bfnex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected", () =>{
    console.log("Connected to Mongo")
})
mongoose.connection.on("error",() => {
    console.log("Error connecting to Mongo")
})

require('./models/user')
require('./models/review')
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/review"));

app.listen(PORT, () => console.log(`Listen to the port ${PORT}`));
