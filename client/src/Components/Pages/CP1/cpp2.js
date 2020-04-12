import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './cp1.css'
import axios from '../../../config/axios'
import swal from 'sweetalert';
import ClusterForm1 from './form1'
const CPP2 = ({ Dcs, envs, sh }) => {
    const [dc1Data, getDc1Data] = useState([])
    const [fakeId, getId] = useState('')
    const [show, setShow] = useState(false)
    const handleUpdate = (Id) => {
        setShow(true)
        getId(Id)
    }

    const callCp1 = async () => {
        console.log('callCP1')
        const res = await axios.get('/platform/v1/cluster_list')
        try {
            const data = res.data
            console.log(data)
            let dc1 = data.filter(dc1 =>
                dc1.dcData.dc === Dcs && dc1.dcData.env === envs
            )
            console.log(dc1, "dddddddddd")
            getDc1Data(dc1)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(
        () => {
            callCp1()
        }, []
    )
    const handleClose = () => {
        setShow(false)
        callCp1()
        getId('')
    }

    const handleDelete = (id) => {

        const deleteData = async (id) => {

            const res = await axios.delete(`/platform/v1/cluster_list/${id}`)
            try {
                if (res.errors) {
                    window.alert(res.errors)
                } else {
                    console.log(res.data)
                    getDc1Data(dc1Data.filter(d1 => d1._id != id))
                }
            } catch (err) {
                console.log(err)
            }
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    deleteData(id)
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <>
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
                    {
                        dc1Data.map((d1, i) => {
                            console.log(d1.status)
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{d1.createdAt.split('T')[0].split('-').reverse().join('-')}</td>
                                    <td>{d1.clusterName}</td>
                                    <td>
                                        {(d1.status === "inprogress") ? (
                                            <label className="pro1 progress1">INPROGRESS</label>
                                        ) : (d1.status === "created") ? (
                                            <label className="pro1 progress3">Created</label>
                                        ) :
                                                (
                                                    <label className="pro1 progress2">COMPLETED</label>
                                                )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary"
                                                onClick={() => handleUpdate(d1._id)}>Update</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleDelete(d1._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
            <div>
                <Button className="createCluster mb-2" variant="warning" onClick={() => setShow(true)}>
                    Create Cluster</Button>
            </div>
            <Modal show={show} onHide={() => { setShow(false); getId('') }} size="lg" dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <ClusterForm1 handleClose={handleClose} id={fakeId} Dcs={Dcs} envs={envs} />
                </Modal.Body>
            </Modal>
        </ >

    )
}
export default CPP2