import { View, Text, StyleSheet } from 'react-native'

function UpcomingReservationTile(props){  
    const styles = props.styles;
    const reservation = props.reservation;
    const setSelected = props.setSelected;
    let isExpanded = props.isExpanded;

    if(isExpanded){
        return(
            <View 
            style={props.index == 0 ? styles.upcFirstExpanded : props.index == props.length - 1 ? styles.upcLastExpanded : styles.upcExpanded}
            onStartShouldSetResponder={setSelected}>
                <Text>Expanded: {reservation.date} {reservation.time}</Text>
                <View style={styles.upcBody}>
                    <Text>{reservation.type}</Text>
                </View>
            </View>
        );
    }
    return(
        <View 
        style={props.index == 0 ? styles.upcFirstExpanded : props.index == props.length - 1 ? styles.upcLastExpanded : styles.upcExpanded}
        onStartShouldSetResponder={setSelected}>
            <Text>Collapsed: {reservation.date} {reservation.time}</Text>
        </View>
    );
}

export { UpcomingReservationTile };