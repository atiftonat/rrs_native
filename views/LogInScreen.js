import { useContext, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, Button } from 'react-native';
import { fetchApi } from '../services';

function LogInScreen({ navigation }){
  const AuthContext = fetchApi.authentication.context;
  const { jwt, setJwt } = useContext(AuthContext);
  const [email, setEmail] = useState("a@e.com");
  const [password, setPassword] = useState("Abc123!@#");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [summaryErrMsg, setSummaryErrMsg] = useState("");

  const onLoginRequest = () => {
    if(validLoginDetails(email, password)){
      fetchApi.authentication.getJWT({email, password})
      .then(data => {
        debugger;
        if(data.error){
          setSummaryErrMsg("email and password combination not recognised");
          return;
        }
        setJwt(data);
        navigation.navigate('Profile')
      });
    }
  };

  const validLoginDetails = (email, password) => {
    let regE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    setEmailErrMsg(regE.test(email) === false ? "invalid email, please try again" : "");

    let regP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{6,}$/;
    setPasswordErrMsg(regP.test(password) === false 
      ? "invalid password, please try again" : "");

    return regE.test(email) && regP.test(password);
  };
  
    return(
        <SafeAreaView style={styles.container}>

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
            
            <Text>{jwt}</Text>
  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
});

export { LogInScreen };