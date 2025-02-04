import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const sockJS = new SockJS(
      `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_API_PATH}/ws`
    );
    const stompClient = Stomp.over(sockJS);

    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/notifications", (message) => {
        const newNotification = JSON.parse(message.body);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      });
    });

    setClient(stompClient);
  }, []);

  return { notifications };
};

export default useWebSocket;
