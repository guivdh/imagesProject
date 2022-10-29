import {ENV_API_URL} from "@env"

export const getEstablishmentsAPI = async () => {
    return await fetch(ENV_API_URL + '/establishments');
}

export const getLightEstablishmentsAPI = async () => {
    return await fetch(ENV_API_URL + '/establishments/light');
}

export const getEstablishmentByIdAPI = async (id: string) => {
    return await fetch(ENV_API_URL + '/establishments/' + id);
}
export const addEstablishmentAPI = async (establishment: any) => {
    let body = new FormData();
    body.append('establishment', {
        uri: establishment.image,
        name: 'photo.jpg',
        type: 'image/png'
    });
    //Object.assign(body, establishment);
    body.append('name', establishment.name);
    body.append('description', establishment.description);
    body.append('street', establishment.street);
    body.append('country', establishment.country);
    let jsonData = {
        'file':{
            uri: establishment.image,
            name: 'photo.jpg',
            type: 'image/png'
        },
        'contentDisposition': establishment
    }
    return await fetch(ENV_API_URL + '/establishments/upload', {
        method: 'POST',
        body: body
    });
}
