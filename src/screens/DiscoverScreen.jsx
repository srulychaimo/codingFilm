import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

const DiscoverScreen = ({ url, title }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

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

  useEffect(() => {
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

  const handleClick = (id) => {
    if (url === "movie") {
      return navigate(`/movies/${id}`);
    }
    navigate(`/${url}/${id}`);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div
        className="discover-header d-flex justify-content-center align-items-center text-white"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), center url("https://craft-magazine.com/wp-content/uploads/2020/06/best-tv-shows-1.jpg")',
          backgroundSize: "cover",
        }}
      >
        <h2>{title}</h2>
      </div>
      <div className="bg-dark px-3">
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
              />
              <p className="text-center text-white">{data.name}</p>
            </Col>
          ))}
        </Row>
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
