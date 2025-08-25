import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies , deleteMovie } from "../redux/moviesSlice";
import EditMovieModal from "./EditMovieModal";
import { BounceLoader } from 'react-spinners'


const MoviesList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.movies);
  const [editingMovie, setEditingMovie] = useState(null)

  // const handleEdit

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  if (status === "loading") return <BounceLoader />;
  if (status === "failed") return <p className="text-red-500">{error}</p>;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎥 Movies</h2>
      
      <div>
        <ul className="space-x-3">
          {list.map((movie) => (
            <li
                key={movie.id}
                className="flex justify-between items-center bg-gray-100 p-3 shadow rounded w-full"
            >
              <span>
                {movie.title} ({movie.genre}) ⭐ {movie.rating}
              </span>
              <div className="space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setEditingMovie(movie)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => dispatch(deleteMovie(movie.id))}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {
          editingMovie && (
            <div className="fixed inset-0 flex justify-center items-center bg-blue-300 bg-opacity-50 transition-all">
              <EditMovieModal movie={editingMovie} closeModal={() => setEditingMovie(null)}  />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MoviesList;
