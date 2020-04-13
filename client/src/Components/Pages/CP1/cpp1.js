import React from 'react'
import CPP2 from './cpp2'
import './cp1.css'

const CPP1 = () => {


    return (
        <div id="cp1">
            <div id="dc1" >
                <h4 style={{ paddingTop: '2em' }}>DC1</h4>
                <div className="container">
                    <h4>Development</h4>
                    <CPP2 Dcs="dc1" envs="development" />
                    <h4>Production</h4>
                    <CPP2 Dcs="dc1" envs="production" />
                </div>
            </div >

            <div id="dc2">
                <h4 style={{ paddingTop: '2em' }}>DC2</h4>
                <div className="container">
                    <h4>Development</h4>
                    <CPP2 Dcs="dc2" envs="development" />
                    <h4>Production</h4>
                    <CPP2 Dcs="dc2" envs="production" />
                </div>
            </div>
        </div >
    )
}
export default CPP1