import React, { Component } from 'react';
import { View, Modal ,ImageBackground, SafeAreaView, Text,FlatList, TouchableOpacity, StyleSheet, Image, ScrollView,  CameraRoll, BackHandler, Platform } from "react-native";
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';
// import RNFetchBlob from 'rn-fetch-blob'
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slideshow from 'react-native-image-slider-show-razzium';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SliderBox } from "react-native-image-slider-box";
import DialogLoader from './DialogLoder';


let exportObj = null;
let baseImagePath = null;
let vehicleList = null;
var isCallingWithoutLogin = null;

var exportImageBasePath = '';
var vehicleImageBAsePath = '';
class ExportDetailsScreen extends Component {
    constructor(props) {
        super(props)
        exportObj = props.route.params.itemObj;
        // vehicleList = this.props.navigation.state.params.vehicleList;
        // isCallingWithoutLogin = this.props.navigation.state.params.isCallingWithoutLogin;
        this.state = {
            exportDetailObj: '',
            vehicleList: [],
            locationList: [],
            imageList: [],
            isLoading: false,
            drawerview:false,
            showimagemodel:false,

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
 
        this.callingExportDetailAPI()               
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    callingExportDetailAPI = () =>{
        this.setState({isLoading:true})
        fetch(AppUrlCollection.EXPORT_DETAIL + exportObj.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('export detail ', responseJson)

                if (responseJson.data != null) {

                    
                 
                    // var a =[];
                 for (let index = 0; index < responseJson.data.container_images.length; index++) {
                        const element = responseJson.data.container_images[index].thumbnail;
                        // var b ={};
                        // b.url = element
                        // a.push(b)
                        this.state.imageList.push(element)
                    }
                    // this.setState({imageList:a})
                    //this.setState({ exportDetailObj: responseJson.data.export, vehicleList: responseJson.data.export.vehicleExports, imageList: this.state.imageList })
                    this.setState({ exportDetailObj: responseJson.data, vehicleList: responseJson.data.vehicles, })
                    // vehicleImageBAsePath = responseJson.other.vehicle_image;
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
                this.setState({isLoading:false})

            })
            .catch((error) => {
                console.warn(error)
                this.setState({isLoading:false})

            });
    }

    callingLocationAPI = () => {
        fetch(AppUrlCollection.LOCATION2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,

                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

                //    'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: responseJson.data })
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    downloadImage = () => {
        console.log('Base Image path :: ', baseImagePath + exportObj.export_invoice)
        // CameraRoll.saveToCameraRoll(baseImagePath + exportObj.export_invoice, 'photo')
    }

    // callig vehicle deatail
    callingVehicleDetailScreen = (item) => {
        console.log('Auth token ', this.state.locationList)
        if (isCallingWithoutLogin) {
            this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'https://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': true })
        } else {
            //AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'https://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': isCallingWithoutLogin })
            console.log('BAsereer ', vehicleImageBAsePath)
            this.props.navigate.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': exportImageBasePath, 'isCallingWithoutLogin': isCallingWithoutLogin })
        }
        //AppConstance.APP_PROPS.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'http://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': true })
        //AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item.vehicle, 'locationList': this.state.locationList, 'baseImagePath': 'http://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': isCallingWithoutLogin })

    }

    // render my vehicle content
    renderMyVehileList = ({ item, index }) => {
        if (isCallingWithoutLogin) {
            return (
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.year != null && item.vehicle.year != '' ? item.vehicle.year : '-'}</Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.make != null && item.vehicle.make != '' ? item.vehicle.make : '-'}</Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.model != null && item.vehicle.model != '' ? item.vehicle.model : '-'}</Text>
                    <Text style={{ color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.lot_number != null && item.vehicle.lot_number != '' ? item.vehicle.lot_number : '-'}</Text>
                    
                        <Ionicons name='ios-eye'

                        onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen',{vehicleObj:item})}

                        color={AppColors.AppColor} style={{alignSelf:'center',marginRight:1,}} 
                        size={25}/> 

                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.year != null && item.year != '' ? item.year : '-'}</Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.make != null && item.make != '' ? item.make : '-'}</Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.model != null && item.model != '' ? item.model : '-'}</Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.lot_number != null && item.lot_number != '' ? item.lot_number : '-'}</Text>
                  <Ionicons name='ios-eye'

                        onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen',{vehicleObj:item})}

                        color={AppColors.AppColor} style={{alignSelf:'center',marginRight:1,}} 
                        size={25}/> 
                </View>
            )
        }
    }

    // downloadBill = (mode) => {
    //     let dirs = RNFetchBlob.fs.dirs
    //     if (mode == 1) {
    //         fetch(AppUrlCollection.DOWNLOAD_BILLE + 'id=' + exportObj.id, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authkey': AppConstance.USER_INFO.USER_TOKEN,
    //                 'source' : 'asl_phone_app',
    //                 'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 console.log('responde da::', responseJson)
    //                 var date = new Date();
    //                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
    //                     //  let url = 'http://erp.gwwshipping.com/backend/uploads/pdf/20190069H_BL_Mehul Test comp_CALB789763.pdf'
    //                     let PictureDir = fs.dirs.DownloadDir + '/Galaxy App';
    //                     let options = {
    //                         fileCache: true,
    //                         addAndroidDownloads: {
    //                             useDownloadManager: true,
    //                             notification: true,
    //                             path: PictureDir + '/Galaxy_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
    //                             description: 'Image'
    //                         }
    //                     }
    //                     config(options).fetch('GET', responseJson.data).then((res) => {
    //                         console.log('respose :: ', res)
    //                     });
    //                 } else {
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.warn(error)
    //             });
    //     } else if (mode == 2) {
    //         fetch(AppUrlCollection.DOWNLOAD_MAINFEST + 'id=' + exportObj.id, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authkey': AppConstance.USER_INFO.USER_TOKEN,
    //                 'source' : 'asl_phone_app',
    //                 'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 console.log('responde mni::', responseJson)
    //                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
    //                     let PictureDir = fs.dirs.DownloadDir + '/Galaxy App';
    //                     let options = {
    //                         fileCache: true,
    //                         addAndroidDownloads: {
    //                             useDownloadManager: true,
    //                             notification: true,
    //                             path: PictureDir + '/Galaxy_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
    //                             description: 'Image'
    //                         }
    //                     }
    //                     config(options).fetch('GET', responseJson.data).then((res) => {
    //                         console.log('respose :: ', res)
    //                     });
    //                 } else {
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.warn(error)
    //             });
    //     }

    //     //let url = 'http://dev.digitize-info.com/ci/culturally/assets/images/slider/audience.jpg';
    //     // let url = 'http://erp.gwwshipping.com/backend/uploads/pdf/20190069H_BL_Mehul Test comp_CALB789763.pdf'
    //     // let PictureDir = fs.dirs.DownloadDir + '/pdf';
    //     // let options = {
    //     //     fileCache: true,
    //     //     addAndroidDownloads: {
    //     //         useDownloadManager: true,
    //     //         notification: true,
    //     //         path: PictureDir + "/image2.pdf",
    //     //         description: 'Image'
    //     //     }
    //     // }
    //     // config(options).fetch('GET', url).then((res) => {
    //     //     console.log('respose :: ', res)
    //     // });


    // }

    imageSlider = () => {
        if (exportObj.exportImages.length > 0) {
            this.props.navigation.navigate('ExportImageListScreen', { 'itemObj': exportObj, 'baseImagePath': baseImagePath,'vehicleList': this.state.vehicleList })
        } else {
            AppConstance.showSnackbarMessage('Image Not Found')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.screen}>
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
                   dataSource={this.state.imageList}/> */}
                           <SliderBox 
        //   images={this.state.images.length == 0 ?dummyimages:this.state.images}
          images={this.state.imageList}

          sliderBoxHeight={deviceHeight*0.65}
          
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
                                style={{height:60 ,alignContent:"center",alignItems:"center", justifyContent:'center'}}
                                            //   onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >

                            <Text>Container Detail</Text>
                               
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                         alignContent:"flex-end",alignSelf:"flex-end",
                        }  
                        }
                        
            
                        >
                            <View>
                                
                            </View>
                          
                         </TouchableOpacity>
                 
                  </Appbar>
            


               
                <ScrollView
                    behaviour="height"
                >
                    <View style={{ flex: 1 }}>
                        {this.state.imageList.length > 0 ? (
        <View style={{width:"100%"}}
>

                   <SliderBox 
          images={this.state.imageList}

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

          <View style={{width:"100%",  height:deviceHeight*0.25}}>
          <Image source={ require('../Images/logo_final.png')} 
         style={{ height:'100%',width:'100%',  alignSelf: 'center', }} resizeMode='stretch' resizeMethod='resize'
        />
      
       </View>
      )}




                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, right: 0, marginBottom: 8, marginRight: 10 }}>
                               
                            </View>
                       

                        <View style={{ flex: 1, alignItems: 'center',backgroundColor:'#ECF0F1', justifyContent: 'center' }}>


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>ContainerNo ID : </Text>
                                <Text style={styles.detailValueTxtStyle}>{this.state.exportDetailObj.container_number}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Port of loading: </Text>
                                <Text style={styles.detailValueTxtStyle}>{this.state.exportDetailObj.port_of_loading_name != undefined  && this.state.exportDetailObj.port_of_loading_name != '' ? this.state.exportDetailObj.port_of_loading_name : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Export Date: </Text>
                                <Text style={styles.detailValueTxtStyle}>{this.state.exportDetailObj.export_date}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Port of discharge: </Text>
                                <Text style={styles.detailValueTxtStyle}>{this.state.exportDetailObj.portOfDischarge != undefined && this.state.exportDetailObj.portOfDischarge != null && this.state.exportDetailObj.portOfDischarge.port_name != null && this.state.exportDetailObj.portOfDischarge.port_name != '' ? this.state.exportDetailObj.portOfDischarge.port_name : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>ETA: </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.eta}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            {/* {isCallingWithoutLogin ?
                                null
                                : <View style={{ flex: 1 }}>
                                    <View style={styles.detailMainViewStyle}>
                                        <Text style={styles.detailHeadingTxtStyle}>Loading Date : </Text>
                                        <Text style={styles.detailValueTxtStyle}>{exportObj.loading_date}</Text>
                                    </View>
                                    <View style={styles.dividerStyleView} />
                                </View>
                            } */}
{/* 

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Arrived Date : </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.arrivalDate != null ? exportObj.arrivalDate : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            {/* // <View style={styles.detailMainViewStyle}>
                            //     <Text style={styles.detailHeadingTxtStyle}>Destination : </Text>
                            //     <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                            // </View>
                            // <View style={styles.dividerStyleView} /> */}

                            {/* <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.destination}</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            {/* <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Invoice Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{'-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />
                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Paid Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{'-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />
                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Balance Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>-</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            {/* {isCallingWithoutLogin ?
                                null
                                : <View style={{ flex: 1 }}>
                                    <View style={styles.detailMainViewStyle}>
                                        <Text style={styles.detailHeadingTxtStyle}>Note : </Text>
                                        <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                                    </View>
                                    <View style={styles.dividerStyleView} />
                                </View>} */}
                            <View style={{ flex: 1 }}>
                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Note : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />
                            </View>

                            {/* {isCallingWithoutLogin ? null
                                : <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Bill Of Lading : </Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}
                                        onPress={() => this.downloadBill(1)}
                                    >
                                        <Text style={[styles.detailValueTxtStyle, { flex: 0, marginRight: 10 }]}>DOWNLOAD</Text>
                                        <MaterialCommunityIcons name='download' color={AppColors.textColor} size={15} />
                                    </TouchableOpacity>
                                </View>}
                            {isCallingWithoutLogin ? null :
                                <View style={styles.dividerStyleView} />
                            }
                            {isCallingWithoutLogin ? null :
                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Manifest : </Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}
                                        onPress={() => this.downloadBill(2)}
                                    >
                                        <Text style={[styles.detailValueTxtStyle, { flex: 0, marginRight: 10 }]}>DOWNLOAD</Text>
                                        <MaterialCommunityIcons name='download' color={AppColors.textColor} size={15} />
                                    </TouchableOpacity>
                                </View>
                            }
                            {isCallingWithoutLogin ? null :
                                <View style={styles.dividerStyleView} />
                            } */}

                        </View>
                        <Elavation
                            elevation={3}
                            style={{ width: deviceWidth, height: 50, backgroundColor: AppColors.AppColor, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{  fontSize: 16,fontWeight:'700', color: AppColors.white }}>Vehicle</Text>
                        </Elavation>
                        <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', height: 30, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>YEAR</Text>
                            <Text style={{ color: AppColors.textColor, fontSize: 14, flex: 1 }}>MAKE</Text>
                            <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>MODEL</Text>
                            <Text style={{  color: AppColors.textColor, fontSize: 14, flex: 1 }}>LOT NO</Text>
                            <View style={{ width: 18, height: 1 }} />
                        </View>

                        <FlatList
                            style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
                            data={this.state.vehicleList}
                            renderItem={this.renderMyVehileList}
                            keyExtractor={(item, index) => index}
                            extraData={this.state}
                            ItemSeparatorComponent={() => <View style={{ width: deviceWidth, height: 1, backgroundColor: AppColors.toolbarColor }} />}
                        />
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.white
    }, 
    
    screen:{

        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    detailMainViewStyle: {
        flexDirection: 'row',
        paddingTop:10,
        flex: 1, width: deviceWidth * 0.85,
        alignContent: 'center', alignItems: 'center', justifyContent: 'center'
    }, detailHeadingTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 0.95,

    }, detailValueTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 13, marginBottom: 8
    },
})
export default ExportDetailsScreen;
