import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react';
import { LogInScreen, ProfileScreen } from './views'
import { fetchApi } from './services';
// remove
import { UpcomingReservationTile } from './components' 

export default function App() {
  const AuthContext = fetchApi.authentication.context;
  const [jwt, setJwt] = useState("");
  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{jwt ,setJwt}}>
      <NavigationContainer>
        {/* initialRouteName='LogIn' */}
        <Stack.Navigator initialRouteName='Upcoming'> 
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
          {/* remove */}
          <Stack.Screen 
            name='Upcoming' 
            component={UpcomingReservationTile} 
            options={{ title: 'Upcoming'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


