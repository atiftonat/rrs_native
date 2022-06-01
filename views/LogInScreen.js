import { useContext, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, View } from 'react-native';
import { ImageBackground } from 'react-native-web';
import { fetchApi } from '../services';

function LogInScreen({ navigation }){
  const AuthContext = fetchApi.authentication.context;
  const { jwt, setJwt } = useContext(AuthContext);
  const [email, setEmail] = useState("Seed@Person1.com");
  const [password, setPassword] = useState("JellyBean1!");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [summaryErrMsg, setSummaryErrMsg] = useState("");

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
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>Bean</Text>
          <Text style={styles.headerText}>Scene</Text>
          <ImageBackground
            style={styles.icon}
            source={require('../assets/icons/coffee.png')}>
              <View style={styles.logInContainer}>
                <Text>{summaryErrMsg}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(e) => {setEmail(e)}}
                  placeholder='youremail@gmail.com'
                  keyboardType='email-address' 
                />
                <Text>{emailErrMsg}</Text>
        
                <TextInput
                  style={styles.input}
                  onChangeText={(e) => setPassword(e)}
                  placeholder='yourpassword'
                  secureTextEntry={false} 
                />
                <Text>{passwordErrMsg}</Text>
        
                <Button
                  title='Login'
                  color="#841584"
                  onPress={onLoginRequest} 
                /> 
              </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEF5E7",
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
    fontFamily: 'QuicksandRegular',
    fontSize: 36,
    letterSpacing: '.15em'
  }
});

export { LogInScreen };