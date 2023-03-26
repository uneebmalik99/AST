import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, AppState, BackHandler, Image, ScrollView, AsyncStorage, FlatList } from 'react-native';
import { View,SafeAreaView, Modal, Text, TouchableOpacity, AppState, BackHandler, Image, ImageBackground,ScrollView, FlatList } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import AppMainStylesSheet from "../styles/AppMainStylesSheet";
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

 export default class OurServiceOne extends Component {
    constructor(props) {

        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.state = {
            appstate:AppState.currentState,
            drawerview:false,

            ourServiceList: [
                {
                    image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/ground-trasportation-1-694-458.jpg',
                    title: 'Ground Transportation',
                    detail: 'We offer fully integrated custom logistic service for freight transportation on LTL and FTL to/from anywhere in the USA. We can integrate all of your transportation needs into a simple and cost effective solution to ensure a safe and rapid delivery for all your valuable goods.'
                }, {
                    image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/Towing-694-458.jpg',
                    title: 'Auto Shipping',
                    detail: 'We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it'
                }, {
                    image: 'http://vertical.gwwshipping.com/wp-content/uploads/2019/03/custom-clearence-694-458-1.jpg',
                    title: 'Customs Clearance',
                    detail: 'We provide a comprehensive U.S customs clearance service, ensuring speedy delivery of your cargo to its final destination. We help you to prepare all required documents..'
                }, {
                    image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Warehousing-694-458.jpg',
                    title: 'Warehousing',
                    detail: 'As part of our comprehensive logistics solutions, we also offer our clients a range of warehousing services. Two warehouses in New York and Florida are in your service.'
                }, {
                    image: 'http://gwwshipping.com/wp-content/uploads/2019/03/Loading-694-458.jpg',
                    title: 'Tracking and Tracing',
                    detail: 'We provide internet tracking and tracing to all out customers. Our custom made tracking solution provides complete cargo and shipping information.'
                }, {
                    image: 'http://gwwshipping.com/wp-content/uploads/2019/03/services-transport-01-694-458.jpg',
                    title: 'Car Sales',
                    detail: 'Here at GALAXY SHIPPING we can help you with  purchasing your brand new or used vehicle, boat,bike,ATV and so on.   Custom made cars and trucks are made to order thru our licensed used car  dealer GALAXY USED CARS LLC.'
                },
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
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress =()=>{
       
            this.props.navigation.goBack();
            return true;
        
    }

    renderOurServiceContent = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigate.navigation.push('OurServiceDetailScreen', { 'itemObj': item })}>
                <Elavation
                    elevation={1}
                    style={{ flexDirection: 'row', width: deviceWidth * 0.95, height: 120, borderRadius: 10, marginBottom: 10 }}>
                    <Image source={{ uri: item.image }} style={{ flex: 0.5, height: 120, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} />
                    <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
                        <Text style={{  color: AppColors.textColor, fontSize: 15 }}>{item.title}</Text>
                        <Text style={{ color: AppColors.textColor, fontSize: 14, marginTop: 5 }} numberOfLines={4} ellipsizeMode='tail'>{item.detail}</Text>
                        <Text style={{  fontSize: 10, color: AppColors.toolbarColor, textAlign: 'right' }}>Read More..</Text>
                    </View>
                </Elavation>
            </TouchableOpacity>
        );
    }

    render() {
        return (
          <SafeAreaView style={{   flex:1,
            height:deviceHeight,
            width:deviceWidth,
            backgroundColor:'white'}}>

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
                              {/* <Image  source={require('../Images/home-icon-23.png')}
                              style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                          /> */}
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
             
          <Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUNCEMENT </Text>        
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
                              style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                              onPress={() => this.props.navigation.navigate('DashboardScreen')}
                              >
                              <Image source={ require('../Images/logo_final.png')} 
                              style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                          />
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
                      
                      onPress={() => this.setState({drawerview:true})}         
          
                      >
                           <Image source={ require('../Images/d-2.png')}
                      style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
                     />
                       </TouchableOpacity>
               
                </Appbar>
          
          


<ScrollView>


                 <Image
                        source={require('../Images/sdfgsddd.png')}
                          style={{width:"100%", alignSelf:'center', 
                           height:100
                        ,}}
                        />
               <ImageBackground style={{     position: 'relative',}}
                  source={require('../Images/bgimage.jpeg')}
      >
        
      <View style={{width:deviceWidth }}>
            <Text
              style={{
                fontSize: 15,
                paddingVertical: 20,
                paddingHorizontal: 15,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              Amaya worldwide shipping is serving customer since 2002.As cars in
              US tend to have the lowest prices globally,naturally,the most
              popular export goods from the US are cars.An average,we export
              more than five thousand cars from USA in a month and mostly cars
              go to Gulf countries.We are offering best shipping rate and 24/7
              servies our customer around the world.
            </Text>

            <Text style={{paddingHorizontal: 15}}>Our servies include:</Text>

            {/* <Unorderedlist><Text>Buy some things</Text> */}

            <Text style={{marginTop: 20, paddingHorizontal: 15}}>
              • Create account in Auction
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Car purchase
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Create account in Auction
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Car Towing across US
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Car warehousing before export
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Make export documentation
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Car shipping in containers
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Car shipping in roro carries
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Custom clearance in UAE
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Transpiration in UAE
            </Text>

            <Text style={{marginTop: 5, paddingHorizontal: 15}}>
              • Warehousing in Sharjah
            </Text>

            <Text style={{marginTop: 17, paddingHorizontal: 15}}>
              You can use our website as well as Android and IOS application to
              track your shipment.
            </Text>

            <Text style={{marginTop: 13, marginBottom:30, paddingHorizontal: 15}}>
              For Further details, contact our pro
            </Text>
            </View>
            </ImageBackground>
            </ScrollView>

          </SafeAreaView>
        );
            
      
    }
}