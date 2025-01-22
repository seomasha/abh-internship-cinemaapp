import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { notificationService } from "../services/notificationService";

const Notification = ({ id, notif }) => {
  const [isRead, setIsRead] = useState(notif.read);

  const handleMarkAsRead = async () => {
    if (notif.read) return;
    const response = await notificationService.markAsRead(id);
    if (response) setIsRead(true);
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
      <img
        className="rounded-4"
        width={50}
        height={50}
        src={
          notif.movieId.photos.find((photo) => photo.entityType === "movie")
            ?.url
        }
        alt={notif.movieId.title}
      />
      <div className="d-flex flex-column">
        <span className="text-dark">{notif.message}</span>
      </div>
    </div>
  );
};

export default Notification;
