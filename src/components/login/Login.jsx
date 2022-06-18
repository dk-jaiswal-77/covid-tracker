// methods & hooks
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// css
import "./login.css";

// assets
import company_logo from "../../assets/ken42_logo.svg";

// url
const {backend_url} = require("../../url/url");


export default function Login(){

    const [error, setError] = useState(null);
    const [entry, setEntry] = useState(
        {
            email : "", 
            password : "", 
            remember_me : false
        }
    );

    const navigate = useNavigate();

    function handleChange (e){
        if(e.target.type === "checkbox")
        {
            setEntry({...entry, [e.target.id] : e.target.checked});
        }
        else
        {
            setEntry({...entry, [e.target.id] : e.target.value});
        }
    }

    async function loginUser () {
        try{
            const res = await fetch(`${backend_url}/login`, {
                method : "POST", 
                body : JSON.stringify(entry),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            const res_data = await res.json();

            if(res_data.success)
            {
                // login successful
                // store user && token in local storage
                localStorage.setItem("ken42_user", JSON.stringify(res_data.user));
                localStorage.setItem("ken42_token", JSON.stringify(res_data.token));

                // navigate to dashboard
                return navigate("/main/dashboard");
            }
            // login unsuccessful
            setError(res_data.msg);
        }catch(error){
            console.log(error);
            setError(error.message);    
        }
    }

    return (
        <div className="loginPage">
            <div className="form_container">    

                <img src={company_logo} alt="company logo" className="loginPage_company_logo" />

                <h2 className="loginPage_company_logo_text">
                    Covid-Tracker
                </h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    loginUser();
                }}>
                    <div className="flex_direction_column">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="input_entry" value={entry.email} onChange={handleChange} />
                    </div>

                    <div className="flex_direction_column">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="input_entry" value={entry.password} onChange={handleChange} />
                    </div>

                    {
                        (error === null) 
                            ? 
                                "" 
                            : 
                                <div className="error_container">{error}</div>
                    }

                    <div className="flex_direction_row">
                        <input type="checkbox" id="remember_me" checked={entry.remember_me} onChange={handleChange} />
                        <label htmlFor="remember_me">Remember me</label>
                    </div>

                    <div className="flex_direction_row forgot_password_and_submit_option">
                        <Link to={"#"} className="anchor">Forgot your password?</Link>
                        <input type="submit" value="LOG IN" className="btn_1" />
                    </div>
                </form>

            </div>
        </div>
    );
}