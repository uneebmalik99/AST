import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, Alert, AppState, BackHandler, BackAndroid, ScrollView, FlatList,ImageBackground, SafeAreaView, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import { DrawerContent } from './src/navigation/DrawerContent';
import ContactUsScreen from './src/screens/ContactUsScreen';
import LocationServiceScreen from './src/screens/LocationServiceScreen';
import OurServiceListScreen from './src/screens/OurServiceListScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import DashboardScreen from './src/screens/DashboardScreen';
import VehicleScreen from './src/screens/VehicleScreen'
import VehicleList from './src/screens/VehicleList';
import ContainerTrackingOne from './src/screens/ContainerTrackingOne';
import AccountSectionMainScreen from './src/screens/AccountSectionMainScreen'
import AppColors from './src/Colors/AppColors';
import All from './src/screens/All';
import Paid from './src/screens/Paid';
import Unpaid from './src/screens/Unpaid';
import PaymentHistory from './src/screens/PaymentHistory';
import AccountDetailsScreen from './src/screens/AccountDetailsScreen';
import OurServiceOne from './src/screens/OurServiceOne';
import ContactUsOne from './src/screens/ContactUsOne';
import WishListScreen from './src/screens/WishListScreen';
import LocationServiceOne from './src/screens/LocationServiceOne';
import VehcilContainerDetailScreen from './src/screens/VehcilContainerDetailScreen';
import ExportDetailsScreen from './src/screens/ExportDetailsScreen';
import messaging from '@react-native-firebase/messaging';
import MyVehicles from './src/screens/MyVehciles';
import MyContainerList from './src/screens/MyContainerList';
import AddVehicle from './src/screens/AddVehicle';
import MyVehicleDetails from './src/screens/MyVehcileDetails';
import MyContainerDetails from './src/screens/MyContainerDetails';
import EditVehicle from './src/screens/EditVehicle';
import { request } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import AppConstance from './src/constance/AppConstance';
import Welcome from './src/screens/Welcome';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AppDrawer = () =>{
  return(
    <Drawer.Navigator
    drawerPosition='right'
    drawerType='front'
     drawerContent={props => <DrawerContent {...props} />
    }
    >


  
            <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


      <Drawer.Screen name="ContactUsScreen" component={ContactUsScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Drawer.Screen name="LocationServiceScreen" component={LocationServiceScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Drawer.Screen name="OurServiceListScreen" component={OurServiceListScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />
    </Drawer.Navigator>
  );
}

const Accounts =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='AccountSectionMainScreen' component={AccountSectionMainScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='All' component={All}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='Paid' component={Paid}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />


<Stack.Screen name='Unpaid' component={Unpaid}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='PaymentHistory' component={PaymentHistory}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />
 <Stack.Screen name='AccountDetailsScreen' component={AccountDetailsScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />


  </Stack.Navigator>
  );
}

const Vehicle =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='VehicleScreen' component={VehicleScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehcilContainerDetailScreen' component={VehcilContainerDetailScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />





  </Stack.Navigator>
  );
}

const Container =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='ContainerTrackingOne' component={ContainerTrackingOne}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='ExportDetailsScreen' component={ExportDetailsScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />
<Stack.Screen name='VehcilContainerDetailScreen' component={VehcilContainerDetailScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />
  </Stack.Navigator>
  );
}

const Dashboard =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='DashboardScreen' component={DashboardScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehicleList' component={VehicleList}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehcilContainerDetailScreen' component={VehcilContainerDetailScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />





  </Stack.Navigator>
  );
}

const Notifications = () =>{
  return(
  <Stack.Navigator>


    {/* <Stack.Screen name='Notification' component={Notification}
    
    options={{
      headerShown:false,
      animationEnabled:false,
      transitionConfig: () => ({
        transitionSpec: {
          duration:0,
          timing: 0,
        },
      }),
    }} 
     /> */}
       {/* <Stack.Screen name='Notificationsdetails' component={Notificationsdetails}
    options={{
      headerShown:false,
      animationEnabled:false,
      transitionConfig: () => ({
        transitionSpec: {
          duration:0,
          timing: 0,
        },
      }),
    }} 
     /> */}
     </Stack.Navigator>
   
  );
}

const TabScreen =()=>{
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: AppColors.AppColor,
      keyboardHidesTabBar: true

    }}
    >

    <Tab.Screen name="DashboardScreen" component={Dashboard} options={{tabBarLabel:'Home',headerShown:false,
   tabBarIcon: ({ color, size }) => (<Image
      source={ require('./src/Images/homeicon.png')} 
style={{ width: 25, height:25, alignSelf: 'center', resizeMode:'contain'}} 
    />  )
  
  ,}} />

    <Tab.Screen name="VehicleScreen" component={Vehicle} options={{tabBarLabel:'Vehicles',headerShown:false,
   tabBarIcon: ({ color, size }) => (
    <Image
    source={ require('./src/Images/car-2.jpg')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />
    // <MaterialCommunityIcons name="Vehicles" color={color} size={size} />
  
  )}} />
     <Tab.Screen name="Container1" component={Container} options={{tabBarLabel:'Container',headerShown:false,
   tabBarIcon: ({ color, size }) => (
<Image
    source={ require('./src/Images/ship-2.png')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />  
  )}} />

<Tab.Screen name="Accounts" component={Accounts} options={{tabBarLabel:'Accounts',headerShown:false,
   tabBarIcon: ({ color, size }) => (
<Image
    source={ require('./src/Images/inventory_icon.png')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />  
  )}} />

  
   

    

   </Tab.Navigator>
  );
}

const MyVehicle =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='MyVehicles' component={MyVehicles}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='MyVehicleDetails' component={MyVehicleDetails}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='EditVehicle' component={EditVehicle}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

  </Stack.Navigator>
  );
}

const MyContainer =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='MyContainerList' component={MyContainerList}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='MyContainerDetails' component={MyContainerDetails}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

  </Stack.Navigator>
  );
}

const TabScreen2 =()=>{
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: AppColors.AppColor,
      keyboardHidesTabBar: true

    }}
    >

    <Tab.Screen name="MyVehicle" component={MyVehicle} options={{tabBarLabel:'MY VEHICLES',headerShown:false,
   tabBarIcon: ({ color, size }) => (
    <Ionicons  name='md-car-sport-sharp'  size={size}/>
    )
  
  ,}} />


<Tab.Screen name="AddVehicle" component={AddVehicle} options={{tabBarLabel:'ADD VEHICLE',headerShown:false,
   tabBarIcon: ({ color, size }) => (
    <Ionicons  name='ios-add-circle-outline'  size={size}/>

  )}} />


 

  
<Tab.Screen name="MyContainer" component={MyContainer} options={{tabBarLabel: 'CONTAINER',headerShown:false,
   tabBarIcon: ({ color, size }) => (
   
    <Feather  name='box'  size={size}/>

  )}} />
   

    

   </Tab.Navigator>
  );
}

const App = () => {

  const getToken= async()=>{
    console.log('get token call')
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if(!fcmToken){
      fcmToken = await messaging().getToken();
      if(fcmToken){

      console.log('token',fcmToken);
        await AsyncStorage.setItem('fcmToken',fcmToken);
      }
    }
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    // messaging().getInstance().subscribeToTopic("TopicName");
    messaging()
    .subscribeToTopic('General')
    .then(() => console.log('Subscribed to topic!'));
  
  }

  useEffect(() => {
    if(Platform.OS == 'ios' ){
      requestUserPermission()

    }
    messaging()
    .subscribeToTopic('General')
    .then(() => console.log('Subscribed to topic!'));
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('piushd');
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification.body));
    });
// const enabled =  messaging().hasPermission();
// console.log('permissions ', enabled);
// if(enabled){
//   getToken()
// }else{
//   requestPermission()
// }

    messaging().requestPermission().then(authStatus =>{
        console.log('Apns ',authStatus);
        if( authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL){
            messaging()
            .getToken()
            .then(token =>{
                console.log('messaging.gettoken:',token);
                AsyncStorage.setItem('token' , token)

                AppConstance.USER_TOKEN = token
            });
            // messaging().onTokenRefresh(token =>{
            //     console.log('messaging.gRefresettoken:',token);
            //     // AppConstance.USER_TOKEN = token



            // });
            // if(notifications == '1'){
              // messaging().getInstance().subscribeToTopic('news')
              // FirebaseMessaging.getInstance().subscribeToTopic("all");

            //  FirebaseMessaging.getInstance().subscribeToTopic("news");
// messaging().onMessage(async remoteMessage => {
// // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

// const regex = /(<([^>]+)>)/ig;
// const result = remoteMessage.notification.body.replace(regex, '');
// Alert.alert(result);
// console.log('notfication is :::::::::::::::::'+remoteMessage);

// });



// messaging().getInitialNotification().then(remoteMessage => {
// if (remoteMessage) {
// console.log(
//   'Notification caused app to open from quit state:',
//   remoteMessage.notification,
// );
// // AppConstance.NOTIFICATION = '1'
// console.log('-----------------------::::::::::::::::::::::_--------'+remoteMessage.data.type);
// if (remoteMessage.data.type == '0') {
// // AppConstance.NTYPE = '0';


// }else{
// // AppConstance.NTYPE = '1';

// }
// // AppConstance.NOTIFICATIONDATA = remoteMessage.notification

// }
// });

        }
    })
    
    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

 return (
   <NavigationContainer>
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



<Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='Container1' component={Container} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


<Stack.Screen name='LocationServiceOne' component={LocationServiceOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='AppDrawer1' component={AppDrawer} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


<Stack.Screen name='TabScreen2' component={TabScreen2}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />



<Stack.Screen name='TabScreen' component={TabScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='OurServiceOne' component={OurServiceOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='ContactUsOne' component={ContactUsOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


{/* <Stack.Screen name='Notification' component={Notifications} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} /> */}

<Stack.Screen name='WishListScreen' component={WishListScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />




   </Stack.Navigator>
   </NavigationContainer>
 );
}

export default App;