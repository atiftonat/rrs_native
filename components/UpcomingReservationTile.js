import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

function UpcomingReservationTile(props){  
    const reservation = props.reservation;
    const [isExpanded, setisExpanded] = useState(props.isExpanded);

    const toggleTile = () => {
        if(isExpanded){
            setisExpanded(false);
            return;
        }
        setisExpanded(true);
    };
    
    if(isExpanded){
        return(
            <View style={styles.containerExpanded} onStartShouldSetResponder={() => toggleTile()}>
                <Text>Expanded: {reservation.date} {reservation.time}</Text>
                <Text>{reservation.type}</Text>
            </View>
        );
    }
    return(
        <View style={styles.containerCollapsed} onStartShouldSetResponder={() => toggleTile()}>
            <Text>Collapsed: {reservation.date} {reservation.time}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerExpanded: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 10,
      marginHorizontal: 10
    },
    containerCollapsed: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10
      }
});

export { UpcomingReservationTile };