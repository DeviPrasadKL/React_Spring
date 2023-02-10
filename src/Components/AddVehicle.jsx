import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AddEmployee() {
    let h = useHistory();

    const [vName, setVName] = useState("");
    const [vModel, setVModel] = useState("");
    const [vColor, setVColor] = useState("");
    const [vPrice, setVPrice] = useState("");

    let HandleSubmit = (e) => {
        e.preventDefault();
        let newEmployee = { vName, vModel, vColor, vPrice }

        fetch("http://localhost:8080/AddVehicle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployee)
        })
            .then(() => {
                alert("Vehicle added successfully")
                h.push("/")
            })
    }

    return (
        <div className="AddVehicle">
            <div className="heading">
                <h2>Add Vehicle</h2>
            </div>

            <div className="formdiv">
                <form onSubmit={HandleSubmit}>
                    <label> Vehicle Name: </label> <input type="text" value={vName} onChange={(e) => { setVName(e.target.value) }} />
                    <label> Vehicle Model: </label> <input type="text" value={vModel} onChange={(e) => { setVModel(e.target.value) }} />
                    <label> Vehicle Color: </label> <input type="text" value={vColor} onChange={(e) => { setVColor(e.target.value) }} />
                    <label> Vehicle Price: </label> <input type="text" value={vPrice} onChange={(e) => { setVPrice(e.target.value) }} />
                    <input type="submit" value="Add Vehicle" id="submitbtn" />
                </form>
            </div>
        </div>
    );
}
