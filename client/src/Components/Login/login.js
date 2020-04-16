import React, { useState, useEffect } from "react";
import { startSetUser } from "../../actions/user";
import { connect } from "react-redux";
import { useForm } from 'react-hook-form'

import { Modal } from 'react-bootstrap'
import './login.css'
const Login = (props) => {
    const [show, setShow] = useState(false)
    const { handleSubmit, register } = useForm({})
    useEffect(
        () => {
            setShow(true)
        }, []
    )
    // Submit the Login Data to Redux Action
    const onSubmit = (data) => {
        props.dispatch(startSetUser(data))
        setShow(false)
        props.history.push("/");

    }
    return (
        <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" centered>
            <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                <h3 style={{ marginTop: '0em', marginLeft: '7em' }}>Login</h3>
            </Modal.Header>
            <Modal.Body>
                <div className="row h-100 justify-content-center align-items-center" style={{ width: '100%' }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: '3em' }}>
                        <div className="form-group">
                            <label>
                                Email
              <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    ref={register({ required: true })}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Password
              <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    ref={register({ required: true })}
                                />
                            </label>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="submit" style={{ marginLeft: '3em' }} className="btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div >
            </Modal.Body>
        </Modal >
    );

}
export default connect()(Login);
