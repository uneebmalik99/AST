import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import UnAuthorizedNavigationStack from '../navigation/UnAuthorizedNavigationStack'



const { Navigator, Screen } = createStackNavigator();

export default class AppNavigator extends React.Component {
  

  render() {
    return (
        <NavigationContainer>
          <Navigator screenOptions={{ headerShown: false }}>
            {/* {authToken == "" && <Screen name="UnAuthorizedNavigationStack" component={UnAuthorizedNavigationStack} />} */}
              <Screen name="UnAuthorizedNavigationStack" component={UnAuthorizedNavigationStack} />
              {/* <Screen name="AuthorizedNavigationStack" component={AuthorizedNavigationStack} /> */}
          </Navigator>
        </NavigationContainer>
    );
  }
}




// // import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, } from '@react-navigation/stack';
// // import SplashScreen from "react-native-splash-screen";
// import Welcome from '../screens/Welcome'

// const Stack = createStackNavigator();
// // const Tab = createBottomTabNavigator();
// // const StackAuctions = createStackNavigator();
// // const StackInvoice =createStackNavigator();


// // const StackAuctionsScreen =() =>{
// //   return(
// //   <StackAuctions.Navigator>
// // <StackAuctions.Screen name='Auctions' component={Auctions}
// // options={{
// //   headerShown:false,
// // }} 
// //  />
// // <StackAuctions.Screen name='AuctionDetails' component={AuctionDetails} options={{
// //   title: 'Offer Details',
// //   headerTitleAlign:"center",

// // }}/>
// //   </StackAuctions.Navigator>
// //   );
// // }

// // const StackInvoiceScreen =() =>{
// //   return(
// //     <StackInvoice.Navigator>
// // <StackInvoice.Screen name='Invoice' component={Invoice}
// // options={{
// //   headerShown:false,
// // }} 
 

// // />
// // <StackInvoice.Screen name='InvoiceDetails' component={InvoiceDetails}
// // options={{
// //   title:'Invoice Details',
// //   headerStyle: {
// //             backgroundColor: '#268ef5',
     
// //           },
// //           headerTitleAlign:"center",
// //           headerTitleStyle: {
// //             color:'white' ,
// //           },
// // }}
// // // options={{
// // //   headerShown:false,
// // // }} 
// //   />

// // <StackInvoice.Screen name='InvoiceDetails2' component={InvoiceDetails2}
// // options={{
// //   title:'Invoice Details',

// //   headerStyle: {
// //             backgroundColor: '#268ef5',
     
// //           },
// //           headerTitleAlign:"center",
         
// //           headerTitleStyle: {
// //             color:'white' ,
// //           },
// // }}
// // // options={{
// // //   headerShown:false,
// // // }} 
// //   />

// //   </StackInvoice.Navigator>
// //   );
// // }

// // const TabScreen =()=>{
// //   return(
// //     <Tab.Navigator>
// //     <Tab.Screen name="Home" component={HomeScreen} />
// //     <Tab.Screen name="Settings" component={SettingsScreen} />
// //   </Tab.Navigator>
// //   );
// // }

// const AppNavigator = () => {
//  return (
//    <Stack.Navigator 
//    initialRouteName="Welcome" 
//    >
        
//         {/* <Stack.Screen  name='SplashScreen'  component={SplashScreen} options={{headerShown :false}} /> */}
//         <Stack.Screen name='Welcome' component={Welcome} options={{headerTitleAlign:"center"} } options={{headerTitleAlign:"center", headerLeft: null }} />
       
//      {/* <Stack.Screen name='AppDrawerScreen' component={TabScreen} options={{ headerShown:false, headerTitleAlign:"center", headerLeft: null}} /> */}

//    </Stack.Navigator>
 
//  );
// }

// export default AppNavigator;
