import { apiService, request } from "./apiService";

const VENUE_ENDPOINT = "/venues";

const venueApiService = apiService(VENUE_ENDPOINT);

export const venueService = {
  ...venueApiService,
  getAllCities: async () => {
    const response = await request(`${VENUE_ENDPOINT}/cities`);
    return response;
  },
  getCitiesByMovieName: async (name) => {
    const response = await request(
      `${VENUE_ENDPOINT}/cities-by-movie?movieName=${name}`
    );
    return response;
  },
  getVenuesByCityAndMovieName: async (movieName, cityName) => {
    const response = await request(
      `${VENUE_ENDPOINT}/venues-for-movie?movieName=${movieName}&cityName=${cityName}`
    );
    return response;
  },
  getVenuesByMovieName: async (movieName) => {
    const response = await request(
      `${VENUE_ENDPOINT}/venues-by-movie-name?movieName=${movieName}`
    );
    return response;
  },
  getVenuesByCity: async (cityName) => {
    const response = await request(
      `${VENUE_ENDPOINT}/venues-by-city?cityName=${cityName}`
    );
    return response;
  },
  updateVenue: async (id, data) => {
    const response = await request(`${VENUE_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response;
  },
  deleteByID: async (id) => {
    const response = await request(`${VENUE_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
