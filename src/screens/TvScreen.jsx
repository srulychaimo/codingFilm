import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import Message from "../components/common/Message";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

const TvScreen = () => {
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: ({ inputValue }) => {
      const getSearched = async (query) => {
        const { results } = await getFromTmdb({
          url: "/search/tv",
          query: query,
        });
        setTvShows(results);
      };
      getSearched(inputValue);
    },
  });

  useEffect(() => {
    const getTvShows = async (activePage) => {
      const { results } = await getFromTmdb({
        url: "/discover/tv",
        page: activePage,
      });
      setTvShows([...tvShows, ...results]);
    };

    getTvShows(page);
  }, [page]);

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
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
            'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), center url("https://craft-magazine.com/wp-content/uploads/2020/06/best-tv-shows-1.jpg")',
          backgroundSize: "cover",
        }}
      >
        <h2>Tv Shows</h2>
      </div>
      <div className="bg-dark px-3">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Form onSubmit={form.handleSubmit} autoComplete="off">
              <InputGroup className="p-3">
                <Form.Control
                  {...form.getFieldProps("inputValue")}
                  placeholder="Tv Show Name"
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
        <Row className="justify-content-center py-5">
          {tvShows.map((tvShow) => (
            <Col
              key={tvShow?.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              onClick={() => handleClick(tvShow.id)}
            >
              <Image
                src={`${imageURL}${tvShow?.poster_path}`}
                alt={tvShow.name}
                fluid
              />
              <p className="text-center text-white">{tvShow.name}</p>
            </Col>
          ))}
          {!tvShows.length && (
            <Col sm={10} md={5} lg={4}>
              <Message variant="danger">No Tv Shows Found</Message>
            </Col>
          )}
        </Row>
        <Row className="justify-content-center py-3">
          <Col
            sm={6}
            md={4}
            className="btn text-white"
            onClick={handleLoadMore}
          >
            Load More Tv Shows
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TvScreen;
