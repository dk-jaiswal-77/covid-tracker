// css
import "./dashboard.css";

// hooks & others
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// actions
import getDataAction from "../../redux/getData/action";

export default function Dashboard(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDataAction());
    }, []);

    return (
        <div>
            dashboard
        </div>
    );
}