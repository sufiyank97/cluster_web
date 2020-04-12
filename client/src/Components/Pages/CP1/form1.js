import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from '../../../config/axios'
import { useForm } from 'react-hook-form'

import './form.css'



const ClusterForm1 = ({ id, handleClose, Dcs, envs }) => {
    const [data, getData] = useState({})
    const [planName, getPlanName] = useState([])
    const [networkPolicy, getNetworkPolicy] = useState([])
    const { handleSubmit, register } = useForm()
    const [clusters, getCluster] = useState([])
    useEffect(
        () => {
            const updateData = async () => {
                const res = await axios.get(`/platform/v1/deploy/${id}`)
                const res1 = await axios.get('/platform/v1/plan_name')
                const res2 = await axios.get('/platform/v1/network_policy')
                const res3 = await axios.get(`/platform/v1/cluster_list`)
                try {
                    console.log('nnnnnnnnnnnnnnnnnnnnnnnn')
                    console.log(res)
                    console.log(res1)
                    console.log(res2)
                    console.log(res3)
                    getData(res.data)
                    getPlanName(res1.data)
                    getNetworkPolicy(res2.data)
                    getCluster(res3.data)
                } catch (err) {
                    console.log(err)
                }
            }
            console.log('s')
            updateData()
        }, []
    )


    const onSubmit = (data1) => {
        if (id) {
            data1.role = data1.role.split(';')
            const status = data1.cluster
            let clusterData = data.cluster
            data1.cluster = clusterData._id
            clusterData.status = status
            const updateData = async () => {
                const res = await axios.put(`/platform/v1/deploy/${id}`, data1)
                const res1 = await axios.put(`/platform/v1/cluster_list/${clusterData._id}`, clusterData)
                try {
                    handleClose()
                } catch (err) {
                    console.log(err)
                }
            }
            updateData()
        } else {
            data1.role = data1.role.split(';')
            console.log(clusters)
            clusters.map(c1 => {
                if (c1.name === "cs1") {
                    data1.cluster = c1._id
                    // newCluster += c1._id
                }
            })
            console.log(data1)
            const addData = async () => {
                const res = await axios.post(`/platform/v1/deploy`, data1)
                try {
                    console.log(res.data, 'dddddddddddddddd')
                    handleClose()
                } catch (err) {
                    console.log(err)
                }
            }
            addData()
        }
    }
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

            <div className="row justify-content-center">
                <form className="form col-md-8" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group row">
                        <label htmlFor="dcName" >DC Name:</label>
                        <div className="col-sm-4" style={{ marginLeft: '31px' }}>
                            <input type="text" id="dcName" name="dc"
                                ref={register} defaultValue={(data.dc) ? data.cs : Dcs} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="env" >Env Name:</label>
                        <div className="col-sm-4" style={{ marginLeft: '27px' }}>
                            <input type="text" id="env" name="env"
                                ref={register({ required: true })} defaultValue={(data.env) ? data.env : envs} className="form-control" />
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
                            <input type="text" id="fqdn" name="fqdn"
                                ref={register} defaultValue={(data.cluster) ? data.cluster.fqdn : ''} className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="planName" >Plan Name:</label>
                        <div className="col-sm-4" style={{ marginLeft: '18px' }}>
                            <select id="planName" name="planName"
                                ref={register({ required: true })} defaultValue={(data.planName) ? data.planName.name : ''} className="form-control">
                                {(data.planName) ? (
                                    <option value={data.planName._id}>{data.planName.name}</option>
                                ) : (
                                        <>
                                            <option value="">Choose...</option>
                                            {
                                                planName.map((p1, i) => {
                                                    return (
                                                        <option key={i + 1} value={p1._id}>{p1.name}</option>
                                                    )
                                                })
                                            }
                                        </>
                                    )}

                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="networkPolicy" >Network Policy:</label>
                        <div className="col-sm-4" style={{ marginLeft: '-8px' }}>
                            <select id="networkPolicy" name="networkPolicy"
                                ref={register({ required: true })} defaultValue={(data.networkPolicy) ? data.networkPolicy.name : ''} className="form-control">
                                {(data.networkPolicy) ? (
                                    <option value={data.networkPolicy._id}>{data.networkPolicy.name}</option>
                                ) : (
                                        <>
                                            <option value="">Choose...</option>
                                            {
                                                networkPolicy.map((n1, i) => {
                                                    return (
                                                        <option key={i + 1} value={n1._id}>{n1.name}</option>
                                                    )
                                                })
                                            }
                                        </>
                                    )}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="dcName" >Role:</label>
                        <div className="col-sm-4" style={{ marginLeft: '65px' }}>
                            <textarea rows="2" id="role" name="role"
                                ref={register} defaultValue={(data.role) ? data.role.join(';') : ''} className="form-control" />
                        </div>
                    </div>

                    {
                        (data.cluster) ? (
                            <div className="form-group row">
                                <label htmlFor="status" >Status:</label>
                                <div className="col-sm-4" style={{ marginLeft: '53px' }}>
                                    <select id="status" name="cluster"
                                        ref={register} defaultValue={data.cluster.status} className="form-control">
                                        {(data.cluster.status === "inprogress") ? (
                                            <>
                                                <option value={data.cluster.status}>{data.cluster.status}</option>
                                                <option value="completed">completed</option>
                                                <option value="created">created</option>
                                            </>
                                        ) : (data.cluster.status === "created") ? (
                                            <>
                                                <option value={data.cluster.status}>{data.cluster.status}</option>
                                                <option value="completed">completed</option>
                                                <option value="inprogress">inprogress</option>
                                            </>
                                        ) : (
                                                    <>
                                                        <option value={data.cluster.status}>{data.cluster.status}</option>
                                                        <option value="created">created</option>
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
export default ClusterForm1