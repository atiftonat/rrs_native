import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

function PastReservationTile (props){
    const styles = props.styles;
    const reservation = props.reservation;
    const [isExpanded, setisExpanded] = useState(false);
    const expanded = styles.expanded;
    const collapsed = styles.collapsed;
    const colour = styles.pstColour;
    const size = styles.size;
    const first = styles.first;
    const last = styles.last;
    const headerText = styles.headerText;
    const bodyText = styles.bodyText;
    const index = props.index;
    const arrLength = props.length;
    const stylesSlnLarge = index == 0 ? [expanded, colour, size] : index == (arrLength - 1) ? [expanded, colour, size] : [expanded, colour, size];
    const stylesSlnSmall = index == 0 ? [collapsed, colour, size] : index == (arrLength - 1) ? [collapsed, colour, size] : [collapsed, colour, size];

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
            style={stylesSlnLarge}
            onStartShouldSetResponder={() => toggleTile()}>
                <View style={stylesLocal.header}>
                    <Text style={headerText}>Wendesday, 01 Jun 2022</Text>
                </View>
                <View style={stylesLocal.body}>
                    <Text style={headerText}>
                        Time&nbsp;
                        <Text style={bodyText}>
                            10:30AM
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Type&nbsp;
                        <Text style={bodyText}>
                            Breakfast
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Guests&nbsp;
                        <Text style={bodyText}>
                            5
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Status&nbsp;
                        <Text style={bodyText}>
                            Pending
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Ref#&nbsp;
                        <Text style={bodyText}>
                            10030
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
    return(
        <View
        style={stylesSlnSmall}
        onStartShouldSetResponder={() => toggleTile()}>
            <Text style={headerText}>{reservation.date}</Text>
        </View>
    );
}

const stylesLocal = StyleSheet.create({
    header: {
        width: '100%'
    },
    body: {
        width: '100%'
    }
});

export { PastReservationTile  };