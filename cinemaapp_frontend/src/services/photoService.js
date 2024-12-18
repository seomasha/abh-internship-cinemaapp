import { apiService, request } from "./apiService";

const PHOTO_ENDPOINT = "/photo";

const photoApiService = apiService(PHOTO_ENDPOINT);

export const photoService = {
  ...photoApiService,
  deleteByID: async (id) => {
    const response = await request(`${PHOTO_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
