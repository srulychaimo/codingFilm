import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: ({ inputValue }) => {
      const getSearched = async (query) => {
        const { results } = await getFromTmdb({
          url: "/search/movie",
          query: query,
        });
        setMovies(results);
      };
      getSearched(inputValue);
    },
  });

  useEffect(() => {
    const getMovies = async (activePage) => {
      const { results } = await getFromTmdb({
        url: "/discover/movie",
        page: activePage,
      });
      setMovies([...movies, ...results]);
    };

    getMovies(page);
  }, [page]);

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div
        className="movie-header d-flex justify-content-center align-items-center text-white"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), center url("https://i.imgur.com/gQz4ijq.png")',
          backgroundSize: "cover",
        }}
      >
        <h2>Movies</h2>
      </div>
      <div className="bg-dark px-3">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Form onSubmit={form.handleSubmit} autoComplete="off">
              <InputGroup className="p-3">
                <Form.Control
                  {...form.getFieldProps("inputValue")}
                  placeholder="Movie Name"
                />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  onSubmit={form.handleSubmit}
                >
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {movies.map((movie) => (
            <Col
              key={movie?.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              onClick={() => handleClick(movie.id)}
            >
              <Image
                src={`${imageURL}${movie?.poster_path}`}
                alt={movie.title}
                fluid
              />
              <p className="text-center text-white">{movie.title}</p>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center py-3">
          <Col
            sm={6}
            md={4}
            className="btn text-white"
            onClick={handleLoadMore}
          >
            Load More Videos
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MoviesScreen;
