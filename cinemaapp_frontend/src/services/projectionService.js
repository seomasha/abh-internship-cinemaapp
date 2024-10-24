import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const PROJECTION_ENDPOINT = '/projections';

const projectionApiService = apiService(PROJECTION_ENDPOINT);

export const projectionService = {
    ...projectionApiService,
    getProjectionsByVenueId: async(venueId) => {
        const response = await axios.get(
            BASE_URL + PROJECTION_ENDPOINT + `/venue/${venueId}`
          );
          return response.data;
    }
}