import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native'
import { Entypo } from '@expo/vector-icons';

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
    const [modalVisible, setModalVisible] = useState(false);

    if(isExpanded){
        return(
            <View 
            style={stylesSlnLarge}
            onStartShouldSetResponder={setSelected}>
                <View style={stylesLocal.header}>
                    <Text style={headerText}>Thursday, 14 Jul 2022</Text>
                </View>
                <View style={stylesLocal.body}>
                    <Text style={headerText}>
                        Time&nbsp;
                        <Text style={bodyText}>
                            11:00AM
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Type&nbsp;
                        <Text style={bodyText}>
                            Lunch
                        </Text>
                    </Text>
                    <Text style={headerText}>
                        Guests&nbsp;
                        <Text style={bodyText}>
                            4
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
                            10031
                        </Text>
                    </Text>
                </View>
                <View style={stylesLocal.footer}>
                    <Pressable style={stylesLocal.footerTile} onPress={() => setModalVisible(true)}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/call.png')}
                        />
                    </Pressable>
                    <View style={stylesLocal.footerTile}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/world-wide-web.png')}
                        />
                    </View>
                    <View style={stylesLocal.footerTile}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/instagram.png')}
                        />
                    </View>
                    <View style={stylesLocal.footerTile}>
                        <Image
                            style={tinyLogo}
                            source={require('../assets/icons/facebook.png')}
                        />
                    </View>
                </View>

                

                <View style={stylesLocal.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesLocal.centeredView}>
          <View style={stylesLocal.modalView}>
            <Text style={stylesLocal.modalText}>Call 02 4229 7813&nbsp;<Entypo name="phone" size={24} color="black" /></Text>
            <Pressable
              style={[stylesLocal.button, stylesLocal.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={stylesLocal.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        // backgroundImage: "linear-gradient(rgba(34, 193, 195, 0.6), rgba(45, 94, 253, 0.3))",
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        borderRadius: 4,
        margin: 20,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 35,
        width: "81%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "90%"
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "darkred",
      },
      textStyle: {
        color: "white",
        fontSize: 24,
        textAlign: "center"
      },
      modalText: {
        fontSize: 24,
        marginBottom: 15,
        textAlign: "center"
      }
});

export { UpcomingReservationTile };