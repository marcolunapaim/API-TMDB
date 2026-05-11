'use client'
import './index.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const APIKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
    
    useEffect(() => {
        const getMovies = async () => {
            await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    api_key: APIKey,
                    language:'pt-BR'
                }
            }).then(response => {
                setMovies(response.data.results);
            });
        }

        getMovies();
    }, [APIKey]);

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
