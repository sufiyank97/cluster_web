import React, { useState, useEffect } from "react";
import { startSetUser } from "../../actions/user";
import { connect } from "react-redux";
import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap'
import './login.css'

import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
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
        // props.history.push("/");
    };
    const responseFacebook = (response) => {
        console.log(response);
    }
    const componentClicked = data => {
        console.log(data)
    }
    return (
        <>
            <div>

                <button className="btn btn-primary" onClick={() => setShow(true)}>
                    Login</button>
            </div>
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
                            {/* <div className="row">
                                <div className="col" style={{ paddingTop: '20px' }}>
                                    <FacebookLogin
                                        appId="289600912204604"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        onClick={componentClicked}
                                        callback={responseFacebook} />
                                </div>
                            </div> */}
                        </form>
                    </div >
                </Modal.Body>
            </Modal >
        </>
    );

}
export default connect()(Login);
