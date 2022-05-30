let endpoint = "https://localhost:7271/api/reservations";

//REQUIRES (obj with following properties): customerNotes, noOfGuests, sittingId, reservationOriginId, firstName, lastName, email, phoneNumber, restaurantId
//API RETURNS: new reservation object that is created (Not currently utilised in this fetch).
const create = async (reservationDto) => {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationDto)
    })
        .then(response => {       
            if(response.ok){
                return response.json();
            }       
            return {...response,error:true} ;              
        });
};

const getAll = async (email, jwt) => {
    return await fetch(`${endpoint}/all/${email}`, {
        method: "GET",
        headers: { 
            "Authorization" : jwt === undefined ? "" : `Bearer ${jwt}`
        }
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return {...response, error:true, status:response.status}
        });
};

const getAny = async (startDate, endDate, jwt) => {
    let startDateIso = new Date(startDate).toISOString();
    if(end === undefined){
        return await fetch(`${endpoint}/any/${startDateIso}`, {
            method: "GET",
            headers: { 
                "Authorization" : jwt === undefined ? "" : `Bearer ${jwt}`
            }
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                return {...response, error:true, status:response.status}
            });
    }
    let endDateIso = new Date(endDate).toISOString();
    return await fetch(`${endpoint}/any/${startDateIso}/${endDateIso}`, {
        method: "GET",
        headers: { 
            "Authorization" : jwt === undefined ? "" : `Bearer ${jwt}`
        }
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            return {...response, error:true, status:response.status}
        });

    //COMINED W/ TERNARY -- Untested
    // let endDateIso = endDate === undefined ? "" : new Date(endDate).toISOString();
    // return await fetch(`${endpoint}/any/${startDateIso}/${endDateIso}`, {
    //     method: "GET",
    //     headers: { 
    //         "Authorization" : jwt === undefined ? "" : `Bearer ${jwt}`
    //     }
    // })
    //     .then(response => {
    //         if(response.ok){
    //             return response.json();
    //         }
    //         return {...response, error:true, status:response.status}
    //     });
};

export { create, getAny, getAll };


//DUMMY DATA BELOW

// FOR postReservation :

// let reservationDto = {
//     noOfGuests: "4",
//     sittingId: 2,
//     reservationOriginId: 1,
//     customerNotes: "",
//     firstName: "Duke",
//     lastName: "Rowly",
//     phoneNumber: "0425259556",
//     email: "dukerowly@gmail.com",
//     restaurantId: 1
//   };