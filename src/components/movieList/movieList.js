import { useParams } from 'react-router-dom';
import '../../assets/styles/movieList.scss';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Card } from '../card/card';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../../store/movieList/movie.action';


export function MovieList() {
    const { type } = useParams();
    const dispatch = useDispatch();
    const { movieLists } = useSelector( store => ({
        movieLists: store.dataReducer.movieLists,
    }) )
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    function getData () {
        axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((res) => {
            const combinedData = [...movieLists, ...res.data.results];
            dispatch(addMovie(combinedData))
        })
    }
  return (
    <>
        <div className='movie_list'>
            <h2 className="list_title">{(type ? type : "Now Playing").toUpperCase()}</h2>
            <div className="list_cards">
                {
                    movieLists.map((movie, index) => (
                        <Card key={`${movie.id}-${index}`} movie={movie}/>
                    )) 
                }
            </div>
        </div>
    </>
  )
}
