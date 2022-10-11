import { useEffect, useState } from "react";
import GenreResponseInterface from "../Interface/GenreResponseInterface";
import MovieInterface from "../Interface/MovieInterface";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseInterface;
}

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    api
      .get<MovieInterface[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  });

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
