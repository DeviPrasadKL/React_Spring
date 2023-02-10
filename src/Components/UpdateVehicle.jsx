import React, { useState } from 'react';
import { useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateVehicle() {
    let { id } = useParams();
    let h = useHistory();

    const [vName, setVname] = useState("");
    const [vModel, setVmodel] = useState("");
    const [vColor, setVcolor] = useState("");
    const [vPrice, setVprice] = useState("");
    let [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/Vehicle/"+id)
            .then((response) => {
                if (response.ok === false) {
                    throw Error("Searching data not found");
                }
                return response.json();
            })
            .then((data) => {
                setVname(data.vName);
                setVmodel(data.vModel);
                setVcolor(data.vColor);
                setVprice(data.vPrice);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id]);


    let handelUpdateVehicle = (e) => {
        e.preventDefault();
        let updateVeh = { vName, vModel, vColor, vPrice };

        fetch("http://localhost:8080/Update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateVeh)
        }).then(() => {
            alert("Updated Vehicle Successfully")
            h.push("/");
        })
    }

    return (
        <div className="UpdateVehicle">
            {error && <h1>{error}</h1>}
            <h1>Update Vehicle</h1>
            <form onSubmit={handelUpdateVehicle}>
                <label>Vehicle Name: </label>
                <input type="text"
                    value={vName}
                    onChange={(e)=>{
                        setVname(e.target.value);
                    }}
                />

                <label>Vehicle Model: </label>
                <input type="text"
                    value={vModel}
                    onChange={(e) =>{
                        setVmodel(e.target.value);
                    }}
                />

                <label>Vehicle Color: </label>
                <input type="text"
                    value={vColor}
                    onChange={(e) => {
                        setVcolor(e.target.value);
                    }}
                />

                <label>Vehicle Price: </label>
                <input type="text"
                    value={vPrice}
                    onChange={(e)=>{
                        setVprice(e.target.value);
                    }}
                />
                <input type="submit" value="Update Vehicle" />
            </form>
        </div>
    );
}
