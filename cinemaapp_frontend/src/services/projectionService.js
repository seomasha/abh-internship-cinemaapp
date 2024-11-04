import { apiService, request } from "./apiService";

const PROJECTION_ENDPOINT = "/projections";

const projectionApiService = apiService(PROJECTION_ENDPOINT);

export const projectionService = {
  ...projectionApiService,
  getAllDistinctProjectionTimes: async () => {
    const response = await request(`${PROJECTION_ENDPOINT}/times`);
    return response;
  },
};
