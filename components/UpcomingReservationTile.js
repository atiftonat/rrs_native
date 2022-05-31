import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

function UpcomingReservationTile(props){  
    const reservation = {
        date: "2022-12-12", 
        time: "9:00 AM",
        type: "Breakfast"
    }; //props.reservation
    const [isExpanded, setisExpanded] = useState(false); //props.isExpanded
    
    if(isExpanded){
        return(
            <View style={styles.containerExpanded}>
                <Text>Expanded: {reservation.date} {reservation.time}</Text>
                <Text>{reservation.type}</Text>
            </View>
        );
    }
    return(
        <View style={styles.containerCollapsed}>
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
    },
    containerCollapsed: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
});

export { UpcomingReservationTile };