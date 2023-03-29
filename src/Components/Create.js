import axios from "axios";
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Create = () => {

    const [url, setUrl] = useState("");
    const [name, setName] = useState("")
    const [bucket, setBucket] = useState("")
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked");
        axios
            .post("https://6421e26834d6cd4ebd7e0da0.mockapi.io/crud-yt", {
                url: url,
                name: name,
                bucket: bucket,
            })
            .then(() => {
                history("/list");
            });
    };

  return (
    <>
          <div className="d-flex justify-content-between m-2">
              <h2>Create</h2>
              <Link to="/list">
                  <button className="btn btn-primary">Show Data</button>
              </Link>
          </div>
        <form>
              <div className="mb-3">
                  <label className="form-label">URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={(e)=>setUrl(e.target.value)}
                  />
              </div>
              <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className="mb-3">
                  <label className="form-label">Bucket</label>
                  <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setBucket(e.target.value)}
                  />
              </div>
              <div className="col-auto">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
        </form>
    </>
  )
}

export default Create