import httpService from "./httpService";

const apiKey = "f257fcc2612f2a83c35fbc08b60a0260";
const baseURL = "https://api.themoviedb.org/3";
export const imageURL = "https://image.tmdb.org/t/p/original";

export const getPopular = async () => {
  const getPopularURL = `${baseURL}/movie/popular?api_key=${apiKey}`;

  const {
    data: { results },
  } = await httpService.get(getPopularURL);

  return results;
};

export const getDetailsById = async (id) => {
  const getDetailsURL = `${baseURL}/movie/${id}?api_key=${apiKey}`;

  const { data } = await httpService.get(getDetailsURL);

  return data;
};

export const getCastById = async (id) => {
  const getCastURL = `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;

  const {
    data: { cast },
  } = await httpService.get(getCastURL);

  return cast;
};

export const getImagesById = async (id) => {
  const getImagesURL = `${baseURL}/movie/${id}/images?api_key=${apiKey}`;

  const { data } = await httpService.get(getImagesURL);

  return {
    backdrop: data.backdrops[0].file_path,
    poster: data.posters[0].file_path,
  };
};

export const getSimilarById = async (id) => {
  const getSimilarURL = `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;
  const {
    data: { results },
  } = await httpService.get(getSimilarURL);
  return results;
};

export const getRecommendationsById = async (id) => {
  const getRecommendationsURL = `${baseURL}/movie/${id}/recommendations?api_key=${apiKey}`;
  const {
    data: { results },
  } = await httpService.get(getRecommendationsURL);
  return results;
};

export const getVideosById = async (id) => {
  const getVideosURL = `${baseURL}/movie/${id}/videos?api_key=${apiKey}`;
  const {
    data: { results },
  } = await httpService.get(getVideosURL);
  return results;
};

export const getTopRated = async () => {
  const getTopRatedURL = `${baseURL}/movie/top_rated?api_key=${apiKey}`;
  const {
    data: { results },
  } = await httpService.get(getTopRatedURL);
  return results;
};

export const getUpcoming = async () => {
  const getUpcomingURL = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
  const {
    data: { results },
  } = await httpService.get(getUpcomingURL);
  return results;
};

export const discoverMovies = async (page = 1) => {
  const discoverMoviesURL = `${baseURL}/discover/movie?api_key=${apiKey}&page=${page}`;
  const {
    data: { results },
  } = await httpService.get(discoverMoviesURL);

  return results;
};

export const discoverTv = async (page = 1) => {
  const discoverTvURL = `${baseURL}/discover/tv?api_key=${apiKey}&page=${page}`;
  const {
    data: { results },
  } = await httpService.get(discoverTvURL);

  return results;
};

export const searchMovies = async (query, page = 1) => {
  const searchMoviesURL = `${baseURL}/search/movie?api_key=${apiKey}&page=${page}&query=${query}`;
  const {
    data: { results },
  } = await httpService.get(searchMoviesURL);

  return results;
};
