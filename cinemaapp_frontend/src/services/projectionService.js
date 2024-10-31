import { apiService } from "./apiService";

const PROJECTION_ENDPOINT = "/projections";

const projectionApiService = apiService(PROJECTION_ENDPOINT);

export const projectionService = {
  ...projectionApiService,
};
