import { apiService } from "./apiService";

const PHOTO_ENDPOINT = "/photo";

const photoApiService = apiService(PHOTO_ENDPOINT);

export const photoService = {
  ...photoApiService,
};
