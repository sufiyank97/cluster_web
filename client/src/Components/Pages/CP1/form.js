import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './form.css'

const ClusterForm = ({ id, name, handleClose, conn }) => {
    const initialState = {
        projectName: '',
        clusterName: '',
        fdn: '',
        planName: '',
        networkPolicy: '',
        status: '',
        id: '',
        date: ''
    };

    const [data, getData] = useState(initialState)
    const { handleSubmit, register } = useForm()
    useEffect(
        () => {
            const getRecord = async () => {

                if (name === "dc1dev") {

                    const res = await axios.get(`http://localhost:4000/dev/${id}`)
                    try {

                        getData(res.data)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc2dev") {

                    const res = await axios.get(`http://localhost:4000/dev/${id}`)
                    try {
                        getData(res.data)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc1prod") {

                    const res = await axios.get(`http://localhost:4000/prod/${id}`)
                    try {
                        getData(res.data)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc2prod") {

                    const res = await axios.get(`http://localhost:4000/prod/${id}`)
                    try {
                        getData(res.data)
                    } catch (err) {
                        window.alert(err)
                    }
                }
            }
            if (id) {
                getRecord()
            } else {
                console.log('CREATE')
            }

        }, [id, name]
    )

    const onSubmit = (data1, e) => {

        if (id) {
            var date1 = data.date
            data1.date = date1

            const updateData = async () => {
                if (name === "dc1dev") {
                    data1.dc1Id = 1
                    const res = await axios.put(`http://localhost:4000/dev/${id}`, data1)
                    try {

                        handleClose();
                        getData(initialState)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc2dev") {
                    data1.dc2Id = 1
                    const res = await axios.put(`http://localhost:4000/dev/${id}`, data1)
                    try {

                        handleClose();
                        getData(initialState)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc1prod") {
                    data1.dc1Id = 1
                    const res = await axios.put(`http://localhost:4000/prod/${id}`, data1)
                    try {

                        handleClose();
                        getData(initialState)
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (name === "dc2prod") {
                    data1.dc2Id = 1
                    const res = await axios.put(`http://localhost:4000/prod/${id}`, data1)
                    try {

                        handleClose();
                        getData(initialState)
                    } catch (err) {
                        window.alert(err)
                    }
                }
            }

            updateData();


        }
        else {

            const addData = async () => {
                var date = new Date()
                var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(), fullDate = day + '/' + month + '/' + year
                data1.date = fullDate
                let [dc1dev, len] = conn.split(':')

                data1.id = Number(len) + 1
                data1.status = "inprogress"
                if (dc1dev === "dc1dev") {
                    data1.dc1Id = 1
                    const res = await axios.post(`http://localhost:4000/dev`, data1)
                    try {

                        handleClose();
                    } catch (err) {
                        window.alert(err)
                    }
                } else if (dc1dev === "dc2dev") {
                    data1.dc2Id = 1
                    const res = await axios.post(`http://localhost:4000/dev`, data1)
                    try {

                        handleClose();
                    } catch (err) {
                        window.alert(err)
                    }

                } else if (dc1dev === "dc1prod") {
                    data1.dc1Id = 1
                    const res = await axios.post(`http://localhost:4000/prod`, data1)
                    try {

                        handleClose();
                    } catch (err) {
                        window.alert(err)
                    }

                } else if (dc1dev === "dc2prod") {
                    data1.dc2Id = 1
                    const res = await axios.post(`http://localhost:4000/prod`, data1)
                    try {

                        handleClose();
                    } catch (err) {
                        window.alert(err)
                    }
                }
            }
            addData()

        }

    };

    return (
        <React.Fragment>
            {(id) ? (
                <div className="row justify-content-center mb-3">
                    <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>Update For CP1</h5>
                </div>
            ) : (
                    <div className="row justify-content-center mb-3">
                        <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>Create Cluster For CP1</h5>
                    </div >
                )}

            <div className="row justify-content-center align-items-center">
                <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group row">
                        <label htmlFor="projectName" >Project Name:</label>
                        <div className="col-sm-4">
                            <input type="text" id="projectName" name="projectName"
                                ref={register} defaultValue={data.projectName} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="clusterName" >Cluster Name:</label>
                        <div className="col-sm-4">
                            <input type="text" id="clusterName" name="clusterName"
                                ref={register({ required: true })} defaultValue={data.clusterName} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="fdn" >FDN:</label>
                        <div className="col-sm-4" style={{ marginLeft: '65px' }}>
                            <input type="text" id="fdn" name="fdn"
                                ref={register} defaultValue={data.fdn} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="planName" >Plan Name:</label>
                        <div className="col-sm-4" style={{ marginLeft: '18px' }}>
                            <select id="planName" name="planName"
                                ref={register} defaultValue={data.planName} className="form-control">
                                {(data.planName) ? (
                                    <option value={data.planName}>{data.planName}</option>
                                ) : (
                                        <>
                                            <option value="">Choose...</option>
                                            <option value="data1">data1</option>
                                        </>
                                    )}

                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="networkPolicy" >Network Policy:</label>
                        <div className="col-sm-4" style={{ marginLeft: '-8px' }}>
                            <select id="networkPolicy" name="networkPolicy"
                                ref={register} defaultValue={data.networkPolicy} className="form-control">
                                {(data.networkPolicy) ? (
                                    <option value={data.networkPolicy}>{data.networkPolicy}</option>
                                ) : (
                                        <>
                                            <option value="">Choose...</option>
                                            <option value="data1">data1</option>
                                        </>
                                    )}
                            </select>
                        </div>
                    </div>
                    {
                        (data.status) ? (
                            <div className="form-group row">
                                <label htmlFor="status" >Status:</label>
                                <div className="col-sm-4" style={{ marginLeft: '53px' }}>
                                    <select id="status" name="status"
                                        ref={register} defaultValue={data.status} className="form-control">
                                        {(data.status === "inprogress") ? (
                                            <>
                                                <option value={data.status}>{data.status}</option>
                                                <option value="completed">completed</option>
                                            </>
                                        ) : (
                                                <>
                                                    <option value={data.status}>{data.status}</option>
                                                    <option value="inprogress">inprogress</option>
                                                </>
                                            )}
                                    </select>
                                </div>
                            </div>
                        ) : (
                                <span></span>
                            )
                    }
                    <div className="form-group row">
                        <Button type="submit" variant="warning" style={{ borderRadius: '25px', width: '40%', margin: 'auto' }}>Submit</Button>
                    </div>
                </form>
            </div>
        </React.Fragment >
    )
}
export default ClusterForm