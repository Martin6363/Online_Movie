import axios from 'axios';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export function Trailer ({ movieId }) {
    const [trailerKey, setTrailerKey] = useState('');
    const getTrailerKey = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then((res) => {
                const results = res.data.results;
                if (results.length > 0) {
                    setTrailerKey(results[0].key);
                } else {
                    setTrailerKey('');
                }
            });
    };

    useEffect(() => {
        getTrailerKey();
    }, [movieId]);

    return (
        <div className='player_cont'>
            {
                trailerKey ? (
                    <YouTube
                        className='YouTube_player'
                        videoId={trailerKey} 
                        opts={{
                            width: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 1
                            }
                        }}
                    />
                ) : (
                    <p style={{width: "100%",
                                color: "#ff3333",
                                fontSize: "25px", 
                                textAlign: "center"
                    }}>No trailer available for this movie.</p>
                )
            }
        </div>
    );
}
