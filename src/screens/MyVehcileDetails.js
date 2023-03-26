import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
  Share,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from  'react-native-vector-icons/dist/Feather'
import { Icon} from 'react-native-elements'
import Animated from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
// import ImageCropPicker from 'react-native-image-crop-picker';
import { Appbar } from 'react-native-paper';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';

import Dialogloder from '../screens/DialogLoder'


const dummyimages = [
  require('../Images/noimage3.jpeg') 
 ];

const MyVehcileDetails = ({route, navigation }) => {
  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item } = route.params;

  const [imgpos, setimgpos] = useState(0)
  const[showimagemodel , setshowimagemodel] = useState(false)
  const [images , setimages] = useState([])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const[Details , setDetails] = useState({
    "photos": []
    
    })
  const refRBSheet = useRef();



const callingVehicledetailedApi =async () =>{
  
  // setDetails('')
  // setimages([])
setspinner(true)
  fetch(AppUrlCollection.VEHICLE_DETAIL  + item, {
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
  
        
            setDetails(responseJson.data) 
            let data = responseJson.data
            if (data.photos.length > 0 && images.length == 0) {
              for (let index = 0; index < data.photos.length; index++) {
                  const element = data.photos[index].thumbnail;
                   images.push(element)
                  console.log(element);
              }
              setspinner(false)
            }else{
              images.push(data.photo)
              setspinner(false)
            }   
          
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    });

}


useEffect(() => {
  callingVehicledetailedApi()

  // if (Details.photos.length>0 ) {
  //   images.pop()
  //   // setimg(responseJson.data.vehicle.images)
  //   for (let index = 0; index < Details.photos.length; index++) {
  //       const element = Details.photos[index].url;
  //       images.push(element)
  //       console.log(element);
  //   }
  // }

  const willFocusSubscription = navigation.addListener('focus', () => {
    callingVehicledetailedApi();
});

return willFocusSubscription;



}, [])





return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
 
 <Dialogloder loading={spinner} />

  <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        container: {
                            backgroundColor: '#ECF0F1',
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            height: 300,
                            paddingTop:15,

                        },
                        draggableIcon: {
                            backgroundColor: "grey"
                        }
                    }}
                >
                    <View>

                    <TouchableOpacity>
                        <View style={{ borderBottomWidth: 0.6,paddingVertical:5, borderColor: '#D0D3D4', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',  fontSize:20,fontWeight:'600', paddingVertical:5,  }}>Upload Photo</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>TakePhoto() }
                    >
                        <View style={{ borderWidth: 0.5, borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10,fontWeight:'600', color: '#1a9bef', }}>Take Photo</Text>
                        </View>

                    </TouchableOpacity>
             
                    <TouchableOpacity
                    onPress={()=> Selectphoto()}
                    >
                        <View style={{ borderWidth: 0.5 , borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',fontWeight:'600', padding: 10, color: '#1a9bef', }}>Choose From Library</Text>
                        </View>

                    </TouchableOpacity>
               
                    <TouchableOpacity
                                        onPress={()=> refRBSheet.current.close()}

                    >
                        <View style={{ borderWidth: 1, borderRadius:12,marginTop:10, borderColor: 'red', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10, color: 'red', }}>Cancel</Text>
                        </View>

                    </TouchableOpacity>
                    </View>

               
               <View style={{  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 20
}}>

             
                    <TouchableOpacity 
                    onPress={()=> refRBSheet.current.close()}
                    style={{width:25,justifyContent:'center', height:25, backgroundColor:'grey', borderRadius:50, alignSelf:'flex-end', marginRight:30}}>
                    <Entypo   name='chevron-down' color='white' size={18} style={{alignSelf:'center'}}/>
                    </TouchableOpacity>
                    </View>

                </RBSheet>
           

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
                style={{justifyContent:'center', }}
                onPress={()=>navigation.goBack()}

                >
                <Ionicons  name='chevron-back' size={25} color='grey'/>



                </TouchableOpacity>


                <View style={{width:'80%',justifyContent:'center', }}>
                <Text style={{alignSelf:'center',color:'black',fontWeight:'bold', fontSize:20}}>Vehicle</Text>
                </View>

                
                
                <View style={{width:'10%',justifyContent:'center' }}>
              <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}
              onPress={()=>{
                navigation.navigate('EditVehicle',{'item': Details  }) 
              }}
              >
              <MaterialIcons  size={20} style={{alignSelf:'center'}} color={AppColors.AppColor} name='mode-edit'/>
              </TouchableOpacity>
              </View>

      </Appbar>


      <Modal
        visible={showimagemodel}
        animationType='fade'
        >
            <View style={{ justifyContent:'center',backgroundColor:'black', height:deviceHeight}}>
                <View style={{backgroundColor:'black'}}>
                <SliderBox 
          images={images}
          sliderBoxHeight={deviceHeight*0.5}
          
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
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setSliderModel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />
        
            <TouchableOpacity 
            onPress={()=> { setshowimagemodel(false)}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
          


<ScrollView style={{width:deviceWidth }}>


 <SliderBox 
 
 images={images}
 sliderBoxHeight={210}
          
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
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setshowimagemodel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />



        <View style={{width:'100%',flexDirection:'row',paddingVertical:10, paddingHorizontal:10, backgroundColor:AppColors.AppColor, justifyContent:'center', alignSelf:'center'}}>
          <View style={{width:'45%'}}>
          <Text style={{color:'white'}}>VIN NUMBER</Text>
          </View>

          <View style={{width:'55%'}}>
          <Text style={{color:'white'}}>{Details.vin}</Text>
          </View>

        </View>


<View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4', shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 1,alignSelf:'center',borderRadius:10,borderWidth:0.5, borderColor:AppColors.AppColor,  marginTop:12,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.customer_name}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOT NUMBER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.lot_number}</Text>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.make}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.model}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.year}</Text>
</View>




</View>


</ScrollView>


</SafeAreaView>





  );
};


export default MyVehcileDetails;
