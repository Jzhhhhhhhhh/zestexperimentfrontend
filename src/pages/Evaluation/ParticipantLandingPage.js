import React, {useState} from "react"
import Evaluation from "./evaluation";
import Terms from "../TermsAndPolicies";
import {Link} from "react-router-dom";



export default function ParticipantLandingPage(){
    const handleClick = () =>{
        setAgreed(true);
        return null;
    }
    const [agreed, setAgreed] = useState(false)
    let href = window.location.href
    let href_split_length = href.split("/").length;
    let invitation_id = href.split("/")[href_split_length - 1];
    let mode = href.split("/")[href_split_length - 2];
    return(
        <div>
            {
                agreed === true &&
                <div><Evaluation mode={mode} iniviation_id={invitation_id}></Evaluation></div>
            }
            {
                agreed === false && <div>
                <Terms></Terms>
                <div style={{paddingTop:"40px"}}align="center">
                        <button  id="continue" style={{background:"#5561FF",color:"#FFFFFF",width:"160px",
                            height:"50px",borderRadius:"8px"}} onClick={handleClick()}>
                            Agree and Continue
                        </button>
                </div>
                </div>
            }
        </div>
    )
}