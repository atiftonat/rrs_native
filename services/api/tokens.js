let baseUrl = "https://localhost:7271/api/tokens";

const getJWT = async (email, password) => {
    return await fetch(`${baseUrl}`)
        .then(response => response.json());
};

export { getJWT }; 