// hooks 
import { useState } from "react";
import {useNavigate} from "react-router-dom";

// react-icons
import {BiWorld} from "react-icons/bi";
import {BsPeopleFill} from "react-icons/bs";
import {AiFillCaretDown} from "react-icons/ai";

// logo
import navbar_company_logo from "../../assets/ken42_logo.svg"; 

// css
import "./navbar.css";

export default function Navbar(){

    const user = JSON.parse(localStorage.getItem("ken42_user"));

    const [selected, setSelected] = useState("dashboard");    

    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <div className="navbar_left">
                <img src={navbar_company_logo} alt="navbar company logo" className="navbar_company_logo" />
            </div>

            <div className="navbar_mid">
                <div className={(selected === "dashboard") ? "navbar_option selected_option" : "navbar_option"} id="dashboard" onClick={() => {
                    setSelected("dashboard");
                    navigate("/main/dashboard");
                }} >
                    < BsPeopleFill className="navbar_option_icon" />
                    <span>Dashboard</span>
                </div>

                <div className={(selected === "countries") ? "navbar_option selected_option" : "navbar_option"} id="event" onClick={() => {
                    setSelected("countries");
                    navigate("/main/countries");
                }} >
                    < BiWorld className="navbar_option_icon" />
                    <span>Countries</span>
                </div>
            </div>

            <div className="navbar_right">
                <span className="navbar_email">{user.email}</span>
                < AiFillCaretDown />
            </div>

        </nav>
    );
}