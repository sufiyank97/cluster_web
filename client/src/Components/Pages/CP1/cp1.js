import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './cp1.css'
import ClusterForm from './form'
import axios from 'axios'
const CP1 = (props) => {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [updateData, getUpdateData] = useState({})
    const [devData, getDev] = useState([])
    const [prodData, getProd] = useState([])
    const inputEl = useRef(null)
    const dc1Data = async () => {
        const res = await axios.get('http://localhost:4000/dev')
        const res1 = await axios.get('http://localhost:4000/prod')
        try {
            getDev(res.data)
            getProd(res1.data)
        }
        catch (err) {
            window.alert(err)
        }
    }


    const handleClose1 = () => {

        setShow1(false)
        setShow(false)
        dc1Data()

    }



    useEffect(
        () => {
            dc1Data()
        }, []
    )
    const handleDelete = async (id, name) => {
        if (name === "dc1") {
            console.log('1')
            const res = await axios.delete(`http://localhost:4000/dev/${id}`)
            try {
                if (res.errors) {
                    window.alert(res.errors)
                } else {
                    getDev(devData.filter(d1 => d1.id !== id))
                }
            } catch (err) {
                window.alert(err)
            }
        } else {
            console.log('2')
            const res = await axios.delete(`http://localhost:4000/prod/${id}`)
            try {
                if (res.errors) {
                    window.alert(res.errors)
                } else {
                    console.log('2')
                    console.log(res)
                    getProd(prodData.filter(d1 => d1.id !== id))
                }
            } catch (err) {
                window.alert(err)
            }
        }
    }

    const handleUpdate = async (Id, Name) => {
        setShow1(true)
        getUpdateData({
            ...updateData,
            id: Id,
            name: Name
        })
    }

    const handleShow = async (id1) => {
        setShow(true)
        getUpdateData({
            ...updateData,
            id: id1
        })
    }
    return (
        < div id="cp1" >
            <h4>DC1</h4>
            <div className="container">
                <h4>Development</h4>

                <table className="table" >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date Created</th>
                            <th>Cluster Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {devData.filter(d1 =>
                            d1.dc1Id == 1
                        ).map((d1, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.date}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status == "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (
                                                <label className="pro1 progress2">COMPLETED</label>
                                            )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1.id, 'dc1dev')} >Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1.id, 'dc1')}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
                <Button className="createCluster" variant="warning" onClick={() => handleShow(`dc1dev:${devData.length}`)}>
                    Create Cluster</Button>



                <h4>Production</h4>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date Created</th>
                            <th>Cluster Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodData.filter(d1 =>
                            d1.dc1Id == 1
                        ).map((d1, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.date}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status == "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (
                                                <label className="pro1 progress2">COMPLETED</label>
                                            )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1.id, 'dc1prod')}>Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1.id, 'dc1')}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <Button className="createCluster mb-2" variant="warning" onClick={() => handleShow(`dc1prod:${prodData.length}`)}>
                    Create Cluster</Button>
            </div>
            <h4>DC2</h4>
            <div className="container">
                <h4>Development</h4>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date Created</th>
                            <th>Cluster Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devData.filter(d1 =>
                            d1.dc2Id == 1
                        ).map((d1, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.date}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status == "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (
                                                <label className="pro1 progress2">COMPLETED</label>
                                            )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1.id, "dc2dev")}>Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <Button className="createCluster" variant="warning" onClick={() => handleShow(`dc2dev:${devData.length}`)}>
                    Create Cluster</Button>



                <h4>Production</h4>
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Date Created</th>
                            <th>Cluster Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodData.filter(d1 =>
                            d1.dc2Id == 1
                        ).map((d1, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.date}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status == "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (
                                                <label className="pro1 progress2">COMPLETED</label>
                                            )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1.id, "dc2prod")}>Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

                <Button className="createCluster mb-2" variant="warning" onClick={() => handleShow(`dc2prod:${prodData.length}`)}>
                    Create Cluster</Button>
            </div>
            <Modal show={show} onHide={() => { setShow(false) }} size="lg" dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <ClusterForm handleClose={handleClose1} conn={updateData.id} />
                </Modal.Body>
            </Modal>
            <Modal show={show1} onHide={() => setShow1(false)} size="lg" dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <ClusterForm id={updateData.id} name={updateData.name} handleClose={handleClose1} />
                </Modal.Body>
            </Modal>
        </div >
    )
}
export default CP1