import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, View , StyleSheet} from 'react-native';
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
    const [ selectedUpcomingTileIndex, setSelectedUpcomingTileIndex ] = useState();
    // const { email } = route.params;
    const email = "Seed@Person1.com";

    useEffect(() => {
        fetchApi.reservations.getAll(email, jwt)
            .then(response => {
                if(response.status === 403){
                    //Forbidden member screen (admin, employee)
                    console.log("403: Account not member");
                }
                setSelectedUpcomingTileIndex(response.upcoming[0].referenceNo);
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
                styles = {styles}
            />
        ));
    }, [reservationsUpcomingData, selectedUpcomingTileIndex]);

    useEffect(() => {      
        setPastReservations(reservationsPastData.map((r, i) =>
            <PastReservationTile 
                key = {`${r.referenceNo}`}
                reservation = {r} 
                index = {i}
                length = {reservationsPastData.length}
                styles = {styles}
            />
        ));
    }, [reservationsPastData]);

    return(
        <SafeAreaView>
            <View style={styles.container}>
                {upcomingReservations}
            </View>
            
            <View style={styles.container}>
                {pastReservations}  
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    upcExpanded: {
        flex: 2,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    upcFirstExpanded: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 2,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    upcLastExpanded: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        flex: 2,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    upcCollapsed: {
        flex: 1,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    upcFirstCollapsed: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    upcLastCollapsed: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundImage: "linear-gradient(#22c1c3, #2d5efd)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstExpanded: {
        flex: 2,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstFirstExpanded: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flex: 2,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstLastExpanded: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        flex: 2,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstCollapsed: {
        flex: 1,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstFirstCollapsed: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    },
    pstLastCollapsed: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundImage: "linear-gradient(#c5a98e, #ee9144)",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: '100%'
    }
});

export { ProfileScreen };