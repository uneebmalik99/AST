import React,{useState,useEffect, useRef} from 'react';
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
  Alert,
  Platform
} from 'react-native';
import { Icon} from 'react-native-elements'
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
import { TextInput } from 'react-native-gesture-handler';
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection'
import { Appbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import * as ImagePicker from "react-native-image-picker"
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-datepicker'
import QRCodeScanner from 'react-native-qrcode-scanner';


import RNHeicConverter from 'react-native-heic-converter';

const dummyimages = [
  require('../Images/noimage3.jpeg')      
 ];

const EditVehicle = ({route, navigation }) => {
  const refRBSheet = useRef();
  const { item  } = route.params;

  const [deletemodalshow ,setdeletemodalshow] =useState(false)
  const [date, setDate] = useState(new Date(1598051730000));
const [ showimagemodel ,setshowimagemodel] = useState(false)
const [details , setdetails] = useState(item)
const picture = [
  {
    label: 'PICTURES'
  }
  ]  
  const [images , setimages] = useState([
    require('../Images/noimage3.jpeg') 


  ])
  const [ close , setclose] = useState(false)
  const [pickupdatemodal , setpickupdatemodal]= useState(false)
  const [add , setadd] = useState(true)
  const [imgposition, setimgposition] = useState(0)
  const [ vin , setvin] = useState(item.vin == ''? '':item.vin)
  const [Customerlist , setCustomerlist ] = useState([])
  const [Filteredcustomer , setFilteredcustomer ] = useState([])
  const[Search , setSearch]= useState()
  const [customername , setcustomername] = useState(item.customer_name)
  const [version_id , setversion_id ] = useState(item.version_id);
  const [customeruserid , setcustomeruserid] = useState(item.customer_user_id)
  const [location_id ,setlocation_id ] = useState(item.location_id)
  const [location_name, setlocation_name] = useState()
  const [location , setlocation ] = useState(item.location);
  const [vehicletype , setvehicletype] =useState(item.vehicle_type)
  const [make , setmake ] = useState(item.make);
  const [model , setmodel ] = useState(item.model);
  const [color , setcolor ] = useState(item.color);
  const [weight , setweight ] = useState(item.weight);
  const [year , setyear ] = useState(item.year);
  const [hatnumber , sethatnumber ] = useState(item.hat_number);
  const [licensenumber , setlicensenumber ] = useState(item.license_number);
  const [note2 , setnote2] = useState(item.note)
  const [lotnumber , setlotnumber ] = useState(item.lot_number);
  const [containernmber , setcontainernmber] = useState(item.container_number)
  const [status , setstatus ] = useState(item.status);
  const [ statusname , setstatusname] = useState(item.status_name)
  const [ vcr , setvcr] = useState(item.vcr)
  const [ loadstatus ,setloadstatus] = useState(item.load_status)
  const [condition , setcondition ] = useState(item.condition);
  const [damaged , setdamaged ] = useState(item.damaged);
  const [titlenumber , settitlenumber ] = useState(item.title_number);
  const [pictures , setpictures] = useState();
  const [deliverdate , setdeliverdate ] = useState(item.deliver_date);
  const [pickupdate , setpickupdate] = useState(item.pickup_date);
  const [ auctionat , setauctionat] = useState(item.auction_at)
  const [note , setnote ] = useState(item.note);
  const [checkoption , setcheckoption ] = useState();
  // const [vehicle_features , setvehicle_features]=(item.vehicle_features)
  const [keynote , setkeynote] = useState(item.key_note)
  const [ CDChanger,  setCDChanger]= useState()
  const [GPSNavigationSystem ,setGPSNavigationSystem]= useState()
  const [SpareTireJack, setSpareTireJack] = useState('')
  const [WheelCovers, setWheelCovers] = useState('')
  const [Radio ,setRadio]= useState('')
  const [ CDPLAYER ,setCDPLAYER ] = useState();
  const [ SPEAKER ,setSPEAKER ] = useState('');
  const [ WHEELCAPS ,setWHEELCAPS] = useState('');
  const [ MIRROR ,setMIRROR] = useState();
  const [ OTHERS ,setOTHERS ] = useState('');
  const [frontwindshiled , setfrontwindshiled ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[2]: '');
  const [bonnet , setbonnet ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[3]: '');
  const [grill , setgrill ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[4]: '');
  const [frontbumper , setfrontbumper ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[5]: '');
  const [frontheadlight , setfrontheadlight ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[6]: '');
  const [rearwindshield , setrearwindshield ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[7]: '');
  const [trunkdoor , settrunkdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[8]: '');
  const [rearbumper , setrearbumper ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[9]: '');
  const [rearbumpersupport , setrearbumpersupport ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[10]: '');
  const [taillamp , settaillamp ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[11]: '');
  const [frontleftfender , setfrontleftfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[12]: '');
  const [leftfrontdoor , setleftfrontdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[13]: '');
  const [leftreardoor , setleftreardoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[14]: '');
  const [leftrearfender , setleftrearfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[15]: '');
  const [pillar , setpillar ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[16]: '');
  const [roof, setroof] =useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[17]: '');
  const [rightrearfender , setrightrearfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[18]: '');
  const [rightreardoor , setrightreardoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[20]: '');
  const [rightfrontdoor , setrightfrontdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[21]: '');
  const [frontrightfender , setfrontrightfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[22]: '');
  const [fronttyres , setfronttyres]= useState(item.vehicle_conditions[23]);
  const Damaged = [
    {
      label: 'Yes'
     },
     {
      label: 'NO'
     },
    ];
    const [imagesurls ,setimagesurls ] = useState([])
    const [ images2 , setimages2] = useState([])
  const [vehicleconditions , setvehicleconditions] = useState(item.vehicle_conditions)
  const [vehicleDetails , setvehicleDetails] = useState([''])
  const [locationslist , setlocationslist] = useState([])
  const [locmodal,setlocmodal]= useState(false)
  const [custmodal,setcustmodal]= useState(false)
  const [imgpos, setimgpos] = useState(0)
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
  const [Export, setExport] = useState(false)
  const [data, setdata] = useState([])
const [torchMode ,settorchMode] = useState('off')
const [cameraType ,setcameraType] = useState('back')
const [barcodemodal , setbarcodemodal] = useState(false)





// for android camera

const captureImage = async (type) => {
  let options = {
    
    quality: 0.3,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }else{

        if(images[0] == require('../Images/noimage3.jpeg')){
          images.pop();
          setclose(true)
        }
        let temp = {} ;
        temp.name = response.assets[0].fileName;
        temp.size = response.assets[0].fileSize;
        temp.type = response.assets[0].type;
        temp.url = response.assets[0].uri;

        images.push(response.assets[0])
          // alert(JSON.stringify(temp))
    var value = new FormData();
    value.append('file',{uri:response.assets[0].uri,
         name:response.assets[0].fileName,
         type:response.assets[0].type
       });

       setspinner(true)

        fetch(AppUrlCollection.VEHICLE_DETAIL + item.id +'/photos-upload', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
              'Accept': 'application/json',
              'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

          },
          body: value,
                     
      })
          .then((response) => response.json())
          .then((responseJson) => {
            // alert(JSON.stringify(responseJson))
            // console.log(responseJson.data);
            console.log(responseJson);
            imagesurls.push(responseJson.data)
            // alert(JSON.stringify(responseJson))
            // alert(JSON.stringify(responseJson))
            console.log(responseJson.data+'images urll is '+imagesurls);

            setspinner(false)
             
          })
          .catch((error) => {
            alert(error)
            setspinner(false)
              console.warn(error)
          });
     


















      }




      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      // setFilePath(response);
    });
  }
};
// for android image pick from library
const selectFile3 = async () => {
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
      
      //There can me more options as well find above
    });

console.log('-----'+JSON.stringify(results));

if(images[0] == require('../Images/noimage3.jpeg')){
  images.pop();
  setclose(true)
}
    for (const res of results) {
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      
      
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
  


      var i ;
      // for( i =0; i< images1.length; i++){

        
        images.push(res)
        // alert(JSON.stringify(temp))

    var value = new FormData();
  
       value.append('file',res);

       setspinner(true)

        fetch(AppUrlCollection.VEHICLE_DETAIL + item.id +'/photos-upload', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
              'Accept': 'application/json',
              'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

          },
          body: value,
                     
      })
          .then((response) => response.json())
          .then((responseJson) => {
            // alert(JSON.stringify(responseJson))
            // console.log(responseJson.data);
            console.log(responseJson);
            imagesurls.push(responseJson.data)
            console.log('images urll is '+imagesurls);

            setspinner(false)
             
          })
          .catch((error) => {
            alert(error)
            setspinner(false)
              console.warn(error)
          });
     
      // }  
            // console.log(JSON.stringify(res));
    }



  } catch (err) {
    setspinner(false)

    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      //setopener(false)

      //If user canceled the document selection
      // alert('Canceled from multiple doc picker');
    } else {
     // setopener(false)

      //For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }


};

const TakePhoto = async (type) => {
  let options = {
    
    quality: 0.3,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  // let isCameraPermitted = await requestCameraPermission();
  // let isStoragePermitted = await requestExternalWritePermission();
  // if (isCameraPermitted && isStoragePermitted) {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }else{
        if(images[0] == require('../Images/noimage3.jpeg')){
          images.pop();
          setclose(true)
        }


        let temp = {} ;
        temp.name = response.assets[0].fileName;
        temp.size = response.assets[0].fileSize;
        temp.type = response.assets[0].type;
        temp.url = response.assets[0].uri;

        images.push(response.assets[0])
          // alert(JSON.stringify(temp))
    var value = new FormData();
    value.append('file',{uri:response.assets[0].uri,
         name:response.assets[0].fileName,
         type:response.assets[0].type
       });

       setspinner(true)

        fetch(AppUrlCollection.VEHICLE_DETAIL + item.id +'/photos-upload', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
              'Accept': 'application/json',
              'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'

          },
          body: value,
                     
      })
          .then((response) => response.json())
          .then((responseJson) => {
            // alert(JSON.stringify(responseJson))
            // console.log(responseJson.data);
            console.log(responseJson);
            imagesurls.push(responseJson.data)
            // alert(JSON.stringify(responseJson))
            // alert(JSON.stringify(responseJson))
            console.log(responseJson.data+'images urll is '+imagesurls);

            setspinner(false)
             
          })
          .catch((error) => {
            alert(error)
            setspinner(false)
              console.warn(error)
          });
     


















      }




      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      // setFilePath(response);
    });
  
};

const requestCameraPermission = async () => {
  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera permission',
      },
    );
    // If CAMERA Permission is granted
     granted === PermissionsAndroid.RESULTS.GRANTED;
    //  launchCameraAndroid()
    //  captureImage()
            // addEventListener('camera')
            return true;

  } catch (err) {
    console.warn(err);
    return false;
  }
 
};

const requestExternalWritePermission = async () => {
if (Platform.OS === 'android') {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Write Permission',
        message: 'App needs write permission',
      },
    );
    // If WRITE_EXTERNAL_STORAGE Permission is granted
    granted === PermissionsAndroid.RESULTS.GRANTED

      return true;

  } catch (err) {
    console.warn(err);
    alert('Write permission err', err);
  }
  return false;
}
};


const searchFilterFunction = (text) => {
  if (text) {

    const newData = Customerlist.filter(
      function (item) {
        
        const itemData =  item.customer_name
          ?  item.customer_name.toUpperCase()
          :''.toUpperCase();

         
        const textData = text.toUpperCase();

        if(itemData.indexOf(textData) > -1){
          return  itemData.indexOf(textData) > -1;
        }
    });

    setCustomerlist(newData)
  //   setFilteredDataSource(newData);

  //   setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    setCustomerlist(Filteredcustomer)
    console.log('blank');
  //   this.setState({vehicleList: vehicleList2})
  //   setFilteredDataSource(data);
  //   setSearch(text);
  }
};

const deleteimage = () =>{
  if(AppConstance.USER_ROLE == 2 ){
    alert('Admin have not permission to delete images')
  }else{
  // setspinner(true)
  if(images.length == 1  ){
    setclose(false)
    images.push(require('../Images/noimage3.jpeg') )
  }
  let pos = imgposition;
  console.log('---'+pos);
  let img1 = []
  // alert(imgposition)
  for(var i = 0 ; i< images.length ; i++){
    if(i != pos){
      img1.push(images[i])
      
    }
   }
   setimages(img1)

let img2 = []
for(var index = 0 ; index< images2.length ; index++){
  if(index != pos){
    
    if(images2[index].id ){
      img2.push(images2[index])

    }
  }
 }
 setimages2(img2)

 if(images.length === 0 ){
  setclose(false)
}
  }

}

const uploadheicimage = async (path) => {

  let namet = new Date(); 
  namet.toLocaleTimeString()
  var value = new FormData();
  value.append('file',{uri:path ,
       name: namet+'.jpg',
       type:'image/jpg'
     });

    console.log('value formadata is  1 -=--- '+JSON.stringify(value));
      fetch(AppUrlCollection.EXPORT_DETAIL + item.id +'/photos-upload', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
              'Accept': 'application/json',
              'source' : 'asl_phone_app',
              'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'
          },
          body: value,                 
      })
          .then((response) => response.json())
          .then((responseJson) => {
            // alert(JSON.stringify(responseJson))
            // console.log(responseJson.data);
            console.log(responseJson);
            imagesurls.push(responseJson.data)
            console.log('images urll is '+imagesurls);
            setspinner(false)       
          })
          .catch((error) => {
            alert(error)
            setspinner(false)
              console.warn(error)
          });

}

const chooseFile = async() => {

  ImageCropPicker.openPicker({
        multiple: true,
        compressImageQuality:0.3
      }).then(images1 => {
        if(images[0] == require('../Images/noimage3.jpeg')){
          images.pop();
          setclose(true)
        }
        var i ;
        for( i =0; i< images1.length; i++){


          if(images1[i].filename.includes('.HEIC')){
            let temp = {};
            temp.name = images1[i].filename;
          temp.size = images1[i].size;
          temp.type = images1[i].mime;
          temp.url = images1[i].path;
            console.log('fgfggfgfgfgfgf'+images1[i]);
            images.push(temp)
        
            let fileName = "";
            RNHeicConverter
	          .convert({ // options
          		path: images1[i].sourceURL,
              	})
	            .then((result) => {
	      	console.log('result is here'+JSON.stringify(result)); 
          // path = result.path;
          uploadheicimage(result.path)
          
          // alert(path)
          // fileName = 'temp.jpg';
          // { success: true, path: "path/to/jpg", error, base64, }
        
        });

     
       

   

       setspinner(true)


          }
          else {

          let temp = {} ;
          temp.name = images1[i].filename;
          temp.size = images1[i].size;
          temp.type = images1[i].mime;
          temp.url = images1[i].path;

          images.push(temp)

      var value = new FormData();
      value.append('file',{uri:images1[i].path ,
           name:images1[i].filename,
           type:images1[i].mime
         });

         setspinner(true)

          fetch(AppUrlCollection.VEHICLE_DETAIL + item.id +'/photos-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                'Accept': 'application/json',
                'source' : 'asl_phone_app',
                'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'
            },
            body: value,
                       
        })
            .then((response) => response.json())
            .then((responseJson) => {
              // alert(JSON.stringify(responseJson))
              // console.log(responseJson.data);
              console.log(responseJson);
              imagesurls.push(responseJson.data)
              // alert(JSON.stringify(responseJson))
              console.log('images urll is '+imagesurls);

              setspinner(false)
               
            })
            .catch((error) => {
              alert(error)
              setspinner(false)
                console.warn(error)
            });
       
        }      

        }
      });

};

const searchingCustomer = (text) => {
  if (text) {
    console.log('text is '+text);
console.log('-----==---'+Customerlist.length);
    const newData = Customerlist.filter(
      function (item) {

        const itemData = item.text
          ? item.text.toUpperCase()
          : ''.toUpperCase();

          console.log('--'+itemData);
      const textData = text.toUpperCase();
      // itemData.indexOf(textData) > -1  
      return itemData.indexOf(textData) > -1;

      //  if(itemData.indexOf(textData)  -1){
      //   return  itemData.indexOf(textData)  -1;
      // }             
    });
    setFilteredcustomer(newData);
    setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    console.log('blank');
    // Update FilteredDataSource with masterDataSource
    setFilteredcustomer(data);
    setSearch(text);
  }
};

const callinglocation =() =>{
  setspinner(true)

let url = AppUrlCollection.LOCATION
  fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
        'source' : 'asl_phone_app',
        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


    },
})
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({ isLoading: false })
      setspinner(false)
      setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const barcodeReceived =(e)=> {
  console.log('Barcode: ' + e.data);
  console.log('Type: ' + e.type);
}

const callingCustomer =() =>{
  setspinner(true)
  let url = AppUrlCollection.BASE_URL+'customers-item' + '?limit=-1' 
  fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
        'source' : 'asl_phone_app',
        'asl-platform': Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


      },
})
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({ isLoading: false })
      setspinner(false)
      // alert(JSON.stringify(responseJson))
      setCustomerlist(responseJson)
      setFilteredcustomer(responseJson)
      // setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const callingContainerApi = () => {
  setspinner(true)
  var url = AppUrlCollection.VEHICLE_DETAIL + '?id='+ item.id; 
  // if (isFirstTimeCaling) {
  //   setspinner(false)
  //   setisFooterLoading(false)
  //     // this.setState({ isLoading: true, isFooterLoading: false })
  //     url = AppUrlCollection.VEHILE_LIST
  // } else {
  //   setspinner(false)
  //   setisFooterLoading(true)
  //     // this.setState({ isLoading: false, isFooterLoading: true })
  //     url = AppUrlCollection.VEHILE_LIST 
  // }
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
          'source' : 'asl_phone_app',
          'asl-platform':Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'


        },
  })
      .then((response) => response.json())
      .then((responseJson) => {
          // this.setState({ isLoading: false })
        setspinner(false)
          console.log('Response data viw :: ', responseJson)
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              imageBasePath = responseJson.data.other.vehicle_image
              
              // if (responseJson.data.vehicle ) {
                let data1= responseJson.data.vehicle;
                setdata(responseJson.data.vehicle)

                sethatnumber(data1.hat_number)

                setyear(data1.year)
                setcolor(data1.color)
                setmodel(data1.model)
                setmake(data1.make)
                setweight(data1.weight)

                setlicensenumber(data1.license_number)
                setlotnumber(data1.lot_number)

                setcontainernmber(data1.containernmber)

                let towingRequest = responseJson.data.vehicle.towingRequest;
                // console.log('--=-=-=-=-=-=-'+responseJson.data.vehicle.towingRequest);

                settitlenumber(towingRequest.title_number)
                setdeliverdate(towingRequest.deliver_date)
                setpickupdate(towingRequest.pickup_date)
                setpictures(towingRequest.pictures)
                setdamaged(towingRequest.damaged)
                setcondition(towingRequest.condition)

                setstatus(data1.status)


                switch(data1.location) {
 
                  case '1':
                    setlocation_name('LA')
                      break;
                      case '2':
                        setlocation_name('GA')
                          break;
                      
       
                          case '3':
                            setlocation_name('NY')
                              break;
                          
           
                              case '4':
                                setlocation_name('TX')
                                  break;
                              
               
                                  case '8':
                                    setlocation_name('TORONTO')
                                      break;
                                  
                   
                                      case '9':
                                        setlocation_name('MONTREAL')
                                          break;
                                      
                       
                                          case '10':
                                            setlocation_name('HALIFAX')
                                              break;
                                          
                           
                                              case '11':
                                                setlocation_name('EDMONTON')
                                                  break;
                                              
                                                  case '12':
                                                    setlocation_name('CALGARY')
                                                      break;
                                                  
                                   
                                                      case '13':
                                                        setlocation_name('Afghanistan')
                                                          break;
                                                      
                                       
                                                          case '15':
                                                            setlocation_name('Turkamanistan')
                                                              break;
                                                          
                                           
                                                              case '19':
                                                                setlocation_name('VANCOUVER')
                                                                  break;
                                                                  case '20':
                                                                    setlocation_name('MANITOBA')
                                                                      break;
                                                                      case '21':
                                                                        setlocation_name('WA')
                                                                          break;
                                                              
  

                  default:
                    // alert("NUMBER NOT FOUND");
                    setlocation_name('Please Select Location')
                
                  }


                let condition = responseJson.data.vehicle.vehicleConditions



                for ( var i=0 ; i<condition.length ; i++ ){
                  let element = condition[i].condition.name
                

                switch(element) {
 
                  case 'FRONT WINDSHILED':
                    setfrontwindshiled(condition[i].value)
                      break;
                  
                  case 'BONNET':
                    setbonnet(condition[i].value)
                  
                    break;
             
                  case 'GRILL':
                    setgrill(condition[i].value)
                    break;
             
                  case 'FRONT BUMPER':
                    setfrontbumper(condition[i].value)
                    break;
             
                    case 'FROTN HEAD LIGHT':
                    setfrontheadlight(condition[i].value)
                    break;
                  
                  case 'REAR WINDSHIELD':
                    setrearwindshield(condition[i].value)
                    break

                    case 'TRUNK DOOR':
                    settrunkdoor(condition[i].value)
                    break;
                  
                  case 'REAR BUMPER':
                    setrearbumper(condition[i].value)
                    break

                    case 'REAR BUMPER SUPPORT':
                    setrearbumpersupport(condition[i].value)
                    break;
                  
                  case 'TAIL LAMP':
                    settaillamp(condition[i].value)
                    break

                    case 'FRONT LEFT FENDER':
                    setfrontleftfender(condition[i].value)
                    break;
                  
                  case 'LEFT FRONT DOOR':
                    setleftfrontdoor(condition[i].value)
                    break


                    case 'LEFT REAR DOOR':
                    setleftreardoor(condition[i].value)
                    break;
                  
                  case 'LEFT REAR FENDER':
                    setleftrearfender(condition[i].value)
                    break;







                    case 'PILLAR':
                      setpillar(condition[i].value)
                      break;
                    
                    case 'ROOF':
                      setroof(condition[i].value)
                      break
  
                      case 'RIGHT REAR FENDER':
                      setrightrearfender(condition[i].value)
                      break;
                    
                    case 'RIGHT REAR DOOR':
                      setrightreardoor(condition[i].value)
                      break
  
  
                      case 'RIGHT FRONT DOOR':
                      setrightfrontdoor(condition[i].value)
                      break;
                    
                    case 'FRONT RIGHT FENDER':
                      setfrontrightfender(condition[i].value)
                      break;


                  default:
                    // alert("NUMBER NOT FOUND");
                
                  }
             
                }

                
                
                  // if (isFirstTimeCaling) {
                  //   setvehicleList(responseJson.data.vehicleList)
                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //   setspinner(false)
                  //     // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                  // } else {
                    
                  //   setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
                  //   setdata(old => [...old, ...data]);

                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                  // }
              } else {
                setdata(responseJson.data.vehicle)

                  // if (isFirstTimeCaling) {
                  //   setvehicleList([])
                  //   setnoMoreDataFound(true);
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                  // } else {
                  //   setisFooterLoading(false)
                  // setnoMoreDataFound(true)
                  //     // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                  // }

              }
          // } else {
          //     AppConstance.showSnackbarMessage(responseJson.message)
          // }
      })
      .catch((error) => {
          console.warn(error)
      });
}

useEffect(() => {
// alert()

console.log('===='+JSON.stringify());
var myArray = {id1: 100, id2: 200, "tag with spaces": 300};

// alert(JSON.stringify(item.vehicle_features))
if(item.vehicle_features != null || item.vehicle_features != undefined || item.vehicle_features != ''){
// alert(item.vehicle_features.length)
// alert(item.vehicle_features[0])''
for (var key in item.vehicle_features) {
  console.log("key " + key + " has value " + item.vehicle_features[key]);
let element = key

  switch(element) {
    case "3":
      // alert('hj')
      setCDChanger(3)
        break;

    case "4":
      setGPSNavigationSystem(4)
      break;
    case "5":
        setSpareTireJack(5)
      break;
      case "6":
        setWheelCovers(6)
      break;
      case "7":
        setRadio(7)
      break;
      case "8":
        setCDPLAYER(8)
      break; 
       case "10":
         setMIRROR(10)
      break;
      case "11":
          setSPEAKER(11)
        break;
      case "12":
        setOTHERS(12)
      break;
     

    default:
  
    }
}

  for(var i=0; i<item.vehicle_features.length; i++){
    // alert('h')
    let element = item.vehicle_features[i];
    console.log('-----------'+element);
// alert(element)
  
  }
}

// callingContainerApi()
callinglocation()
callingCustomer()



// alert(item.vehicle_features)

if (item.photos.length > 0) {
  images.pop();
setclose(true)
  setimages2(item.photos)

  // setimg(responseJson.data.vehicle.images)
  for (let index = 0; index < item.photos.length; index++) {
      const element = item.photos[index].thumbnail;
      images.push(element)
      console.log(element);
  }


}else{
  setclose(false)


}

  return () => {
    
  }
}, [])

const renderlist = ({item}) =>{
 console.log('location',item);

  return(
    <TouchableOpacity 
    onPress={()=>{setlocation_id(item.id); setlocation(item.name); setlocation_name(item.name); setlocmodal(false) }}
    style={{marginVertical:5,justifyContent:'space-around', flexDirection:'row'}}>
      <Text>{item.id}</Text>
<Text>{item.name}</Text>

    </TouchableOpacity>
  
  
  )
  
   }

const renderCustomerlist = ({item}) =>{

    let c ;
    if(customername == item.customer_name){
      c = 1
    }
    return(
      
<TouchableOpacity 
onPress={()=> { setcustmodal(false); setcustomername(item.customer_name), setcustomeruserid(item.user_id) }}
style={{marginVertical:5,borderWidth:0.5,flexDirection:'row', borderColor:'grey', borderRadius:10,paddingVertical:12,paddingHorizontal:10,}}>

{c == null ? 
  <Ionicons name='ios-radio-button-off-sharp'  color='grey' style={{alignSelf:'center'}}  size={20} />:
  <Ionicons name='ios-radio-button-on'  color={AppColors.AppColor} style={{alignSelf:'center'}}  size={20} />
}


  <Text style={{alignSelf:'center',color:'grey', marginLeft:5,}}>{item.customer_name}</Text>
{/* <Text>sfsdfn</Text> */}
</TouchableOpacity>    
    
    )
    
     }  

 const callingupdateApi = ()=>{
   setspinner(true)

  let f = {};
  if(CDChanger == 3){
    f["3"] = 3;

    // f.push(CDChanger)
  }
  if(GPSNavigationSystem == 4){
    f["4"] = 4;

    // f.push(GPSNavigationSystem)
  }
  if(SpareTireJack == 5){
    f["5"] = 5;

    // f.push(SpareTireJack)
  }
  if(WheelCovers == 6){
    f["6"] = 6;

    // f.push(WheelCovers)
  }
  if(Radio == 7){
    f["7"] = 7;

    // f.push(Radio)
  }
  if(CDPLAYER == 8){
    f["8"] = 8;

    // f.push(CDPLAYER)
  }
  if(MIRROR == 10){
    f["10"] = 10;

    // f.push(MIRROR)
  }
  if(SPEAKER == 11){
    f["11"] = 11;

    // f.push(SPEAKER)
  }
  if(OTHERS == 12){
    f["12"] = 12;

    // f.push(OTHERS)
  }
        
  let h = [] ;
  // for(var i =0; i < vehicleconditions.length ; i++){
    h[0]  = null
    h[1]  = null
    h[2]  = frontwindshiled
    h[3]  = bonnet
    h[4]  = grill
    h[5]  = frontbumper
    h[6]  = frontheadlight
    h[7]  = rearwindshield
    h[8]  = trunkdoor
    h[9]  = rearbumper
    h[10] = rearbumpersupport
    h[11] = taillamp
    h[12] = frontleftfender
    h[13] = leftfrontdoor
    h[14] = leftreardoor
    h[15] = leftrearfender
    h[16] = pillar
    h[17] = roof
    h[18] = rightrearfender
    h[20] = rightreardoor
    h[21] = rightfrontdoor
    h[22] = frontrightfender
    h[23] = fronttyres
  // }

  //add images

      let array ={};
  array.version_id = version_id,
  array.hat_number = hatnumber,
  array.vehicle_type= vehicletype,
  array.year = year,
  array.color=  color,
  array.model= model,
  array.make= make,
  array.vin= vin,
  array.weight= weight,
  array.lot_number = lotnumber,
  array.towed_amount = item.towed_amount,
  array.status_name= statusname,
  array.status=  status,
  array.location_id = location_id,
  array.customer_user_id=  customeruserid,
  array.towing_request_id = item.towing_request_id,
  array.container_number= containernmber,
  array.key_note =keynote,
  array.vcr= item.vcr,
  array.value=  item.value,
  array.auction_at = auctionat,
  array.towed_from=  item.towed_from,
  array.note = note,
  array.loading_type = loadstatus,
  array.location = location,
  array.customer_name=  customername,
  array.title_number=  titlenumber,
  array.title_received_date= item.title_received_date,
  array.towing_request_date = item.towing_request_date,
  array.deliver_date = deliverdate,
  array.pickup_date=  pickupdate,
  array.condition = condition,
  array.damaged = damaged,
  array.license_number = licensenumber,
  array.photos= images2,
  array.vehicle_features = f,
  array.vehicle_conditions = h,
  array.vehicle_documents = item.vehicle_documents,
  array.invoice_photos= item.invoice_photos,
  array.auction_photos = item.auction_photos,
  array.pickup_photos = item.pickup_photos,
  array.arrived_photos = item.arrived_photos

  // if(imagesurls.length > 0){
  //   let photos = imagesurls
  //   let img = {photos}
  //   array.fileUrls=img
  // }
        fetch(AppUrlCollection.VEHICLE_DETAIL + item.id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
              'source' : 'asl_phone_app',
              'asl-platform':  Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'
          },       
          body: JSON.stringify(array)
      })
          .then((response) =>  response.json())
          .then((responseJson) => {
            setspinner(false)
            // alert(JSON.stringify(responseJson))
            if(responseJson.message == 'The given data was invalid.'){
              alert(JSON.stringify(responseJson.errors))
            }else{
              AppConstance.showSnackbarMessage(responseJson.message)
              // navigation.goBack();
              if(imagesurls.length> 0){
                callingimageAPI()

              }else{
                navigation.goBack();

              }

            }
            ImageCropPicker.clean().then(() => {
              console.log('removed all tmp images from tmp directory');
            }).catch(e => {
              alert(e);
            });
              console.log('export detail ', responseJson)
          })
          .catch((error) => {
            alert(error)
            setspinner(false)
              console.warn(error)
          });
      
        }

        const callingimageAPI = ()=>{
        let   array2 = {}
          if(imagesurls.length > 0){
            let photos = imagesurls
            // let img = {photos}
            array2.fileUrls=photos
          }

          console.log(JSON.stringify(array2));
          // alert(JSON.stringify(array2))
          fetch(AppUrlCollection.VEHICLE_DETAIL + item.id +'/add-more-images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                'source' : 'asl_phone_app',
                'asl-platform':  Platform.OS == 'ios' ? 'ASL_IOS_APP': 'ASL_ANDROID_APP'
            },       
            body: JSON.stringify(array2)
        })
            .then((response) =>  response.json())
            .then((responseJson) => {

        if(responseJson.responseCode == 1){
          // alert(responseJson.data)
          AppConstance.showSnackbarMessage(responseJson.data)
          setspinner(false)
          navigation.goBack();
        }else{
          AppConstance.showSnackbarMessage(responseJson.data)

          
        }
        // alert(JSON.stringify(responseJson))
        
            console.log('export detail ', responseJson)
               
            })
            .catch((error) => {
              alert(error)
              setspinner(false)
                console.warn(error)
            });
        
          }


return (
   
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
    
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
                onPress={()=> navigation.goBack()}

                >
                <Ionicons  name='chevron-back' size={25} color='grey'/>



                </TouchableOpacity>


                <View style={{width:'80%',justifyContent:'center', }}>
                <Text style={{alignSelf:'center',color:'black',fontWeight:'bold', fontSize:20}}>Edit Vehicle</Text>
                </View>

                
                
                <View style={{width:'10%',justifyContent:'center' }}>
              <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}
              onPress={()=>{
                callingupdateApi()
              }}
              >
              <AntDesign  size={20} style={{alignSelf:'center'}} color='black' name='check'/>
              </TouchableOpacity>
              </View>

      </Appbar>

        <Modal
          transparent={true}
          animationType={'slide'}
          visible={custmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              width:deviceWidth,
              justifyContent:'flex-start',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:AppColors.AppColor,
              flexDirection: 'column',
              alignItems: 'center',
            }}>

{/* <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground> */}

                 <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'15%', }}
onPress={()=> setcustmodal(false) }

>
<Text style={{color:'white', fontSize:16}}>Cancel</Text>


</TouchableOpacity>

<View style={{width:'70%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Customer</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>
<TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}>
{/* <AntDesign  size={20} style={{alignSelf:'center'}} color='white' name='check'/> */}
</TouchableOpacity>
</View>
</View>



<View style={{marginHorizontal:10,justifyContent:'center',paddingHorizontal:5, borderRadius:10,backgroundColor:'white', flexDirection:'row'}}>
<Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchFilterFunction(Text)}
  // this.callingVehicleContainerService()
  placeholder="Search Customer"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  

</View>

            <View
              style={{
                width: '100%',
                marginTop:12,
                height:deviceHeight,
                flexDirection: 'column',
                backgroundColor:'white',
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
              }}>
    
    <FlatList
         contentContainerStyle={{ paddingHorizontal:1, paddingVertical:5,}}
         
      data={Customerlist}
     renderItem={renderCustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          />


          <View style={{height:180}}>


            </View>
    {/* <RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  textStyle={{color:'grey'}}
  box={true}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/> */}
        {/* <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:5,}}
         
      data={locationslist}
     renderItem={rendercustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          /> */}

           

            
           
            </View>
         
          </SafeAreaView>
        </Modal>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={locmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'#0005',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '65%',
                flexDirection: 'column',
                backgroundColor:'white',
                borderRadius:15,
              }}>
    
           <View style={{borderBottomWidth:0.3,paddingVertical:7, borderColor:'#D0D3D4'}}>
             <Text style={{alignSelf:'center',fontSize:18, fontWeight:'bold', paddingVertical:10,}}>Location</Text>
           </View>

        <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:15,}}
         
      data={locationslist}
     renderItem={renderlist}
     keyExtractor={(item,index) => index.toString()}
    

          />

              <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'grey',  width:'100%'}}>
                <TouchableOpacity style={{width:'50%',height:40,alignSelf:'center',justifyContent:'center', borderRightWidth:0.5,borderColor:'grey'}}
                onPress={()=>{setlocmodal(false)}}
                >
                  <Text style={{alignSelf:'center', fontSize:15}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{width:'50%', height:40, justifyContent:'center', alignSelf:'center'}}
                                onPress={()=>{setlocmodal(false)}}

                >
                  <Text style={{fontWeight:'bold',fontSize:15, alignSelf:'center'}}>OK</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row',
                }}>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    marginLeft:10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
             
              </View> */}
           
            </View>
         
          </View>
        </Modal>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={barcodemodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>

<View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 40,
              height:deviceHeight,
              backgroundColor:'white',
              flexDirection: 'column',
              alignItems: 'center',
              width:deviceWidth
            }}>
            
            <View style={{width:'100%', paddingHorizontal:30, marginTop:20}}>

            <TouchableOpacity
            onPress={()=> {setbarcodemodal(false)}}
            style={{alignSelf:'flex-end'}}>
            <MaterialCommunityIcons color='red'  name='close-circle-outline' size={30}/>
            </TouchableOpacity>
            </View>

    <QRCodeScanner
        onRead={(e)=> {setvin(e.data); setbarcodemodal(false)}}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
          SCAN VEHICLE VIN NUMBER
          </Text>
        }
        bottomContent={
          <TouchableOpacity
        onPress={()=>  setbarcodemodal(false)} 
          style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        }
        />
        
            
            </View>
        


       </Modal>

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
            onPress={()=> { setshowimagemodel(false)}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
      
        <Modal
        visible={deletemodalshow}
        animationType='fade'
        transparent={true}
        >
            <View style={{flex:1, justifyContent:'flex-end',backgroundColor:'#0005', height:deviceHeight}}>
                <View style={{bottom:30}}>
           
                <TouchableOpacity 
            onPress={()=> { setdeletemodalshow(false), deleteimage()}}
            style={{alignSelf:'center',width:'85%', backgroundColor:'#E5E7E9',paddingVertical:20, width:'90%',borderRadius:15, marginTop:10}}
            >
              <Text style={{alignSelf:'center',fontSize:18, fontWeight:'400', color:'red'}}>Delete Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=> { setdeletemodalshow(false)}}
            style={{alignSelf:'center',backgroundColor:'white',paddingVertical:20, width:'90%',borderRadius:15, marginTop:10}}
            >
              <Text style={{alignSelf:'center', fontSize:18, fontWeight:'400', }}>Cancel</Text>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
     

    <ScrollView style={{width:deviceWidth }}>

    <View>
 

 <SliderBox 
          images={images}
          sliderBoxHeight={260}
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
    if(index == 0){
      setadd(true)
    }else{
      setadd(false)
    }
    setimgposition(index); 
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
        


        {close == true ?

<View style={{marginTop:15,position:'absolute',alignSelf:'flex-end', paddingHorizontal:40, }}>
<TouchableOpacity
onPress={()=> {   setdeletemodalshow(true)}}
style={{alignSelf:'center',borderRadius:5, borderWidth:1, borderColor:AppColors.toolbarColor }}>

<Ionicons name="close" color={AppColors.toolbarColor}  size={25}  />
</TouchableOpacity>
  </View>

  :null}
 


{add == true ?
 <ActionButton position='left' style={{marginLeft:deviceWidth-105,height:'95%', width:'90%',}} size={40} buttonColor="rgba(231,76,60,1)">
 <ActionButton.Item buttonColor='#9b59b6'   size={30}
  onPress={() => {if(Platform.OS == 'ios'){ chooseFile('photo')}else{ selectFile3() }}}
  >
   <Ionicons name="ios-images-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>
 <ActionButton.Item buttonColor='#3498db' size={30}
 
 onPress={() => {if(Platform.OS == 'ios'){ TakePhoto('photo')}else{ captureImage() }}}>
 <Ionicons name="ios-camera-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>

</ActionButton>
: null }



 




</View>

  


    <View style={{width:'100%',flexDirection:'row',marginTop:2, paddingVertical:Platform.OS == 'ios' ? 10:  0, paddingHorizontal:10, backgroundColor:AppColors.AppColor, justifyContent:'center', alignSelf:'center'}}>
              <View style={{width:'20%', alignSelf:'center'}}>
              <Text style={{color:'white', alignSelf:'center'}}>VIN #:</Text>
              </View>

              <View style={{width:'50%'}}>
                <TextInput 
                style={{color:'white'}}
                placeholderTextColor='#D0D3D4'
                placeholder={vin == '' ? 'Enter VIN or scan':vin}
                onChangeText={(text)=> {setvin(text)}}
                />
              </View>
              <View style={{alignSelf:'center', width:'20%'}}>
                <TouchableOpacity 
                onPress={()=> {setbarcodemodal(true)}}
                style={{alignSelf:'flex-end'}}
                >
                  <MaterialIcons name='qr-code-scanner' color='white' size={18} />
                  </TouchableOpacity>
              </View>

            </View>

        
    <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 1,
        elevation: 5,alignSelf:'center',borderRadius:1,borderWidth:0.2,marginBottom:15, marginTop:10,paddingHorizontal:10, width:'95%',}} >





    <View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
    onPress={()=>{
      setcustmodal(true)
    }}
    >
    <Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{customername}</Text>
    <AntDesign  name='caretdown' color='grey'/>
    </TouchableOpacity></View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOCATION</Text>
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
    onPress={()=>{
      setlocmodal(true)
    }}
    >
    <Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{location}</Text>
    <AntDesign  name='caretdown' color='grey'/>
    </TouchableOpacity>
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>HAT NUMBER</Text>
    <TextInput  
    // placeholder={hatnumber}
    value={hatnumber}
    placeholderTextColor='grey'
    onChangeText={(text)=> {sethatnumber(text)}} 
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VEHICLE TYPE</Text>
    <TextInput  
    value={vehicletype}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setvehicletype(Text)}}
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
    <TextInput  
    // placeholder={year}
    value={year}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setyear(Text)}}


    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>COLOR </Text>
    <TextInput  
    // placeholder={color}
    value={color}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setcolor(Text)}}

    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
    <TextInput  
    // placeholder={model}
    value={model}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setmodel(Text)}}

    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
    <TextInput  
    // placeholder={make}
    value={make}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setmake(Text)}}

    />
    </View>





    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>WEIGHT</Text>
    <TextInput  
    // placeholder={weight}
    value={weight}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setweight(Text)}}

    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LICENSE NUMBER</Text>
    <TextInput  
    // placeholder={licensenumber}
    value={licensenumber}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setlicensenumber(Text)}}

    />
    </View>






    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOT NUMBER</Text>
    <TextInput  
    // placeholder={lotnumber}
    value={lotnumber}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setlotnumber(Text)}}

    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOAD STATUS</Text>
    <TextInput  
    // placeholder={loadstatus}
    value={loadstatus}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setloadstatus(text)}}
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONTAINER NUMBER</Text>
    <TextInput  
    // placeholder={containernmber}
    value={containernmber}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setcontainernmber(text)}}

    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>KEY NOTE</Text>
    <TextInput  
    // placeholder={keynote}
    value={keynote}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setkeynote(text)}}

    />
    </View>

    {/* <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PREPAREDBY</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setlotnumber(text)}}

    />
    </View> */}



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>AUCTION AT</Text>
    <TextInput  
    // placeholder={auctionat}
    value={auctionat}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setauctionat(text)}}

    />
    </View>

    {/* <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VCR</Text>
    <TextInput  
    placeholder={vcr != null ? vcr : '' }
    placeholderTextColor='grey'
        onChangeText={(text)=> {setvcr(text)}}

    />
    </View> */}

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>NOTE</Text>
    <TextInput  
    // placeholder={note}
    value={note}
    placeholderTextColor='grey'
    onChangeText={(text)=> {setnote(text)}}
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>STATUS</Text>
    {/* <RadioButtonRN
      data={datacustomer}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    /> */}


    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      <TouchableOpacity
      
      onPress={()=>{setstatus('1') , setstatusname('On Hand')}}
      >

    <Text style={{fontWeight:'500'}}>ON HAND</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('2'), setstatusname('Manifest')}}
    >

    <Text style={{fontWeight:'500'}}>MANIFEST</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('3') , setstatusname('Car on the way')}}
    >

    <Text style={{fontWeight:'500'}}>ON THE WAY</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('4') , setstatusname('Shipped')}}
    >

    <Text style={{fontWeight:'500'}}>SHIPPED</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('6') , setstatusname('Arrived')}}
    >

    <Text style={{fontWeight:'500'}}>ARRIVED</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('7')}}
    >

    <Text style={{fontWeight:'500'}}>Handed Over</Text>
    </TouchableOpacity> */}

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('5'), setstatusname('Picked Up')}}
    >

    <Text style={{fontWeight:'500'}}>PICKED UP</Text>
    </TouchableOpacity>

   

    </View>

    {/* <QRCodeScanner
        onRead={()=> {}}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
        /> */}
    <View style={{flexDirection:'column',  marginLeft:10, width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setstatus(1)}}
      >
    {status == 1 ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus(2)}}
    >
    {status == 2 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus(3) }}
    >
    {status == 3 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    /> 

    }
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus(4) }}
    >
    {status == 4 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setstatus(6) }}
    >
    {status == 6 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    {/* <TouchableOpacity
    style={{marginTop:8}}

      onPress={()=>{setstatus(7)}}
    >
    {status == 7 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity> */}


    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus(5)}}
    >
    {status == 5 ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    {/* <TouchableOpacity
    style={{marginTop:7,}}

      onPress={()=>{setstatus('15')}}
    >
  
    </TouchableOpacity>  */}
    {/*
    <TouchableOpacity
    style={{marginTop:10,backgroundColor:'yellow'}}

      onPress={()=>{setstatus('10')}}
    >
    {status == '10' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:10,backgroundColor:'grey'}}

      onPress={()=>{setstatus('11')}}
    >
    {status == '11' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}

      onPress={()=>{setstatus('12')}}
    >
    {status == '12' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}

      onPress={()=>{setstatus('15')}}
    >
    {status == '15' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity> */}


    </View>


    </View>

    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONDITION</Text>
    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      <TouchableOpacity
      
      onPress={()=>{setcondition('0')}}
      >

    <Text style={{fontWeight:'500'}}>NON-OP</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setcondition('1')}}
    >

    <Text style={{fontWeight:'500'}}>OPERABLE</Text>
    </TouchableOpacity>

    </View>


    <View style={{flexDirection:'column', marginLeft:10, width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setcondition('0')}}
      >
    {condition == '0' ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setcondition('1')}}
    >
    {condition == '1' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    </View>


    </View>

    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DAMAGED</Text>

    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column',   width:'12%' }}>
      <TouchableOpacity
      
      onPress={()=>{setdamaged('1')}}
      >

    <Text style={{alignSelf:'center' ,fontWeight:'500'}}>YES</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setdamaged('0')}}
    >

    <Text style={{alignSelf:'center' ,fontWeight:'500'}}>NO</Text>
    </TouchableOpacity>

    </View>


    <View style={{flexDirection:'column',  width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setdamaged('1')}}
      >
    {damaged == '1' ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setdamaged('0')}}
    >
    {damaged == '0' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    </View>


    </View>


    {/* <RadioButton.Group onValueChange={newValue => setdamaged(newValue)} value={damaged}>

          <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center' ,fontWeight:'500'}}>Yes</Text>

          <RadioButton value='1' color='#1a9bef'/>

          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center',marginRight:5, fontWeight:'500'}}>No</Text>

          <RadioButton value='0'  color="#1a9bef" />

          </View>
        </RadioButton.Group> */}

    {/* <RadioButtonRN
      data={Damaged}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    /> */}
    </View>


    {/* <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <RadioButtonRN
      data={datacustomer}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    />
    </View> */}

    {/* <View style={{width:'100%',backgroundColor:'red', flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <RadioButton
            value='1'
            status={ picture == '1' ? 'checked' : 'unchecked' }
            onPress={() => setpictures('1')}
          />
    </View> */}

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TITLE NUMBER</Text>
    <TextInput  
    placeholder={titlenumber}
    placeholderTextColor='grey'
    onChangeText={(text)=> {settitlenumber(text)}}

    />
    </View>


  

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DELIVER DATE</Text>
    

            <View 
            
            style={{width:'95%',flexDirection:'row',  justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center'}}  >{deliverdate}</Text>

    <DatePicker
        style={{width: 20}}
        date={deliverdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        hideText={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 2,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderWidth:0,
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { setdeliverdate(date)}}
      />


              </View>
  

    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PICKUP DATE</Text>
    {/* <DatePicker
              style={{width: 200,
        marginTop: 20,}}
              date={date} // Initial date from state
              mode="datetime" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="2016-05-01"
              maxDate="2025-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 1,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 0,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            /> */}

            <View 
            
            style={{width:'95%',flexDirection:'row',  justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center'}}  >{pickupdate}</Text>

    <DatePicker
        style={{width: 20}}
        date={pickupdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        hideText={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 2,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderWidth:0,
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { setpickupdate(date)}}
      />


              </View>
  
    {/* {pickupdatemodal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          
          onChange={(date)=> { setpickupdate(date)}}
        />
        
    )} */}

    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CHECK OPTIONS INCLUDED ON THE ..</Text>
    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column',  marginLeft:10, width:'10%' }}>
      
      <TouchableOpacity 
      onPress={()=>{ CDChanger == 3 ? setCDChanger('') :setCDChanger(3)}}
      >
    {CDChanger == 3 ? 
    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 6:10,}}

    onPress={()=>{ GPSNavigationSystem == 4 ? setGPSNavigationSystem(''):setGPSNavigationSystem(4)}}
    >
    {GPSNavigationSystem == 4 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 10:10,}}

    onPress={()=>{SpareTireJack == 5 ? setSpareTireJack(''):setSpareTireJack(5)}}
    >
    {SpareTireJack == 5 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    /> 

    }
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 6:10,}}

    onPress={()=>{ WheelCovers == 6 ? setWheelCovers('') : setWheelCovers(6)}}
    >
    {WheelCovers == 6 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 8:10,}}

    onPress={()=>{Radio == 7 ? setRadio(''):setRadio(7) }}
    >
    {Radio == 7 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>




    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 9:10,}}

    onPress={()=>{CDPLAYER == 8 ? setCDPLAYER(''):setCDPLAYER(8) }}
    >
    {CDPLAYER == 8 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 7:10,}}

    onPress={()=>{MIRROR == 10 ? setMIRROR(''):setMIRROR(10) }}
    >
    {MIRROR == 10 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 7:10,}}

    onPress={()=>{SPEAKER == 11 ? setSPEAKER(''):setSPEAKER(11) }}
    >
    {SPEAKER == 11 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>





    <TouchableOpacity
    style={{marginTop:Platform.OS == 'ios'? 7:10,}}

    onPress={()=>{OTHERS == 12 ? setOTHERS(''):setOTHERS(12)}}
    >
    {OTHERS == 12 ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity> 

    </View>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      
    <TouchableOpacity
   
      onPress={()=>{ CDChanger == 3 ? setCDChanger(''):setCDChanger(3)}}
    >

    <Text style={{fontWeight:'500'}}>CD Changer</Text>
    </TouchableOpacity>


   
    <TouchableOpacity
    style={{marginTop:14,}}
      onPress={()=>{GPSNavigationSystem == 4 ? setGPSNavigationSystem(''):setGPSNavigationSystem(4)}}
    >

    <Text style={{fontWeight:'500'}}>GPS Navigation System</Text>
    </TouchableOpacity>







    <TouchableOpacity
    style={{marginTop:13,}}
      onPress={()=>{SpareTireJack == 5 ? setSpareTireJack(''):setSpareTireJack(5)}}
    >

    <Text style={{fontWeight:'500'}}>Spare Tire/Jack</Text>
    </TouchableOpacity>

    


    <TouchableOpacity
    style={{marginTop:13,}}
      onPress={()=>{WheelCovers == 6 ? setWheelCovers(''):setWheelCovers(6)}}
    >

    <Text style={{fontWeight:'500'}}>Wheel Covers</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:13,}}
      onPress={()=>{Radio ==7 ?  setRadio(''):setRadio(7)}}
    >

    <Text style={{fontWeight:'500'}}>Radio</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={{marginTop:12,}}
      onPress={()=>{CDPLAYER == 8 ? setCDPLAYER(''):setCDPLAYER(8)}}
    >

    <Text style={{fontWeight:'500'}}>CD Player</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:11,}}
      onPress={()=>{MIRROR == 10 ? setMIRROR(''):setMIRROR(10) }}
    >

    <Text style={{fontWeight:'500'}}>MIRROR</Text>
    </TouchableOpacity>




    

    <TouchableOpacity
    style={{marginTop:12,}}
      onPress={()=>{SPEAKER == 11 ? setSPEAKER(''):setSPEAKER(11)}}
    >

    <Text style={{fontWeight:'500'}}>Speaker</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:12,}}
      onPress={()=>{OTHERS == 12 ? setOTHERS(''):setOTHERS(12)}}
    >

    <Text style={{fontWeight:'500'}}>OTHERS</Text>
    </TouchableOpacity>




    </View>




    </View>

    </View>





    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:8,borderColor:'#B3B6B7',  justifyContent:'center'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold',alignSelf:'center', fontSize:14,}}>CONDITION OF VEHICLE</Text>

    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT WINDSHILED</Text>
    <TextInput  
      onChangeText={text =>{setfrontwindshiled(text) }}
    // onSubmitEditing={(text)=> {setfrontwindshiled(text) }}
    value={frontwindshiled}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>BONNET</Text>
    <TextInput  
      onChangeText={text =>  setbonnet(text)}

      value={bonnet}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>GRILL</Text>
    <TextInput  
      onChangeText={text =>  setgrill(text)}

      value={grill}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT BUMPER</Text>
    <TextInput  
      onChangeText={text => setfrontbumper(text) }

      value={frontbumper}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT HEAD LIGHT</Text>
    <TextInput  
      onChangeText={text =>  setfrontheadlight(text)}

      value={frontheadlight}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR WINDSHIELD</Text>
    <TextInput  
      onChangeText={text =>  setrearwindshield(text)}

      value={rearwindshield}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TRUNK DOOR</Text>
    <TextInput  
      onChangeText={text =>settrunkdoor(text) }

      value={trunkdoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER</Text>
    <TextInput  
      onChangeText={text => setrearbumper(text)}

      value={rearbumper}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER SUPPORT</Text>
    <TextInput  
      onChangeText={text => setrearbumpersupport(text) }

      value={rearbumpersupport}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TAIL LAMP</Text>
    <TextInput  
      onChangeText={text =>  settaillamp(text)}

      value={taillamp}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT LEFT FENDER</Text>
    <TextInput  
      onChangeText={text =>  setfrontleftfender(text)}

      value={frontleftfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT FRONT DOOR</Text>
    <TextInput  
      onChangeText={text =>setleftfrontdoor(text) }

      value={leftfrontdoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR DOOR</Text>
    <TextInput  
      onChangeText={text => setleftreardoor(text) }

      value={leftreardoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR FENDER</Text>
    <TextInput  
      onChangeText={text => setleftrearfender(text)}

      value={leftrearfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PILLAR</Text>
    <TextInput  
      onChangeText={text => setpillar(text)}

      value={pillar}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>ROOF</Text>
    <TextInput  
      onChangeText={text => setroof(text) }

      value={roof}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR FENDER</Text>
    <TextInput  
      onChangeText={text => setrightrearfender(text)}

      value={rightrearfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR DOOR</Text>
    <TextInput  
      onChangeText={text => setrightreardoor(text)}

      value={rightreardoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT FRONT DOOR</Text>
    <TextInput  
      onChangeText={text =>setrightfrontdoor(text) }

      value={rightfrontdoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT RIGHT FENDER</Text>
    <TextInput  
      onChangeText={text => setfrontrightfender(text)}

      value={frontrightfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT TYRES</Text>
    <TextInput  
      onChangeText={text => setfronttyres(text)}
      value={fronttyres}
    placeholderTextColor='grey'
    />
    </View>


    </View>

    </ScrollView>


    </SafeAreaView>


  );
};


export default EditVehicle;


const styles = StyleSheet.create({
  actionButtonIcon: {
    alignSelf:'center',
    color:'white'
  },

  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'red'
  },
  buttonTouchable: {
    paddingVertical:10,
    paddingHorizontal:22,
    textAlign:'center',
    marginTop:Platform.OS == 'ios' ? 5:80,
    borderWidth:1,
    borderRadius:8,
    borderColor:'red'
  },
  centerText: {
    
    fontSize: 18,
    marginTop:0,
    color: '#777'
  },
  })