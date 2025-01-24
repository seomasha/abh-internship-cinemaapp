import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { notificationService } from "../services/notificationService";

const Notification = ({ id, notif, markAsRead }) => {
  const [isRead, setIsRead] = useState(notif.read);

  const handleMarkAsRead = async () => {
    if (notif.read) return;
    const response = await notificationService.markAsRead(id);
    if (response) {
      setIsRead(true);
      markAsRead(id);
    }
  };

  return (
    <div
      className={`d-flex align-items-center gap-3 p-2 rounded-4 ${
        isRead ? "text-white" : "text-white"
      }`}
      onClick={handleMarkAsRead}
      style={{ cursor: "pointer" }}
    >
      {!isRead && <FaCircle className="text-danger" size={12} />}
      <div className="d-flex flex-column">
        <span className="text-dark">{notif.message}</span>
      </div>
    </div>
  );
};

export default Notification;
