import React, { Component } from 'react';
import { View, Text,Modal, TouchableOpacity, ImageBackground,TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, FlatList } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InnerToolbar from "../screens/InnerToolbar";
import AppMainStylesSheet from '../styles/AppMainStylesSheet';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';


class LocationServiceOne extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  

        this.state = {
            isLoading: false,
            saveYadData: [],
            drawerview:false,

          
        }
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
       
        this.props.navigation.goBack();
        return true;
      }
   
  /*  callingYardAPI = () => {
        this.setState({ isLoading: true })
        let url = AppUrlCollection.GET_YARD
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log('Invocie ::', responseJson)
                if (responseJson != undefined && responseJson != null && responseJson != '') {
                    let value = responseJson.replace(/<\/?[^>]+(>|$\n)/g, '')
                    let newVal = JSON.parse(value)
                    this.setState({ isLoading: false })
                    this.setState({ saveYadData: newVal })
                    console.log('Invocie dadasdasdd::', JSON.parse(value))
                } else {
                }
                // if (responseJson.length > 0) {
                //     this.setState({ saveYadData: responseJson })
                // } else {
                //     this.setState({ saveYadData: [] })
                //     AppConstance.showSnackbarMessage('Data not found')
                // }
            })
            .catch((error) => {
                console.warn(error)
            });
    }*/
   

    renderYardCell = ({ item, index }) => {
        return (
            <View>
                <Text style={[styles.addressTextStyle, { marginBottom: 5,  fontSize: 16 }]}>{item.title}</Text>
                <Elavation
                    elevation={3}
                    style={styles.appHeaderElavationStyle}
                >
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='map-marker-circle'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.address}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='email-outline'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.email}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='phone'size={21} />
                        <Text style={styles.addressTextStyle}>{item.phone}</Text>
                    </View>

                </Elavation>
                <View style={{ marginTop: 25 }} />
            </View>

        );
    }

    render() {
        return (
          <SafeAreaView style={styles.screen}>




                 <Appbar
                            style={{backgroundColor:AppColors.Headercolor,
                        flexDirection:'row',
                        width:deviceWidth,
                        backgroundColor:AppColors.Headercolor,
                        justifyContent:'space-between',
                            padding:10,
                            elevation:0,

                        }}
                        >  


        <TouchableOpacity 
                    style={{width:60,height:60 ,justifyContent:'center', alignContent:"flex-start", alignItems:"flex-start"}}
                    onPress={() => this.props.navigation.goBack()}
                    >
                               <Ionicons name='md-chevron-back-outline'  color='grey' style={{alignSelf:'center'}} size={30}/> 
            
                </TouchableOpacity>


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    {/* <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                /> */}
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            // onPress={() => this.setState({drawerview:true})}         

            >
              
             </TouchableOpacity>
     
      </Appbar>





             <DialogLoader loading={this.state.isLoading} />

                <ScrollView>

              
               {/* <ImageBackground 
                  style={{flex:1,
                    width: null,
                    height: null,
                    resizeMode:'contain',
marginHorizontal:10                  
                  
                } }

               
                 source={require('../Images/logo_final.png')}
                > */}






          
<Text style={{fontSize:16, marginTop:18, fontWeight:'600',marginBottom:5, marginLeft:0,}}>{`\u2022 AMERICAN SHIPPING & TOWING COMPANY `}</Text>
               
               <View style={{marginHorizontal:0,borderRadius:7,borderWidth:0.7, marginHorizontal:5, borderColor:'grey', paddingHorizontal:7,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           
                                 <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:30,height:30}}
                          source={require('../Images/phonelocation2.png')}></Image>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               width:'85%',
                               marginLeft: 5,
                               
                             }}>5030 Firestone Blvd 
                             South Gate, CA 90280</Text>
                         </View>
                         {/* <View style={{flexDirection: 'row',marginLeft:0, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                         <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:37,height:37}}
                          source={require('../Images/timelocation2.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
              MON – FRI     9:00 AM - 6:00 PM
                      </Text>
               
                      <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
               
                             }}>
                  Sat:                 9:00 AM - 2:00 PM
                        </Text>
                      </View>
                         </View> */}


                         
                         <View style={{flexDirection: 'row',marginLeft:3, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
              
                       <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:35,height:35}}
                          source={require('../Images/phonelocation3.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
              (949) 677-4946 
                      </Text>
               
                     
                      </View>
                         </View>

                         <View style={{flexDirection: 'row',marginLeft:6, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                        
                        <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:30,height:30}}
                          source={require('../Images/emaillocation2.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:0, marginTop: 2, marginBottom: 2}}>
                          
               
                      <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
              info.americanshippingtowing@gmail.com
                      </Text>
                      </View>
                         </View>
                        
                      
                        
                       </View>
               
               
               {/* </ImageBackground> */}
                       
                       

                       <Text style={{ fontSize:14,marginTop:15,fontWeight:'600', marginBottom:5, marginLeft:10,}}>{`\u2022 New Jersey (NJ), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Houston (TX), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Savannah (GA), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 BALTIMORE, USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 California (CA), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Amaya used cars TR, Sharjah-UAE`}</Text>
        
  

                </ScrollView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    addressTxtHeader: {
         color: AppColors.textColor,
        fontSize: 15, height: 80, textAlign: 'center', textAlignVertical: 'center'
    },
    screen:{

      flex:1,
      height:deviceHeight,
      width:deviceWidth,
      backgroundColor:'white'
   },
    appHeaderElavationStyle: {
        width: deviceWidth * 0.9,
        paddingLeft: 15, paddingRight: 15,
        borderRadius: 10, marginBottom:200,
    },
    appHeaderEmailmainViewStyle: {
        flexDirection: 'row',
        paddingTop: 15, paddingBottom: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    addressTextStyle: {
        fontSize: 15, color: AppColors.textColor,
        marginLeft: 8
    },
    addressDividerStyle: {
        width: deviceWidth * 0.80,
        height: 0.5, backgroundColor: AppColors.toolbarColor,
        alignContent: 'center', alignItems: 'center',
        justifyContent: 'center', alignSelf: 'center'
    }
})

export default LocationServiceOne;