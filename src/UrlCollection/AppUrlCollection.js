import React,{ Component } from "react";

class AppUrlCollection extends Component{
    // static BASE_URL = 'https://manage.aslshippingline.com/webapi/';manage.aslshippingline.com
    // static BASE_URL = 'https://backend.aslshippingline.com/api/v1/';
    static BASE_URL = 'https://backend.americanshippingtowing.com/api/v1/';


    // https://backend.aslshippingline.com/api/v1/auth/login
    static LOGIN = AppUrlCollection.BASE_URL+'auth/login';
    static USER = AppUrlCollection.BASE_URL+'user';
    static EXPORT_LIST = AppUrlCollection.BASE_URL+ 'exports?';
    static EXPORT_DETAIL = AppUrlCollection.BASE_URL+ 'exports/';
    static VEHILE_LIST = AppUrlCollection.BASE_URL + 'vehicles?';
    static VEHICLE_DETAIL = AppUrlCollection.BASE_URL + 'vehicles/';
    static LOCATION = AppUrlCollection.BASE_URL + 'settings/locations';
    static LOCATION2 = AppUrlCollection.BASE_URL + 'search/location';
    static CONTACT_US = AppUrlCollection.BASE_URL + 'contact-us/create';
    static INVOICE = AppUrlCollection.BASE_URL + 'invoices/all';
    static INVOICE_PAID = AppUrlCollection.BASE_URL + 'invoices/paid?';
    static INVOICE_UNPAID = AppUrlCollection.BASE_URL + 'invoices/unpaid?';
    static INVOICE_PARTIALLY_PAID = AppUrlCollection.BASE_URL + 'invoices/partially-paid?';

    
    //static CONTAINER_TRACKING = AppUrlCollection.BASE_URL + 'export/tracking?';
    static CONTAINER_TRACKING = AppUrlCollection.BASE_URL + 'exports';
    static CONTAINER_TRACKING_VIEW = AppUrlCollection . BASE_URL + 'search/export-view?';

    //static VEHICLE_CONTAINER = AppUrlCollection.BASE_URL + 'vehicle/vehicle-shipping-details'
    static VEHICLE_CONTAINER = AppUrlCollection.BASE_URL + 'search/vehicle?'
    static VEHICLE_TRACKING_DETAIL = AppUrlCollection.BASE_URL + 'search/vehicle-view?'
    
    static DOWNLOAD_BILLE = AppUrlCollection.BASE_URL + 'export/billofladng-download?'
    static DOWNLOAD_MAINFEST = AppUrlCollection.BASE_URL + 'export/manifest-download?'
    
    static FORGOT_PASSWORD = AppUrlCollection.BASE_URL + 'user/forgot-password'
    static CHANGE_PASSWORD = AppUrlCollection.BASE_URL + 'user/update-password'

    static PAYMENT_HISTORY = AppUrlCollection.BASE_URL + 'invoice/payment-history';

    static DOWNLOAD_INVOICE = AppUrlCollection.BASE_URL + 'invoice/download?'

    static GET_COUNTER = AppUrlCollection.BASE_URL + 'dashboard';

    static INVOICE_VIEW = AppUrlCollection.BASE_URL + 'invoice/view?';

    static GET_YARD = 'https://gwwshipping.com/getYards.php';

    static ANNOUCMENT = AppUrlCollection.BASE_URL + 'notifications';
//     http://localhost/yii2_work/new_galaxy/webapi/export/billofladng-download?id=1
// http://localhost/yii2_work/new_galaxy/webapi/export/manifest-download?id=1

}
export default AppUrlCollection;