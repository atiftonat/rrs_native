import { createContext } from 'react';

const context = createContext(null); 

let endpoint = "https://tas122.azurewebsites.net/api/tokens";

const getJWT = async (logInDto) => {
    return await fetch(endpoint, {
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
        return {...response, error:true, status: response.status} ;              
    });
};

export { getJWT, context }; 