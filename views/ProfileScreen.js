import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { fetchApi } from '../services'
import { UpcomingReservationTile } from '../components'
import { ScrollView } from 'react-native-web';

function ProfileScreen({ navigation, route }) {
    const [reservations, setReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState(null);
    const [upcomingReservations, setUpcomingReservations] = useState(null);
    const AuthContext = fetchApi.authentication.context;
    const { jwt, setJwt } = useContext(AuthContext);
    const [ selectedUpcomingTileIndex, setSelectedUpcomingTileIndex ] = useState(0);
    // const { email } = route.params;

    const dummyUpcoming = [
        {
        date: "2022-12-12", 
        time: "9:00 AM",
        type: "Breakfast"
        },
        {
            date: "2022-12-12", 
            time: "1:00 PM",
            type: "Lunch"
        },
        {
            date: "2022-12-12", 
            time: "5:00 PM",
            type: "Dinner"
        }
    ];

    useEffect(() => {
        //Since restaurant opened
        //Refer to res SPA for acceptable date format
        // fetchApi.reservations.getAll(email, jwt)
        //     .then(response => {
        //         if(response.status === 403){
        //             //Forbidden member screen (admin, employee)
        //             console.log("403: Account not member");
        //         }
        //         // console.log(response);
        //         // setReservations(response); //SORT IN ENDPOINT
        //     });
        setReservations(dummyUpcoming);
    }, []);

    useEffect(() => {
        setUpcomingReservations(reservations.map((r,i) =>  
        <UpcomingReservationTile 
            key = {`upcomingRes${i}`}
            reservation = {r} 
            isExpanded = {i == selectedUpcomingTileIndex ? true : false} 
            setSelectedUpcomingTileIndex = {() => setSelectedUpcomingTileIndex(i)}
        />));
    }, [reservations]);

    return(
        <SafeAreaView>
            <Text>Profile Screen</Text>
            {upcomingReservations}
        </SafeAreaView>
    );
}

export { ProfileScreen };