import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { fetchApi } from './services/'

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [summaryErrMsg, setSummaryErrMsg] = useState("");
  const [token, setToken] = useState("");

  const onLoginRequest = () => {
    if(validLoginDetails(email, password)){
      fetchApi.tokens.getJWT({email, password})
      .then(data => {
        debugger;
        if(data.error){
          setSummaryErrMsg("email and password combination not recognised");
          return;
        }
        setToken(data);
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
  
  return (
    <SafeAreaView style={styles.container}>

      <Text>{summaryErrMsg}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => {setEmail(e)}}
        placeholder='youremail@gmail.com'
        keyboardType='email-address' />
      <Text>{emailErrMsg}</Text>

      <TextInput
        style={styles.input}
        onChangeText={(e) => setPassword(e)}
        placeholder='yourpassword'
        secureTextEntry={false} />
      <Text>{passwordErrMsg}</Text>

      <Button
        title='Login'
        color="#841584"
        onPress={onLoginRequest} /> 
        
      <Text>{token}</Text>

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
