import { useEffect, useState, useContext } from 'react';
import { View , StyleSheet, ScrollView, Text, Dimensions} from 'react-native';
import { fetchApi } from '../services'
import { UpcomingReservationTile, PastReservationTile } from '../components'


function ProfileScreen({ navigation, route }) {
    const [reservationsUpcomingData, setReservationsUpcomingData] = useState([]);
    const [reservationsPastData, setReservationsPastData] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const AuthContext = fetchApi.authentication.context;
    const { jwt, setJwt } = useContext(AuthContext);
    const [ selectedUpcomingTileIndex, setSelectedUpcomingTileIndex ] = useState();
    const { email } = route.params;

    useEffect(() => {
        fetchApi.reservations.getAll(email, jwt)
            .then(response => {
                if(response.status === 403){
                    //Forbidden member screen (admin, employee)
                    console.log("403: Account not member");
                }
                setSelectedUpcomingTileIndex(response?.upcoming[0]?.referenceNo);
                setReservationsUpcomingData(response.upcoming);
                setReservationsPastData(response.past);
            });
    }, []);

    useEffect(() => {      
        setUpcomingReservations(reservationsUpcomingData.map((r, i) =>
            <UpcomingReservationTile 
                key = {`${r.referenceNo}`}
                reservation = {r}
                isExpanded = {+r.referenceNo == selectedUpcomingTileIndex}
                setSelected = {()=>setSelectedUpcomingTileIndex(+r.referenceNo==selectedUpcomingTileIndex?'':r.referenceNo)}
                index = {i}
                length = {reservationsUpcomingData.length}
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
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{paddingVertical: 20}}>
                <View style={[styles.collapsed, styles.size, {borderWidth:0}]}>
                    <Text style={[styles.headerText, {fontSize: 27, color: '#323230'}]}>Upcoming</Text>
                </View>
                <View style={styles.size}>
                    {upcomingReservations}
                </View>
            </View>
            <View>
                <View style={[styles.collapsed, styles.size, {borderWidth:0}]}>
                    <Text style={[styles.headerText, {fontSize: 27, color: '#3d3b3a'}]}>Past</Text>
                </View>
                <View style={[styles.size, {paddingBottom: 20}]}>
                    {pastReservations}  
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        backgroundColor: '#DEF5E7',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    upcColour: {
        backgroundColor: '#323230'
    },
    pstColour: {
        backgroundColor: '#3d3b3a'
    },
    size: {
        height: 'auto',
        borderRadius: 4,
        width: '80vw'
    },
    expanded: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        margin: 2.5
    },
    first: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    last: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    collapsed: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        margin: 2.5
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'latoBold',
        fontSize: 18,
        letterSpacing: '.15em'
    },
    bodyText: {
        color: 'white',
        flex: 2,
        fontFamily: 'latoThin',
        fontSize: 18
    },
    tinyLogo: {
        width: 50,
        height: 50,
        // shadowColor: 'black',
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.5
    }
});

export { ProfileScreen };