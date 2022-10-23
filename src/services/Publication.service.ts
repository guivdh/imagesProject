export const getPublicationsAPI = async () => {
    return await fetch('http://192.168.1.5:3001/publications');
}