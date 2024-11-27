import { apiService } from "./apiService";

const OTP_ENDPOINT = "/otp";

const otpApiService = apiService(OTP_ENDPOINT);

export const otpService = {
  ...otpApiService,
};
