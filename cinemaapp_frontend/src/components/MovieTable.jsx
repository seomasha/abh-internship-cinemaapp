import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsThreeDots } from "react-icons/bs";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/MovieTable.css";

const MovieTable = ({ movies }) => {
  const actionTemplate = (rowData) => (
    <div>
      <BsThreeDots className="primary-red" />
    </div>
  );

  const checkboxTemplate = (rowData) => (
    <div className="d-flex justify-content-start align-items-center gap-3">
      <input type="checkbox" style={{ marginLeft: "12px" }} />
      <img
        src={rowData.imageUrl}
        alt={rowData.name}
        style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "10px" }}
      />
      {rowData.name}
    </div>
  );

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
        <Column header="Movie" body={checkboxTemplate} sortable />
        <Column header="Projection Date" field="projectionDate" sortable />
        <Column header="Venue" field="venue" sortable />
        <Column header="Status" field="status" sortable />
        <Column header="Action" field="action" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default MovieTable;
