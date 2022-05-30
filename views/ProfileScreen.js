import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { fetchApi } from '../services'
import { ReservationTile } from '../components'

function ProfileScreen({ navigation, route }) {
    const [reservations, setReservations] = useState(null);
    const [pastReservations, setPastReservations] = useState(null);
    const [upcomingReservations, setUpcomingReservations] = useState(null);
    const AuthContext = fetchApi.authentication.context;
    const { jwt, setJwt } = useContext(AuthContext);
    const { email } = route.params;

    useEffect(() => {
        //Since restaurant opened
        //Refer to res SPA for acceptable date format
        fetchApi.reservations.getAll(email, jwt)
            .then(response => {
                if(response.status === 403){
                    //Forbidden member screen (admin, employee)
                    console.log("403: Account not member");
                }
                console.log(response);
                setReservations(response);
            });
    }, []);

    return(
        <SafeAreaView>
            <Text>Profile Screen</Text>
        </SafeAreaView>
    );
}

export { ProfileScreen };