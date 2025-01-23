import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const sockJS = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);
    const stompClient = Stomp.over(sockJS);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/notifications", (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      });
    });

    setClient(stompClient);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendNotification = (notification) => {
    if (client) {
      client.send("/app/send-notification", {}, JSON.stringify(notification));
    }
  };

  return { notifications, sendNotification };
};

export default useWebSocket;
