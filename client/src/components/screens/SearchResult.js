import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Anime from './Anime';

function SearchResult() {
    const { query } = useParams();
    const [animes, setAnimes] = useState([]);
    const [newanimes, setNewAnimes] = useState([]);

    const fetchData = async() =>{
        const response = await axios.get('https://api.aniapi.com/v1/anime/')
        const myanimes = await response.data.data.documents;
        setAnimes(myanimes);
        fetchResult();
    }

    const fetchResult = () =>{
        console.log("search",animes)
        console.log("query", query)
        var mytitles = animes.filter((item) => item.titles.en.includes(query));
        var mydescs = animes.filter((item) => item.descriptions.en.includes(query));
        var mygenres = animes.filter((item) => item.genres.includes(query));
        var newAnimes = [...mytitles, ...mydescs,...mygenres];
        console.log(newAnimes);
        setNewAnimes(newAnimes);
    }

    useEffect(() =>{
        fetchData(); 
    },[newanimes]);
    return (
        <div className="home">
           {newanimes ?
               newanimes.map(item=>{
                   return(
                       <Anime item={item} />
                   )
               })
               : <h1>No match for your query</h1>
           }    
       </div>
    )
}

export default SearchResult;
