import httpService from "../service/httpService";

export const baseURL = "https://api.themoviedb.org/3";
export const imageURL = "https://image.tmdb.org/t/p/original";
export const apiKey = "f257fcc2612f2a83c35fbc08b60a0260";

export const getFromTmdb = async ({ url, page, query }) => {
  const requestURL = `${baseURL}${url}?api_key=${apiKey}${
    page ? `&page=${page}` : ""
  }${query ? `&query=${query}` : ""}`;

  const { data } = await httpService.get(requestURL);
  return data;
};
