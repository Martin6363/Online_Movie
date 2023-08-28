import '../../assets/styles/card.scss';
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'; 

export function Card ({movie}) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [])

  return (
    <>
        {
            isLoading
            ?
            <div className="cards">
                <SkeletonTheme baseColor="#202020" highlightColor='#444'>
                    <Skeleton width={200} height={300} duration={2}/>
                </SkeletonTheme>
            </div>
            :
            <Link to={`/movie/${movie.id}`} style={{textDecoration: "none", color: "black"}}>
                <div className="cards">
                    <img src={movie.poster_img ? movie.poster_img : `https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} alt="" className="cards_img"/>
                    <div className="cards_overlay">
                        <div className="cards_title">{movie ? movie.original_title : ""}</div>
                        <div className="cards_runtime">
                            {movie ? movie.release_date : "Release Date Unknown"}
                            <span className="card_rating">
                                {movie ? movie.vote_average : ""}
                                <FontAwesomeIcon icon={faStar} className='star_rating'/>
                            </span>
                        </div>
                        <div className="cards_description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                    </div>
                </div>
            </Link>
        }
    </>
  )
}
