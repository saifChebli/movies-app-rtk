import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editMovie } from '../redux/moviesSlice'


const EditMovieModal = ({movie ,closeModal}) => {

    const dispatch = useDispatch()

    const [title , setTitle] = useState(movie.title)
    const [genre , setGenre] = useState(movie.genre)
    const [rating , setRating] = useState(movie.rating)
 
    const handleEdit = (e) => {
        e.preventDefault()
        dispatch(editMovie({id : movie.id , updatedMovie : {title , genre , rating : Number(rating)}}))
    }

    
    return (
    
      <form onSubmit={handleEdit} className='space-x-3 bg-white p-4 rounded shadow-md'>
        <div className='flex justify-between items-center p-2'>

            <h1 className='text-lg font-bold'>Edit Movie</h1>
            <span className='cursor-pointer' onClick={closeModal}>
                ❌
            </span>
        </div>
        <label className="mb-4 font-semibold" htmlFor="">
          Movie Title:
        </label>
        <input
          className="border border-gray-300 p-2 w-full rounded"
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="mb-4 font-semibold" htmlFor="">
          Rating:{" "}
        </label>
        <input
          className="border border-gray-300 p-2 w-full rounded"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label className="mb-4 font-semibold" htmlFor="">
          Genre:{" "}
        </label>
        <input
          className="border border-gray-300 p-2 w-full rounded"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer"
          type="submit"
        >
          Save Changes
        </button>
      </form>
  );
}

export default EditMovieModal