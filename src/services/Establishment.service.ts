export const getEstablishmentsAPI = async () => {
    return await fetch('http://192.168.1.5:3001/establishments');
}
export const addEstablishmentAPI = async (establishment: any) => {
    return await fetch('http://192.168.1.5:3001/establishments', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(establishment)
    });
}