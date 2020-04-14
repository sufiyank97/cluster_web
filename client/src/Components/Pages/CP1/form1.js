import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import axios from '../../../config/axios'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'
import './form.css'



const ClusterForm1 = ({ handleClose, Dcs, envs }) => {

    const [planName, getPlanName] = useState([])
    const [networkPolicy, getNetworkPolicy] = useState([])
    const { handleSubmit, register } = useForm()
    const [dcData, getDcData] = useState([])
    useEffect(
        () => {
            const updateData = async () => {

                const res1 = await axios.get('/platform/v1/plan_name')
                const res2 = await axios.get('/platform/v1/network_policy')
                const res3 = await axios.get('/platform/v1/deploy')
                try {
                    getPlanName(res1.data)
                    getNetworkPolicy(res2.data)
                    getDcData(res3.data)
                } catch (err) {
                    swal('Error!', err, 'error')
                }
            }
            updateData()
        }, []
    )


    const onSubmit = (data1) => {

        data1.role.split(';').pop()
        delete data1.dcName
        delete data1.env
        dcData.forEach(d1 => {
            if (d1.dc === Dcs && d1.env === envs) {
                return data1.dcData = d1._id
            }
        })
        const addData = async () => {

            const res = await axios.post(`/platform/v1/cluster_list`, data1, {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
            try {
                if (res.error) {
                    swal('error', res.error, 'error')
                }
                handleClose()
            } catch (err) {
                swal('Error!', err, 'error')
            }
        }
        addData()

    }
    return (
        <React.Fragment>

            <div className="row justify-content-center mb-3">
                <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>Create Cluster For CP1</h5>
            </div >


            <div className="row justify-content-center">
                <form className="form col-md-8" onSubmit={handleSubmit(onSubmit)}>

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

                    <div className="form-group row">
                        <label htmlFor="networkPolicy" >Network Policy:</label>
                        <div className="col-sm-9" style={{ marginLeft: '-8px' }}>
                            <select id="networkPolicy" name="networkPolicy"
                                ref={register({ required: true })} className="form-control">
                                <option value="">Choose...</option>
                                {
                                    networkPolicy.map((n1, i) => {
                                        return (
                                            <option key={i + 1} value={n1._id}>{n1.name}</option>
                                        )
                                    })
                                }


                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="dcName" >Role:</label>
                        <div className="col-sm-9" style={{ marginLeft: '65px' }}>
                            <textarea rows="2" id="role" name="role"
                                ref={register} className="form-control" />
                        </div>
                    </div>


                    <div className="form-group row">
                        <Button type="submit" variant="warning" style={{ borderRadius: '25px', width: '40%', margin: 'auto' }}>Submit</Button>
                    </div>
                </form>
            </div>
        </React.Fragment >
    )
}
export default ClusterForm1