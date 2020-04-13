import React from "react";
import { startSetUser } from "../../actions/user";
import { connect } from "react-redux";
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const { handleSubmit, register } = useForm({})

    const onSubmit = (data) => {
        props.dispatch(startSetUser(data))
        props.history.push("/");
    }
    return (
        <div className="row h-100 justify-content-center align-items-center" style={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h3 style={{ marginTop: '2em' }}>Login</h3>
                <hr />
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
                        <input type="submit" className="btn btn-primary" />
                    </div>
                    <div className="col">
                        <Link to="/register" style={{ borderBottom: '3px solid blue' }}>Register</Link>
                    </div>
                </div>

            </form>
        </div >
    );

}
export default connect()(Login);
