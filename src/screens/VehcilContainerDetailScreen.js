import React, { Component } from 'react';
import { View, Dimensions,ImageBackground, SafeAreaView, Modal, Text,ImageSlider, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, Share, BackHandler, Platform } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import renderIf from './renderif';
import { SliderBox } from "react-native-image-slider-box";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import Slideshow from 'react-native-image-slider-show-razzium';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Chevron, Heart, Triangle } from 'react-native-shapes'


const images1 = [

    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
    // require('../Images/car_image1.jpg'),
    // require('../Images/car_image2.jpg'),
    // require('../Images/download.jpg'),
    // require('../Images/download1.jpg')
];


let source = {uri:'', cache:true}


let vehicleObj = null;
let locationList = []
var baseImagePath = null;
var isCallingWithoutLogin = ''
var Exportdata = ''

let imageBasePath = null;


const index = 0;
const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];


class VehcilContainerDetailScreen extends Component {

    constructor(props) {
        super(props);
        vehicleObj =  props.route.params.vehicleObj;
     
        this.state = {

            exortList: [

            ],
            drawerview:false,

            imagesq: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",
              ],

            Exportdata,
            img:false,
            isLoading: false,
            tabIndex: 0,
            V_cr:false,
            CDChanger:false,
            routes:[
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
              ],
            index:0,
            GPSNavigationSystem:false,
            SpareTireJack:false,
            WheelCovers:false,
            Radio:false,
            CDPLAYER:false,
            SPEAKER:false,
            WHEELCAPS:false,
            MIRROR:false,
            OTHERS:false,

            frontwindshiled:0,
            bonnet:0,
            grill:0,
            frontbumper:0,
            frontheadlight:0,
            rearwindshield:0,
            trunkdoor:0,
            rearbumper:0,
            rearbumpersupport:0,
            taillamp:0,
            frontleftfender:0,
            leftfrontdoor:0,
            leftreardoor:0,
            leftrearfender:0,
            pillar:0,
            roof:0,
            rightrearfender:0,
            rightreardoor:0,
            rightfrontdoor:0,
            frontrightfender:0,
            fronttyres:0,

            Featureshow:true,
            V_PDF:false,
            V_VEHICLEDETAIL:true,
            V_Export:false,
            isInternetNotConnected: false,
            images: [],
            imageSLiderPos: 0,
            isConnected:true,
            vehicleDetail: [],
            vehicle_conditions:[],
            invoice_pdf : '',
            show:false,
            showimagemodel : false,
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

        this.callingVehicleDetailApi();
        

    }
  
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    callingExportApin=() =>{
        fetch(AppUrlCollection.EXPORT_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'source' : 'asl_phone_app',
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoding: false })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    imageBasePath = responseJson.data.other.export_image
                    console.log('image da ', responseJson)
                    this.setState({ exortList: responseJson.data.export })

                } else {

                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                
                console.warn(error)
            });
    }

    callingVehicleDetailApi = () => {
       
        this.setState({isLoading:true})
            fetch(AppUrlCollection.VEHICLE_DETAIL  + vehicleObj.id, {
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
                    console.log(responseJson)
                  
                    if (responseJson.data != '') {
                        // alert(responseJson.data.vehicle_conditions[3])
                        this.setState({ vehicleDetail: responseJson.data , vehicle_conditions:responseJson.data.vehicle_conditions })
                       source.uri = '';


                  
                       if(responseJson.data.invoice_photos.length > 0){
                        source.uri = responseJson.data.invoice_photos[0].url
                        this.setState({show: true})
                       }else{
                        this.setState({show: false})
   
                       }


                       if(responseJson.data.vehicle_features != null || responseJson.data.vehicle_features != undefined || responseJson.data.vehicle_features!= ''){
                        // alert(item.vehicle_features.length)
                        // alert(item.vehicle_features[0])''
                        for (var key in responseJson.data.vehicle_features) {
                          console.log("key " + key + " has value " + responseJson.data.vehicle_features[key]);
                        let element = key
                        
                          switch(element) {
                            case "3":
                              // alert('hj')
                              this.setState({CDChanger:true})
                            //   setCDChanger(3)
                                break;
                        
                            case "4":
                            //   setGPSNavigationSystem(4)
                              this.setState({GPSNavigationSystem:true})

                              break;
                            case "5":
                                // setSpareTireJack(5)
                                this.setState({SpareTireJack:true})

                              break;
                              case "6":
                                // setWheelCovers(6)
                                this.setState({WheelCovers:true})

                              break;
                              case "7":
                                // setRadio(7)
                                this.setState({Radio:true})

                              break;
                              case "8":
                                // setCDPLAYER(8)
                                this.setState({Radio:true})

                              break; 
                               case "10":
                                //  setMIRROR(10)
                                 this.setState({MIRROR:true})

                              break;
                              case "11":
                                //   setSPEAKER(11)
                                  this.setState({SPEAKER:true})

                                break;
                              case "12":
                                // setOTHERS(12)
                                this.setState({OTHERS:true})

                              break;
                             
                        
                            default:
                          
                            }
                        }
                        
                          for(var i=0; i<responseJson.data.vehicle_features.length; i++){
                            // alert('h')
                            let element = responseJson.data.vehicle_features[i];
                            console.log('-----------'+element);
                        // alert(element)
                          
                          }
                        }


                      



                        
                        let vehicleDetailObj = responseJson.data;
                        console.log('Loation testing list ::', vehicleDetailObj)
                        this.setState({ images: [] })
                       

                        


                        // var a =[];
            
                        for (let index = 0; index < responseJson.data.photos.length; index++) {
                            const element = responseJson.data.photos[index].thumbnail;
                            // this.state.images.push(element.url)

                            this.state.images.push(element)
                            // var b ={};
                            // b.url = element
                            // a.push(b)
                        }

                        // this.setState({images:a})
// alert(JSON.stringify(this.state.images))
                        this.setState({ isLoading: false })

                        // this.setState({ images: this.state.images })
                    } else {
                        AppConstance.showSnackbarMessage(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                    this.setState({ isLoading: false })

                });
        


              
                    


    }

    renderVehicleDetail = ({ item, index }) => {
        if (this.state.V_VEHICLEDETAIL == true) {
            // {renderIf(this.state.V_VEHICLEDETAIL)(
               return <View

            >
             
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>

             <Elavation
                 elevation={4}
                     style={{ width: deviceWidth * 0.95, backgroundColor: AppColors.white, marginBottom: 7, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10, padding: 10 }}
                 >
                     <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}> Vehicle : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicle}</Text>
                        </View>


                         <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Color : </Text>
                           <Text style={styles.detailValueTxtStyle}>{item.color}</Text>
                     </View>

          

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Make : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>model : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.model}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>keys : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Towing Titles : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towing_titles}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>towing date </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towingDate}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Delivered date</Text>
  <Text style={styles.detailValueTxtStyle}>{item.deliveredDate}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Location </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towLocation}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towAmount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Storage </Text>
  <Text style={styles.detailValueTxtStyle}>{item.storage}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title Type   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleType}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title status   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleStatus}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleAmount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title no.  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleNo}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title State  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleState}</Text>
</View>

                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicleLocation}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Lot NO : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.lotNo}</Text>
                       </View>



                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Vin : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.vin}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Keys : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
                     </View>
                     </View>
                 </Elavation>
         </View>
          
          // )}
    } 
//     else  if (renderIf(this.state.V_VEHICLEDETAIL)
//         ) {
//             // return <View>

//             // <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
//             // <Elavation
//             //        elevation={4}
//             //        style={styles.dataChildViewElavationContainer}
//             //    >
//             //         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontWindshiled}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.bonnet}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>grill</Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.grill}</Text>
//             //           </View>

   
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontBumper}</Text>
//             //           </View>


//             //             <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.fromHeadLight}</Text>
//             //            </View>
                      

//             //             <View style={styles.detailMainViewStyle}>
//             //                 <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearWindshield}</Text>
//             //         </View>


//             //         <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
//             //                <Text style={styles.detailValueTxtStyle}>{item.trunkDoor}</Text>
//             //             </View>


//             //     <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumper}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumperSupport}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.tailLamp}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontLeftFendar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.pillar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>roof</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.roof}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearFinder}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontRightFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontTyres}</Text>
//             //        </View>


//             //         </View>
//             //    </Elavation>
//             // </View>
   
// } else if (index == 2) { 
//     }else{
//         alert('hj');
  //  }
    }

    switchTabWithScoll = (tabIndex, tabTitle) => {
        let scrollIndex = 0;
        for (let index = 0; index < this.state.vehicleDetail.length; index++) {
            const element = this.state.vehicleDetail[index];
            console.log('tabIndex id ', tabTitle.toUpperCase() + ' == ' + element.tabTitle.toUpperCase())
            if (tabIndex == 0 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 0 })
                break;
            } else if (tabIndex == 1 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 1 })
                break;
            } else if (tabIndex == 2 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 2 })
                break;
            } else if (tabIndex == 3 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 3 })
                break;
            }
        }
        setTimeout(() => this.refs.flatList.scrollToIndex({ animated: true, index: scrollIndex }));
    }


    saveImageFromLocal = () => {
        Share.share({
            message: this.state.images[this.state.imageSLiderPos],
            url: this.state.images[this.state.imageSLiderPos], // add image array 
            title: 'Galaxy APP' // add link 
        }, {
                // Android only:
                dialogTitle: 'Share BAM goodness',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
        // CameraRoll.saveToCameraRoll(this.state.images[0], 'photo')
    }

    scrollFlatList = (e) => {
        let offset = e.nativeEvent.contentOffset.y;
        let index = parseInt(offset / 300);   // your cell height
        this.setState({ tabIndex: index })
         if (index == 3) {
            this.refs.headingScrollView.scrollToEnd({ animated: true });
         } else if (index == 1 || index == 2) {
         this.refs.headingScrollView.scrollTo({ x: 0, y: 0, animated: true })
         }
    }

    render() {

        return (
            <SafeAreaView style={styles.screen}>


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
            

            <Modal
        visible={this.state.showimagemodel}
        animationType='fade'
        >
            <View style={{ justifyContent:'center',backgroundColor:'black', height:deviceHeight}}>
                <View style={{backgroundColor:'black'}}>
                {/* <Slideshow 
                height={deviceHeight*0.65}
                   dataSource={this.state.images}/> */}
                   <SliderBox 
          images={this.state.images}
          sliderBoxHeight={deviceHeight*0.3}
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => {
   }} 
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}
        />
        
            <TouchableOpacity 
            onPress={()=> { this.setState({showimagemodel: false})}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
            
                    
            <Appbar
                                        style={{backgroundColor:AppColors.Headercolor,
                                    flexDirection:'row',
                                    width:deviceWidth,
                                    backgroundColor:'white',
                                    justifyContent:'space-between',
                                        height:70,
                                        paddingHorizontal:'3%',
                                        paddingVertical:5,
                                        elevation:0,

                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.22,
                                        shadowRadius: 2.22,
                                        
                                        elevation: 3,
                                       
                                    }}
                                    >  
            
            
                                    <TouchableOpacity 
                                            style={{justifyContent:'center'}}
                                                          onPress={() =>{ this.props.navigation.goBack()}}
                                >
                                            <EvilIcons name='arrow-left' color='grey' size={45}/> 
                                        </TouchableOpacity>
            
            
                    <TouchableOpacity 
                                style={{alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                            //   onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >
                        <View >
                            <Text style={{color:'grey', fontSize:15}}>Used {this.state.vehicleDetail.year}</Text>
                        </View>
                        <View >
                              <Text style={{fontWeight:'600', fontSize:16}}>{this.state.vehicleDetail.make +" "+ this.state.vehicleDetail.model}</Text>

                        </View>
                               
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                           borderWidth:0, borderColor:'grey',borderRadius:400/2, justifyContent:'center', height:35,width:35,
                         alignContent:"flex-end",
                        }  
                        }
                        
                        onPress={() => {}}         
            
                        >
                           
                         {/* <Ionicons name='ios-heart-sharp' color='red' style={{alignSelf:'center'}} size={20}/>  */}

                        

                         </TouchableOpacity>
                 
                  </Appbar>
            
            

                <DialogLoader loading={this.state.isLoading} />

        <ScrollView>


    {this.state.images.length > 0 ? (
        <View style={{width:"100%" ,marginTop:5}}
        >

<SliderBox 
          images={this.state.images}

          sliderBoxHeight={deviceHeight*0.3}
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => {
   }} 
   onCurrentImagePressed={index =>
    this.setState({showimagemodel:true})
  }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}
        />

</View>

      ) : (

          <View style={{width:"100%", marginTop:5, height:deviceHeight*0.25}}>
          <Image source={ require('../Images/logo_final.png')} 
         style={{ height:'100%',width:'100%',  alignSelf: 'center', }} resizeMode='stretch' resizeMethod='resize'
        />
      
       </View>
      )}



    {vehicleObj != undefined && vehicleObj != '' ?

            <View style={{height:deviceHeight*0.2,justifyContent:'center', borderBottomWidth:3, borderColor:AppColors.AppColor}}>


            <View style={{width:deviceWidth, height:'50%',justifyContent:'center', paddingHorizontal:'4%', }}>

                <View style={{ flexDirection:'row',width:'100%' , height:'90%',}}>
                    
                        <View style={{ flexDirection:'row',width:'25%',borderColor:AppColors.AppColor,  justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>YEAR</Text>
                                <Text  style={{fontSize:18, fontWeight:'600'}}>{this.state.vehicleDetail.year}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection:'row',width:'25%',marginLeft:'0.5%',  justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>MAKE</Text>
                                <Text  style={{fontSize:18, fontWeight:'600'}}>{this.state.vehicleDetail.make}</Text>
                            </View>


                        </View>
                        <View style={{ flexDirection:'row',width:'25%',marginLeft:'0.5%', justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>MODEL</Text>
                                <Text  style={{fontSize:18, fontWeight:'600'}}>{this.state.vehicleDetail.model}</Text>
                            </View>


                        </View>

                        <View style={{ flexDirection:'row',width:'25%',marginLeft:'0.5%', justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>COLOR</Text>
                                <Text  style={{fontSize:18, fontWeight:'600'}}>{this.state.vehicleDetail.color}</Text>
                            </View>


                        </View>
                    

                    </View>


            </View>

            <View style={{width:deviceWidth, height:'50%',justifyContent:'center', paddingHorizontal:'4%', }}>

                <View style={{ flexDirection:'row',width:'100%' ,borderTopWidth:0.7, borderColor:'grey', height:'90%',}}>
                    
                        <View style={{ flexDirection:'row',width:'48%',justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>VIN</Text>
                                <Text  style={{fontSize:20, fontWeight:'600'}}>{this.state.vehicleDetail.vin}</Text>
                            </View>


                        </View>
                     
                        <View style={{ flexDirection:'row',width:'48%',marginLeft:'0.5%', justifyContent:'center', }}> 

                            {/* <View style={{width:'30%',marginTop:'10%', justifyContent:'center', height:'50%'}}>
                            <SimpleLineIcons name='arrow-left-circle' style={{alignSelf:'center'}} color={AppColors.AppColor} size={20}/> 

                            </View> */}

                            <View style={{width:'65%',marginHorizontal:"4%",height:'80%',alignSelf:'center', flexDirection:'column', justifyContent:'center'}}>
                                <Text style={{fontSize:14, color:AppColors.AppColor}}>LOT #</Text>
                                <Text  style={{fontSize:20, fontWeight:'600'}}>{this.state.vehicleDetail.lot_number}</Text>
                            </View>


                        </View>
                    

                    </View>


            </View>

            </View>
            :
            <View>

            </View>

    }


    {/* <View style={{height:50,marginBottom:5, borderBottomWidth:0.6,borderColor:'grey', flexDirection:'row',paddingHorizontal:'4%', justifyContent:'space-between'}}>

        <Text style={{fontWeight:'700',fontSize:16, alignSelf:'center'}}>FEATURES</Text>

        <TouchableOpacity 
        onPress={()=> {
            if(this.state.Featureshow == true){
                this.setState({Featureshow:false})
        }else{
            this.setState({Featureshow:true})

        }
        }}
        style={{backgroundColor:'#ecf1f5',width:30, height:30,justifyContent:'center',alignSelf:'center', borderRadius:400/2}}>
        {this.state.Featureshow == true ? 

        <Ionicons name= 'chevron-down'  color='grey' style={{alignSelf:'center'}} size={25}/> 

        :
        <Ionicons name= 'chevron-up'  color='grey' style={{alignSelf:'center'}} size={25}/> 
        }
        </TouchableOpacity>



    </View> */}
    


    {vehicleObj != undefined && vehicleObj != '' ?
                    <View style={{ flex: 1 }}>
                
                    
                        <View style={{ flex: 1 }}>

                        
                            <View style={{ height: 53 }}>
                              
                                    <View style={{paddingHorizontal:0, paddingVertical:0, flex: 1, height: 53, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'grey' }}>
                                        <TouchableOpacity
                                            style={{width:'30%',  borderRightWidth:0.6,borderColor:'grey', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:this.state.V_VEHICLEDETAIL?AppColors.AppColor:'#ECF0F1'}}
                                            // onPress={() => this.switchTabWithScoll(0, 'Vehicle Details')}

                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:true});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}

                                        >
                                            <Text style={[styles.tabHeadingTxt,{color: this.state.V_VEHICLEDETAIL?'white':'grey'}]}>VEHICLE</Text>
                                            {/* {this.state.tabIndex == 0 ? <View style={styles.tabDividerStyle} /> : null} */}

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{width:'20%', paddingHorizontal:18, borderRightWidth:0.6,borderColor:'grey', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:this.state.V_cr?AppColors.AppColor:'#ECF0F1'}}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:true});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={[styles.tabHeadingTxt,{color: this.state.V_cr?'white':'grey'}]}>CR</Text>
                                            {/* {this.state.tabIndex == 1 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{width:'25%', paddingHorizontal:18, borderRightWidth:0.6,borderColor:'grey', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:this.state.V_Export?AppColors.AppColor:'#ECF0F1' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:true}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={[styles.tabHeadingTxt,{color: this.state.V_Export?'white':'grey'}]}>EXPORT</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{width:'25%', paddingHorizontal:18, borderRightWidth:0.1,borderColor:'grey', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:this.state.V_PDF?AppColors.AppColor:'#ECF0F1'}}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:true}); }}
                                        >
                                            <Text style={[styles.tabHeadingTxt,{color: this.state.V_PDF?'white':'grey'}]}>PDF</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                    </View>
                            </View> 


               
        {renderIf(this.state.V_VEHICLEDETAIL)(


             <ScrollView>

         <View
    
         style={ { width: deviceWidth, backgroundColor: AppColors.white, marginBottom: 7,   marginBottom: 5, borderRadius: 10, padding: 10 }}
           >
         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            


             <View style={styles.detailMainViewStyle}>
                <Text style={styles.detailHeadingTxtStyle}>YEAR </Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.year}</Text>
             </View>



<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MAKE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MODEL </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.model}</Text>
</View>


<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>VIN </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.vin}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>KEYS </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>COLORS </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.color}</Text>
</View>



<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOT NO </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.lot_number}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>BUYER NO </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.buyer_id}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOWING REQUEST </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towing_request_date}</Text>
</View>









<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>PICK UP DATE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.pickup_date}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>DELIVERY DATE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.deliver_date}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOW FROM  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towed_from}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>TOW AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towed_amount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>STORAGE  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.storage_amount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TITLE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.title_type_name}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TITLE AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.title_amount}</Text>
</View>
<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOCATION   </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.location}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginBottom:25}}><Text style={styles.detailHeadingTxtStyle}>NOTE  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.note}</Text>
</View>             
         </View>
         </View>
    
</ScrollView>



        )}

        {renderIf(this.state.V_cr)(

     <ScrollView

>

   

<Elavation
      elevation={4}
      style={styles.dataChildViewElavationContainer}
  >
       <View style={{ paddingLeft: 10, paddingRight: 10 }}>
       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[2]}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[3]}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>grill</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[4]}</Text>
         </View>


       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[5]}</Text>
         </View>


           <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[6]}</Text>
          </View>
         

           <View style={styles.detailMainViewStyle}>
               <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[7]}</Text>
       </View>


       <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
              <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[8]}</Text>
           </View>


   <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[9]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[10]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[11]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[12]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[13]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[14]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[15]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[16]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>roof</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[17]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[18]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[19]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[20]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[21]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[22]}</Text>
      </View>


       </View>

       <View style={{paddingHorizontal:'3%', width:deviceWidth, justifyContent:'center'}}>

      
       <Text style={{marginVertical:10, alignSelf:'center',fontWeight:'700',fontSize:18, color:AppColors.AppColor}}>FEATURES </Text>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:'1%', width:'100%', }}>
 
            <View style={{flexDirection:'row',width:'47%',}}>
           
            {this.state.CDChanger == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
            <Text style={{alignSelf:'center',marginLeft:5,  fontWeight:'400', fontSize:16}}>CD Changer</Text>
            </View>


            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.SpareTireJack == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5,  fontWeight:'400', fontSize:16}}>SpareTireJack</Text>
            </View>
            
        </View>



        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:'1%', width:'100%', }}>
            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.GPSNavigationSystem == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5,fontWeight:'400', fontSize:16}}>GPSNavigationSystem</Text>
            </View>


            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.WheelCovers == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5, fontWeight:'400', fontSize:16}}>WheelCovers</Text>
            </View>
            
        </View>



        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:'1%', width:'100%', }}>
            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.Radio == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5,  fontWeight:'400', fontSize:16}}>Radio</Text>
            </View>


            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.CDPLAYER == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5,fontWeight:'400', fontSize:16}}>CDPLAYER</Text>
            </View>
            
        </View>


        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:'1%', width:'100%', }}>

            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.MIRROR == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5, fontWeight:'400', fontSize:16}}>MIRROR</Text>
            </View>


            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.SPEAKER == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5, fontWeight:'400', fontSize:16}}>SPEAKER</Text>
            </View>
            
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:'1%', width:'100%', }}>
            <View style={{flexDirection:'row',width:'47%',}}>
            {this.state.OTHERS == true ? 
            <Ionicons name='checkmark-circle-sharp' color='#00ca0f' style={{alignSelf:'flex-start', }} size={23}/> 
            :
            <Ionicons name='close-circle' style={{alignSelf:'center'}}  color='red' size={23}
            />}
                        <Text style={{alignSelf:'center',marginLeft:5,  fontWeight:'400', fontSize:16}}>OTHERS</Text>
            </View>


            
        </View>


    

     
       
    </View>
  </Elavation>
</ScrollView>

       )}

       {renderIf(this.state.V_Export)(

        <ScrollView
>
<View
   style={styles.dataChildViewElavationContainer}
>
   <View style={{ paddingLeft: 10, paddingRight: 10 }}>
   <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>status</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.status_name}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>loded Form</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.load_status}</Text>
  </View>

  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>export Date</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.export_date}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>eta</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.eta}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>BOOKING NO</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.booking_number}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>CONTAINER NO</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.container_number}</Text>
  </View>
  {/* <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>SIZE </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.arNo }</Text>
  </View> */}



  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POL</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.towed_from }</Text>
  </View>


  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POD</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.destination }</Text>
  </View>

  

 
   </View>
</View>
</ScrollView>

       )}


       {renderIf(this.state.V_PDF)(

<ScrollView
>
            {this.state.show ==  true ?   
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                        this.setState({show:false})
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{ flex:1,
                        width:Dimensions.get('window').width,
                        height:Dimensions.get('window').height,}}/>
                       :
                        <View style={{justifyContent:'center',height:deviceHeight*0.5, alignItems:'center', alignSelf:'center'}}>
                            <Text style={{alignSelf:'center'}}>No Invoice Found</Text>
                        </View>
                    } 
</ScrollView>

)}






                        </View>
                    </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15 }}>No data found</Text>
                    </View>}



 

   



            </ScrollView>





            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center',
    },
    screen:{

        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    detailHeadingTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 0.95,

    }, detailValueTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 8, marginBottom: 8
    },
    dataHeadingTxtStyle: {
        flex: 1,
        fontSize: 22,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    },
    dataChildViewElavationContainer: {
        width: deviceWidth,
        backgroundColor: AppColors.white,
        marginBottom: 7,
    
        borderRadius: 10,
        padding: 10
    },
    tabHeadingTxt: {
        
        fontSize: 15, textAlign: 'center'
    }, tabDividerStyle: {
        width: deviceWidth * 0.3,
        position: 'absolute',
        bottom: 0,
        height: 4, marginBottom: -1,
        backgroundColor: AppColors.white
    },
    appDetailTitle: {
        flex: 1,
        fontSize: 15,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center'
    },
    parallelogramInner: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "red",
        width: 150,
        height: 100,
      },
      parallelogramRight: {
        top: 0,
        right: -50,
        position: "absolute",
      },
      parallelogramLeft: {
        top: 0,
        left: -50,
        position: "absolute",
      },

      triangleCorner: {
        position: 'absolute',
        top:105,
        left:0,
        width: 400,
        height: 100,
        backgroundColor: 'red',
        borderStyle: 'solid',
        borderRightWidth: 50,
        borderTopWidth: 80,
        borderRightColor: 'transparent',
        borderTopColor: 'gray'
      },triangleCorner1: {
        position: 'absolute',
        top:100,
        left:0,
        width: 230,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderRightWidth: 50,
        borderTopWidth: 90,
        borderRightColor: 'transparent',
        borderTopColor: 'green'
      },triangleCornerLayer: {
        position: 'absolute',
        top:107,
        left:0,
        width:297,
        height: 100,
        backgroundColor: 'blue',
        borderStyle: 'solid',
        borderRightWidth: 47,
        borderTopWidth: 75,
        borderRightColor: 'transparent',
        borderTopColor: 'white'
      }
    
})

export default VehcilContainerDetailScreen;