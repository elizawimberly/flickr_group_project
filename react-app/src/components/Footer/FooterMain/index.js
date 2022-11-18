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
                <a href="https://www.flickr.com/help/privacy" className="footerText">Privacy</a>
                <a href="https://www.flickr.com/help/terms" className="footerText">Terms</a>
                <a href="https://www.flickr.com/help/cookies" className="footerText">Sitemap</a>
            </div>

            <div className="footer-middle">
                <span className="footerText">Flare. Connecting people through photography.</span>
            </div>

            <div className="footer-right">
                <a href="https://github.com/elizawimberly/flickr_group_project" className="footerText" id="footer-logo-container">
                    <img src={githubLogo} id="footer-logo"></img>
                    {/* <i class="fa-brands fa-github" className="footerText"></i> */}
                    {/* <i class="fa-brands fa-square-github" className="footerText"></i> */}
                </a>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default FooterMain
