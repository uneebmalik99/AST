import React, {Component} from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
 BackHandler,
  Easing,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Modal,
  Image,
  Platform,
} from 'react-native';
import AppConstance, {
  deviceHeight,
  deviceWidth, 
} from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AppColors from '../Colors/AppColors';
import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

class ContactUsOne extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      fulName: '',
      email: '',
      phone: '',
      message: '',
      drawerview:false,

    };
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  Logout =() => {

    AsyncStorage.setItem('ISUSERLOGIN', '0');
    AppConstance.IS_USER_LOGIN = '0'
  
    AsyncStorage.setItem('auth_key', ' ');
    AppConstance.USER_TOKEN_KEY = ' '
  
    AsyncStorage.setItem('user_id', '');
    AppConstance.USER_ID = ' '
  
    AsyncStorage.setItem('user_role' , '')
    AppConstance.USER_ROLE = ''
  
  
    AsyncStorage.setItem('username' , '')
    AppConstance.USERNAME = ''
  
    AsyncStorage.setItem('rolename' , '')
    AppConstance.ROLENAME = ''
  
    AsyncStorage.setItem('userprofilepic' , '')
    AppConstance.USERPHOTO = ''
    
    AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
         this.setState({drawerview : false})
    this.props.navigation.navigate('AppDrawer1');
  
      }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
   
    this.props.navigation.goBack();
    return true;
  }


  sendContactUsData = () => {
    if (this.state.fulName.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.email.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.phone.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.message.trim().length == 0) {
      alert('dont leave it blank');
    } else {
      
          var formData = new FormData();
          formData.append('name', this.state.fulName);
          formData.append('email', this.state.email);
          formData.append('phone', this.state.phone);
          formData.append('message', this.state.message);

          fetch(AppUrlCollection.CONTACT_US, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'
 
              // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('Contact Us Resposne :: ', responseJson);
            })
            .catch((error) => {
              console.warn(error);
            });
       
  
    }
  };

  

  render() {
    return (
      <SafeAreaView style={{

        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
   }}>



                 <Appbar
                            style={{
                              
                              backgroundColor:AppColors.AppColor,
                        flexDirection:'row',
                        width:deviceWidth,
                        justifyContent:'space-between',
                            padding:10,
                            elevation:0,

                        }}
                        >  


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"flex-start",justifyContent:'center', alignItems:"flex-start"}}
                                  onPress={() => this.props.navigation.goBack()}
        >


<Ionicons name='md-chevron-back-outline'  color='white' style={{alignSelf:'center'}} size={30}/> 

                 
                </TouchableOpacity>


        <TouchableOpacity 
                    style={{position:'absolute',marginHorizontal:'40%', alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    {/* <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                /> */}
                <Text style={{fontWeight:'bold',fontSize:16 ,color:'white'}}>Contact Us</Text>
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            

            >
               
             </TouchableOpacity>
     
      </Appbar>


      <View style={{backgroundColor:AppColors.AppColor, justifyContent:'center', height:deviceHeight*0.25}} >
        <Image source={require('../Images/logotransparent.png')} style={{height:'100%' ,alignSelf:'center', width:'100%'}} />

      </View>

      <View style={{backgroundColor:'white',marginTop:-15, paddingHorizontal:'3%',paddingVertical:'5%', borderTopLeftRadius:20,borderTopRightRadius:20}} >
      
      {/* <View style={{backgroundColor:'red', flexDirection:'row', justifyContent:'space-around'}}>

      <View style={{ height:deviceHeight*0.07, justifyContent:'center', backgroundColor:'yellow', borderRadius:500/2}}>

      <Image 
           style={{marginLeft:5, alignSelf:"center",width:40, height:40}} resizeMethod='resize' resizeMode='contain'
           source={require('../Images/telephone.png')}></Image>

      </View>

<Image 
           style={{marginLeft:5, alignSelf:"center",width:180,height:180}}
           source={require('../Images/telephone.png')}></Image>

<Image 
           style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/telephone.png')}></Image>


           </View> */}

      
      <Text style={{fontSize:20,alignSelf:'center', fontWeight:'bold'}}>Contact Infromation</Text>
      <View style={{height:2,marginTop:8, backgroundColor:'#ECF0F1', width:deviceWidth*0.95,  alignSelf:'center'}}>
        </View>
    
  
      <View style={{flexDirection: 'row', marginHorizontal:14,marginTop: 20, marginBottom: 10}}>
            <MaterialCommunityIcons
              style={{alignSelf: 'center'}}
              name="map-marker"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 4,
                
                
              }}>
5030 Firestone Blvd 
South Gate, CA 90280</Text>
          </View>

      <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
          <Image 
           style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/telephone.png')}></Image>

          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft:15,
              }}>
(949) 677-4946 
       </Text>
       </View>
          </View>

      <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
            <MaterialCommunityIcons
              name="email-outline"
              style={{marginLeft:5}}
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft: 15,
              }}>
info.americanshippingtowing@gmail.com</Text>
          </View>

      </View>




                       
       


    
      </SafeAreaView>
    );
  }
}
export default ContactUsOne;