import React from "react";
import axios from "../../config/axios";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert'
const Register = (props) => {


    const { handleSubmit, register } = useForm({})


    const onSubmit = (data) => {
        if (data.password === data.password2) {
            delete data.password2
            axios
                .post("/users/register", data)
                .then(response => {
                    if (response.data.errors) {

                        swal('Error', response.data.message, 'error')
                    } else {

                        props.history.push("/login");
                    }
                })
                .catch(err => {
                    swal('Error!', err, 'error')
                });
        } else {
            swal('Error!', 'Confirm password does not match with the password you entered.', 'warning')
        }
    }
    return (
        <div className="row h-100 justify-content-center align-items-center" style={{ width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h3 style={{ marginTop: '2em' }}>Register</h3>
                <hr />
                <div className="form-group">
                    <label>
                        Username
              <input
                            type="text"
                            name="username"
                            className="form-control"
                            ref={register({ required: true })}

                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Email
              <input
                            type="text"
                            name="email"
                            className="form-control"
                            ref={register({ required: true })}

                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password
              <input
                            type="password"
                            name="password"
                            className="form-control"
                            ref={register({ required: true })}

                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Confirm Password{" "}
                        <input
                            type="password"
                            name="password2"
                            className="form-control"
                            ref={register({ required: true })}
                        />{" "}
                    </label>
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    );
}

export default Register
