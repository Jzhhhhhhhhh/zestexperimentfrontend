import React, { Component } from 'react'

import { HashRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';



function Welcome(){
    return<div style={{height:"100%"}}>
        <p style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px"}}>

        </p>
        <h1 style={{paddingTop:'200px',fontSize:"44px"}}align="center">
            Welcom to a ZEST Experiment
        </h1>
        <p align="center">
            <Link to="/admin">
                <button style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}}>
                    Start
                </button>
            </Link>

        </p>
        <p align="center">
            <Link to="/">
                <button style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}}>
                    About ZEST
                </button>
            </Link>

        </p>
        <p style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"11rem",borderRadius:"32px"}}>

        </p>

    </div>
}

export default Welcome
