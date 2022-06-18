// css
import "./dashboard.css";

// hooks & others
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// actions
import getDataAction from "../../redux/getData/action";

// components
import CaseCountCard from "../card/caseCountCard/CaseCountCard";

export default function Dashboard(){

    const dispatch = useDispatch();

    // to get data for the first time
    useEffect(()=>{
        dispatch(getDataAction());
    }, []);

    const country_from_store = useSelector(state => state.data.Global) || {
        "NewConfirmed": 0,
        "TotalConfirmed": 0,
        "NewDeaths": 0,
        "TotalDeaths": 0,
        "NewRecovered": 0,
        "TotalRecovered": 0
    };

    const [country, setCountry] = useState(null);

    let displayCountry = (country === null) ? country_from_store : country;
    // console.log(displayCountry);

    return (
        <div>
            <div className="caseCountCards">
                <div className="confirmed_cases similar_cases">
                    <div className="new">
                        <span className="case_title">New Confirmed Cases :</span>
                        <span className="case_data btn_1">{displayCountry.NewConfirmed}</span>
                    </div>

                    <div className="total">
                        <span className="case_title">Total Confirmed Cases :</span>
                        <span className="case_data btn_1">{displayCountry.TotalConfirmed}</span>
                    </div>
                </div>

                <div className="death_cases similar_cases">
                    <div className="new">
                        <span className="case_title">New Death Cases :</span>
                        <span className="case_data btn_1">{displayCountry.NewDeaths}</span>
                    </div>

                    <div className="total">
                        <span className="case_title">Total Death Cases :</span>
                        <span className="case_data btn_1">{displayCountry.TotalDeaths}</span>
                    </div>
                </div>

                <div className="recovered_cases similar_cases">
                    <div className="new">
                        <span className="case_title">New Recovered Cases :</span>
                        <span className="case_data btn_1">{displayCountry.NewRecovered}</span>
                    </div>

                    <div className="total">
                        <span className="case_title">Total Recovered Cases :</span>
                        <span className="case_data btn_1">{displayCountry.TotalRecovered}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}