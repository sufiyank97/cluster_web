import React, { useState, useEffect } from 'react'
import './home.css'
import { useForm } from 'react-hook-form'
import { , Link, Route, NavLink } from 'react-router-dom'

import CPP1 from './Pages/CP1/cpp1'
import Admin from './Pages/CP1/admin'

import Register from "./Register/Register";
import Login from "./Login/login";
import { connect } from "react-redux";
import { startRemoveUser } from '../actions/user'
const Home = (props) => {

    const handleLogout = () => {
        props.dispatch(startRemoveUser());
        // history.push('/login')
    }
    console.log(props)
    console.log(history)
    return (
        <Router history={browserHistory}>

            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light py-4" style={{ boxShadow: '0 0.1rem 0.4rem rgba(0, 0, 0, 0.15)', backgroundColor: '#f4f4f4' }}>
                    <a className="navbar-brand" href="#">LOGO</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">

                            <NavLink to="/cp1" activeClassName="active1" className="navlink">CP1</NavLink>
                            <NavLink to="/cp2" activeClassName="active1" className="navlink">CP2</NavLink>
                            <NavLink to="/cp3" activeClassName="active1" className="navlink">CP3</NavLink>
                            <NavLink to="/admin" activeClassName="active1" className="navlink">Admin</NavLink>

                        </div>
                        {
                            (Object.keys(props.user).length !== 0 ? (
                                <ul className="navbar-nav ml-auto nav-flex-icons">
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
                                    </li>
                                </ul>
                            ) : (
                                    <ul className="navbar-nav ml-auto nav-flex-icons">
                                        <li className="nav-item">
                                            <Link to="/login"><button className="btn btn-primary" >
                                                Login</button></Link>
                                        </li>
                                    </ul>
                                ))
                        }
                    </div >
                </nav >
                <div className="row justify-content-center align-items-center">
                    <div className="container">
                        <table style={{ marginTop: '8em' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>Tools</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div >
                </div >
            </React.Fragment >
            <Route path="/cp1" component={CPP1} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Router >
    )
}
const mapStatetoProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStatetoProps)(Home)

{/* <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" centered>
                    <Modal.Header closeButton>
                        <h3 style={{ marginLeft: '6.2em' }}>Login</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Login handleClose={handleClose} />
                    </Modal.Body>
                </Modal>
                <Modal show={show} onHide={handleClose1} dialogClassName="modal-90w" centered>
                    <Modal.Header closeButton>
                        <h3 style={{ marginLeft: '6.2em' }}>Register</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Register />
                    </Modal.Body>
                </Modal> */}
{/* <div className="row justify-content-center mb-3">
                            <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>LOGIN</h5>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group row">
                                    <label htmlFor="userName" >User Name:</label>
                                    <div className="col-sm-4">
                                        <input type="text" id="userName" name="userName"
                                            ref={register({ required: true })} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="pwd" >Password:</label>
                                    <div className="col-sm-4">
                                        <input type="password" id="pwd" name="pwd" style={{ marginLeft: '0.9em' }}
                                            ref={register({ required: true })} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Button type="submit" variant="warning" style={{ borderRadius: '25px', width: '40%', margin: 'auto' }}>Submit</Button>
                                </div>
                            </form>
                        </div> */}