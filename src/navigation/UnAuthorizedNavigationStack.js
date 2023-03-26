import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import SplashScreen  from '../screens/SplashScreen';


const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();







// const HomeStack =() =>{
//   return(
//   <Stack.Navigator>
// <Stack.Screen name='Home' component={Home}
// options={{
//   headerShown:false,
//   animationEnabled:false,
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration:0,
//       timing: 0,
//     },
//   }),
// }} 
//  />

// <Stack.Screen name='FreeWifi' component={FreeWifi}
// options={{
//   headerShown:false,
//   animationEnabled:false,
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration:0,
//       timing: 0,
//     },
//   }),
// }} 
//  />


// <Stack.Screen name='Temperature' component={Temperature}
// options={{
//   headerShown:false,
  
// }} 
//  />



//   </Stack.Navigator>
//   );
// }



// const TabScreen =()=>{
//   return(
//     <Tab.Navigator
//     tabBarOptions={{
//       activeTintColor: 'purple',
//       keyboardHidesTabBar: true

//     }}
//     >

//     <Tab.Screen name="Home" component={HomeStack} options={{tabBarLabel:'Home',
//    tabBarIcon: ({ color, size }) => (
//     <MaterialCommunityIcons name="home" color={color} size={size} />
//   )
  
//   ,}} />

//     <Tab.Screen name="Messages" component={MessageStack} options={{tabBarLabel:'Messages',
//    tabBarIcon: ({ color, size }) => (
//     <MaterialCommunityIcons name="message" color={color} size={size} />
  
//   )}} />

//     <Tab.Screen name="Payment" component={PaymentStack}  options={{tabBarLabel:'Payment',
//   tabBarIcon: ({ color, size }) => (
//     <MaterialCommunityIcons name="credit-card-clock-outline" color={color} size={size} />
//   )
//   }} />
//     <Tab.Screen name="Event" component={EventStack} options={{tabBarLabel:'Events',
//    tabBarIcon: ({ color, size }) => (
//     <MaterialCommunityIcons name="calendar-question" color={color} size={size} />
//   )
//   }}  />
//     <Tab.Screen name="Menu" component={MenuStack} options={{tabBarLabel:'Menu',
//     tabBarIcon: ({ color, size }) => (
//       <MaterialCommunityIcons name="menu" color={color} size={size} />
//     )
//   }} 
//    />

    

//   </Tab.Navigator>
//   );
// }

const AppNavigator = () => {
 return (
   <Stack.Navigator 
   initialRouteName="SplashScreen" 
   >
        
        {/* <Stack.Screen  name='SplashScreen'  component={SplashScreen} options={{headerShown :false}} /> */}
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

        {/* <Stack.Screen name='RegisterActivation' component={RegisterActivation} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterOne' component={RegisterOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterTwo' component={RegisterTwo} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterThree' component={RegisterThree} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),}} />
        <Stack.Screen name='RegisterOneT' component={RegisterOneT} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterTwoT' component={RegisterTwoT} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
       
     <Stack.Screen name='HomeScreen' component={TabScreen} options={{ headerShown:false, headerTitleAlign:"center",animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), headerLeft: null}} /> */}

   </Stack.Navigator>
 
 );
}

export default AppNavigator;