import { View, Text, StyleSheet, Image } from 'react-native'

function UpcomingReservationTile(props){  
    const styles = props.styles;
    const colour = styles.upcColour;
    const tinyLogo = styles.tinyLogo;
    const expanded = styles.expanded;
    const collapsed = styles.collapsed;
    const first = styles.first;
    const last = styles.last;
    const index = props.index;
    const arrLength = props.length;
    const size = styles.size;
    const headerText = styles.headerText;
    const bodyText = styles.bodyText;
    const reservation = props.reservation;
    const setSelected = props.setSelected;
    const stylesSlnLarge = index == 0 ? [expanded, colour, size] : index == (arrLength - 1) ? [expanded, colour, size] : [expanded, colour, size];
    const stylesSlnSmall = index == 0 ? [collapsed, colour, size] : index == (arrLength - 1) ? [collapsed, colour, size] : [collapsed, colour, size];
    let isExpanded = props.isExpanded;
    if(isExpanded){
        return(
            <View 
            style={stylesSlnLarge}
            onStartShouldSetResponder={setSelected}>
                <View style={stylesLocal.header}>
                    <Text style={headerText}>{reservation.date}</Text>
                </View>
                <View style={stylesLocal.body}>
                    <Text style={headerText}>
                        Time&nbsp;
                        <Text style={bodyText}>
                            {reservation.time}
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Type&nbsp;
                        <Text style={bodyText}>
                            {reservation.type}
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Guests&nbsp;
                        <Text style={bodyText}>
                            {reservation.noOfGuests}
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Status&nbsp;
                        <Text style={bodyText}>
                            {reservation.status}
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Ref#&nbsp;
                        <Text style={bodyText}>
                            {reservation.referenceNo}
                        </Text>
                    </Text>
                </View>
                <View style={stylesLocal.footer}>
                    <View style={stylesLocal.footerTile}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/Contact_matte.png')}
                        />
                    </View>
                    <View style={stylesLocal.footerTile}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/E-mail_matte.png')}
                        />
                    </View>
                </View>
            </View>
        );
    }
    return(
        <View 
        style={stylesSlnSmall}
        onStartShouldSetResponder={setSelected}>
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
    },
    footer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-around',
        padding: 10
    },
    footerTile: {
        marginVertical: 5,
        backgroundImage: "linear-gradient(rgba(34, 193, 195, 0.6), rgba(45, 94, 253, 0.3))",
        padding: 10,
        borderRadius: 5
    }
});

export { UpcomingReservationTile };