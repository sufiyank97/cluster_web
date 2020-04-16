import React, { useState, useEffect, useRef, Fragment } from 'react'
import './admin.css'
import { Modal } from 'react-bootstrap'
import axios from '../../../config/axios'
export const AdminForm = () => {

    const [show, getShow] = useState(false)
    const [fakeId, getId] = useState('')
    const [Dc1, getDc1] = useState([])
    const [Dc2, getDc2] = useState([])
    const [dcsData, getDcsData] = useState([])
    const host = useRef('')
    const certi = useRef('')

    // get the Admin Host and certificate Data
    const getData = async () => {

        const res = await axios.get('/platform/v1/deploy')
        try {
            getDcsData(res.data)
            const dc1 = res.data.filter(f1 => f1.dc === "dc1")
            const dc2 = res.data.filter(f1 => f1.dc === "dc2")
            getDc1(dc1)
            getDc2(dc2)
        } catch (err) {
            window.alert(err)
        }
    }

    useEffect(
        () => {
            getData()
        }, []
    )
    //update the Host and certificate record
    const handleClose = (id) => {

        const updateData = async (id) => {

            var data = { hostName: host.current.value, certificate: certi.current.value }

            const res = await axios.put(`/platform/v1/deploy/${id}`, data)
            try {
                if (res.data) {
                    getDcsData([])
                    getDc1([])
                    getDc2([])
                    getData()

                }
            } catch (err) {
                window.alert(err)
            }
        }
        updateData(id)
        getShow(false)
    }

    //show the modal box when person click Edit Button
    const handleShow = (id, name) => {
        getId(id)
        getShow(true)
    }

    return (
        <Fragment>
            <div>
                <div>
                    <h1>DC1</h1>
                    {
                        Dc1.map((d1, i) => {
                            return (
                                <Fragment key={d1._id}>
                                    <div>
                                        <h2 style={{ marginLeft: '1em', marginTop: '1em', marginBottom: '1em' }}><span emstyle={{ borderBottom: '1px solid green' }}>{d1.env.toUpperCase()}</span></h2>
                                    </div>
                                    <div className="col justify-content-center align_items-center">
                                        <div className="form-group row" style={{ marginLeft: '8em' }}>
                                            <label htmlFor={d1.dc + d1.env + i} style={{ color: 'black' }}>Host Name:</label>
                                            <div className="col-sm-8">
                                                <input type="text" id={d1.dc + d1.env + i} readOnly name="hostName" defaultValue={d1.hostName}
                                                    className="form-control" style={{ width: '20em' }} />
                                            </div>

                                        </div>
                                        <br />
                                        <div className="form-group row" style={{ marginLeft: '8em' }}>
                                            <label htmlFor={d1.dc + d1.env + i + 1} style={{ color: 'black' }}>Certificate:</label>
                                            <div className="col-sm-8" style={{ marginLeft: '0.7em' }}>
                                                <textarea row="2" id={d1.dc + d1.env + i + 1} readOnly name="certificate" defaultValue={d1.certificate}
                                                    className="form-control" style={{ width: '20em' }} />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <button className="bbb btn btn-primary" onClick={() => { handleShow(d1._id, 'dc1') }} style={{ marginTop: '1em', marginLeft: '24em' }}> Edit</button>
                                        </div>
                                    </div>

                                </Fragment>
                            )
                        })
                    }
                </div>
                <div>
                    <h1>DC2</h1>
                    {
                        Dc2.map((d1, i) => {
                            return (
                                <Fragment key={d1._id}>
                                    <div>
                                        <h2 style={{ marginLeft: '1em', marginTop: '1em', marginBottom: '1em' }}><span emstyle={{ borderBottom: '1px solid green' }}>{d1.env.toUpperCase()}</span></h2>
                                    </div>
                                    <div className="col justify-content-center align_items-center">
                                        <div className="form-group row" style={{ marginLeft: '8em' }}>
                                            <label htmlFor={d1.dc + d1.env + i} style={{ color: 'black' }}>Host Name:</label>
                                            <div className="col-sm-8">
                                                <input type="text" id={d1.dc + d1.env + i} readOnly name="hostName" defaultValue={d1.hostName}
                                                    className="form-control" style={{ width: '20em' }} />
                                            </div>

                                        </div>
                                        <br />
                                        <div className="form-group row" style={{ marginLeft: '8em' }}>
                                            <label htmlFor={d1.dc + d1.env + i + 1} style={{ color: 'black' }}>Certificate:</label>
                                            <div className="col-sm-8" style={{ marginLeft: '0.7em' }}>
                                                <textarea row="2" id={d1.dc + d1.env + i + 1} readOnly name="certificate" defaultValue={d1.certificate}
                                                    className="form-control" style={{ width: '20em' }} />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <button className="bbb btn btn-primary" onClick={() => { handleShow(d1._id, 'dc1') }} style={{ marginTop: '1em', marginLeft: '24em' }}> Edit</button>
                                        </div>
                                    </div>

                                </Fragment>
                            )
                        })
                    }
                </div>

                <Modal show={show} onHide={() => { getShow(false) }} dialogClassName="modal-90w" centered>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        {

                            dcsData.filter(d1 => d1._id === fakeId).map(d1 => {

                                return (
                                    <Fragment key={d1._id}>
                                        <div className="col justify-content-center align_items-center">
                                            <div className="form-group row" >
                                                <label style={{ color: 'black' }}>Host Name:</label>
                                                <div className="col-sm-2">
                                                    <input type="text" name="hostName" defaultValue={d1.hostName}
                                                        ref={host}
                                                        className="form-control" style={{ width: '18em' }} />
                                                </div>
                                            </div>

                                            <div className="form-group row" >
                                                <label style={{ color: 'black' }}>Certificate:</label>
                                                <div className="col-sm-2" style={{ marginLeft: '0.7em' }}>
                                                    <textarea row="2" name="certificate" defaultValue={d1.certificate}
                                                        ref={certi}
                                                        className="form-control" style={{ width: '18em' }} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button className="bbb btn btn-primary" onClick={() => { handleClose(d1._id) }} style={{ marginTop: '1em', marginLeft: '12em' }}> Submit</button>
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </Modal.Body>
                </Modal>

            </div>
        </Fragment>
    )
}
const Admin = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center" style={{ marginTop: '8em' }}>
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link admm active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" style={{ backgroundColor: '#ebc354' }}>CP1</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">CP2</a>
                        <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">CP3</a>

                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show admm active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" ><AdminForm /></div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">sdaskldadkasjnd</div>
                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Admin

