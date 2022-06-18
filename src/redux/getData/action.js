import updateDataAction from "../updateData/action"

export default function getDataAction(){
    return async (dispatch)=>{
        try{
            // fetch data from external api
            let res = await fetch("https://api.covid19api.com/summary");
            let res_data = await res.json();

            // update store
            dispatch(updateDataAction(res_data));
        }catch(error){
            console.log(error);
        }
    }
}