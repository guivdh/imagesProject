import {REACT_APP_API_URL} from "@env";

export const getPublicationsAPI = async () => {
    return await fetch(REACT_APP_API_URL + '/publications');
}

export const getPublicationsByEstablishmentIdAPI = async (id: string) => {
    return await fetch(REACT_APP_API_URL + '/publications/establishment/' + id);
}

export const getOnePublicationAPI = async (id: string) => {
    return await fetch(REACT_APP_API_URL + '/publications/' + id);
}

export const addPublicationAPI = async (publication: any) => {
    let body = new FormData();
    body.append('publication', {
        uri: publication.image,
        name: 'photo.jpg',
        type: 'image/png'
    });
    body.append('dishName', publication.dishName);
    body.append('description', publication.description);
    body.append('dishType', publication.dishType);
    body.append('establishmentId', publication.establishmentId);
    body.append('presentation', publication.rating.presentation);
    body.append('price', publication.rating.price);
    body.append('quantity', publication.rating.quantity);
    body.append('taste', publication.rating.taste);
    body.append('ratingDescription', publication.rating.description);
    return await fetch(REACT_APP_API_URL + '/publications', {
        method: 'POST',
        body: body
    });
}
