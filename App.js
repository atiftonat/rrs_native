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
    QuicksandRegular: require('./assets/fonts/quicksand/static/Quicksand-Regular.ttf'),
    QuicksandLight: require('./assets/fonts/quicksand/static/Quicksand-Light.ttf'),
    GochiHandRegular: require('./assets/fonts/gochi_hand/GochiHand-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{jwt ,setJwt}}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName='Profile' screenOptions={{
          headerStyle: {
            backgroundColor: "#DEF5E7",
          },
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: '#DEF5E7',
            width: '40%'
          },
          drawerInactiveBackgroundColor: 'white'
        }}> 
          <Drawer.Screen 
            name='LogIn' 
            component={LogInScreen}
            options={{
              headerShown: false,
              backgroundColor: "#DEF5E7"
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


