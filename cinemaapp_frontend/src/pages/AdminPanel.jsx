import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import TabButton from "../components/TabButton";
import "../styles/AdminPanel.css";
import { TbMovieOff } from "react-icons/tb";
import { Button } from "react-bootstrap";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("drafts");

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div
          className="navbar-background p-4 flex-grow-1 top-border"
          style={{ height: "100vh", zIndex: 1 }}
        >
          <h4 className="text-white bottom-border pb-4">Admin</h4>
          <p className="text-white mt-4">
            <MdOutlineLocalMovies />
            <span className="mx-2 pt-1">Movies</span>
          </p>
          <p className="text-white mt-4">
            <FaBuilding />
            <span className="mx-2 pt-1">Venues</span>
          </p>
        </div>

        <div className="col-10 primary-background p-4">
          <h5>Movies</h5>

          <div className="mt-3 border-bottom gap-5 d-flex">
            <TabButton
              label="Drafts (0)"
              isActive={activeTab === "drafts"}
              onClick={() => setActiveTab("drafts")}
            />
            <TabButton
              label="Currently Showing (0)"
              isActive={activeTab === "currently-showing"}
              onClick={() => setActiveTab("currently-showing")}
            />
            <TabButton
              label="Upcoming (0)"
              isActive={activeTab === "upcoming"}
              onClick={() => setActiveTab("upcoming")}
            />
            <TabButton
              label="Archived (0)"
              isActive={activeTab === "archived"}
              onClick={() => setActiveTab("archived")}
            />
          </div>

          <div className="mt-4">
            {activeTab === "drafts" && (
              <div className="text-center">
                <TbMovieOff size={64} className="mt-5" />
                <h5 className="fw-bold mt-3">No movies added</h5>
                <p className="mt-3">You can add movie via Add Movie button</p>
                <Button
                  variant="danger"
                  className="mt-3 primary-red-background"
                >
                  Add Movie
                </Button>
              </div>
            )}
            {activeTab === "currently-showing" && (
              <p>Here are the Currently Showing Movies</p>
            )}
            {activeTab === "upcoming" && <p>Here are the Upcoming Movies</p>}
            {activeTab === "archived" && <p>Here are the Archived Movies</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
