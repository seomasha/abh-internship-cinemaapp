import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/MovieTable.css";
import { movieService } from "../services/movieService";

const MovieTable = ({
  movies,
  onCheckboxChange,
  onPublishClick,
  onEditClick,
  movieId,
  setMovieId,
}) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const handleCheckboxChange = (event, movieId) => {
    const isChecked = event.target.checked;
    onCheckboxChange(movieId, isChecked);
  };

  const handleActionChange = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (modalAction === "archive") {
      setShowModal(false);
      await movieService.updateMovie(movieId, "archived");
    }
    if (modalAction === "publish") {
      setShowModal(false);
      await movieService.updateMovie(movieId, "published");
    }
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  const actionTemplate = (rowData) => (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className="background-clear"
          id="dropdown-action"
        >
          <BsThreeDots
            className="primary-red pointer"
            onClick={() => setMovieId(rowData.id)}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleActionChange("edit")}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionChange("publish")}>
            Publish
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionChange("archive")}>
            Archive
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  const checkboxTemplate = (rowData) => (
    <div className="d-flex justify-content-start align-items-center gap-3">
      <input
        type="checkbox"
        style={{ marginLeft: "12px", accentColor: "#b22222" }}
        onChange={(e) => handleCheckboxChange(e, rowData.id)}
      />
      <img
        src={
          rowData.photos.find(
            (photo) => photo.entityType === "movie" && photo.role === "poster"
          )?.url
        }
        alt={rowData.name}
        style={{
          width: "50px",
          height: "50px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
      />
      {rowData.name}
    </div>
  );

  const stepTemplate = (step) => {
    if (step.charAt(5) === "1") {
      return <p className="step-one">Step 1/3</p>;
    }
    if (step.charAt(5) === "2") {
      return <p className="step-two">Step 2/3</p>;
    }
    if (step.charAt(5) === "3") {
      return <p className="step-three">Step 3/3</p>;
    }
  };

  return (
    <div className="mt-5">
      <DataTable
        value={movies}
        paginator
        stripedRows
        rows={5}
        rowsPerPageOptions={[10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column header="Movie" body={checkboxTemplate} />
        <Column
          header="Projection Date"
          body={(movie) => (
            <p>
              {movie.projectionEndDate} - {movie.projectionStartDate}
            </p>
          )}
        />
        <Column header="Venue" field="venue" />
        <Column
          header="Status"
          body={(rowData) => {
            return stepTemplate(rowData.status);
          }}
        />
        <Column header="Action" field="action" body={actionTemplate} />
      </DataTable>

      <Modal show={showModal} onHide={cancelAction}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm {modalAction.charAt(0).toUpperCase() + modalAction.slice(1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {modalAction} this movie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={cancelAction}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="primary-red-background"
            onClick={confirmAction}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieTable;
