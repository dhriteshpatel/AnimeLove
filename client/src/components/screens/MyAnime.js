import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const MyAnime  = ()=>{
    const [item,setItem] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const {userid} = useParams()
    const fetchData = async() =>{
        const response = await axios.get(`https://api.aniapi.com/v1/anime/${userid}`)
        const data = await response.data.data;
        console.log("Animes",data)
        setItem(data)
    }

    useEffect(() =>{
        fetchData();
        makeReview();
        makeRating();
    },[])

    const makeReview = (clientreview)=>{
        fetch('/addreview',{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                userid,
                clientreview
            })
        }).then(res=>res.json())
        .then(result=> {
            setReviews(result.reviews);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const makeRating = (rating)=>{
        if(rating > 5 || rating < 0){
            alert("Add rating between 0 to 5")
            return;
        }
        fetch('/addrating',{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                userid,
                rating
            })
        }).then(res=>res.json())
        .then(result=> {
            const avgRating = ((result.ratings.map(item => item.myrating).reduce((acc,item) => acc+=item,0))/result.ratings.length).toFixed(2);
            setRating(avgRating);
        })
        .catch(err=>{
            console.log(err)
        })
    }

   return (
       <> 
         {item ? <div className="card detail-card">
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
                            <p>{item.descriptions.en.length >= 20 ? item.descriptions.en.split("").slice(20).join("") : item.descriptions.en}</p>
                            <h5>Ratings: </h5> <span><p>{rating}</p></span>
                            <h5>Season year: </h5> <span><p>{item.season_year}</p></span>
                            <h5>Total Episodes: </h5> <span><p>{item.episodes_count}</p></span>
                            <h5>Season year: </h5> <span><p>{item.season_year}</p></span>
                            <h5>Start Date: </h5> <span><p>{item.start_date}</p></span>
                            <h5>Score: </h5> <span><p>{item.score}</p></span>
                            <h5>Season period: </h5> <span><p>{item.season_period}</p></span>
                            <h5>Duration: </h5> <span><p>{item.episode_duration}hours</p></span>
                            <h5>Add rating: </h5>
                            <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeRating(e.target[0].value)
                                }}>
                                  <input type="number" placeholder="add rating from 1 to 5" />  
                            </form>
                            <h5>Reviews: </h5>
                            <div>
                                {
                                    reviews.map((review,i) => {
                                        return(
                                            <h6 key={i}><span>{review.postedBy.name}</span>:<p>{review.myreview}</p></h6>
                                            )
                                    })
                                }
                            </div>
                            <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeReview(e.target[0].value)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                            </form>
                            </div>
                            
                        </div> 

                        : null}
       </>
   )
}


export default MyAnime;