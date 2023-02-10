import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [apiData, setapiData] = useState(null);
  let [error, setError] = useState(null);
  let [deleted, setDeleted] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/Vehicles")
      .then((response) => {
        if (response.ok === false) {
          throw Error("Searching data not found");
        }
        return response.json();
      })
      .then((data) => {
        setapiData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [deleted]);

  //To Delete the Data
  let deleteMovie = (id) => {
    fetch("http://localhost:8080/Delete/" + id, { method: "DELETE" }).then(
      () => {
        alert("Vehicle Deleted Succesfully");
        setDeleted(deleted+1);
      }
    );
  };

  return (
    <div className="Home">
      {error && <h1>{error}</h1>}
      {apiData && (
        <div className="HomeContainer">
          <table
            border="2px"
            cellPadding="9px"
            cellSpacing="3px"
            align="center"
          >
            <tbody>
              <tr>
                <th>Sl No </th>
                <th>Vehicle Name </th>
                <th>Vehicle Model </th>
                <th>Vehicle Color </th>
                <th>Vehicle Price </th>
                <th>Delete Vehicle </th>
                <th>Update Vehicle </th>
              </tr>
              {apiData.map((value, index) => {
                return (
                  <>
                    <tr>
                      <td>{index+1}</td>
                      <td>{value.vName}</td>
                      <td>{value.vModel}</td>
                      <td>{value.vColor}</td>
                      <td>{value.vPrice}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteMovie(apiData[index].vId);
                          }}
                          className="btn red"
                        >
                          Delete Vehicle
                        </button>
                      </td>
                      <td>
                        <Link to={`/update${apiData[index].vId}`}>
                          {" "}
                          <button className="btn yellow">
                            Update Vehicle
                          </button>{" "}
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="buttons">
        <Link to="/addemp">
          <button className="btn green">Add New Vehicle</button>
        </Link>
      </div>
    </div>
  );
}
