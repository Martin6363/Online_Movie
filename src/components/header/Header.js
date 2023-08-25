import React, { useState } from 'react';
import '../../assets/styles/Header.scss';
import { Link } from 'react-router-dom';
import MovieLogo from "../../assets/images/Movie-Logo.png";
import UserLogo from "../../assets/images/user.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Card } from '../card/card';
import { useSelector } from 'react-redux';

export function Header() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(false);
  const [profile, setProfile] = useState(false);

  const { userData } = useSelector( store => ({
    userData: store.dataReducer.userData
  }) )

  const getMovies = (searchKey) => {
    const nameMovie = searchKey ? searchKey : "";
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${nameMovie}&api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
    .then((res) => {
      setMovies(res.data.results)
    })
  }

  const searchMovies = (e) => {
    e.preventDefault()
    getMovies(search)
    setSearch("")
    setSearchMovie(true);
  }

  const searchClose = () => {
    setSearchMovie(false)
  }
  return (
    <>
    <header className={"header"}>
      <div className="header_container">
        <nav className='header_nav'>
            <ul>
                <li><Link to={"/home"}><img className='movie_logo' src={MovieLogo}/></Link></li>
                <li><Link to={"/movies/popular"}>Popular</Link></li>
                <li><Link to={"/movies/top_rated"}>Top Rated</Link></li>
                <li><Link to={"/movies/upcoming"}>Upcoming</Link></li>
            </ul>
        </nav>
        <div className="header_profile_container">
            <form onSubmit={searchMovies} className="search_movie">
              <input type="text" 
                required
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className='search_button' title='Search'><FontAwesomeIcon className='search_icon' icon={faMagnifyingGlass} /></button>
            </form>
            <div className="profile">
              <button className="user_profile" onClick={() => setProfile(!profile)}>
                <img src={UserLogo} alt="" />
              </button>
              { 
                profile
                ?
                  <div className="profile_data">
                    <div className="user_profile">
                      <img src={UserLogo} alt="" />
                      <strong>{userData.Username}</strong>
                    </div>
                    <Link to={'/'} className='logout-link'><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout</Link>
                  </div>
                :
                ""
              }
            </div>
        </div>
      </div>
      {
        searchMovie
        ? 
        <div className="search-movie-list">
          {movies.length > 0 && (
            <div className="list_cards">
              {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          <button onClick={searchClose} className='search_close'>X</button>
        </div>
        :
        ""
      }
    </header>
    </>
  )
}
