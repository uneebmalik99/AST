import React, { Component } from 'react';
import {  SafeAreaView, Modal, View, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler,  ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import DialogLoder from '../screens/DialogLoder'
import AntDesign from 'react-native-vector-icons/AntDesign';


let v = []
let allInvoiceList = []
let tabp
const numColumns = 2
class UnPaid extends Component {
    constructor(props) {
        super(props)

   
        this.state = {
            user_id: props.route.params,
            tabIndex: 0,
            drawerview:false,
            item_id:0,
            allInvoiceList: [],
            unpaidInvoiceList: [],
            paidInvoiceList: [],
            isLoading: false,
            paymentHistoryList: [],
            searchinvoicelist:[],
            searchtxt:'',
            search:0,
            balancePrice: 0,
            allPagination: 1,
            unPaidPage: 1,
            paidPage: 1,
            paymentHistorypage: 1,
            isStopCallingAPI:false,
            currentpage:1,
            lastpage:'',
            allPageServiceCallStop: false,
            allFooterCalling: false,
            unPaidServiceCallStop: false,
            unPaidFooterCalling: false,
            paidServiceCallStop: false,
            paidFooterCalling: false,
            paymentHisServiceCallStop: false,
            paymentHisFooterCalling: false
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
componentDidMount = () => {
    this.callingUnpaidInvoceAPI(true)
//   alert(AppConstance.USER_TOKEN_KEY)
}


renderInvoiceContent = ({ item }) => {
    
    
    return <TouchableOpacity
        elevation={2}
        onPress={() => this.props.navigation.navigate('AccountDetailsScreen', { 'invoice': item.usa_invoice})}

        style={{  borderColor:'black',borderRadius:18, borderWidth:0.7, paddingHorizontal:10, width: '45%', flexDirection:'column', margin: 10, backgroundColor: 'white',  }}
    >
        <View style={{marginTop:5,  width: deviceWidth * 0.37, height: 100 }}
        >
            {/* {item.vehicle.image != null && item.vehicle.image.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                source={{ uri: item.vehicle.image[0].image }} /> : */}
                <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} resizeMode='contain' />
                {/* } */}

        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
        >
            <Text style={{
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>
                {item.id != '' ? 'Invoice ID # ' + item.id : '-'}</Text>
            <Text style={{
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>{item.status_name != '' && item.status_name != null ? 'Status : ' + item.status_name : 'Status : - '}</Text>
            <Text style={{ marginBottom:5,
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green',
                fontSize: 12
            }}>{item.total_amount != ' ' && item.total_amount != null ? 'Total Amount : ' + item.total_amount : 'Total Amount : - '}</Text>
        </View>
    </TouchableOpacity>
}

loadMoreDataAll = () => {
    setTimeout(() => {
        if (this.state.allPageServiceCallStop) {
        } else {
            if (this.state.noMoreDataFound) {
            } else {
                this.setState({ allPagination: this.state.allPagination + 1 }, () => this.callingAllInvoceAPI())
            }
        }
    }, 100)
}

renderFooterUnpaid = () => {
    if (this.state.unPaidServiceCallStop) {
        return null;
    } else {
        return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
    }
}

generateFlatList = () => {
    if (this.state.allInvoiceList.length > 0) {
        if (this.state.allInvoiceList.length > 0) {
        
            return <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.allInvoiceList}
                    renderItem={this.renderInvoiceContent}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                //    ListFooterComponent={this.renderFooterUnpaid}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
        //            onEndReached={this.loadMoreDataAll}
                    // onEndThreshold={0}
                    onEndReachedThreshold={0.5}
                />
            </View>
        } else {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
            </View>
        }
    }
    
}

callingUnpaidInvoceAPI = (isCallingFirsttime) => {

// this.setState({isLoading : true})

    if(isCallingFirsttime){
        this.setState({isLoading : true})
    }
    let url='';
    if(AppConstance.USER_ROLE == '1'){
        url = AppUrlCollection.INVOICE_UNPAID + '?page=' + this.state.currentpage

    }else{
        url = AppUrlCollection.INVOICE_UNPAID + '?customer_user_id=' + this.state.user_id + '&page=' + this.state.currentpage
    }

    fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AppConstance.USER_TOKEN_KEY,
        'source' : 'asl_phone_app',
        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


    },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // console.log('data', responseJson.data);

        if (responseJson.data != null || responseJson.data != '') {
            console.log(responseJson);
            let data = responseJson.data
            this.setState({isLoading : false})
            if(isCallingFirsttime == true){
                console.log('working if');

                this.setState({currentpage:responseJson.current_page})
                this.setState({lastpage:responseJson.last_page})
                this.setState({isStopCallingAPI:true})
                this.setState({isLoading:false})
                this.setState({ allInvoiceList: data})

            }else{
                this.setState({currentpage:responseJson.current_page})
                this.setState({lastpage:responseJson.last_page})
                this.setState({isStopCallingAPI:false})
                this.setState({isLoading:false})
                console.log('working eklse');
                this.setState({ allInvoiceList: this.state.allInvoiceList.concat(data) })

            }
            // this.setState({ allInvoiceList: responseJson.invoices.data, isLoading: false })
        } else {
            this.setState({isStopCallingAPI:true})
            AppConstance.showSnackbarMessage(responseJson.message)
            this.setState({ isLoading: false })
        }
    })
    .catch((error) => {
        this.setState({isLoading : false})

        console.warn(error)
    });
  
  
}

renderFooter = () => {
       
    if (this.state.isStopCallingAPI == true) {
        return null;
    } else {
        return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
    }
}

loadMoreData = () => {
    // alert('dcn')

    setTimeout(() => {
        // if (this.state.isStopCallingAPI == true) {
        //     // alert('yes1')

        // } else {

            if ( this.state.currentpage > this.state.lastpage ) {
                this.setState({isStopCallingAPI: true})
                console.log('kjjj');
                // alert(this.state.lastpage , this.state.currentpage)

            }else {
                console.log('jhbjhjhj');

                console.log(this.state.currentpage , this.state.lastpage);
                this.setState({ currentpage: this.state.currentpage + 1 })
                this.callingUnpaidInvoceAPI(false)
            }
        // }
    }, 100);
}

callingSearchAPI = () => {
    // alert(text.nativeEvent.text)
  this.setState({ isLoading: true, isFooterLoading: false })
  if(this.state.searchtxt.length>0){
    this.setState({search:1})

    let url='';
    if(AppConstance.USER_ROLE == '1'){
          url = AppUrlCollection.INVOICE_UNPAID +  'invoice_global_search='+this.state.searchtxt

    }else{
          url = AppUrlCollection.INVOICE_UNPAID + 'customer_user_id=' + this.state.user_id + '&invoice_global_search='+this.state.searchtxt

    }
    // let url='';
    // url = AppUrlCollection.INVOICE + '?customer_user_id=' + this.state.user_id + '& invoice_global_search='+this.state.searchtxt

    // let url = AppUrlCollection.VEHILE_LIST +'vehicle_global_search='+this.state.searchtxt +'&status='+this.state.statusId ;
    // fetch(AppUrlCollection.VEHILE_LIST + 'vehicle_global_search'+ text.nativeEvent.text + '&status=' + this.state.statusId ,{
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_TOKEN_KEY,
                'source' : 'asl_phone_app',
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('data', responseJson.data);      
                if (responseJson.data != null || responseJson.data != '') {
                    console.log(responseJson);
                    let data = responseJson.data
                    this.setState({isLoading : false})
                    // alert(JSON.stringify(data))
                        this.setState({ searchinvoicelist: data})
                    
                    // this.setState({ allInvoiceList: responseJson.invoices.data, isLoading: false })
                } else {
                    // this.setState({isStopCallingAPI:true})
                    AppConstance.showSnackbarMessage(responseJson.message)
                    this.setState({ isLoading: false })
                }
            })
            .catch((error) => {
                this.setState({isLoading : false})
                console.warn(error)
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

render() {
    return (
        
<SafeAreaView style={styles.screen}>


<DialogLoder loading={this.state.isLoading} />

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
                                style={{width:60,height:60 , justifyContent:'center'}}
                                              onPress={() =>{ this.props.navigation.goBack()}}
                    >
                                <Ionicons name='ios-chevron-back' color='grey' size={30}/> 
                            </TouchableOpacity>

        <TouchableOpacity 
                    style={{width:150,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                        <Text style={{fontWeight:'600', fontSize:18}}>Unpaid Invoices</Text>

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
                 {/* <Image source={ require('../Images/d-2.png')}
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           /> */}
             </TouchableOpacity>
     
      </Appbar>



                {/* <Image
                    source={require('../Images/account-1.jpg')}
                      style={{ alignSelf:'center', resizeMode:'contain',
                       height:76,}}
                    /> */}
    <View style={{width:deviceWidth}}> 
    <View style={{height:40,marginTop:15, marginHorizontal:15 ,borderRadius:10,paddingHorizontal:10, flexDirection:'row', borderWidth:0.7, borderColor:'grey', justifyContent:'center'}}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={AppColors.toolbarColor}
                                        selectionColor={AppColors.toolbarColor}
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
                                        // onSubmitEditing={(text) => I this.callingSearchAPI(text)}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' onPress={()=> { if(this.state.searchtxt.length> 0){  this.callingSearchAPI()}}} color={AppColors.toolbarColor} style={{alignSelf:'center'}} size={20} />
                                </View>

                                {this.state.search == 0?
                        
                        <View style={{width:'100%'}}>
        
                            {this.state.allInvoiceList.length > 0 ?
                                  <FlatList
                                  contentContainerStyle={{alignSelf:'center',paddingBottom:140 }}
                                  data={this.state.allInvoiceList}
                                  renderItem={this.renderInvoiceContent}
                                  numColumns={numColumns}
                                  keyExtractor={(item, index) => index}
                                  extraData={this.state}
                                  ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                                  onEndReachedThreshold={0.5}
                                  ListFooterComponent={this.renderFooter}
                                  onEndReached={this.loadMoreData}
                              />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={{  fontSize: 15 }}>Invoice Not Found.</Text>
                                </View>
                            }
                        </View>
                        :
                        <View style={{width:'100%'}}>
                            {this.state.searchinvoicelist.length > 0 ?
        
                                <FlatList
                                    contentContainerStyle={{alignSelf:'center',width:deviceWidth, paddingBottom:170 }}
                                    data={this.state.searchinvoicelist}
                                    renderItem={this.renderInvoiceContent}
                                    numColumns={numColumns}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                            
                                />
                            :
                              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                 <Text style={{  fontSize: 15 }}>Invoice Not Found.</Text>
                               </View>
                            }
                        </View>
                    }
          

                </View>
           
        </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({
    dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.te
    },
    screen:{
    
        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    actionMainElavationStyle: {
        width: wp('45%'), height: hp('15%'), borderRadius: 3, borderColor: AppColors.toolbarColor, borderWidth: 0,
        marginTop: hp('1.0%'),
        marginBottom: hp('0.5%'), marginLeft: '1.5%', marginRight: '1.5%',
    },
    imageIconStyle: {
        width: 30, height: 30
    },
    headingTxtStyle: {
        color: AppColors.Signincolor,
        fontSize: 15, paddingTop: 11,
    },
    searchElavationStyle: {
        height: 50, flex: 0.8,
        borderRadius: 10,
        marginTop: 8,
        marginLeft: 5,
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
        color: AppColors.toolbarColor, fontSize: 18,
    },
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1, width: deviceWidth * 0.85,
        alignContent: 'center', alignItems: 'center', justifyContent: 'center'
    },
})

export default UnPaid;