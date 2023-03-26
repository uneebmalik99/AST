import React, { Component } from 'react';
import { View,Modal, SafeAreaView, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler,  ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';
import { Appbar } from 'react-native-paper';

import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

class AccountSectionMainScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabIndex: 0,
            drawerview:false,

            allInvoiceList: [
               
            ],
            unpaidInvoiceList: 
                {

                }
            ,
            paidInvoiceList: [],
            isLoading: false,
            paymentHistoryList: [],
            balancePrice: 0,

            allPagination: 1,
            unPaidPage: 1,
            paidPage: 1,
            paymentHistorypage: 1,

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

    componentDidMount() {
        // alert(AppConstance.USER_ID)
        // alert(JSON.stringify(AppConstance.USER_INFO.USER_ID))
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
     
            this.props.navigation.pop();
            return true;
        
    }
    //calling invoice Api
    callingInvoceAPI = (tabIndex) => {
        this.setState({ allInvoiceList: [], isLoading: true })
        let url = '';
        if (tabIndex == 3) {

            this.callingPaymentHistoryAPI()
        } else {
            if (tabIndex == 0) {
                url = AppUrlCollection.INVOICE
                console.log('url Change ::', url)
                alert('sdkvn')
                fetch(url, {
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
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {
    
                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         tshis.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    
                            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            } else if (tabIndex == 1) {
                url = AppUrlCollection.INVOICE + 'status=1'
                console.log('url Change ::', url)
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': AppConstance.USER_INFO.USER_TOKEN,
                        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {

                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         this.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    this.props.navigation.navigate('All', { 'itemObj': responseJson })
                            
                           //this.setState({ unpaidInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            } else if (tabIndex == 2) {
                url = AppUrlCollection.INVOICE + 'status=3'
                console.log('url Change ::', url)
                alert('sdkvn')
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': AppConstance.USER_INFO.USER_TOKEN,
                        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {
    
                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         tshis.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    
                            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            }
           
        }

    }

    callingPaymentHistoryAPI = () => {


        fetch(AppUrlCollection.PAYMENT_HISTORY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("sdbsdbjdv","response ok");

                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ paymentHistoryList: [] })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    console.log('payment histtot :: ', responseJson)
                    alert('done')
                    this.setState({ paymentHistoryList: responseJson.data.history, balancePrice: responseJson.data.balance })
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //Check internet connection
  

    //render invoice conetent
    renderInvoiceContent = ({ item, index }) => {
        var statusText = '-';
        if (item.status == '1') {
            statusText = 'Unpaid'
        } else if (item.status == '2') {
            statusText = 'Partial paid'
        } else if (item.status == '3') {
            statusText = 'Paid'
        }
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.90, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
            >
                {item.vehicle.image != null && item.vehicle.image.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: item.vehicle.image[0].image }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} resizeMode='contain' />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('InvoiceDetailsScreen', { 'invoceObj': item, 'isCallingAccountScreen': true })}
            >
                <Text style={{
                   
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 13
                }}>
                    {item.id != '' ? 'Invoice ID # ' + item.id : '-'}</Text>
                <Text style={{
                    
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
                }}>{item.status != '' && item.status != null ? 'Status : ' + statusText : 'Status : - '}</Text>
                <Text style={{
                    
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green',
                    fontSize: 12
                }}>{item.final_total != ' ' && item.final_total != null ? 'Total Amount : ' + item.final_total : 'Total Amount : - '}</Text>
            </TouchableOpacity>
        </Elavation>
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
    //render invoice conetent
    renderpaymentHistoryContent = ({ item, index }) => {
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.90, flex: 1, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
            >
                <View style={{ flexDirection: 'row', marginRight: 10, paddingTop: 3, paddingBottom: 3 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center', }}>
                        <Text style={{
                        
                            color: AppColors.textColor,
                            fontSize: 12,
                        }}>Payment Date : </Text>
                        <Text style={{
                        
                            color: AppColors.textColor,
                            fontSize: 12
                        }} numberOfLines={1}>{item.created_at != ' ' && item.created_at != null ? item.created_at : ' - '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{
                            
                            color: AppColors.textColor,
                            fontSize: 12,
                        }}>Voucher NO : </Text>
                        <Text style={{
                          
                            color: AppColors.textColor,
                            fontSize: 12
                        }} numberOfLines={1}>{item.voucher_no != ' ' && item.voucher_no != null ? item.voucher_no : ' - '}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', marginRight: 10, paddingBottom: 3 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center' }}>
                        <Text style={{
                          
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>Method : </Text>
                        <Text style={{
                          
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>{item.payment_method != null ? item.payment_method : ' - '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{
                          
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>Amount : </Text>
                        <Text style={{
                          
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>{item.debit_amount != ' ' && item.debit_amount != null ? item.debit_amount : ' - '}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignContent: 'center', paddingBottom: 3 }}>
                    <Text style={{
                        
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>Ref. NO. : </Text>
                    <Text style={{
                        
                        color: AppColors.textColor, fontSize: 12
                    }}>{item.ref_id != '' && item.ref_id != null ? item.ref_id : ' - '}</Text>
                </View>

                <View style={{ width: deviceWidth * 0.75, flexDirection: 'row', alignContent: 'center', paddingBottom: 3 }}>
                    <Text style={{
                        
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>Note : </Text>
                    <Text style={{
                      
                        color: AppColors.textColor, fontSize: 12, lineHeight: 20
                    }}>{item.note != '' && item.note != null ? item.note : ' - '}</Text>
                </View>


                {/* <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12, flex: 1
                    }}>{item.debit_account != ' ' && item.debit_account != null ? 'Debit Account : ' + item.debit_account : 'Debit Account : - '}
                    </Text>

                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>{item.credit_amount != ' ' && item.credit_amount != null ? 'Credit Amount : ' + item.credit_amount : 'Credit Amount :  - '}</Text>


                </View>

                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12, flex: 1
                    }}>{item.credit_account != ' ' && item.credit_account != null ? 'Credit Account : ' + item.credit_account : 'Credit Account :  - '}</Text>


                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>{item.debit_amount != ' ' && item.debit_amount != null ? 'Debit Amount : ' + item.debit_amount : 'Debit Amount :  - '}</Text>
                </View> */}
            </TouchableOpacity>
        </Elavation>
    }

    callingTabApi = (tabIndex) => {
        this.setState({
            tabIndex: tabIndex,
            allPageServiceCallStop: false, paidServiceCallStop: false, unPaidServiceCallStop: false, allPagination: 1, unPaidPage: 1, paidPage: 1,
            paymentHisServiceCallStop: false, paymentHistorypage: 1
        })
        console.log('Invoice APi Calling :', tabIndex)
        setTimeout(() => {
            this.callingInvoceAPI(tabIndex)
        }, 200)

    }

    //load more
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

    //load more unpaid data
    loadMoreDataUnpaid = () => {
        setTimeout(() => {
            if (this.state.unPaidServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ unPaidPage: this.state.unPaidPage + 1 }, () => this.callingUnpaidInvoceAPI())
                }
            }
        }, 100)
    }

    //load more data paid
    loadMoreDataPaid = () => {
        setTimeout(() => {
            if (this.state.paidServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ paidPage: this.state.paidPage + 1 }, () => this.callingPaidInvoceAPI())
                }
            }
        }, 100)
    }

    //load more data paid
    loadMorePaymentHistory = () => {
        setTimeout(() => {
            if (this.state.paymentHisServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ paymentHistorypage: this.state.paymentHistorypage + 1 }, () => this.callingPaymentHostoryAPI())
                }
            }
        }, 100)
    }

    callingAllInvoceAPI = () => {
        let url = '';
        url = AppUrlCollection.INVOICE + 'page=' + this.state.allPagination
        console.log('url Change ::NewDost', url)
        this.setState({ allFooterCalling: true, unPaidFooterCalling: false, paidFooterCalling: false })
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                    this.setState({
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList,
                        allPageServiceCallStop: false,
                        allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                    })
                } else {
                    this.setState({ allPageServiceCallStop: true, paidFooterCalling: false })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingUnpaidInvoceAPI = () => {
        let url = '';
        url = AppUrlCollection.INVOICE + 'page=' + this.state.unPaidPage + '&status=1'
        this.setState({ allFooterCalling: false, unPaidFooterCalling: true, paidFooterCalling: false })
        console.log('url Change ::NewDost', url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList,
                        unPaidServiceCallStop: false,
                        paidFooterCalling: false
                    })
                } else {

                    this.setState({ unPaidServiceCallStop: true })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //calling paid api
    callingPaidInvoceAPI = () => {
        let url = AppUrlCollection.INVOICE + 'page=' + this.state.paidPage + '&status=3'
        this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: true })
        console.log('paid API Caliing ::', url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        //   allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList,
                        paidServiceCallStop: false,
                        paidFooterCalling: false
                    })
                } else {
                    this.setState({ paidServiceCallStop: true, paidFooterCalling: false })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingPaymentHistoryAPI = () => {
        this.setState({ paymentHisFooterCalling: true })
        console.log('payment_historyv::', AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, AppConstance.USER_INFO.USER_TOKEN)
        fetch(AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN,
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    console.log('payment histtot sdadada:: ', responseJson)
                    if (responseJson.data.history.length > 0) {
                        this.setState({
                            paymentHistoryList: this.state.paymentHistoryList.concat(responseJson.data.history),
                            balancePrice: responseJson.data.balance,
                            paymentHisServiceCallStop: false,
                            paymentHisFooterCalling: false
                        })
                    } else {
                        this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                        //AppConstance.showSnackbarMessage(responseJson.message)
                    }

                } else {
                    this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    renderFooterAll = () => {
        if (this.state.allPageServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }

        // if (this.state.allFooterCalling) {
        //     return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        // } else {
        //     return null;
        // }
    }

    renderFooterUnpaid = () => {
        if (this.state.unPaidServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    renderFooterPaid = () => {
        if (this.state.paidServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    renderPaymentHist = () => {
        if (this.state.paymentHisServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    generateFlatList = () => {
        if (this.state.tabIndex == 0) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooterAll}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataAll}
                        // onEndThreshold={0.1}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Account Not Found</Text>
                </View>
            }
        } else if (this.state.tabIndex == 1) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    {/* <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooterUnpaid}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataUnpaid}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    /> */}
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                </View>
            }
        }
        else if (this.state.tabIndex == 2) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderFooterPaid}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataPaid}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                </View>
            }
        } else if (this.state.tabIndex == 3) {
            if (this.state.paymentHistoryList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Elavation
                            elevation={3}
                            style={styles.searchElavationStyle}>
                            <View style={styles.searchElvationViewStyle}>
                                <TextInput style={styles.searchTxtInputStyle}
                                    placeholder='Search'
                                    placeholderTextColor={AppColors.toolbarColor}
                                    selectionColor={AppColors.toolbarColor}
                                    onChangeText={(text) => this.setState({ searchTxt: text })}
                                    onSubmitEditing={() => this.callingSearchAPI()}
                                    returnKeyType='search'
                                />
                                <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                            </View>
                        </Elavation>

                        <Elavation
                            elevation={5}
                            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: 5, height: 48, flex: 0.2, marginRight: 15, alignSelf: 'center', marginTop: 8 }}
                        >
                            <Text style={{ color: AppColors.textColor, fontSize: 13 }}>Balance</Text>
                            <Text style={{  color: AppColors.textColor, fontSize: 14 }}>{this.state.balancePrice}</Text>
                        </Elavation>

                    </View>

                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.paymentHistoryList}
                        renderItem={this.renderpaymentHistoryContent}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderPaymentHist}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMorePaymentHistory}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: AppColors.textColor, fontSize: 15 }}>Payment History Not Found</Text>
                </View>
            }
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
                  <Text style={{fontSize:16, fontWeight:'600'}}>Accounts</Text>
                               
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                            borderColor:'grey',borderRadius:400/2, justifyContent:'center', height:35,width:35,
                         alignContent:"flex-end",
                        }  
                        }
                        
            
                        >

                         </TouchableOpacity>
                 
                  </Appbar>
            
            

   
                <View style={{ flex: 1, paddingHorizontal:10, backgroundColor:'#ECF0F1' }}>



                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('All',{'user_id':AppConstance.USER_INFO.USER_ID})}>
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 0 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 0 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        {/* <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} /> */}
                                    }
                                    <Text style={styles.headingTxtStyle}>ALL</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Unpaid',{'user_id':AppConstance.USER_INFO.USER_ID})}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 1 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 1 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={styles.headingTxtStyle}>UNPAID</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                    
                    </View>


                    <View 
                    style={{flexDirection:'row'}}>
    <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Paid',{'user_id':AppConstance.USER_INFO.USER_ID})}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 2 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 2 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={styles.headingTxtStyle}>PAID</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('PaymentHistory',{'user_id':AppConstance.USER_INFO.USER_ID})}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 3 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 3 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={[styles.headingTxtStyle, { fontSize: 12, justifyContent: 'center', textAlign: 'center' }]}>PARTIALLY PAID</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>


                    </View>
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
        borderBottomWidth:5,
        borderColor:AppColors.AppColor,
        width: wp('45%'), height: hp('15%'), borderRadius: 5,  borderWidth: 0,
        marginTop: hp('1.0%'),
        marginBottom: hp('0.5%'), marginLeft: '1.5%', marginRight: '1.5%',
    },
    imageIconStyle: {
        width: 30, height: 30
    },
    headingTxtStyle: {
     color: AppColors.AppColor,fontWeight:'800',
        fontSize: 16, paddingTop: 11,
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
export default AccountSectionMainScreen;

    