import React, { Component,useEffect, useState } from 'react';
import { View, Text,Modal, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
// import DeviceInfo from 'react-native-device-info';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogLoder from '../screens/DialogLoder'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';


const Welcome = ({ navigation }) => {

  const [Loggedin ,setLoggedin] = useState(false)


    // const [email ,setemail] = useState('nooraljabal1133@gmail.com')
    // const [email ,setemail] = useState('uneeb@impulsiontechnologies.com')
    const [email ,setemail] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    // const [pass ,setpass] =useState('info@asl1001')
    // const [pass ,setpass] =useState('Admin@123')
    const [pass ,setpass] =useState('')
  
    const [spinner , setspinner] =useState(false)

    useEffect(() => {


      AsyncStorage.getItem('ISUSERLOGIN').
      then((value) => {
        if(value == null || value == '0'){
          setLoggedin(false)
        }else{
          setLoggedin(true)
        }

      }
      )

      const backAction = () => {
        BackHandler.exitApp() 
        
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);

    
   
   const  callingLoginApi = () => {
    NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
  setspinner(true)
      if (email.trim().length == 0) {
  
      alert('username can not be blank'); 
      setspinner(false)
  
      } else if (pass.trim().length == 0) {
          alert("password can not be blank"); 
          setspinner(false)
  
      } 
      
      else {
       
                  var url = AppUrlCollection.LOGIN
                 var  token =AppConstance.USER_TOKEN;
                  let value = {};
                  value.email = email,
                  value.password = pass,
                  value.source = 'asl_phone_app';
                  value.device_id_token = token;
                  console.log('Login_key_vale ',JSON.stringify(value))
                  fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type':   'application/json',
                        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

                      },
                      body: JSON.stringify(value),
                  })
                      .then((response) =>  response.json() )
                      .then((responseJson) => {
                          if(responseJson.status == 200){
                            console.log('login data response',responseJson);
                         loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

                          }else if(responseJson.status == 422){
                            alert(responseJson.errors.password)
                          }else if(responseJson.status == 401){
                            alert(responseJson.error)
                          }
                      console.log('login data response',responseJson);
                      setspinner(false)  
                      })
                      .catch((error) => {
                        setspinner(false)
                        alert(error)
                          console.warn(error)
                      });
      }
    } else setModalVisible(true);
});
  }
  
  
  const loginServiceCall = (responseJson, role, username, rolename, userprofilepic) => {
    console.warn(responseJson)
  
     if (responseJson != null || responseJson != '') {
  
     AppConstance.IS_USER_LOGIN='1';
        // this.props.navigation.push('Dashboard');
        
        //AppConstance.showSnackbarMessage(responseJson.message)
      callingUserService(responseJson.access_token, role, username, rolename, userprofilepic)
    } else {
         setspinner(false)
        alert(responseJson.message);
    }
  }
  
  const GotoNextScreen  =async  (responseJson,auth_key, role,username, rolename, userprofilepic) => {
    await AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson))
   await  AsyncStorage.setItem('ISUSERLOGIN', '1')
   await  AsyncStorage.setItem('auth_key', auth_key)

   AppConstance.AUTH_KEY = auth_key;


   await AsyncStorage.setItem('username', username)
   await AsyncStorage.setItem('rolename', rolename)
   await AsyncStorage.setItem('userprofilepic',userprofilepic )

   AppConstance.USERNAME = username;
   AppConstance.ROLENAME = rolename;
   AppConstance.USERPHOTO = userprofilepic;
   
//0 for Master Admin

// 1 for Super Admin

// 2  ADMIN

// 3 CUSTOMER 

// 4 EMPLOYYYE 

// 5 ACCOUNT 

   console.log();
   if(role == "2" || role == '0' || role == '1'){
    // if(role_name == "Admin" || role_name == 'MASTER ADMIN' || role_name == 'SUPER_ADMIN'){

    await AsyncStorage.setItem('user_role', '1')
    AppConstance.USER_ROLE = '1'
    // alert(role)

    }else{
    await AsyncStorage.setItem('user_role',  '0')
    // alert('--no---'+role)

    AppConstance.USER_ROLE = '0'

}
 
   AppConstance.USER_TOKEN_KEY = auth_key;
   let userid = responseJson.id;
   userid = userid.toString();
   await  AsyncStorage.setItem('user_id', userid)

   AppConstance.IS_USER_LOGIN = '1'
  //  this._storeData();
  
    

    let data = responseJson
    console.warn('json value', data)
    AppConstance.USER_INFO.USER_ID = data.id;
    AppConstance.USER_INFO.USER_NAME = data.username;
    AppConstance.USER_INFO.USER_TOKEN = auth_key;
    AppConstance.USER_INFO.USER_EMAIL = data.email;
    AppConstance.USER_INFO.USER_STATUS = data.status;
    AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
    AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
    AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
    AppConstance.USER_INFO.USER_CITY = data.city;
    AppConstance.USER_INFO.USER_STATE = data.state;
    AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
    AppConstance.USER_INFO.USER_MOBILE = data.phone;
    AppConstance.USER_INFO.USER_FAX = data.fax;
    AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
    AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;
    setspinner(false)

    navigation.navigate('TabScreen')
    // navigation.navigate('DashboardScreen')

  
  }
  
  const callingUserService = (authKey, role, username,rolename,userprofilepic) => {
    var url = AppUrlCollection.USER;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + authKey,
           'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          
            console.warn('USER::: ', responseJson)
  
            GotoNextScreen(responseJson,authKey, role, username, rolename, userprofilepic);
  
            // //this.props.navigation.goBack();
            // this.props.navigation.navigate('NavigationSideScreen')
        })
        .catch((error) => {
             setspinner(false)
            // this.setState({ isLoading: false })
            console.warn(error)
        });
  }
  
  
  
  
  
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white', width:deviceWidth}}>


                <DialogLoder loading={spinner} />


               
                    
                <ImageBackground
        style={{
          width: deviceWidth,
          height: deviceHeight*0.3,
      backgroundColor:'#F8F9F9',
          justifyContent:'center',
        }}

        source={require('../Images/welcome.png')}
      >

            <Lottie 
                    source={require('../Animation/Ship_welcome.json')} autoPlay loop 
                    style={{
                        width: 80,
                        height: 80,
                        top:-12,
                    alignSelf:'center',
                    

                      }}
                    />


        <Text style={{alignSelf:'center',top:-15, color:'white', fontSize:20, fontWeight:'600'}}>Welcome to</Text>
        <Text style={{alignSelf:'center',top:-10, textAlign:'center',  color:'white', fontSize:20, fontWeight:'600'}}>American Shipping & Towing Company</Text>
       

      </ImageBackground>


      
        

<View style={{ backgroundColor: '#F8F9F9',
            height: "77%",
        
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: "5%",}}>


      <View style={styles.v2}>

          <TouchableOpacity style={styles.item}
              onPress={()=> {
                if(Loggedin == false){
                  navigation.navigate('LoginScreen')
                }else{
                  navigation.navigate('TabScreen')
                }
                 }}
              > 
                <View style={{height:'100%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                    {/* <Ionicons name='home' color='grey' style={{alignSelf:'center'}} size={40}/>  */}
                   {Loggedin == true ? 
                     <Image source={ require('../Images/Dashboard1.png')} 
                     style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      />
                 :
                 <Image source={ require('../Images/Dashboard1.png')} 
                 style={{ width: 50, height:50, alignSelf: 'center'}} resizeMode='contain'
                      /> 
                  } 
                    <Text style={{textAlign:'center'}}>{Loggedin == true ? 'Dashobard':'Login'}</Text>
                </View>
 
            </TouchableOpacity>

            <TouchableOpacity  style={styles.item}
              onPress={()=> {navigation.navigate('LocationServiceOne')}}
              > 
                <View style={{height:'90%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                   
                <Image source={ require('../Images/services1.png')} 
                 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      /> 
                    <Text style={{textAlign:'center'}}>Services</Text>
                </View>
              
              
            </TouchableOpacity>
            </View>



          <View style={styles.v2}>
                 <TouchableOpacity  style={styles.item}
> 
                <View style={{height:'90%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                <Image source={ require('../Images/car1.png')} 
                 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      /> 
                   
                    {/* <Ionicons name='car-sport-sharp' color='grey' style={{alignSelf:'center'}} size={40}/>  */}
                    <Text style={{textAlign:'center'}}>Track Your Car</Text>
                </View>
              
               
            </TouchableOpacity>

            <TouchableOpacity  
            style={styles.item}
            // onPress={()=> { navigation.navigate('Container1')}}
            > 
                <View style={{height:'90%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                <Image source={ require('../Images/truck1.png')} 
                 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      /> 
                    {/* <MaterialCommunityIcons  name='truck-cargo-container' color='grey' style={{alignSelf:'center'}} size={40}/>  */}
                    <Text style={{textAlign:'center'}}>Track Your Container</Text>
                </View>
              
                
            </TouchableOpacity>
            </View>



          <View style={styles.v2}>
            <TouchableOpacity  style={styles.item}> 
                <View style={{height:'90%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                <Image source={ require('../Images/about1.png')} 
                 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      /> 
                    {/* <Ionicons name='ios-people-sharp' color='grey' style={{alignSelf:'center'}} size={40}/>  */}
                    <Text style={{textAlign:'center'}}>About us</Text>
                </View>
              
               
            </TouchableOpacity>

            <TouchableOpacity  
            style={styles.item}
            onPress={()=> {
              navigation.navigate('ContactUsOne')
            } }                 
            > 
                <View style={{height:'90%',paddingTop:'5%', justifyContent:'space-around',flexDirection:'column',}}>
                <Image source={ require('../Images/contact1.png')} 
                 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
                      /> 
                    {/* <MaterialIcons name='connect-without-contact' color='grey' style={{alignSelf:'center'}} size={40}/>  */}
                    <Text style={{textAlign:'center'}}>Contact us</Text>
                </View>
              
               
            </TouchableOpacity>
            </View>

</View>

          


        

          
        
          
     

        {/* </View> */}
        
        
        
                <ScrollView>
                    
              
            
                </ScrollView>
                </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 5,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalBtn: {
      flexDirection: "row",
      justifyContent: "center",
    },

    v2:{
      flexDirection:'row',justifyContent:'space-around', height:'25%', width:'100%'
    },
    item:{
      elevation:5,borderWidth:0.4,borderColor:'#D0D3D4', shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 4,
              },
              shadowOpacity: 0.42,
              shadowRadius: 5.46,
              backgroundColor:'white',
              elevation: 9,borderRadius:8, alignSelf:'center', height:'80%', width:'40%',
              borderBottomWidth:5,borderColor:AppColors.AppColor,
    }
  });

  export default Welcome;
