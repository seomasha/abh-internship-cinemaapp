import { apiService, request } from "./apiService";

const OTP_ENDPOINT = "/otp";

const otpApiService = apiService(OTP_ENDPOINT);

export const otpService = {
  ...otpApiService,
  verifyOtp: async (email, otp) => {
    const response = await request(`${OTP_ENDPOINT}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: email, otp: otp },
    });
    return response;
  },
};
