import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { fetchApi } from '../services'
import { UpcomingReservationTile, PastReservationTile } from '../components'
import { ScrollView } from 'react-native-web';

function ProfileScreen({ navigation, route }) {
    const [reservationsUpcomingData, setReservationsUpcomingData] = useState([]);
    const [reservationsPastData, setReservationsPastData] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const AuthContext = fetchApi.authentication.context;
    const { jwt, setJwt } = useContext(AuthContext);
    const [ selectedUpcomingTileIndex, setSelectedUpcomingTileIndex ] = useState(6);
    //const [selectedUpcomingTile]
    // const { email } = route.params;
    let search = "2022-03-20";

    const dummyUpcoming = [
        {
            date: "2022-05-31", 
            time: "9:00 AM",
            type: "Breakfast",
            id: "6"
        },
        {
            date: "2022-06-04", 
            time: "1:00 PM",
            type: "Lunch",
            id: "5"
        },
        {
            date: "2022-06-12", 
            time: "5:00 PM",
            type: "Dinner",
            id: "4"
        }
    ];
    const dummyPast = [
        {
            date: "2022-03-21", 
            time: "9:00 AM",
            type: "Breakfast",
            id: "3"
        },
        {
            date: "2022-03-20", 
            time: "1:00 PM",
            type: "Lunch",
            id: "2"
        },
        {
            date: "2022-03-20", 
            time: "5:00 PM",
            type: "Dinner",
            id: "1"
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
        setUpcomingReservations(reservationsUpcomingData.map((r) =>
            <UpcomingReservationTile 
                key = {`upcomingRes${r.id}`}
                reservation = {r}
                isExpanded = {+r.id == selectedUpcomingTileIndex}
                setSelected = {()=>setSelectedUpcomingTileIndex(+r.id==selectedUpcomingTileIndex?'':r.id)}
            />
        ));
    }, [reservationsUpcomingData, selectedUpcomingTileIndex]);

    useEffect(() => {      
        setPastReservations(reservationsPastData.map((r) =>
            <PastReservationTile 
                key = {`pastRes${r.Id}`}
                reservation = {r} 
            />
        ));
    }, [reservationsPastData]);

    ////Only worry about this if we have time (Search functionality)
    // useEffect(() => {      
    //     setPastReservations(reservationsPastData.filter((r)=> r.date==search).map((r) =>
    //         <PastReservationTile 
    //             key = {`pastRes${r.Id}`}
    //             reservation = {r} 
    //         />
    //     ));
    // }, [reservationsPastData]);


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