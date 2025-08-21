import React , { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getMovies } from '../redux/moviesSlice'


const MoviesList = () => {

 const dispatch = useDispatch()
 const { list , status ,error } = useSelector( state => state.movies )

useEffect(() => {
    dispatch(getMovies())
},[])


if (status === "loading") return <p>Loading movies ...</p>
if (status === "failed") return <p className='text-red-500'>{error}</p>


  return (
    <div>
        <h2>🎥 Movies</h2>
        <div>
            <ul>
                {
                    list.map(movie => (
                        <li>{movie.title}</li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default MoviesList