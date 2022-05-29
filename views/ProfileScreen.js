import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { fetchApi } from '../services'

function ProfileScreen() {
    const [reservations, setReservations] = useState(null);
    const [pastReservations, setPastReservations] = useState(null);
    const [upcomingReservations, setUpcomingReservations] = useState(null);

    useEffect(() => {
        //Since restaurant opened
        //Refer to res SPA for acceptable date format
        fetchApi.reservations.getAny("2022-01-01")
            .then(response => {
                if(response.status === 404){
                    //Forbidden member screen (admin, employee)
                }
                //map through to divide into upcoming & past states or just set to all reservations state
            });
    }, []);

    return(
        <SafeAreaView>
            <Text>Profile Screen</Text>
        </SafeAreaView>
    );
}

export { ProfileScreen };