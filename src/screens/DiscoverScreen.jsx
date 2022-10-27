// Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

// Discover screen component gets a url & title, & shows randem movies/tvShows to discover & allows the user to search & to load more.
const DiscoverScreen = ({ url, title }) => {
  // State for data & pageNumber.
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // Using the useNavigate hook from react-router.
  const navigate = useNavigate();

  // Using the useFormik hook from formik for the search input.
  const form = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: ({ inputValue }) => {
      const getSearched = async (query) => {
        const { results } = await getFromTmdb({
          url: `/search/${url}`,
          query: query,
        });
        setData(results);
      };
      getSearched(inputValue);
    },
  });

  // useEffect will run on componentDidMont & when url is changing and will return only the new data.
  useEffect(() => {
    // will scroll up to top of page.
    window.scrollTo(0, 0);

    const getData = async (activePage) => {
      const { results } = await getFromTmdb({
        url: `/discover/${url}`,
        page: activePage,
      });
      setData([...results]);
    };

    getData(page);
  }, [url]);

  // useEffect will run on componentDidMont & when page is changing and will return the old data and the new data.
  useEffect(() => {
    const getData = async (activePage) => {
      const { results } = await getFromTmdb({
        url: `/discover/${url}`,
        page: activePage,
      });

      return setData([...data, ...results]);
    };

    getData(page);
  }, [page]);

  // function to handleClick and navigate to id that was clicked.
  const handleClick = (id) => {
    if (url === "movie") {
      return navigate(`/movies/${id}`);
    }
    navigate(`/${url}/${id}`);
  };

  // function to load more.
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {/* discover header */}
      <div
        className="discover-header d-flex justify-content-center align-items-center text-white"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), center url("https://i.imgur.com/gQz4ijq.png")',
          backgroundSize: "cover",
        }}
      >
        <h2>{title}</h2>
      </div>

      <div className="bg-dark px-3">
        {/* Showing the form. */}
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Form onSubmit={form.handleSubmit} autoComplete="off">
              <InputGroup className="p-3">
                <Form.Control
                  {...form.getFieldProps("inputValue")}
                  placeholder={`${title} Name`}
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

        {/* Showing all data. */}
        <Row className="justify-content-center py-5">
          {data.map((data) => (
            <Col
              key={data?.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              onClick={() => handleClick(data?.id)}
            >
              <Image
                src={`${imageURL}${data?.poster_path}`}
                alt={data.name}
                fluid
                rounded
              />
              <p className="text-center text-white">{data.name}</p>
            </Col>
          ))}
        </Row>

        {/* Load more button */}
        <Row className="justify-content-center py-3">
          <Col
            sm={6}
            md={4}
            className="btn text-white mx-auto"
            onClick={handleLoadMore}
          >
            Load More {title}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DiscoverScreen;
