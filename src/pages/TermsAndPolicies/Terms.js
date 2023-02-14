import React, { Component } from 'react'
import Welcome from "../HomePage/Welcome";
import { HashRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';



const Terms = () =>  {
    return<div >
        <h1 style={{margin:"20px", paddingTop:"40px", fontSize:"44px"}}>
            Terms and Policies</h1>
        <div style={{margin:"120px"}}>
            <b>Overview</b>
            <p style={{align:"justify"}}>
                The following are the terms of an agreement between you and IBM. By accessing,
                or using this Web site, you acknowledge that you have read, understand,
                and agree to be bound by these terms and to comply with all applicable laws and regulations,
                including export and re-export control laws and regulations. If you do not agree to these terms,
                please do not use this Web site.</p>
            <p>
                IBM may, without notice to you, at any time,
                revise these Terms of Use and any other information contained in this Web site.
                IBM may also make improvements or changes in the products,
                services, or programs described in this site at any time without notice</p>
            <b>General</b>
            <p>
                This Web site contains proprietary notices and copyright information,
                the terms of which must be observed and followed.
                Please see the tab entitled “Copyright and trademark information” for related information.</p>
            <p>
                IBM grants you a non-exclusive, non-transferable,
                limited permission to access and display the Web pages within this site as a customer
                or potential customer of IBM provided you comply with these Terms of Use, and all copyright,
                trademark, and other proprietary notices remain intact.
                You may only use a crawler to crawl this Web site as permitted by this Web site’s robots.txt protocol,
                and IBM may block any crawlers in its sole discretion.
                The use authorized under this agreement is non-commercial in nature
                (e.g., you may not sell the content you access on or through this Web site.)
                All other use of this site is prohibited.</p>
            <b>Business relationships</b>
            <p>
                This Web site may provide links or references to non-IBM Web sites and resources.
                IBM makes no representations, warranties, or other commitments or endorsements whatsoever about
                any non-IBM Web sites or third-party resources (including any Lenovo Web site) that may be referenced,
                accessible from, or linked to any IBM site. In addition,
                IBM is not a party to or responsible for any transactions you may enter into with third parties,
                even if you learn of such parties (or use a link to such parties) from an IBM site.
                When you access a non-IBM Web site, even one that may contain the IBM-logo,
                please understand that it is independent from IBM, and that IBM does not control the content on that Web site.
                It is up to you to take precautions to protect yourself from viruses, worms, Trojan horses,
                and other potentially destructive programs, and to protect your information.</p>
            <b>Data handling policy</b>
            <div style={{paddingTop:"40px"}}align="center">
                <Link to="/#">
                    <button  id="continue" style={{background:"#5561FF",color:"#FFFFFF",width:"160px",height:"50px",borderRadius:"8px"}}>
                        Agree and Continue
                    </button>
                </Link>
            </div>
        </div>
    </div>

}

export default Terms