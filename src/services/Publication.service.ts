import {ENV_API_URL} from "@env";

export const getPublicationsAPI = async () => {
    return await fetch(ENV_API_URL + '/publications');
}
