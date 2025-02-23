import { apiService, request } from "./apiService";

const PROJECTION_ENDPOINT = "/projections";

const projectionApiService = apiService(PROJECTION_ENDPOINT);

export const projectionService = {
  ...projectionApiService,
  getAllDistinctProjectionTimes: async () => {
    const response = await request(`${PROJECTION_ENDPOINT}/times`);
    return response;
  },
  getFilteredProjectionTimes: async (movieName, city, venueName) => {
    const queryParams = new URLSearchParams({
      movieName,
      city,
      venueName,
    }).toString();

    const response = await request(
      `${PROJECTION_ENDPOINT}/movie-times?${queryParams}`
    );
    return response;
  },
  getProjection: async (movieId, venueId) => {
    const response = await request(
      `${PROJECTION_ENDPOINT}/movie-venue?movieId=${movieId}&venueId=${venueId}`
    );
    return response;
  },
  getProjectionsByMovieId: async (movieId) => {
    const response = await request(`${PROJECTION_ENDPOINT}/movie/${movieId}`);
    return response;
  },
  getProjectionsByVenueId: async (venueId, page = 0, size = 4) => {
    const response = await request(
      `${PROJECTION_ENDPOINT}/venue/${venueId}?page=${page}&size=${size}`
    );
    return response;
  },
  deleteProjection: async (projectionId) => {
    const response = await request(`${PROJECTION_ENDPOINT}/${projectionId}`, {
      method: "DELETE",
    });
    return response;
  },
};
