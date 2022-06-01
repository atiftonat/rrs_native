import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react';
import { LogInScreen, ProfileScreen } from './views'
import { fetchApi } from './services';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {
  const AuthContext = fetchApi.authentication.context;
  const [jwt, setJwt] = useState("");
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const [loaded] = useFonts({
    QuicksandRegular: require('./assets/fonts/static/Quicksand-Regular.ttf'),
    QuicksandLight: require('./assets/fonts/static/Quicksand-Light.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{jwt ,setJwt}}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName='LogIn' screenOptions={{
          headerStyle: {
            backgroundColor: "#DEF5E7",
          },
          headerShadowVisible: false
        }}> 
          <Drawer.Screen 
            name='LogIn' 
            component={LogInScreen}
          />
          <Drawer.Screen 
            name='Profile' 
            component={ProfileScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


