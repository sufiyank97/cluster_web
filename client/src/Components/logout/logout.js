import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { startRemoveUser } from "../../actions/user";

function Logout(props) {
    props.dispatch(startRemoveUser());
    return <Redirect to="/login" />;
}

export default connect()(Logout);
