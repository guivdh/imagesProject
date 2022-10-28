export const getEstablishmentsAPI = async () => {
    return await fetch('http://10.0.0.2:3000/establishments');
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
    return await fetch('http://10.0.0.2:3000/establishments/upload', {
        method: 'POST',
        body: body
    });
}
