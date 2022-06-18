export default function updateDataReducer(data={}, {type, payload}){
    switch(type){
        case "UPDATE_DATA":
            return payload;
        default:
            return data;
    }
}