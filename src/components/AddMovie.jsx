import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMovies } from '../redux/moviesSlice'

const AddMovie = () => {``
    const dispatch = useDispatch()
    const [movieTitle, setMovieTitle] = useState("")
    const [movieRating, setMovieRating] = useState("")
    const [movieGenre, setMovieGenre] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(movieTitle && movieRating && movieGenre){
            dispatch(addMovies({title : movieTitle , rating : Number(movieRating) , genre : movieGenre}))
        }
        setMovieTitle('')
        setMovieRating('')
        setMovieGenre('')
    }

  return (
    <div>
        <div>
            <form action="" onSubmit={handleSubmit} className='p-6 bg-gray-50 shadow-md rounded-lg space-y-3'>
                <h1 className='text-3xl font-bold'>Add Movie</h1>

                <label className='mb-4 font-semibold' htmlFor="">Movie Title:</label>
                <input className='border border-gray-300 p-2 w-full rounded' type="text" placeholder ="Movie title" value={movieTitle} onChange = {(e) => setMovieTitle(e.target.value)}/>

                <label className='mb-4 font-semibold' htmlFor="">rating: </label>
                <input className='border border-gray-300 p-2 w-full rounded' type="number" value = {movieRating} onChange = {(e) => setMovieRating(e.target.value)}/>

                <label className='mb-4 font-semibold' htmlFor="">Genre: </label>
                <input className='border border-gray-300 p-2 w-full rounded' type="text" value={movieGenre} onChange = {(e) => setMovieGenre(e.target.value)}/>

                <button className='bg-green-500 text-white px-4 py-2 rounded cursor-pointer' type = 'submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddMovie