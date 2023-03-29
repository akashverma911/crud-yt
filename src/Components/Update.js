import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Update = () => {
    const [id, setId] = useState(0);
    const [url, setUrl] = useState("xyz");
    const [name, setName] = useState("")
    const [bucket, setBucket] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setUrl(localStorage.getItem("url"));
        setName(localStorage.getItem("name"));
        setBucket(localStorage.getItem("bucket"));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Id...", id);
        axios
            .put(`https://6421e26834d6cd4ebd7e0da0.mockapi.io/crud-yt/${id}`, {
                url: url,
                name: name,
                bucket:bucket,
            })
            .then(() => {
                navigate("/list");
            });
    };

    return (
        <>
            <h2>Update</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Url</label>
                    <input
                        type="text"
                        className="form-control"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Bucket</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bucket}
                        onChange={(e) => setBucket(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mx-2"
                    onClick={handleUpdate}
                >
                    Update
                </button>
                <Link to="/list">
                    <button className="btn btn-secondary mx-2"> Back </button>
                </Link>
            </form>
        </>
    );
};

export default Update;