import React from 'react'
import DcList from './DcList'
import './cp1.css'

const CP1 = () => {

    // List of DC1 and DC2 [development and production]
    return (
        <div id="cp1">
            <div id="dc1" >
                <h4 style={{ paddingTop: '2em' }}>DC1</h4>
                <div className="container">
                    {/* Call Dc1 Development Table Data */}
                    <h4>Development</h4>
                    <DcList Dcs="dc1" envs="development" />
                    {/* Call Dc1 Production Table Data */}
                    <h4>Production</h4>
                    <DcList Dcs="dc1" envs="production" />
                </div>
            </div >

            <div id="dc2">
                <h4 style={{ paddingTop: '2em' }}>DC2</h4>
                <div className="container">
                    {/* Call Dc2 Development Table Data */}
                    <h4>Development</h4>
                    <DcList Dcs="dc2" envs="development" />
                    {/* Call Dc2 Prodcution Table Data */}
                    <h4>Production</h4>
                    <DcList Dcs="dc2" envs="production" />
                </div>
            </div>
        </div >
    )
}
export default CP1