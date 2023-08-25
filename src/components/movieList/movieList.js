import { useParams } from 'react-router-dom';
import '../../assets/styles/movieList.scss';
import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../card/card';


export function MovieList() {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    function getData () {
        axios.get(`https://api.themoviedb.org/3/movie/${type || "now_playing"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((res) => {
            setMovieList(res.data.results)
        })
    }
  return (
    <>
        <div className='movie_list'>
            <h2 className="list_title">{(type ? type : "Now Playing").toUpperCase()}</h2>
            <div className="list_cards">
                {
                    movieList.map(movie => (
                        <Card key={movie.id} movie={movie}/>
                    )) 
                }
            </div>
        </div>
    </>
  )
}
