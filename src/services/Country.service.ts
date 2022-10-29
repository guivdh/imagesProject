import {ENV_API_URL} from "@env";

export const getCountriesFromApi = async () => {
    return await fetch(ENV_API_URL + '/countries');
};
