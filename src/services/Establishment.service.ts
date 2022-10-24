export const getEstablishmentsAPI = async () => {
    return await fetch('http://10.0.0.2:3001/establishments');
}
export const addEstablishmentAPI = async (establishment: any) => {
    const fileName = establishment.image.split('/').pop();
    const fileType = fileName.split('.').pop();
    const formData = new FormData();
    formData.append('file', {
        uri: establishment.image,
        name: fileName,
        type: `image/${fileType}`
    });

    return await fetch('http://10.0.0.2:3001/establishments/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
