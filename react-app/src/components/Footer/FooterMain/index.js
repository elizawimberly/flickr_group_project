/******************************** IMPORTS ********************************/
// libraries
import React from "react";
// local files
import githubLogo from "../../../assets/social-media-branding/github-logo.png"
import "./FooterMain.css";


/******************************* COMPONENT *******************************/
function FooterMain() {

    /**************** render component *****************/
    return (
        <div className="FooterMain-container">
            <div className="footer-left">
                {/* <span className="footerText">Connect: </span> */}
                <a href="https://www.linkedin.com/in/eliza-wimberly-773896205/" className="footerText">Eliza</a>
                <a href="https://www.linkedin.com/in/justin-rife-730875181/" className="footerText">Justin</a>
                <a href="https://www.linkedin.com/in/kevinlongboy/" className="footerText">Kevin</a>
                <a href="https://www.linkedin.com/in/yasamine-cruz-7b6867256/" className="footerText">Yas</a>
            </div>

            <div className="footer-middle">
                <span className="footerText">Flare. Connecting people through photography.</span>
            </div>

            <div className="footer-right">
                <a href="https://github.com/elizawimberly/flickr_group_project" className="footerText" id="footer-logo-container">
                    <img src={githubLogo} alt='logo' id="footer-logo"></img>
                    {/* <i class="fa-brands fa-github" className="footerText"></i> */}
                    {/* <i class="fa-brands fa-square-github" className="footerText"></i> */}
                </a>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default FooterMain
