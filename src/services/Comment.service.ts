import {REACT_APP_API_URL} from "@env";

export const addCommentAPI = async (publicationId: string, comment: string) => {
    return await fetch(REACT_APP_API_URL + '/comments', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            publicationId,
            comment,
            userId: 'aaaa-bbbb-cccc'
        })
    });
}

export const getCommentsByPublicationAPI = async (publicationId: string) => {
    return await fetch(REACT_APP_API_URL + '/comments/publication/' + publicationId);
}
