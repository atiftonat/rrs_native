import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, Pressable, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { ImageBackground } from 'react-native-web';
import { fetchApi } from '../services';

function LogInScreen({ navigation }){
  const AuthContext = fetchApi.authentication.context;
  const { jwt, setJwt } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [summaryErrMsg, setSummaryErrMsg] = useState("");
  const [focus, setFocus] = useState({user: false, password: false});

  const onLoginRequest = () => {
    if(validLoginDetails(email, password)){
      fetchApi.authentication.getJWT({email, password})
      .then(data => {
        if(data.error){
          setSummaryErrMsg("email and password combination not recognised");
          return;
        }
        setJwt(data);
        navigation.navigate('Profile', {
          email: `${email}`
        })
      })
      .catch(() => {
        setSummaryErrMsg(`something went wrong, please try again later`);
      });
    }
  };

  const validLoginDetails = (email, password) => {
    let regE = /(.+)@(.+){1,}\.(.+){1,}/;
    setEmailErrMsg(regE.test(email) === false ? "invalid email, please try again" : "");

    let regP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{6,}$/;
    setPasswordErrMsg(regP.test(password) === false 
      ? "invalid password, please try again" : "");

    return regE.test(email) && regP.test(password);
  };
  
    return(
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.headerText, {marginTop: 30}]}>Bean</Text>
          <Text style={styles.headerText}><i>Scene</i></Text>
          <ImageBackground
            style={styles.icon}
            source={require('../assets/icons/coffee.png')}>
            <View style={styles.logInContainer}>

              <Text style={styles.errorTxt}>{summaryErrMsg}</Text>
              <Text style={styles.errorTxt}>{emailErrMsg}</Text>
              <Text style={styles.errorTxt}>{passwordErrMsg}</Text>

              <TextInput
                onChangeText={(e) => {setEmail(e)}}
                placeholder='youremail@gmail.com'
                keyboardType='email-address' 
                style={focus.user ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus({user: true, password: false})}
                onBlur={() => setFocus({user: false, password: false})}
              />
      
              <TextInput
                onChangeText={(e) => setPassword(e)}
                placeholder='yourpassword'
                secureTextEntry={true} 
                style={focus.password ? styles.inputOnFocus : styles.inputOnBlur}
                onFocus={() => setFocus({user: false, password: true})}
                onBlur={() => setFocus({user: false, password: false})}
              />
      
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={onLoginRequest}>
                  <Text style={styles.btnTxt}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#DEF5E7",
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  btn: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  btnContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  btnTxt: {
    padding: 10,
    fontSize: 32,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  inputOnBlur: {
    height: 40,
    margin: 12,
    padding: 10,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'GochiHandRegular',
    outlineStyle: 'none'
  },
  inputOnFocus: {
    height: 40,
    margin: 12,
    padding: 10,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'GochiHandRegular',
    outlineStyle: 'none'
  },
  icon: {
    width: '100%',
    height: '85%'
  },
  logInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: 'SaolDisplay',
    fontSize: 72,
    letterSpacing: '-.015em',
    lineHeight: 60
  },
  errorTxt: {
    color: 'red'
  }
});

export { LogInScreen };