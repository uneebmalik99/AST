import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import StudentDashboard from '../screens/student/StudentDashboard';


const {
  Navigator,
  // Screen
} = createStackNavigator();

export default function AuthorizedNavigationStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}
    // initialRouteName="DashboardScreen" 
    >
      <Screen name="StudentDashboard" component={StudentDashboard} />
    </Navigator>
  );
}