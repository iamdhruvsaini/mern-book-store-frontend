import getBaseURL from "./baseURL";

function getImgUrl(name){
    return `${getBaseURL()}/uploads/${name}`;
}
export {getImgUrl};