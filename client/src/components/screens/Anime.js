import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

function Anime({item}) {
    const history = useHistory();
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    const fetchReviewsAndRatings = () =>{
        fetch(`/allreviews/${item.id}`)
        .then((response) => response.json())
        .then((data) => {
            //set rates
            if(data[0]){
               if(data[0].ratings.length === 0){
                setRating(0)
              }else{
                const avgrates = (data[0].ratings.map((rate) => rate.myrating).reduce((acc, rating) => acc + rating,0) / data[0].ratings.length).toFixed(2);
                setRating(avgrates)
              }
              }else{
             setRating(0)
             }

             // set setReviews

             if(data[0]){
                 if(data[0].reviews.length === 0){
                     setReviews([])
                 }else{
                     setReviews(data[0].reviews)
                     console.log("reviews",reviews)
                 }
             }
            })
        .catch((error) => console.log(error));
    }
    useEffect(() =>{
        fetchReviewsAndRatings();
    },[])

    return (
        <div className="card home-card" key={item.id} onClick={() =>history.push(`/myanime/${item.id}`)}>
                            <div className="card-image">
                                <img src={item.banner_image}/>
                            </div>
                            <div className="card-content">
                            <h6><span style={{fontWeight:"500"}}>{item.titles.en}</span></h6>
                            <a href={item.trailer_url} target="_blank">Watch trailer</a>
                            <h5>Genres</h5>
                            <div className="genres">
                            {       
                                    
                                    item.genres.map((record,i)=>{
                                        return(
                                        <button className="mybtn">{record}</button>
                                        )
                                    })
                                   
                            }
                            </div>
                            <h5>Description</h5>
                            <p className="desc_family">{item.descriptions.en.length >= 20 ? item.descriptions.en.split("").slice(20).join("") : item.descriptions.en}</p>
                            <h5>Ratings: </h5> <span><p>{rating}</p></span>
                            <h5>Season year: </h5> <span><p>{item.season_year}</p></span>
                            <h5>Total Episodes: </h5> <span><p>{item.episodes_count}</p></span>
                            <h5>Reviews: </h5>
                            <div>
                                {
                                    reviews.map((review,i) => {
                                        return(
                                            <h6 key={i}><span>{review.postedBy?.name}</span>:<p>{review.myreview}</p></h6>
                                            )
                                    })
                                }
                            </div>
                            </div>
                        </div>
    )
}

export default Anime;
