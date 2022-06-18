import { useSelector } from "react-redux";
import { useState, useRef } from "react";

// css
import "./countries.css";

import { BsSearch } from "react-icons/bs";


export default function Countries() {

    const countries_from_store = useSelector(state => state.data.Countries) || [];

    const [countries, setCountries] = useState(countries_from_store.slice(0, 15));

    //---------------------search----------------------------->
    const [searchMatchedCountries, setSearchMatchedCountries] = useState("");

    const [search, setSearch] = useState({
        search_for: ""
    });

    const timeout_id = useRef(null);

    function searchDebouncer(e){
        if(timeout_id.current)
        {
            clearInterval(timeout_id.current);
        }
        timeout_id.current = setTimeout(()=>{
            // logic to find matching countries
            if(search.search_for.trim() === "")
            {
                setSearchMatchedCountries("");
                e.target.parentElement.lastElementChild.style.display = "none";
            }
            else
            {
                const matchedCountries = countries_from_store.filter(country => {
                    let country_name = country.Country.toLowerCase();
                    return country_name.includes(search.search_for.trim().toLowerCase());
                })
                setSearchMatchedCountries(matchedCountries);

                // positioning the searched countries container
                let width = e.target.parentElement.offsetWidth;
                let height = e.target.parentElement.offsetHeight;
                let btn_width = e.target.nextSibling.offsetWidth;
    
                const searchMatchedCountries_div = e.target.parentElement.lastElementChild;
                searchMatchedCountries_div.style.top = `${height}px`;
                searchMatchedCountries_div.style.width = `${width-btn_width}px`;

                // making searched countries container visible
                e.target.parentElement.lastElementChild.style.display = "flex"; 
            }
        }, 700);
    }

    function handleSearch(e) {
        console.log("change");
        setSearch({ ...search, [e.target.id]: e.target.value });
        searchDebouncer(e);
    }

    // -------------------pagination-------------------------------->
    const page = useRef(1);

    function handlePagination(value){
        page.current = page.current + value;
        let skip_count = (page.current - 1) * 15;
        setCountries(countries_from_store.slice(skip_count, skip_count+15));
    }

    return (
        <div className="countriesPage_container">

            <div className="search_filter_row">
                <div className="countries_list_title_container" onClick={()=>{
                    handlePagination(0);
                }}>
                    Countries List
                </div>

                <div className="search_container">
                    <input type="text" id="search_for" className="input_entry" value={search.search_for} onChange={handleSearch} />

                    <button className="btn_1">
                        < BsSearch className="search_logo" />
                    </button>

                    {
                        (searchMatchedCountries === "")
                        ? <div className="searchMatchedCountries"></div>
                        : (searchMatchedCountries.length === 0) 
                        ? <div className="searchMatchedCountries">
                            <span className="searchMatchedCountry">No result found!</span>
                        </div>
                        : <div className="searchMatchedCountries">
                            {searchMatchedCountries.map((country) => {
                                return (
                                    <span key={country.ID} className="searchMatchedCountry" onClick={(e)=>{
                                        setCountries([country]);
                                        e.target.parentElement.style.display = "none";
                                    }}>
                                        {country.Country}
                                    </span>
                                );
                            })}
                        </div>
                    }
                </div>

                <div className="countries_count_container btn_1">
                    <span>Count :</span>
                    <span>{countries_from_store.length}</span>
                </div>
            </div>

            <div className="list_head single_data">
                <span className="country_name">Country Name</span>
                <span className="confirmed_cases">Confirmed Cases</span>
                <span className="recovered_cases">Recovered Cases</span>
                <span className="deceased_cases">Deceased Cases</span>
            </div>

            <div className="countries">
                {countries.map(country => {
                    return (
                        <div key={country.ID} className="single_data">
                            <span>{country.Country}</span>
                            <span>{country.TotalConfirmed}</span>
                            <span>{country.TotalRecovered}</span>
                            <span>{country.TotalDeaths}</span>
                        </div>
                    );
                })}
            </div>

            <div className="pagination">
                <button className="btn_1" onClick={()=>{
                    if(page.current > 1)
                    {
                        handlePagination(-1);
                    }
                }}>Prev</button>

                <button className="btn_1" onClick={()=>{
                    if(page.current < Math.ceil(countries_from_store.length / 15))
                    {
                        handlePagination(1);
                    }
                }} >Next</button>
            </div>

        </div>
    );
}