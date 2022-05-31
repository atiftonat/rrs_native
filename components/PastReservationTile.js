import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

function PastReservationTile (props){
    const styles = props.styles;
    const reservation = props.reservation;
    const [isExpanded, setisExpanded] = useState(false); //not expanding, review prop

    const toggleTile = () => {
        if(isExpanded){
            setisExpanded(false);
            return;
        }
        setisExpanded(true);
    };
    
    if(isExpanded){
        return(
            <View 
            //Round corners of 1st & last res
            style={props.index == 0 ? styles.pstFirstExpanded : props.index == props.length - 1 ? styles.pstLastExpanded : styles.pstExpanded} 
            onStartShouldSetResponder={() => toggleTile()}>
                <Text>{reservation.date} {reservation.time}</Text>
                <Text>{reservation.type}</Text>
            </View>
        );
    }
    return(
        <View
        style={props.index == 0 ? styles.pstFirstCollapsed : props.index == props.length - 1 ? styles.pstLastCollapsed : styles.pstCollapsed}
        onStartShouldSetResponder={() => toggleTile()}>
            <Text>Collapsed: {reservation.date} {reservation.time}</Text>
        </View>
    );
}

export { PastReservationTile  };