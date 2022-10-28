export const uploadImageAPI = async (image: string) => {
    let body = new FormData();
    body.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/png'
    });

    return await fetch('http://10.0.0.2:3000/images/upload', {
        method: 'POST',
        body: body
    });
}
