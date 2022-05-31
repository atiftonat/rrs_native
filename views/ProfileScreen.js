import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { fetchApi } from '../services'
import { UpcomingReservationTile, PastReservationTile } from '../components'
import { ScrollView } from 'react-native-web';

function ProfileScreen({ navigation, route }) {
    const [reservationsUpcomingData, setReservationsUpcomingData] = useState([]);
    const [reservationsPastData, setReservationsPastData] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState(null);
    const AuthContext = fetchApi.authentication.context;
    const { jwt, setJwt } = useContext(AuthContext);
    const [ selectedUpcomingTileIndex, setSelectedUpcomingTileIndex ] = useState(6);
    const [selectedUpcomingTile]
    // const { email } = route.params;

    const dummyUpcoming = [
        {
        date: "2022-12-12", 
        time: "9:00 AM",
        type: "Breakfast",
        Id: "6"
        },
        {
            date: "2022-12-12", 
            time: "1:00 PM",
            type: "Lunch",
            Id: "5"
        },
        {
            date: "2022-12-12", 
            time: "5:00 PM",
            type: "Dinner",
            Id: "4"
        }
    ];
    const dummyPast = [
        {
            date: "2022-03-20", 
            time: "9:00 AM",
            type: "Breakfast",
            Id: "3"
        },
        {
            date: "2022-03-20", 
            time: "1:00 PM",
            type: "Lunch",
            Id: "2"
        },
        {
            date: "2022-03-20", 
            time: "5:00 PM",
            type: "Dinner",
            Id: "1"
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
        setReservationsUpcomingData(dummyUpcoming);
        setReservationsPastData(dummyPast);
    }, []);

    useEffect(() => {      
        setUpcomingReservations(reservationsUpcomingData.map((r,i) =>  
        <UpcomingReservationTile 
            key = {`upcomingRes${r.Id}`}
            reservation = {r}
            isExpanded = {r.id==selectedUpcomingTileIndex}
            setSelected = {()=>setSelectedUpcomingTileIndex(r.Id)}

        />));
    }, [reservationsUpcomingData, selectedUpcomingTileIndex, upcomingReservations]);

    useEffect(() => {      
        setPastReservations(reservationsPastData.map((r,i) =>  
        <PastReservationTile 
            key = {`pastRes${r.Id}`}
            reservation = {r}
        />));
    }, [reservationsPastData, pastReservations]);

    return(
        <SafeAreaView>
            <Text>Profile Screen</Text>
            {upcomingReservations}
            <Text><br /></Text>
            {pastReservations}
        </SafeAreaView>
    );
}

export { ProfileScreen };