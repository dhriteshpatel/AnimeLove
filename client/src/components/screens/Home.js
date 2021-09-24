import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Anime from './Anime';

function Home() {
    const [animes, setAnimes] = useState([])
    const fetchData = async() =>{
        const response = await axios.get('https://api.aniapi.com/v1/anime/')
        const myanimes = await response.data.data.documents;
        console.log(myanimes)
        setAnimes(myanimes)
    }

    useEffect(() =>{
        fetchData();
    },[])
    return (
        <div className="home">
           {
               animes.map(item=>{
                   return(
                       <Anime item={item} />
                   )
               })
           }    
       </div>
    )
}

export default Home
