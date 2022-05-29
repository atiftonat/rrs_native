let baseUrl = "https://localhost:7271/api/tokens";

const getJWT = async (logInDto) => {
    return await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(logInDto)
    })
    .then(response => {     
        if(response.ok){
            return response.json();
        }       
        return {...response, error:true} ;              
    });
};

export { getJWT }; 