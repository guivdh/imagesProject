import {REACT_APP_API_URL} from "@env";

export const likeAPI = async (publicationId: string) => {
    return await fetch(REACT_APP_API_URL + '/likes/like', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            publicationId,
            userId: 'aaaa-bbbb-cccc'
        })
    });
}