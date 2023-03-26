import React from 'react';
import { View, Image,StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
   
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerContent(props) {

    const paperTheme = useTheme();


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent1}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',width:'100%', marginTop: 35}}>
                            <Avatar.Image 
                                source={require('../Images/logo_final.png')}
                                size={60}
                            />
                            <View style={{marginLeft:10, justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                               <Text style={{fontSize:20, fontWeight:'bold'}}>American Shipping & Towing Company</Text>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image style={{width:30, height:30}}
                                source={require('../Images/yard.png')}
                                />
                            )}
                            label="Yard"
                            onPress={() => {props.navigation.navigate('LocationServiceScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image style={{width:30, height:30}}
                                source={require('../Images/contact_us.png')}
                                />
                            )}
                            label="Contact Us"
                            onPress={() => {props.navigation.navigate('ContactUsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image style={{width:30, height:30}}
                                source={require('../Images/our_services.png')}
                                />
                                
                            )}
                            label="Our Services"
                            onPress={() => {props.navigation.navigate('OurServiceListScreen')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        /> */}
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        /> */}
                    </Drawer.Section>
                   
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        */}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent1: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 15,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 35,
      paddingHorizontal:10,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });