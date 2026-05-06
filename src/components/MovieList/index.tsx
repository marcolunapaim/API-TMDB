'use client'
import './index.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading'

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        getMovies();
    }, []);
    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'f348a3c8dbb646224af9d5106eba3d0a',
                language:'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
        });

        setIsLoading(false);
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) => 
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                />   
            )}
        </ul>
    );
}