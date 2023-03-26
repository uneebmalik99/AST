import React, { Component } from 'react';
import { View,Modal,ScrollView,ImageBackground, SafeAreaView, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,  BackHandler, ActivityIndicator, AppState, Platform } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import AppMainStylesSheet from "../styles/AppMainStylesSheet";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

class WishListScreen extends Component {
    constructor(props) {
        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.state = {
            isLoading: false,
            page: 0,
            isFooterCalling: false,
            isStopService: true,
            drawerview:false,
            appstate: AppState.currentState,
            ourServiceList: [
                // {
                //     title: 'Diwali Wishing',
                //     detail: 'We offer fully integrated custom logistic service for freight transportation on LTL and FTL to/from anywhere in the USA. We can integrate all of your transportation needs into a simple and cost effective solution to ensure a safe and rapid delivery for all your valuable goods.'
                // }, {
                //     title: 'Eid Wishing',
                //     detail: 'We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'We provide a comprehensive U.S customs clearance service, ensuring speedy delivery of your cargo to its final destination. We help you to prepare all required documents..'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'As part of our comprehensive logistics solutions, we also offer our clients a range of warehousing services. Two warehouses in New York and Florida are in your service.'
                // }, {
                //     title: 'Edi Wishing',
                //     detail: 'We provide internet tracking and tracing to all out customers. Our custom made tracking solution provides complete cargo and shipping information.'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'Here at GALAXY SHIPPING we can help you with  purchasing your brand new or used vehicle, boat,bike,ATV and so on.   Custom made cars and trucks are made to order thru our licensed used car  dealer GALAXY USED CARS LLC.'
                // },
            ]
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.callingnotificationsApi()
        // this.setState({ isLoading: true })
        // fetch(AppUrlCollection.ANNOUCMENT, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authkey': AppConstance.USER_INFO.USER_TOKEN
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({ isLoading: false })
        //         console.log('sdsadada ', responseJson)
        //         if (responseJson.status == AppConstance.API_SUCESSCODE) {
        //             this.setState({ ourServiceList: responseJson.data })
        //         } else {
        //             AppConstance.showSnackbarMessage(responseJson.message)
        //         }
        //     })
        //     .catch((error) => {
        //         console.warn(error)
        //     });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        
            this.props.navigation.goBack();
            return true;
        
    }

    renderOurServiceContent = ({ item, index }) => {
        const regex = /(<([^>]+)>)/ig;
const result = item.message.replace(regex, '');
        return (
            <View
            style={{margin:5, backgroundColor:'#F5F5F5',borderWidth:0.5,borderColor:'#E8E8E8', borderRadius:10, padding:2}}
                // onPress={() => this.props.navigation.push('AnnoucementDetailScren', { 'itemObj': item })}
                >
                <Elavation
                    elevation={1}
                    style={{ flexDirection: 'row', width: deviceWidth * 0.95, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
                       
                        <Text style={{ color: AppColors.textColor,fontStyle:'oblique', fontSize: 15 }}>{item.subject}</Text>
                        <Text style={{ color: AppColors.textColor, fontSize: 14, marginTop: 9 }}   ellipsizeMode='tail'>{result}</Text>
                        {/* <TouchableOpacity>
                        <Text style={{  fontSize: 14, color: AppColors.toolbarColor, textAlign: 'right' }}>View More...</Text>
                        </TouchableOpacity> */}
                    </View>
                </Elavation>
            </View>
        );
    }

    callingnotificationsApi = () =>{

        // this.setState({ isLoading: true })
     fetch(AppUrlCollection.ANNOUCMENT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                'source' : 'asl_phone_app',
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('sdsadada ', responseJson)
                if (responseJson.data) {
                    this.setState({ isLoading: false })

                    this.setState({ ourServiceList: responseJson.data })
                } else {
                    this.setState({ isLoading: false })

                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
                this.setState({ isLoading: false })

            });
    
    }


    render() {
        return (
          

<SafeAreaView style={{ flex:1,
   height:deviceHeight,
   width:deviceWidth,
   backgroundColor:'white'}}>
                <DialogLoader loading={this.state.isLoading} />

<Modal 
visible={this.state.drawerview}
animationType='fade'
>
    <SafeAreaView>
<ScrollView>


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
                    style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                                  onPress={() =>{ this.setState({drawerview:false}); this.props.navigation.navigate('DashboardScreen') }}
        >
                    <Image source={ require('../Images/logo_final.png')} 
                    style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                />
                </TouchableOpacity>


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                />
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            onPress={() => this.setState({drawerview:false})}        

            >
                 <Image source={ require('../Images/d-2.png')}
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
     
      </Appbar>




<Header


 style={{ width:"105%", height:130}}>

<ImageBackground source={ require('../Images/image.png')} 
            style={{ width: "104%", height:130,justifyContent:'center'  }} 
           >
               <Image 
                           style={{ width: '50%',alignSelf:'center', height:'50%',  }}
                        
                           resizeMethod='resize'
                           resizeMode='contain' 

               source={{ uri:AppConstance.USERPHOTO }}

           
               />
               <Text style={{alignSelf:'center',marginTop:5, fontSize:15, color:'white'}}>{AppConstance.USERNAME}</Text>
               <Text style={{alignSelf:'center',fontSize:13, color:'white'}}>{AppConstance.ROLENAME}</Text>
               </ImageBackground>
<Left/>
<Body>
</Body>
<Right />
</Header>
<Content>
<List>


<ListItem noBorder
 style={{height:40, marginTop:10,
   }}
onPress={() => { this.setState({drawerview:false});this.props.navigation.navigate('DashboardScreen')}} selected>
<Image source={ require('../Images/d.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{ fontSize:14, color:'black', marginLeft:10}}>DASHBOARD      </Text>

</ListItem>
<ListItem noBorder
style={{height:40,
}}
 onPress={() => { this.setState({drawerview:false});this.props.navigation.navigate('VehicleScreen')}} selected>
<Image source={ require('../Images/car.png')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>VEHICLE</Text>        

</ListItem>
<ListItem noBorder
style={{height:40,
}}
onPress={() =>  { this.setState({drawerview:false});this.props.navigation.navigate('Container1')}} selected>
<Image source={ require('../Images/ww.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTAINER</Text>        

</ListItem>
<ListItem noBorder
style={{height:40,
}}
onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('Accounts')}} selected>
<Image source={ require('../Images/acc.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>ACCOUNT</Text>        

</ListItem>

<ListItem noBorder
style={{height:40,
}}
onPress={() =>  {this.setState({drawerview:false}); this.props.navigation.navigate('OurServiceOne')}} selected>
<Image source={ require('../Images/j.jpeg')} 
            style={{  width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>SERVICES</Text>        

</ListItem>

<ListItem noBorder
style={{height:40,
}}
onPress={() =>{this.setState({drawerview:false}); this.props.navigation.navigate('ContactUsOne')}} selected>
<Image source={ require('../Images/c.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTACT US </Text>        

</ListItem>


<ListItem noBorder
style={{height:40,
}}
onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('Notification')}} selected>
<Image source={ require('../Images/ann.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUCMENT </Text>        
<View style={{backgroundColor:'grey',padding:0,paddingHorizontal:8, borderRadius:10,}}>
    <Text style={{color:'white', fontSize:12}}>{AppConstance.NOTIFICATIONCOUNTER}</Text>
</View>
</ListItem>


<ListItem noBorder
    style={{height:40,
    }}
onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('LocationServiceOne')}} selected>
   
<Image source={ require('../Images/w.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>OUR LOCATION</Text>        

</ListItem>

<ListItem noBorder
    style={{height:40,marginTop:25, marginBottom:20,
    }}
     onPress={() =>  this.Logout()}>

<Image source={ require('../Images/l.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, marginLeft:10}}>LOGOUT</Text>        

</ListItem>







</List>
</Content>
</ScrollView>
</SafeAreaView>

</Modal>


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
                                            style={{width:60,height:60 , justifyContent:'center'}}
                                                          onPress={() =>{ this.props.navigation.goBack()}}
                                >
                                            <Ionicons name='ios-chevron-back' color='grey' size={30}/> 
                                        </TouchableOpacity>


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                />
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            onPress={() => this.setState({drawerview:true})}         

            >
                 <Image source={ require('../Images/d-2.png')}
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
     
      </Appbar>


                {/* {this.props.isOuterCalling ?
                    
                    
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    
                        <Toolbar headerName={'Announcement'} />
                    </View> :
                    <InnerToolbar headerName={'Announcement'} />} */}
                <View style={{  }}>

              



                <View 
                    style={{width:"100%",height:100}}>
                 <Image
                        source={require('../Images/announcment.jpg')}
                          style={{width:"100%", alignSelf:'center', 
                           height:90
                        ,}}
                        />
                        </View>
                    <FlatList
                        data={this.state.ourServiceList}
                        style={{ paddingTop: 10, paddingBottom: 40, marginBottom:180 }}
                        renderItem={this.renderOurServiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ListFooterComponent={() => <View style={{ width: 1, height: 10 }} />}
                    />
                  
                </View>

            </SafeAreaView>
        );
    }
}
export default WishListScreen;