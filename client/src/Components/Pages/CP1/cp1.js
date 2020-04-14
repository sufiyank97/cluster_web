import React from 'react'
import DcList from './DcList'
import './cp1.css'

const CP1 = () => {


    return (
        <div id="cp1">
            <div id="dc1" >
                <h4 style={{ paddingTop: '2em' }}>DC1</h4>
                <div className="container">
                    <h4>Development</h4>
                    <DcList Dcs="dc1" envs="development" />
                    <h4>Production</h4>
                    <DcList Dcs="dc1" envs="production" />
                </div>
            </div >

            <div id="dc2">
                <h4 style={{ paddingTop: '2em' }}>DC2</h4>
                <div className="container">
                    <h4>Development</h4>
                    <DcList Dcs="dc2" envs="development" />
                    <h4>Production</h4>
                    <DcList Dcs="dc2" envs="production" />
                </div>
            </div>
        </div >
    )
}
export default CP1