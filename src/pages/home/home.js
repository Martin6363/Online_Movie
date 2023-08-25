import '../../assets/styles/Home.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../store/movieList/movie.action';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { MovieList } from '../../components/movieList/movieList';
import { Header } from '../../components/header/Header';

export function Home () {
    const dispatch = useDispatch();
    const { movieData } = useSelector( store => ({
        movieData: store.dataReducer.movieData
    }) )
    const [papular, setPapular] = useState([])

    useEffect(() => {
        const apiUrl = "https://api.themoviedb.org/3/movie/popular";
        const apiKey = "4e44d9029b1270a757cddc766a1bcb63";
        const language = "en-US";

        axios.get(apiUrl, {
            params: {
                api_key: apiKey,
                language: language
            }
        })
        .then((res) => {
            const data = {...movieData, ...res.data.results}
            dispatch(addData(data));
            setPapular(res.data.results)
        })
    }, [])
  return (
    <>
        <div className='carousel_container'>
            <Carousel
                className='carousel'
                showThumbs={false}
                autoPlay={true}
                interval={5000}
                transitionTime={800}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    papular.map((movie) => (
                        <Link style={{textDecoration:"none", color:"black"}} to={`/movie/${movie.id}`} key={movie.id} className='movie_link'>
                            <div className='posterImage'>
                                <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt="" />
                            </div>
                            <div className="posterImage_overlay">
                                <div className="posterImage_title">{movie ? movie.original_title : ""}</div>
                                <div className="posterImage_runtime">
                                    {movie ? movie.release_date : ""}
                                    <span className="posterImage_rating">
                                        {movie ? movie.vote_average : ""}{" "}
                                        <FontAwesomeIcon icon={faStar} className='star_rating'/>{" "}
                                    </span>
                                </div>
                                <div className="posterImage_description">{movie ? movie.overview : ""}</div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>  
            <MovieList/>
        </div>
    </>
  )
}
