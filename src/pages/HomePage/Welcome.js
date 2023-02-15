import React, { Component } from 'react'

import { HashRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';



function Welcome(){
    return<div style={{height:'100vh', position:"relative"}}>
        <div style={{background:"#F6D420",height:"80px",marginLeft:"160px",borderRadius:"32px",position:"absolute",top:'0',right:'0',clear:"both", width:"70%"}}></div>
        <h1 style={{paddingTop:'40vh',fontSize:"44px"}}align="center">
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
            <Link to="/adminLanding">
                <button style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}}>
                    About ZEST
                </button>
            </Link>

        </p>
        <div style={{background:"#F6D420",height:"80px",marginRight:"160px",marginTop:"11rem",borderRadius:"32px",position:"absolute",bottom:'0',left:'0',clear:"both", width:"70%"}}></div>

    </div>
}

export default Welcome
