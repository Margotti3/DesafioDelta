import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Crud from './pages/Crud';
import List from './pages/List';
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
          component={Crud} 
          options={{
            headerShown: true,
            header: () => <Header name="Alunos" type={0} />
          }} 
        />
        <Screen 
          name="student" 
          component={List}
        />
        <Screen 
          name="form" 
          component={Form}
          options={{
            headerShown: true,
            header: () => <Header name="NOVO" type={2} />
          }} 
        />
      </Navigator>
    </NavigationContainer>
  );
}