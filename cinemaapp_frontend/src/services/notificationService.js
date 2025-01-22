import { apiService, request } from "../services/apiService";

const NOTIFICATION_ENDPOINT = "/notifications";

const notificationApiService = apiService(NOTIFICATION_ENDPOINT);

export const notificationService = {
  ...notificationApiService,
  getNotificationsByUserId: async (id) => {
    const response = await request(`${NOTIFICATION_ENDPOINT}/${id}`);
    return response;
  },
  markAsRead: async (id) => {
    const response = await request(`${NOTIFICATION_ENDPOINT}/${id}/read`, {
      method: "POST",
    });
    return response;
  },
  clearAllNotifications: async (id) => {
    const response = await request(`${NOTIFICATION_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return response;
  },
};
