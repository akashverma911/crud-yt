import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Row } from 'antd';
import ReactPlayer from 'react-player/youtube'

const { Meta } = Card;
const gridStyle = {
    width:'40%',
    display: 'inline-block',
};

const List = () => {
    const [data, setData] = useState([]);
    const [batch, setBatch] = useState([]);
    const [tabledark, setTableDark] = useState("");
    const [id, setId] = useState();
    const [tim, setTim] = useState();

    function groupBy(data, key) {
        return data.reduce((acc, x) => {
            acc[x[key]] = [...(acc[x[key]] || []), x];
            return acc;
        }, {});
    }

    function getData() {
        axios
            .get("https://6421e26834d6cd4ebd7e0da0.mockapi.io/crud-yt")
            .then((res) => {
                setData(res.data);
                const groupByBucket = groupBy(res.data, "bucket")
                setBatch(groupByBucket)
            });
    }


    function handleDelete(id) {
        axios
            .delete(`https://6421e26834d6cd4ebd7e0da0.mockapi.io/crud-yt/${id}`)
            .then(() => {
                getData();
            });
    }

    function getTime(id) {
        console.log(id);
    }

    const setToLocalStorage = (id, url, name, bucket) => {
        localStorage.setItem("id", id);
        localStorage.setItem("url", url);
        localStorage.setItem("name", name);
        localStorage.setItem("bucket", bucket);
    };

    useEffect(() => {
        getData();
    }, []);

    

    return (
        <>
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={() => {
                        if (tabledark === "table-dark") setTableDark("");
                        else setTableDark("table-dark");
                    }}
                />
            </div>
            <div className="d-flex justify-content-between m-2">
                <h2>Read Operation</h2>
                <Link to="/">
                    <button className="btn btn-secondary">Create</button>
                </Link>
            </div>

            {
                Object.entries(batch).map(([dep, vid]) => {
                    return (
                        <div className='dep' key={dep}>
                        <h2 className='dep-name'>{dep}</h2>

                        <div className="container">
                                
                                    {vid.map((eachData) => {
                                        return (
                                            <>
                                                <Card onClick={() => getTime(eachData.id)}
                                                style={gridStyle}
                                                    cover={
                                                        <ReactPlayer url={`${eachData.url}`} height='100%' width='100%'/>
                                                    }
                                                    actions={[ 
                                                            <Link to="/update">
                                                                <EditOutlined
                                                                    onClick={() =>
                                                                        setToLocalStorage(
                                                                            eachData.id,
                                                                            eachData.url,
                                                                            eachData.name,
                                                                            eachData.bucket,
                                                                        )
                                                                    }
                                                                >
                                                                    Edit{" "}
                                                                </EditOutlined>
                                                            </Link>,
                                                        <DeleteOutlined 
                                                            onClick={() => handleDelete(eachData.id)} />
                                                    ]}
                                                >
                                                    <Meta
                                                        title={eachData.name}
                                                    />
                                                </Card>
                                            </>
                                        )
                                    })}
                                
                                </div>
                        </div>
                    )
                })
            }      

        </>
    );
};

export default List;