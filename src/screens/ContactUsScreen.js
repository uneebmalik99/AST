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
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import AppColors from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';


class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      fulName: '',
      email: '',
      phone: '',
      message: '',
    };
  }



  
  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
   
    this.props.navigation.goBack(null);
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



      // NetInfo.fetch().then((state) => {
      //   if (state.isConnected == true) {
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
      // });
    // }
  };

  

  render() {
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white', width:deviceWidth}}>
      <Appbar
                            style={{backgroundColor:AppColors.Headercolor,
                        flexDirection:'row',
                        width:deviceWidth,
                        backgroundColor:'white',
                            justifyContent:'space-between',
                            padding:10,

                        }}
                        >  


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                                  onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    <Image source={ require('../Images/logo_final.png')} 
                    style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                />
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            onPress={() => {
                this.props.navigation.openDrawer();

                // this.props.navigation.dispatch(DrawerActions.openDrawer());

                // this.props.navigation.navigate('RightDrawer')
            }}
            >
                 <Image source={ require('../Images/baru.jpg')} 
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
                           </Appbar>

           
                     
        {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='cover' style={{ width: deviceWidth, height: deviceHeight * 0.95, position: 'absolute' }} /> */}
                


        <View style={{flex: 1}}>
          



        <View style={{flexDirection: 'row',  backgroundColor: '#ccd1d1',
 paddingHorizontal:9, paddingTop: 8, paddingBottom: 8}}>
          
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 5,
              }}>We provides 24/7 assistance to our customer.
For sales,auction account towing,loading and shipping,please contact us</Text>
          </View>



          <View style={{flexDirection: 'row',marginHorizontal:10,marginTop: 10, marginBottom: 10}}>
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
1207 12th Floor,Centurion Star Tower,Block A,Opp Deira City Center,Port Saeed,Po Box 172497,Dubai,United Arab Emirates</Text>
          </View>





          <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
           
           <Image 
           style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/wall-clock.png')}></Image>

           
            
          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 15,
              }}>
Mon-Thur      9.00 am - 6.00 pm
       </Text>

       <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 15,

              }}>
Sat:                9.00 am - 2.00 pm 
       </Text>
       </View>
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
+971-4-224-9714
       </Text>

       <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft: 15,
              }}>
+971-4-224-9715
       </Text>
       </View>
          </View>














          <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
            <MaterialCommunityIcons
              style={{ marginLeft:5, alignSelf: 'center'}}
              name="fax"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft:15,
              }}>
+971-4-224-9718
</Text>
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
24seven@aslshippingline.com</Text>
          </View>

         
        </View>
      </SafeAreaView>
    );
  }
}
export default ContactUsScreen;