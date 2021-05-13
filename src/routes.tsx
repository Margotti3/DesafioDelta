import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Crud from './pages/Crud';
import List from './pages/List';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Menu" component={Crud} />
        <Screen name="Lista" component={List} />
      </Navigator>
    </NavigationContainer>
  );
}