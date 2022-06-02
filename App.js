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
    GochiHandRegular: require('./assets/fonts/gochi_hand/GochiHand-Regular.ttf'),
    latoThin: require('./assets/fonts/lato/Lato-Thin.ttf'),
    latoLight: require('./assets/fonts/lato/Lato-Light.ttf'),
    latoRegular: require('./assets/fonts/lato/Lato-Regular.ttf'),
    latoBold: require('./assets/fonts/lato/Lato-Bold.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{jwt ,setJwt}}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName='Log Out' screenOptions={{
          headerStyle: {
            backgroundColor: "#DEF5E7",
          },
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: '#DEF5E7',
            width: '40%'
          },
          drawerInactiveBackgroundColor: '#DEF5E7',
          drawerActiveTintColor: 'black'
        }}> 
        {/* HACK: name attribute is 'log out' for drawer nav appearance */}
          <Drawer.Screen 
            name='LogIn'
            component={LogInScreen}
            options={{
              drawerLabel: 'Sign Out',
              headerShown: false,
              backgroundColor: "#DEF5E7",      
              title: 'Bean Scene'
            }}
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


