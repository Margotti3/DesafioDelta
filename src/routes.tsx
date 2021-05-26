import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './pages/List';
import Student from './pages/Student';
import Header from './components/Header';
import Form from './pages/Form';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{
          headerShown: false, 
          cardStyle: { backgroundColor: '#dcdcdc'}
        }}
      >
        <Screen 
          name="index" 
          component={List} 
          options={{
            headerShown: true,
            header: () => <Header name="Alunos" type={0} />
          }} 
        />
        <Screen 
          name="student" 
          component={Student}
        />
        <Screen 
          name="form" 
          component={Form}
        />
      </Navigator>
    </NavigationContainer>
  );
}