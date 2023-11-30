import { Link } from "react-router-dom";
import sampleLogo from "../../images/Logo.png";
import "./Navbar.css";

export default function Navbar () {
    return (
        <div className="navbar-container">
            <img className="logo-navbar" src={sampleLogo} alt="logo"/>
            <div className="app-title">
                <h2 className="heading-title">Thrive Sync</h2>
                <p className="subtitle-p">Your personal health app</p>
            </div>
            <ul className="navbar-list">
                <li>
                    <Link to="/" className="navbar-item">Register new activity</Link>
                </li>
                <li >
                    <Link to="/profile" className="navbar-item">My profile</Link>
                </li>
            </ul>
        </div>
    )
}