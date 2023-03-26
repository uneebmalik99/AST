import React, { Component } from 'react';
import { View,ScrollView, SafeAreaView,Modal, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, BackHandler, ActivityIndicator, Platform } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toolbar from './Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  Header, Tab, Tabs,Content,List, Body, ScrollableTab, TabHeading, ListItem, Container, Left, Right,  } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

let filterItemObj = null;
let setProps = null;

let page = 1;
let onEndReachedCalledDuringMomentum = false;
let vehilceImageBasePath = null;
var baseImagePath = '';
var locationId = 0;
var statusId = 0;
var searchTxt = '';
let locationList = [];

class VehicleScreen extends Component {
    constructor(props) {
        super(props)
        this.onEndReachedCalledDuringMomentum = true;
      
        this.state = {
            isLoading: false,
            isDisplayView: 0,
            drawerview:false,
            spinner:false,
            tabIndex: 0,
            searchvehiclelist:[],
            selectFilterName: '',
            searchtxt:'',
            isModalVisible: false,
            locationList: [],
            vehicleList: [],
            search:0,
            searchshow:false,
            vehicleList2: [],
            searchTxt: '',
            isStopCallingAPI: false,
            isFilterOrSerachEnable: false,
            page: 1,
            isFooterLoading: false,
            noMoreDataFound: false,
            categoryList: [
                'New Purchased', 'On Hand', 'Ready to Ship', 'On the way', 'Arrived', ''
            ],
            refreshing: false,
            statusId: '0',
            locationId: 0
        }

    }
    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        BackHandler.exitApp();
        return true;
    }
    componentDidMount() {
             
                    this.callingVehicleApi(true)
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    _handleConnectivityChange = state => {
        if (state.isConnected == true) {
            this.setState({ isInternetNotFound: false })
        }
        else {
            this.setState({ isInternetNotFound: true })
        }
    };
 
    //calling location api
    ccallingLocationApi = () => {
        this.setState({ locationList: [] })

        fetch(AppUrlCollection.LOCATION, {
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
                var allData = {
                    id: 0,
                    name: 'ALL'
                }
                this.state.locationList.push(allData)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: this.state.locationList.concat(responseJson.data), locationId: responseJson.data[0].id })
                    locationList.push(this.state.locationList)
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //calling Vehicle list
    callingVehicleApi = async (isCallingFirsttime) => {
        if (isCallingFirsttime) {
            
            this.setState({ isLoading: true, isFooterLoading: false })
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
        }

        // + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId,
        fetch(AppUrlCollection.VEHILE_LIST  +'page=' + this.state.page +  '&status=' + this.state.statusId,{
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

                if (responseJson.data !=  '' || responseJson.data !=  null) {
                    let data = responseJson.data;
                    this.setState({ isLoading: false, isFooterLoading: false })
                    if (data.length > 0) {
                        // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                        this.setState({ vehicleList: this.state.vehicleList.concat(data), vehicleList2: this.state.vehicleList2.concat(data),noMoreDataFound: false })
                    } else {
                        this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
                    }
                   
                    this.setState({ noMoreDataFound: false })
                } else {
                    this.setState({ isLoading: false, isFooterLoading: false })
                    this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
                    // AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false })

                console.warn(error)
            });
    }


    callingVehicleDetailSCreen = (item) => {
        // if (filterItemObj != null) {
        //     console.log('Filter Obj::: ',filterItemObj)
        //    this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // } else {
        //     this.props.setProps.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // }
    }

    switchToImageGrid = (item) => {
        if (item.images.length > 0) {
            this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item, 'baseImagePath': baseImagePath })
        } else {
            AppConstance.showSnackbarMessage('Image Not Found')
        }

    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        // this.props.navigation("DashboardScreen")
    }


     //render Vehicle
     renderVehicle = ({ item, index }) => {
        // uri:vehilceImageBasePath + item.image
        let locationName = this.state.locationList.find((location) => location.id == item.location)

       return <TouchableOpacity 
       
       onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}

       style={{height:deviceHeight*0.3,width:'100%', paddingHorizontal:'5%',marginTop:15,}}>
          {item.photo.length > 0 ? 
              
              <View style={{ width: '100%', height: '80%', }}>
              <Image style={{ width: '100%',borderTopLeftRadius:8, borderTopRightRadius:8, height: '100%', }}
                  source={{ uri:item.photo }} />
                  <View style={{position:'absolute',borderRadius:5, flexDirection:'row', backgroundColor:'#000005', right:10, top:10,}}>
                 
                <Ionicons name='camera-outline' color='white' style={{alignSelf:'center', padding:3,}} size={20}/> 

                  <Text style={{color:'white', alignSelf:'center', padding:3,}}>{item.total_photos}</Text>

                  </View>
                  </View>
                   :

                  <Image style={{ width: '100%', height: '80%', }}
                  source={require('../Images/logo_final.png')} />

                  }

                <View style={{height:'20%',backgroundColor:'#f4f4f4',borderBottomLeftRadius:8,borderBottomRightRadius:8, width:'100%', flexDirection:'row',}}>

                    <View style={{borderBottomLeftRadius:8, flexDirection:'column',justifyContent:'space-evenly', backgroundColor:AppColors.AppColor, paddingHorizontal:'3%'}}>
                        <Text style={{alignSelf:'center',fontSize:15, fontWeight:'600', color:'white'}}>{item.year != undefined && item.year != null && item.year != ''  ? item.year : '-'}</Text>
                        <Text style={{alignSelf:'center' ,fontSize:15, fontWeight:'600', color:'white'}}>{item.make != undefined && item.make != null && item.make != '' ?   item.make.toUpperCase() : '-'} {item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase()  : '-'}</Text>
                      
                    </View>   


                     <View style={{ paddingHorizontal:'3%', flexDirection:'column', justifyContent:'space-evenly'}}>
                        <Text style={{color:AppColors.AppColor, fontWeight:'600'}}>Vin {item.vin != undefined && item.vin != null && item.vin != ''  ? item.vin : '-'}</Text>
                        <Text  style={{color:AppColors.AppColor, fontWeight:'600'}}>Lot # {item.lot_number != undefined && item.lot_number != null && item.lot_number != ''  ? item.lot_number : '-'}</Text>
                      
                    </View>    
                </View>


       </TouchableOpacity>
        
        
        

    }

    onTabChange = (event) => {
        let locationvalue = this.state.locationList[event.i]
        locationId = locationvalue.id
        this.setState({ tabIndex: event.i, locationId: locationvalue.id, searchTxt: '', page: 1,isStopCallingAPI:false })
        console.log('ALlTab Selct Vale:: ', event.i, locationvalue.id)
        setTimeout(() => {
            this.callingAPIWithLocation(locationvalue.id, this.state.searchTxt, statusId)
        }, 100)


    }

    //callingApi 
    callingAPIWithLocation = async (location, search, status) => {
        var url = null;
        var locationUrl = null;
        var searchUrl = null;
        var statusUrl = null;
        var baseUrlMain = AppUrlCollection.VEHILE_LIST;
        this.setState({ isLoading: true, isFooterLoading: false })

        url = baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1'
        console.log('STATUS API :;', baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1')
        // if (this.state.locationId > 0) {
        //     locationUrl = baseUrlMain + '&location=' + locationId
        //     url = locationUrl;
        //     console.log('url :location : ', locationUrl)
        // } else if (this.state.searchTxt.trim().length > 0) {
        //     searchUrl = locationUrl != null ? locationUrl.concat('&search_str=' + this.state.searchTxt) : baseUrlMain + '&search_str=' + this.state.searchTxt
        //     url = searchUrl;
        //     console.log('url :search : ', searchUrl)
        // } else if (this.state.statusId > 0) {
        //     statusUrl = searchUrl != null ? searchUrl.concat('&status=' + statusId) : baseUrlMain + '&status=' + statusId
        //     //url = AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID
        //     url = statusUrl;
        //     console.log('url :status : ', statusUrl)
        // }


        await fetch(url, {
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
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                this.setState({ isLoading: false, page: 1, vehicleList: [], vehicleList2: [],  isFooterLoading: false })
                console.log('Load more data :: ', url)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    baseImagePath = responseJson.data.other.vehicle_image;
                    let vehicleList = responseJson.data.vehicleList;
                    if (vehicleList.length > 0) {
                        this.setState({ vehicleList: vehicleList , vehicleList2:vehicleList })
                        //this.setState({ vehicleList: responseJson.data.vehicleList, isFilterOrSerachEnable: false })
                        this.setState({ noMoreDataFound: false })

                    } else {
                        this.setState({ noMoreDataFound: true })
                        //   AppConstance.showSnackbarMessage(responseJson.message)
                    }
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //set filter name
    setFiltername = (text) => {
        page = 0;
        let gettingStatusId = AppConstance.gettingStatusIfFromName(text.toUpperCase())
        this.setState({ statusId: gettingStatusId, searchTxt: '', page: 1 })
        statusId = gettingStatusId;
        this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
        this.setState({ selectFilterName: text, isModalVisible: false, isFilterOrSerachEnable: true })
    }

    //Rener Category Content
    renderCategoryContent = ({ item, index }) => {
        return (<TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
            onPress={() => this.setFiltername(item)}
        >
            {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
                : <View style={{ width: 18 }} />}

            <Text style={{  color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
        </TouchableOpacity>
        );
    }

    //clear filter data
    clearFilterData = () => {

        // page = 0;
        // this.setState({ statusId: 0, searchTxt: '', page: 1 })
        // statusId = 0;
        // this.setState({ isFilterOrSerachEnable: true })

        // this.callingAPIWithLocation(0, this.state.searchTxt, 0)
        // this.setState({ tabIndex: 0, locationId: 0, searchTxt: '', vehicleList: [], page: 1 })
        this.setState({ isModalVisible: false })
        this.props.navigation.replace('VehcileScreen', { 'itemObj': filterItemObj, 'setProps': this.props });
    }

    //here is modal content
    renderModalContent = () => {
        return (
            <View style={styles.modalViewStyle}>
                <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{  color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
                   
                   
                    <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10 }}
                        onPress={() => this.clearFilterData()}
                    >
                        <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false })}
                    >
                        <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.categoryList}
                    renderItem={this.renderCategoryContent}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                />
            </View>
        );
    }

    isOpenFilterDialog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    allServiceCalling = () => {
        setTimeout(() => {
            if (this.state.noMoreDataFound) {

            } else {
                this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
            }
        }, 100)
    }

    callingSearchAPI = () => {
        // alert(text.nativeEvent.text)
      this.setState({ isLoading: true, isFooterLoading: false })
      if(this.state.searchtxt.length>0){
        this.setState({search:1})

        let url = AppUrlCollection.VEHILE_LIST +'vehicle_global_search='+this.state.searchtxt +'&status='+this.state.statusId ;
        // fetch(AppUrlCollection.VEHILE_LIST + 'vehicle_global_search'+ text.nativeEvent.text + '&status=' + this.state.statusId ,{
            fetch(url,{
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

                if (responseJson.data !=  '' || responseJson.data !=  null) {
                    let data = responseJson.data;
                    // alert(JSON.stringify(responseJson.data))
                    this.setState({ isLoading: false, isFooterLoading: false })
                    if (data.length > 0) {
                       
                        // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                        this.setState({ searchvehiclelist: data, noMoreDataFound: false })
                    } else {
                        
                        this.setState({ noMoreDataFound: true, isFooterLoading: false,})
                    }
                   
                    this.setState({ noMoreDataFound: false })
                } else {
                    this.setState({ isLoading: false, isFooterLoading: false })
               
                    // AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
                this.setState({isLoading:false})
            });
    
    
    
    
    
    
    
    }else{

        this.setState({search:0})
        this.setState({isLoading: false})

        

     }
              
                // this.ccallingLocationApi();
                // this.setState({ isLoading: false })
                // console.log('api calling ::', AppUrlCollection.CONTAINER_TRACKING + 'search=' + this.state.searchLotNumber + '&page=1')
                // this.callingContainerApi(true)

         
        };
    //Render Footer
    renderFooter = () => {
        // if (this.state.paidServiceCallStop) {
        // } else {
        //     if (this.state.isFooterLoading) {
        //         return <View>
        //             <ActivityIndicator color={AppColors.toolbarColor} size='large' />
        //         </View>
        //     } else {
        //         return <View>
        //             <TouchableOpacity style={{ width: 150, height: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15, marginTop: 10 }}
        //                 onPress={() => this.allServiceCalling()}
        //             >
        //                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingBottom: 4 }}>Load More</Text>
        //             </TouchableOpacity>
        //             {/* <ActivityIndicator color={AppColors.toolbarColor} size='large' /> */}
        //         </View>
        //     }
        // }
        if (this.state.isStopCallingAPI) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    //calling  free search
   searchFilterFunction = (text) => {
        if (text) {
      
          const newData = this.state.vehicleList2.filter(
            function (item) {
              
              const itemData =  item.vin
                ?  item.vin.toUpperCase()
                :''.toUpperCase();
      
                const itemData2 =  item.lot_number
                ?  item.lot_number.toUpperCase()
                : ''.toUpperCase();
      
              const textData = text.toUpperCase();
      
              if(itemData.indexOf(textData) > -1){
                return  itemData.indexOf(textData) > -1;
              }else{
                return  itemData2.indexOf(textData) > -1;
              }
          });

          this.setState({vehicleList: newData})
        //   setFilteredDataSource(newData);

        //   setSearch(text);
          console.log('text is '+text);
        } else {
          // Inserted text is blank
          console.log('blank');
        //   this.setState({vehicleList: vehicleList2})
        //   setFilteredDataSource(data);
        //   setSearch(text);
        }
      };


    //LoadMore data
    loadMoreData = () => {
        //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

        //page += 1;
        setTimeout(() => {
            if (this.state.isStopCallingAPI) {

            } else {
                if (this.state.noMoreDataFound) {

                } else {
                    this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
                }
            }
        }, 100);
    }


    renderMyTablayout = () => {
        let locationTabGenrate = [];
        for (let index = 0; index < this.state.locationList.length; index++) {
            const element = this.state.locationList[index];
            locationTabGenrate.push(
                <Tab
                    heading={<TabHeading
                        activeTabStyle={{ backgroundColor: AppColors.white, }}
                        activeTextStyle={{ color: AppColors.white, }}
                        tabStyle={{ width: 250 }}
                        textStyle={{ flex: 1 }}
                        style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
                    >
                        <Text style={{
                            color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white,
                            width: 48, fontSize: 12, textAlign: 'center'
                        }}>
                            {element.name}
                        </Text></TabHeading>}
                    activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
                    tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                    textStyle={{ color: AppColors.white,  }}
                    activeTextStyle={{ color: AppColors.toolbarColor, }}

                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.searchBarMainView}>
                            <Elavation
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={AppColors.toolbarColor}
                                        selectionColor={AppColors.toolbarColor}
                                        // onChangeText={(text) => this.setState({ searchTxt: text })}
                                        onChangeText={(text) => {if(text.length == 0){this.setState({search:0} ,this.setState({searchtxt:text}), this.setState({searchvehiclelist:[]}))}else{this.setState({search:1});this.setState({searchtxt:text})}  } }
                                        onSubmitEditing={(text) => {if(text.nativeEvent.text.length>0){
                                            // this.setState({search:1})
                                            this.callingSearchapi(text)
    
                                        } else{
                                            this.setState({search:0})
                                            this.setState({isLoading:false})
    
                                        }  }}
                                        // onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' onPress={()=> {this.callingSearchapi()}} color={AppColors.toolbarColor} size={20} />
                                </View>
                            </Elavation>
                            <TouchableOpacity
                                style={styles.filterIconViewStyle}
                                onPress={() => this.setState({ isModalVisible: true })}
                            >
                                <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                            </TouchableOpacity>
                        </View>
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>}
                    </View>
                </Tab>
            )
        }


        return (<Tabs
            ref={(ref) => { this.tabView = ref; }}
            tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
            tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
            style={{ backgroundColor: AppColors.white, elevation: 0 }}
            tabBarTextStyle={{ color: AppColors.white,  fontSize: 25 }}
            tabBarActiveTextColor={AppColors.white}
            tabBarInactiveTextColor={AppColors.black}
            tabBarBackgroundColor={AppColors.toolbarColor}

            onChangeTab={(event) => this.onTabChange(event)}
            renderTabBar={() => <ScrollableTab />}
        >
            {locationTabGenrate}
        </Tabs >);
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
                  <Text style={{fontSize:16, fontWeight:'600'}}>All Vehicles</Text>
                               
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                           borderWidth:1, borderColor:'grey',borderRadius:400/2, justifyContent:'center', height:35,width:35,
                         alignContent:"flex-end",
                        }  
                        }
                        
                        onPress={() => { this.setState({searchshow:true}) }}         
            
                        >
                         <Ionicons name='md-search-outline' color='grey' style={{alignSelf:'center'}} size={20}/> 

                         </TouchableOpacity>
                 
                  </Appbar>
            
            
           
                <View style={{ flex: 1 }}>
                      
                    {this.state.searchshow == true ?
                        <View style={styles.searchBarMainView}>
                            <Elavation
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={'grey'}
                                        selectionColor={AppColors.AppColor}
                                        onChangeText={(text) => {

                                            if(text.length == 0)
                                            {
                                                this.setState({search:0})
                                                this.setState({searchtxt:text})
                                                this.setState({searchvehiclelist:[]})
                                            }
                                            else{
                                                this.setState({searchtxt:text})
                                                // this.setState({search:1})
                                            }
    
                                        }}
                                        // onChangeText={(text) =>{ this.setState({ searchTxt: text }); this.searchFilterFunction(text) } }
                                        onSubmitEditing={(text) => {if(text.nativeEvent.text.length>0){
                                            // this.setState({search:1})
                                            this.callingSearchAPI(text)
    
                                        } else{
                                            this.setState({search:0})
                                            this.setState({isLoading:false})
    
                                        }  }}                                        
                                        // onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1'  onPress={()=> { if(this.state.searchtxt.length> 0){ this.callingSearchAPI()}}} color={'grey'} size={25} />
                                        <View style={{borderLeftColor:'grey',paddingHorizontal:2, marginLeft:4, borderLeftWidth:0.5}}>

                                    <EvilIcons name='close'  onPress={()=> { this.setState({searchshow:false})}} color={AppColors.AppColor} size={30} />
                                        </View>
                                </View>
                            </Elavation>
                            
                        </View>
                        :
                        <View>
                        </View>    
                    }

                        {this.state.search == 0?
                        
                        <View style={{ flex: 1 }}>

                           {this.state.vehicleList.length > 0 ?
                               <FlatList
                               style={{ paddingTop: 5 }}
                               data={this.state.vehicleList}
                               renderItem={this.renderVehicle}
                               keyExtractor={(item, index) => index}
                               extraData={this.state}
                               ListFooterComponent={this.renderFooter}
                               onEndReached={this.loadMoreData}
                               onEndReachedThreshold={0.5}
                           />

                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>
                                }
                                </View>
                           

                                :


                                <View style={{ flex: 1 }}>
                           {this.state.searchvehiclelist.length > 0 ?

                                      <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.searchvehiclelist}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                  
                                />
                                      :
                                      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                      <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                                  </View>
                                      }
                                      </View>
                                }





























{/* 
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>} */}
                    </View>


            </SafeAreaView >
        );
    }
}

export default VehicleScreen;

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30,  color: AppColors.textColor, fontSize: 16
    },
    screen:{
    
        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    vehicleCustNameTxtStyle: {
        flex: 1, color: AppColors.textColor, fontSize: 16
    }, vehicleInnerTxtHeadinStyle: {
         fontSize: 14, color: AppColors.textColor, flex: 1.5
    }, vehicleInnerTxtValueStyle: {
        color: AppColors.textColor, fontSize: 15, flex: 2
    },
    vehicleInnerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    vehicleStatusTxtStyle: {
         color: AppColors.textColor, fontSize: 14, marginRight: 10
    },
    vehicleInnreActionOpacityStyle: {
        borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
    },
    vehicleInnreActionTxtStyle: {
         paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
    }, modalViewStyle: {
        backgroundColor: AppColors.white,
        borderRadius: 4, flex: 0,
        //  height:deviceHeight*0.4,
        borderColor: AppColors.white, marginBottom: '-12%'
    },
    dialogMenuTxtStyle: {
        width: deviceWidth, height: 50,
        justifyContent: 'center',
        alignContent: 'center'
    }, dialogMenuTxtViewStyle: {
    
        color: AppColors.textColor,
        fontSize: 15,
        paddingLeft: 10
    }, dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.textColor
    },
    searchBarMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 5
    },
    searchElavationStyle: {
        flex: 1, height: 50,
        borderRadius: 10,
        borderColor:'black',
        marginTop: 8,
        marginLeft: 5,
        borderWidth:0.5,
        marginRight: 5,
        alignSelf: 'center'
    },
    searchElvationViewStyle: {
        flexDirection: 'row', flex: 1,
        alignContent: 'center', alignItems: 'center',
        paddingLeft: 5, marginLeft: 5,
        marginRight: 5, paddingRight: 5
    },
    searchTxtInputStyle: {
        flex: 1,
  
        color: AppColors.AppColor, fontSize: 18,
    },
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 1
    }, filterIconStyle: {
        width: 25, height: 25
    }
})


