import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react';
import { LogInScreen, ProfileScreen } from './views'
import { fetchApi } from './services';

export default function App() {
  const AuthContext = fetchApi.authentication.context;
  const [jwt, setJwt] = useState("");
  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{jwt ,setJwt}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LogIn'>
          <Stack.Screen 
            name='LogIn' 
            component={LogInScreen} 
            options={{ title: 'Welcome'}}
          />
          <Stack.Screen 
            name='Profile' 
            component={ProfileScreen} 
            options={{ title: 'Member Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


