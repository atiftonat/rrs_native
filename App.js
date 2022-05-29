import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { fetchApi } from './services/'

export default function App() {
  const [email, setEmail] = useState("...");
  const [password, setPassword] = useState("...");

  const onLoginRequest = () => {
    fetchApi.tokens.getJWT(email, password);
  };
  
  return (
    <SafeAreaView style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={(e) => {setEmail(e)}}
        placeholder='youremail@gmail.com'
        keyboardType='email-address'
      />

      <TextInput
        style={styles.input}
        onChangeText={(e) => setPassword(e)}
        placeholder='yourpassword'
      />

      <Text>{email}</Text>
      <Text>{password}</Text>

      <Button
        title='Login'
        color="#841584"
        onPress={onLoginRequest} /> 
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
