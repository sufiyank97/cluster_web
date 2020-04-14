import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './cp1.css'
import axios from '../../../config/axios'
import swal from 'sweetalert';
import ClusterForm1 from './form1'
import { useForm } from 'react-hook-form'
const DcList = ({ Dcs, envs, sh }) => {
    const [dcsData, getDcsData] = useState([])

    const [networkPolicy, getNetworkPolicy] = useState([])
    const [show, setShow] = useState(false)
    const [updatedRecord, getUpdated] = useState({})
    const { handleSubmit, register } = useForm({})



    const callCp1 = async () => {

        const res = await axios.get('/platform/v1/cluster_list', {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })
        try {
            const data = res.data

            let dc1 = data.filter(dc1 =>
                dc1.dcData.dc === Dcs && dc1.dcData.env === envs
            )

            getDcsData(dc1)
        }
        catch (err) {
            swal('Error!', err, 'error')
        }
    }
    //Get the Dcs Data
    useEffect(
        () => {
            callCp1()
        }, [Dcs, envs]
    )
    //Close the Create Modal Box Form
    const handleClose = () => {
        setShow(false)
        callCp1()
    }

    //Delete Record
    const handleDelete = (id) => {
        const deleteData = async (id) => {
            const res = await axios.delete(`/platform/v1/cluster_list/${id}`, {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
            try {
                if (res.errors) {
                    window.alert(res.errors)
                } else {

                    getDcsData(dcsData.filter(d1 => d1._id !== id))
                }
            } catch (err) {
                swal('Error!', err, 'error')
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
    //get the updated Record
    const handleUpdate = async (Id) => {
        const res = await axios.get(`/platform/v1/cluster_list/${Id}`, {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })

        const res2 = await axios.get('/platform/v1/network_policy')
        try {
            getUpdated(res.data)
            getNetworkPolicy(res2.data)
        } catch (err) {
            swal('Error', err, 'error')
        }
    }
    //Cancel the updated form
    const handleCancel = () => {
        getUpdated({})
    }
    //Submit updated Data

    const onSubmit = (data) => {
        console.log(data)
        updatedRecord.clusterName = data.clusterName
        updatedRecord.networkPolicy = data.networkPolicy
        data.role.split(';').pop()
        updatedRecord.role = data.role.split(';')

        if ((data.status === 'created') || (data.status === "updated")) {
            updatedRecord.status = "updated"
        } else if ((data.status === "inprogress") && (updatedRecord.status === "inprogress")) {
            updatedRecord.status = "updated"
        } else {
            updatedRecord.status = "inprogress"
        }
        const updateFunction = async () => {

            const res = await axios.put(`/platform/v1/cluster_list/${updatedRecord._id}`, updatedRecord, {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
            try {
                if (res.error) {
                    swal('error', res.error, 'error')
                } else {
                    callCp1()
                    handleCancel()
                }

            } catch (err) {
                swal('Error!', err, 'error')
            }
        }
        updateFunction()
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                        {   // print all the Dcs data
                            dcsData.map((d1, i) => {
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
                                                        <label className="pro1 progress2">Updated</label>
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
                        {   //Updated record form
                            (updatedRecord._id) ? (
                                <tr key={updatedRecord._id}>
                                    <td>
                                        <input className="form-control" name="clusterName" defaultValue={updatedRecord.clusterName} ref={register({ required: true })} />
                                    </td>
                                    <td>
                                        <select id="status" name="status"
                                            ref={register({ required: true })} defaultValue={updatedRecord.status} className="form-control">
                                            {(updatedRecord.status === "inprogress") ? (
                                                <>
                                                    <option value={updatedRecord.status}>{updatedRecord.status}</option>
                                                    <option value="updated">updated</option>
                                                    <option value="created">created</option>
                                                </>
                                            ) : (updatedRecord.status === "created") ? (
                                                <>
                                                    <option value={updatedRecord.status}>{updatedRecord.status}</option>
                                                    <option value="updated">updated</option>
                                                    <option value="inprogress">inprogress</option>
                                                </>
                                            ) : (
                                                        <>
                                                            <option value={updatedRecord.status}>{updatedRecord.status}</option>
                                                            <option value="created">created</option>
                                                            <option value="inprogress">inprogress</option>
                                                        </>
                                                    )}
                                        </select>
                                    </td>
                                    <td>
                                        <select id="networkPolicy" name="networkPolicy"
                                            ref={register({ required: true })} className="form-control">

                                            <option value={updatedRecord.networkPolicy._id}>{updatedRecord.networkPolicy.name}</option>
                                            {
                                                networkPolicy.filter(n1 => n1._id !== updatedRecord.networkPolicy._id).map((n1, i) => {
                                                    return (
                                                        <option key={i + 1} value={n1._id}>{n1.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <textarea rows="2" id="role" name="role" defaultValue={updatedRecord.role.join(';')}
                                            ref={register({ required: true })} className="form-control" />
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button className="btn btn-primary"
                                                type="submit">Submit</button>
                                            <button type="button" className="btn btn-danger"
                                                onClick={() => handleCancel()}>Cancel</button>
                                        </div>

                                    </td>
                                </tr>
                            ) : (
                                    <tr></tr>
                                )
                        }
                    </tbody>
                </table>
            </form>
            <div style={{ marginLeft: '30em' }}>
                <Button className="createCluster mb-2" variant="warning" onClick={() => setShow(true)}>
                    Create Cluster</Button>
            </div>
            <Modal show={show} onHide={() => { setShow(false) }} size="lg" dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <ClusterForm1 handleClose={handleClose} Dcs={Dcs} envs={envs} />
                </Modal.Body>
            </Modal>
        </ >

    )
}
export default DcList