import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import { IMAGE_URL, API_KEY } from '../../Constants/constant'
import axios from '../../axios'
function RowPost({ title, isSmall, url }) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState()
    const [toggle, setToggle] = useState(true)
    useEffect(() => {
        axios.get(url).then(response => {
            setMovies(response.data.results)
        }).catch(err => {
            alert(err)
        })
    }, [])
        
    const opts = {
        height: '400',
        width: '800',
        playerVars: {
            autoplay: 1,
        },
    };
    const handleMovieClick = (id) => {
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
            console.log(response.data)
            if(response.data.results.length !== 0){
                setUrlId(response.data.results[0])
            } else {
                console.log('Array empty')
            }
        })

    }
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='posters'>
                {movies.map((v) =>
                    <img onClick={() => {
                        handleMovieClick(v.id)
                        setToggle(toggle ? false : true)
                    }} className={isSmall ? 'smallPoster' : 'poster'} alt='poster' src={`${IMAGE_URL + v.backdrop_path}`} />
                )}
            </div>

            {urlId && toggle ? <Youtube style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} videoId={urlId.key} opts={opts} />:""}
            
        </div>
    )
}

export default RowPost
