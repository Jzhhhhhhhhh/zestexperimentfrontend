import React, {useState} from "react";
import Terms from "../TermsAndPolicies";
import { HashRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';

export default function AdminLandingPage(){
    return(<div>
        <Terms></Terms>
            <div style={{paddingTop:"40px"}}align="center">
                <Link to="/#">
                    <button  id="continue" style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}}>
                        Agree and Continue
                    </button>
                </Link>
            </div>
    </div>
    )
}