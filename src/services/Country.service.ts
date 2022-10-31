import {REACT_APP_API_URL} from "@env";

export const getCountriesFromApi = async () => {
    return await fetch(REACT_APP_API_URL + '/countries');
};
