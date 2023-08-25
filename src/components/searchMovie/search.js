import React, { useEffect, useState } from 'react'
import '../../assets/styles/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export function Search (search) {
    function searchMovies (e) {
        e.preventDefault()
    }
  return (
    <>
        <form onSubmit={searchMovies} className="search_movie">
            <input type="text"
             required 
             value={search.value}
             onChange={(e) => search.setSearchValue(e.target.value)}
            />
            <button className='search_button' title='Search'><FontAwesomeIcon className='search_icon' icon={faMagnifyingGlass} /></button>
        </form> 

    </>
  )
}
