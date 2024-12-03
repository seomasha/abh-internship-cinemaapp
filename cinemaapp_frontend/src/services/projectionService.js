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
};
