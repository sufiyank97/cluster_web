import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from '../../../config/axios'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import './form.css'

import Cookies from 'js-cookie'
import FontAwesome from 'react-fontawesome'



const ClusterForm1 = ({ handleClose, Dcs, envs, history, id }) => {
    const [planName, getPlanName] = useState([])
    const [networkPolicy, getNetworkPolicy] = useState([])
    const { handleSubmit, register } = useForm()
    const [dcData, getDcData] = useState([])
    const [updatedRecord, getUpdated] = useState({})
    const [count, setCount] = useState(0)
    // get planName and networkPolicies Data in the Form  with dc1 and dc2

    useEffect(
        () => {


            const updateData = async () => {
                const res = await axios.get(`/platform/v1/cluster_list/${id}`, {
                    headers: {
                        "x-auth": Cookies.get('token')
                    }
                })

                const res1 = await axios.get('/platform/v1/plan_name')
                const res2 = await axios.get('/platform/v1/network_policy')
                const res3 = await axios.get('/platform/v1/deploy')
                try {
                    if (id) {
                        getUpdated(res.data)
                        setCount(Number(res.data.noOfNodes))
                    }
                    getPlanName(res1.data)
                    getNetworkPolicy(res2.data)
                    getDcData(res3.data)
                } catch (err) {

                    if (Cookies.get('token')) {
                        swal('Error!', err.toString(), 'error')
                    } else {
                        history.push('/login')
                    }
                }
            }
            updateData()

        }, [id, history]
    )

    // Add a Cluster for development and Production
    const onSubmit = (data1) => {
        if (id) {

            updatedRecord.networkPolicy = data1.networkPolicy
            updatedRecord.status = "updated"
            updatedRecord.noOfNodes = String(data1.noOfNodes)
            // Put api for Update Cluster record
            const updateFunction = async () => {
                const res = await axios.put(`/platform/v1/cluster_list/${updatedRecord._id}`, updatedRecord, {
                    headers: {
                        "x-auth": Cookies.get('token')
                    }
                })

                try {
                    if (res.error) {
                        swal('error', res.error.toString(), 'error')
                    } else {
                        handleClose()
                        getUpdated({})
                    }
                } catch (err) {
                    if (Cookies.get('token')) {
                        swal('Error!', err.toString(), 'error')
                    } else {
                        history.push('/login')
                    }
                }
            }
            updateFunction()
        } else {
            data1.role.split(';').filter(f1 => f1 !== "")
            delete data1.dcName
            delete data1.env
            dcData.forEach(d1 => {
                if (d1.dc === Dcs && d1.env === envs) {
                    return data1.dcData = d1._id
                }
            })
            data1.noOfNodes = String(data1.noOfNodes)
            console.log(data1)
            // Add Cluster Record Function
            const addData = async () => {

                const res = await axios.post(`/platform/v1/cluster_list`, data1, {
                    headers: {
                        "x-auth": Cookies.get('token')
                    }
                })
                try {
                    if (res.error) {
                        swal('error', res.error.toString(), 'error')
                    } else {
                        handleClose()
                    }
                } catch (err) {
                    if (Cookies.get('token')) {
                        swal('Error!', err.toString(), 'error')
                    } else {
                        history.push('/login')
                    }
                }
            }
            addData()

        }
    }

    return (
        <React.Fragment>

            <div className="row justify-content-center mb-3">
                <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>Create Cluster For CP1</h5>
            </div >


            <div className="row justify-content-center">
                <form className="form col-md-8" onSubmit={handleSubmit(onSubmit)}>

                    {
                        (id) ? (
                            <span></span>
                        ) : (
                                <>
                                    <div className="form-group row">
                                        <label htmlFor="dcName" >DC Name:</label>
                                        <div className="col-sm-9" style={{ marginLeft: '31px' }}>
                                            <input type="text" id="dcName" name="dcName" readOnly
                                                ref={register({ required: true })} value={Dcs} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="env" >Env Name:</label>
                                        <div className="col-sm-9" style={{ marginLeft: '27px' }}>
                                            <input type="text" id="env" name="env" readOnly
                                                ref={register({ required: true })} value={envs} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="clusterName" >Cluster Name:</label>
                                        <div className="col-sm-9">
                                            <input type="text" id="clusterName" name="clusterName"
                                                ref={register({ required: true })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="fdn" >FDN:</label>
                                        <div className="col-sm-9" style={{ marginLeft: '65px' }}>
                                            <input type="text" id="fdn" name="fdn"
                                                ref={register({ required: true })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="planName" >Plan Name:</label>
                                        <div className="col-sm-9" style={{ marginLeft: '18px' }}>
                                            <select id="planName" name="planName"
                                                ref={register({ required: true })} className="form-control">
                                                <option value="">Choose...</option>
                                                {
                                                    planName.map((p1, i) => {
                                                        return (
                                                            <option key={i + 1} value={p1._id}>{p1.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )
                    }

                    <div className="form-group row">
                        <label htmlFor="networkPolicy" >Network Policy:</label>
                        <div className="col-sm-9" style={{ marginLeft: '-8px' }}>
                            <select id="networkPolicy" name="networkPolicy" defaultValue={(updatedRecord.networkPolicy) ? updatedRecord.networkPolicy.name : ''}
                                ref={register({ required: true })} className="form-control">
                                {
                                    (updatedRecord.networkPolicy) ? (
                                        <option value={updatedRecord.networkPolicy._id}>{updatedRecord.networkPolicy.name}</option>
                                    ) : (
                                            <option value="">Choose...</option>
                                        )
                                }
                                {
                                    (updatedRecord.networkPolicy) ?
                                        networkPolicy.filter(n1 => n1._id !== updatedRecord.networkPolicy._id).map((n1, i) => {
                                            return (
                                                <option key={i + 1} value={n1._id}>{n1.name}</option>
                                            )
                                        }) : networkPolicy.map((n1, i) => {
                                            return (
                                                <option key={i + 1} value={n1._id}>{n1.name}</option>
                                            )
                                        })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="noOfNodes" >No Of Nodes:</label>
                        <div className="col-sm-3">
                            <input type="number" id="noOfNodes" name="noOfNodes" value={count}
                                ref={register({ required: true })} onChange={(e) => setCount(Number(e.target.value))}

                                className="form-control" />
                        </div>
                        <div className="col-sm-2">
                            <FontAwesome className="fas fa-plus-square" size="2x" type="button"
                                onClick={() => setCount(count + 1)} name="increment" />
                        </div>
                        <div className="col-sm-2">
                            <FontAwesome className="fas fa-minus-square" size="2x" type="button" onClick={() => setCount(count - 1)} name="decrement" />
                        </div>
                    </div>
                    {/* {
                        (updatedRecord._id ? (
                            <div className="form-group row">
                                <label htmlFor="status" >Status:</label>
                                <div className="col-sm-9">
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
                                </div>
                            </div>
                        ) : (<span></span>
                            ))
                    } */}

                    {
                        (id) ? (
                            <span></span>
                        ) : (
                                <div className="form-group row">
                                    <label htmlFor="dcName" >Role:</label>
                                    <div className="col-sm-9" style={{ marginLeft: '65px' }}>
                                        <textarea rows="2" id="role" name="role"
                                            ref={register} className="form-control" />
                                    </div>
                                </div>
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
export default ClusterForm1