import React, { useRef, useEffect } from 'react'
import './App.css'

import { Router, Link, Route, NavLink } from 'react-router-dom'
import { createHashHistory } from 'history'
import CPP1 from './Components/Pages/CP1/cpp1'
import Admin from './Components/Pages/CP1/admin'

import Register from "./Components/Register/Register";
import Login from "./Components/Login/login";
import { connect } from "react-redux";
import { startRemoveUser } from './actions/user'

function App(props) {
  const history = createHashHistory()
  const handleLogout = () => {
    props.dispatch(startRemoveUser());
    history.push('/login')
  }
  

  // to hide Tools tag when login or register URL
  useEffect(
    () => {
      if ((history.location.pathname === "/login") || (history.location.pathname === "/register")) {
        if (Object.keys(props.user).length !== 0) {
          if (history.location.pathname)
            history.push('/cp1')
        }
        hideTools.current.style.display = "none"
      }
      return (() => {
        console.log('')
      })
    }, [history, props]
  )

  const hideTools = useRef('')  //ref for Tools Div Tag

  //Checking Whether User login or not
  const handleCheck = () => {
    if (Object.keys(props.user).length === 0) {
      setTimeout(() => {
        hideTools.current.style.display = 'none'
        history.push('/login')
      }, 1000)
    }
  }

  return (
    <Router history={history}>
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light py-4" style={{ boxShadow: '0 0.1rem 0.4rem rgba(0, 0, 0, 0.15)', backgroundColor: '#f4f4f4' }}>
          <a className="navbar-brand" href="#logo">LOGO</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <NavLink to="/cp1" activeClassName="active1" className="navlink" style={{ color: 'black' }} onClick={handleCheck}>CP1</NavLink>
              <NavLink to="/cp2" activeClassName="active1" className="navlink" style={{ color: 'black' }} onClick={handleCheck}>CP2</NavLink>
              <NavLink to="/cp3" activeClassName="active1" style={{ color: 'black' }} className="navlink" onClick={handleCheck}>CP3</NavLink>
              {
                (Object.keys(props.user).length !== 0 ? props.user.username === "admin" ? (
                  <NavLink to="/admin" activeClassName="active1" style={{ color: 'black' }} className="navlink" >Admin</NavLink>
                ) : (<NavLink to=""></NavLink>) : (<NavLink to=""></NavLink>)
                )
              }
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
                      <Link to="/login"><button className="btn btn-primary" onClick={() => hideTools.current.style.display = 'none'}>
                        Login</button></Link>
                    </li>
                  </ul>
                ))
            }
          </div >
        </nav >
        {
          (Object.keys(props.user).length !== 0 ? (
            <span></span>
          ) : (<div className="row justify-content-center align-items-center" style={{ width: '100%' }} ref={hideTools}>
            <div className="container">
              <table style={{ marginTop: '8em' }}>
                <tbody>
                  <tr>
                    <td>
                      <span style={{ marginLeft: '8em', fontSize: '4em' }}>Tools</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div >
          </div >)
          )
        }
      </React.Fragment >
      {(Object.keys(props.user).length !== 0 ?
        (
          <>
            <Route path="/cp1" component={CPP1} />
            <Route path="/admin" component={Admin} />

          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </>
        )
      )
      }
    </Router >

  );
}
const mapStatetoProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStatetoProps)(App);
