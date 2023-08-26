import axios from 'axios';
import '../../assets/styles/movieDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { faStar, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Trailer } from '../../components/trillerMovies/trailer';
import { Comment } from '../../components/comments/comment';


export function MovieDetails () {
    const [movieDetails, setMovieDetails] = useState();
    const { id } = useParams();

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    function getData () {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((res) => {
            setMovieDetails(res.data)
        })
    }

  return (
    <>
      <div className='movie'>
        <div className="movie_container">
          <div className="movie_intro">
            <img src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.poster_path : ""}`} alt="" className="movie_backdrop" />
          </div>
          <div className="movie_detail">
            <div className="movie_detailLeft">
              <div className="movie_posterBox">
                <img src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.poster_path : ""}`} alt="" className="movie_poster" />
              </div>
            </div>
            <div className="movie_detailRight">
              <div className="movie_detailRightTop">
                <h2 className="movie_name">{movieDetails ? movieDetails.original_title : ""}</h2>
                <div className="movie_tagLine">{movieDetails ? movieDetails.tagline : ""}</div>
                <div className="movie_rating">
                  {movieDetails ? movieDetails.vote_average : ""} <FontAwesomeIcon icon={faStar} className='star_rating'/>
                  <span className="movie_voteCount">{movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}</span>
                </div>
                <div className="movie_runtime">{movieDetails ? movieDetails.runtime + " Minute" : ""}</div>
                <div className="movie_releaseData">{movieDetails ?  "Release data:  " + movieDetails.release_date : ""}</div>
                <div className="movie_genres">
                  {
                    movieDetails && movieDetails.genres
                    ?
                    movieDetails.genres.map(genre => (
                      <React.Fragment key={genre.id}>
                        <span className="movie_genre">{genre.name}</span>{" "}
                      </React.Fragment>
                    ))
                    :
                    ""
                  }
                </div>
                <div className="movie_detailRightBottom">
                  <div className="synopsisText">Synopsis</div>
                  <div className='movie_overview'>{movieDetails ? movieDetails.overview : ""}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="movie_links">
            <div className="movie_heading">Useful Links</div>
            {
              movieDetails && movieDetails.homepage && <Link to={movieDetails.homepage} className='link-pages'>Homepage <FontAwesomeIcon icon={faUpRightFromSquare} /></Link>
            }
            {
              movieDetails && movieDetails.imdb_id && <Link to={"https://www.imdb.com/title/" + movieDetails.imdb_id} className='link-pages'>IMDb <FontAwesomeIcon icon={faUpRightFromSquare} /></Link>
            }
          </div>
          <div className="trailer_movie">
            <Trailer
              movieId={id}
            />
          </div>
          <div className="comment_container">
            <Comment/>
          </div>
          <h2 className='production_text'>Production companies</h2>
          <div className="movie_production">
              {
                movieDetails && movieDetails.production_companies && movieDetails.production_companies.map((company) => (
                  <React.Fragment key={company.id}>
                  {
                    company.logo_path
                    &&
                    <div className="company_image_container">
                      <img src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt="" className="movie_productionImage"/>
                      <span>{company.name}</span>
                    </div>
                  }
                    </React.Fragment>
                ))
              }
          </div>
        </div>
      </div>
    </>
  )
}
