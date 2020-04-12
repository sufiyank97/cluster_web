import React, { useState, useEffect, useRef } from 'react'
import './admin.css'
import { Nav, Modal } from 'react-bootstrap'
import axios from '../../../config/axios'
export const AdminForm = () => {
    const [host, getHostName] = useState([])
    const [show, getShow] = useState(false)
    const [fakeId, getId] = useState('')

    const inpp = useRef('')


    console.log(host)
    const getData = async () => {
        console.log('ddsf')
        const res = await axios.get('/admin/hostname')
        try {

            getHostName(res.data)
        } catch (err) {
            window.alert(err)
        }
    }

    useEffect(
        () => {
            getData()
        }, []
    )
    const handleClose = (id, dc) => {

        const updateData = async (id, dc) => {
            var data = { dc: dc, hostName: inpp.current.value }

            const res = await axios.put(`/admin/hostname/${id}`, data)
            try {
                console.log(res.data)

            } catch (err) {
                window.alert(err)
            }
        }
        getShow(false)
        updateData(id, dc)
        getHostName([])
        getData()
        console.log(inpp.current.value)

    }
    const handleShow = (id) => {

        getId(id)
        getShow(true)

    }


    return (
        <>
            {host.map(h1 => {
                return (
                    <React.Fragment key={h1._id}>
                        <div>
                            <h2 style={{ marginLeft: '-22em', marginTop: '1em' }}>{h1.dc.toUpperCase()}</h2>
                            <hr style={{
                                width: '12%',
                                marginLeft: '1em', borderColor: '#ebc354'
                            }} />
                        </div>
                        <div className="row justify-content-center align_items-center">
                            <div className="form-group row">
                                <label htmlFor={h1.hostName} >Host Name:</label>
                                <div className="col-sm-2">
                                    <input type="text" id={h1.hostName} name="hostName" defaultValue={h1.hostName}
                                        className="form-control" />
                                </div>
                                <div className="col-sm-6">
                                    <button class="bbb btn btn-primary" onClick={() => { handleShow(h1._id) }}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })

            }

            {/* <div className="row justify-content-center">
                <button style={{ marginLeft: '-9em' }} className="btn btn-primary" >Submit</button>
            </div> */}
            <Modal show={show} onHide={() => { getShow(false) }} dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {
                        host.map(h1 => {

                            if (h1._id === fakeId) {
                                return (
                                    <React.Fragment key={h1._id}>
                                        <div className="form-group row justify-content-center" style={{
                                            marginLeft: '-11em',
                                            marginTop: '1em'
                                        }}>
                                            <label htmlFor="projectName" >Project Name:</label>
                                            <div className="col-sm-2">
                                                <input type="text" name="pro" defaultValue={h1.hostName}
                                                    className="form-control" ref={inpp} />
                                            </div>
                                        </div>
                                        <div style={{
                                            marginLeft: '12em',
                                            marginTop: '4em'
                                        }}>
                                            <button className="btn btn-primary" onClick={() => handleClose(h1._id, h1.dc)}>close</button>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        })
                    }

                </Modal.Body>
            </Modal>

        </>
    )
}
const Admin = () => {
    return (
        <div className="container">
            <div class="row d-flex justify-content-center" style={{ marginTop: '8em' }}>
                <div class="col-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">CP1</a>
                        <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">CP2</a>
                        <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">CP3</a>

                    </div>
                </div>
                <div class="col-9">
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><AdminForm /></div>
                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">sdaskldadkasjnd</div>
                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Admin

