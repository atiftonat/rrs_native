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
    // const { email } = route.params;
    const email = "Seed@Person1.com";

    useEffect(() => {
        fetchApi.reservations.getAll(email, jwt)
            .then(response => {
                if(response.status === 403){
                    //Forbidden member screen (admin, employee)
                    console.log("403: Account not member");
                }
                console.log(response);
                console.log(response.upcoming);
                console.log(response.past);
                setReservationsUpcomingData(response.upcoming);
                setReservationsPastData(response.past);
            });
    }, []);

    useEffect(() => {      
        setUpcomingReservations(reservationsUpcomingData.map((r) =>
            <UpcomingReservationTile 
                key = {`${r.referenceNo}`}
                reservation = {r}
                isExpanded = {+r.referenceNo == selectedUpcomingTileIndex}
                setSelected = {()=>setSelectedUpcomingTileIndex(+r.referenceNo==selectedUpcomingTileIndex?'':r.referenceNo)}
            />
        ));
    }, [reservationsUpcomingData, selectedUpcomingTileIndex]);

    useEffect(() => {      
        setPastReservations(reservationsPastData.map((r, i) =>
            <PastReservationTile 
                key = {`${r.referenceNo}`}
                reservation = {r} 
            />
        ));
    }, [reservationsPastData]);

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