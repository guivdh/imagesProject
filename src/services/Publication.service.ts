export const getPublicationsAPI = async () => {
    return await fetch('http://10.0.0.2:3001/publications');
}
