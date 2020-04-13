import React, { useState, useEffect, useRef } from 'react'
import './admin.css'
import { Modal } from 'react-bootstrap'
import axios from '../../../config/axios'
export const AdminForm = () => {
    const [host, getHostName] = useState([])
    const [show, getShow] = useState(false)
    const [fakeId, getId] = useState('')

    const inpp = useRef('')


    //hostData get API
    const getData = async () => {

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
    //update the record
    const handleClose = (id, dc) => {

        const updateData = async (id, dc) => {
            var data = { dc: dc, hostName: inpp.current.value }

            const res = await axios.put(`/admin/hostname/${id}`, data)
            try {
                if (res.data) {
                    getHostName([])
                    getData()
                }
            } catch (err) {
                window.alert(err)
            }
        }
        updateData(id, dc)
        getShow(false)
    }
    //show the modal box
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
                            <h2 style={{ marginLeft: '1em', marginTop: '1em', color: 'black' }}>{h1.dc.toUpperCase()}</h2>
                            <hr style={{
                                width: '12%',
                                marginLeft: '1em', borderColor: '#ebc354'
                            }} />
                        </div>
                        <div className="row justify-content-center align_items-center">
                            <div className="form-group row">
                                <label htmlFor={h1.hostName} style={{ color: 'black' }}>Host Name:</label>
                                <div className="col-sm-2">
                                    <input type="text" id={h1.hostName} name="hostName" defaultValue={h1.hostName}
                                        className="form-control" style={{ width: '10em' }} />
                                </div>
                                <div className="col-sm-6">
                                    <button className="bbb btn btn-primary" onClick={() => { handleShow(h1._id) }} style={{ marginTop: '0em' }}> Edit</button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })

            }


            <Modal show={show} onHide={() => { getShow(false) }} dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {
                        host.filter(f1 =>
                            f1._id === fakeId
                        ).map(h1 => {
                            return (
                                <React.Fragment key={h1._id}>
                                    <div className="form-group row justify-content-center" style={{
                                        marginLeft: '-11em',
                                        marginTop: '1em'
                                    }}>
                                        <label htmlFor="projectName" >Project Name:</label>
                                        <div className="col-sm-2">
                                            <input type="text" name="pro" defaultValue={h1.hostName}
                                                className="form-control" ref={inpp} style={{ width: '10em' }} />
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
            <div className="row d-flex justify-content-center" style={{ marginTop: '8em' }}>
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link admm active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">CP1</a>
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

