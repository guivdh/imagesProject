import {ENV_API_URL} from "@env";

export const uploadImageAPI = async (image: string) => {
    let body = new FormData();
    body.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/png'
    });

    return await fetch(ENV_API_URL + '/images/upload', {
        method: 'POST',
        body: body
    });
}
