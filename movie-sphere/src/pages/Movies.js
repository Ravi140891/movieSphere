import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const generesLoaded = useSelector((state) => state.movieSphere.generesLoaded);
  const movies = useSelector((state) => state.movieSphere.movies);
  const genres = useSelector((state) => state.movieSphere.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (generesLoaded) {
      dispatch(fetchMovies({ type: "movies" }));
    }
  }, [dispatch, generesLoaded]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies;
