// css
import "./main.css";

// hooks & others
import {Routes, Route} from "react-router-dom";

// importing components
import Navbar from "../navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";
import Countries from "../countries/Countries";

export default function Main(){
    return (
        <div>
            < Navbar />
            <Routes>
                < Route path="dashboard" element={< Dashboard />} />
                < Route path="countries" element={< Countries />} />
            </Routes>
        </div>
    );
}