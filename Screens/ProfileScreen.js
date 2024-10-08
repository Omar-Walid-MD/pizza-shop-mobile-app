import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../Components/Input';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { ListItem } from '@rneui/themed';
import MenuItem from '../Components/MenuItem';
import Accordion from '../Components/Accordion';
import { useEffect, useState } from 'react';
import Button from '../Components/Button';
import { CheckBox } from '@rneui/base';
import Text from '../Components/Text';
import Background from '../Components/Background';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContent from '../Components/Layout/ScreenContent';
import { auth } from '../Firebase/firebase';
import { updateUserInfo } from '../Firebase/Data Handlers/users';
import { setUser, signOut } from '../Store/Auth/authSlice';
import MapView, { Marker } from 'react-native-maps';

import * as Location from "expo-location";
import { isMissingProfileInfo } from '../helpers';
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({navigation}) {

    const dispatch = useDispatch();
    const { t: translate} = useTranslation();

    const user = useSelector(store => store.auth.user);
    const loading = useSelector(store => store.auth.loading);

    const [edit,setEdit] = useState(false);
    const [editInfo,setEditInfo] = useState({});

    const [deliveryLocationModal,setDeliveryLocationModal] = useState(false);

    function handleEditInfo(text,property)
    {
        setEditInfo(e => ({...e,[property]:text.trim()}));
    }

    async function handleSaveEdit()
    {
        if(Object.keys(editInfo).every((key)=>editInfo[key]))
        {
            await updateUserInfo(user.userId,editInfo);
            dispatch(setUser({...user,...editInfo}));
    
            setEdit(false);
        }
    }


    
    
    return(
        <View style={{...styles['screen-container']}}>
        {/* Background */}
        {/* <Background /> */}

        {/* Screen Content */}
        <ScreenContent
            header={
                <Text font='accent' style={{width:"100%",textAlign:"center",fontSize:40}}>
                    {translate("profile.title")}
                </Text>
            }
        >
            {loading ? (
                <Loading />
            ) : user ? (
                <>
                    <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['gap-3'], ...styles['j-content-b']}}>
                        <View style={{...styles['al-items-s']}}>
                            <Text style={{...styles['fs-3']}}>{user.username}</Text>
                            <Text style={{...styles['fs-3'], ...styles['col-gray']}}>{user.email}</Text>
                            <Text style={{...styles['fs-3'], ...styles['col-gray']}}>{user.mobileNo || ""}</Text>
                        </View>
                        <View style={{...styles['rounded-2'], ...styles['shadow'], ...styles['bg-accent']}}>
                            <MaterialIcons name="person" color="white" style={{fontSize:150}} />
                        </View>
                    </View>

                    <Button variant='green' onPress={() => navigation.navigate("Orders")}>
                        <Text style={{...styles['col-white'], ...styles['fs-4']}} weight='sb'>
                            {translate("profile.view_orders")}
                        </Text>
                    </Button>

                    {isMissingProfileInfo(user) && (
                        <View style={{...styles['flex-row'], ...styles['al-items-c'], ...styles['j-content-c'], ...styles['gap-1']}}>
                            <Text weight='b' style={{...styles['col-danger']}}>
                                {translate("profile.incomplete_info")}
                            </Text>
                            <MaterialIcons name="error-outline" style={{fontSize:30, ...styles['col-danger']}} />
                        </View>
                    )}

                    <View style={{...styles['w-100'], ...styles['bg-main'], ...styles['rounded-2'], ...styles['shadow'], ...styles['p-2']}}>
                        <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-2'], ...styles['mb-1']}}>
                            {!edit ? (
                                <>
                                    <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['mb-2']}}>
                                        <Text weight='b' style={{...styles['fs-4'], ...styles['mb-1']}}>
                                            {translate("profile.user_info")}
                                        </Text>
                                        <Button variant='green' onPress={() => {
                                            setEdit(true);
                                            setEditInfo({
                                                username: user.username,
                                                mobileNo: user.mobileNo,
                                                location: user.location
                                            });
                                        }}>
                                            <MaterialCommunityIcons name="pencil" color="white" size={20} />
                                        </Button>
                                    </View>

                                    <View style={{...styles['w-100'], ...styles['gap-3']}}>
                                        <Input value={user.username} editable={false} placeholder={translate("profile.username_placeholder")} label />
                                        <Input value={user.mobileNo || ""} editable={false} placeholder={translate("profile.mobile_placeholder")} label />

                                        <View style={{...styles['w-100'], ...styles['j-content-c'], ...styles['al-items-c'], ...styles['rounded'], backgroundColor:"lightgray", height:250}}>
                                            {user.location ? (
                                                null
                                                // <MapView
                                                //     style={{...styles['w-100'], flex:1}}
                                                //     scrollEnabled={false}
                                                //     region={{...user.location, latitudeDelta:0.01, longitudeDelta:0.01}}
                                                // >
                                                //     <Marker coordinate={user.location || {longitude:0, latitude:0}} />
                                                // </MapView>
                                            ) : (
                                                <Text>{translate("profile.no_delivery_point")}</Text>
                                            )}
                                        </View>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['mb-2']}}>
                                        <Text weight='b' style={{...styles['fs-4'], ...styles['mb-1']}}>
                                            {translate("profile.user_info")}
                                        </Text>
                                        <Button onPress={() => {
                                            setEdit(false);
                                            setEditInfo({});
                                        }}>
                                            <MaterialCommunityIcons name="close" color="white" size={25} />
                                        </Button>
                                    </View>

                                    <View style={{...styles['w-100'], ...styles['gap-3']}}>
                                        <Input value={editInfo.username} onChangeText={(t) => handleEditInfo(t, "username")} placeholder={translate("profile.username_placeholder")} label />
                                        <Input value={editInfo.mobileNo} onChangeText={(t) => handleEditInfo(t, "mobileNo")} placeholder={translate("profile.mobile_placeholder")} label keyboardType="phone-pad" />

                                        <Button
                                            variant='transparent'
                                            style={{...styles['w-100'], ...styles['j-content-c'], ...styles['al-items-c'], ...styles['rounded'], backgroundColor:"lightgray", height:250}}
                                            containerStyle={{paddingVertical:0, paddingHorizontal:0, ...styles['w-100'], ...styles['h-100']}}
                                            onPress={() => setDeliveryLocationModal(true)}
                                        >
                                            {editInfo.location ? (
                                                <>
                                                    {/* <MapView
                                                        style={{...styles['w-100'], ...styles['h-100'], flex:1}}
                                                        scrollEnabled={false}
                                                        region={{...editInfo.location, latitudeDelta:0.01, longitudeDelta:0.01}}
                                                    >
                                                        <Marker coordinate={editInfo.location} />
                                                    </MapView> */}

                                                    <Button style={{...styles['pos-abs'], bottom:5}} onPress={() => setDeliveryLocationModal(true)}>
                                                        <Text style={{...styles['col-white'], ...styles['fs-4']}}>
                                                            {translate("profile.change_delivery_point")}
                                                        </Text>
                                                    </Button>
                                                </>
                                            ) : (
                                                <View style={{...styles['w-100'], ...styles['h-100'], ...styles['j-content-c'], ...styles['al-items-c']}}>
                                                    <Text>{translate("profile.set_delivery_point")}</Text>
                                                </View>
                                            )}
                                        </Button>
                                    </View>

                                    <Button variant='green' style={{...styles['w-100'], ...styles['mt-2']}} onPress={handleSaveEdit}>
                                        <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                                            {translate("profile.save_changes")}
                                        </Text>
                                    </Button>
                                </>
                            )}
                        </View>
                    </View>

                    <Button onPress={() => dispatch(signOut())}>
                        <Text style={{...styles['fs-3'], ...styles['col-white']}}>
                            {translate("profile.sign_out")}
                        </Text>
                    </Button>
                </>
            ) : (
                <>
                    <View
                    //style[w-100 al-items-c]
                    style={{...styles['w-100'],...styles['al-items-c']}}
                    >
                        <MaterialIcons name="person-outline" color="#943030" style={{fontSize:200}} />
                    </View>
                    <Button variant='green' onPress={() => navigation.navigate("Register")}>
                        <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                            {translate("profile.create_account")}
                        </Text>
                    </Button>

                    <Button onPress={() => navigation.navigate("Login")}>
                        <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                            {translate("profile.login")}
                        </Text>
                    </Button>
                </>
            )}
        </ScreenContent>

        {/* Modals */}
        <DeliveryLocationModal
            deliveryLocationModal={deliveryLocationModal}
            setDeliveryLocationModal={setDeliveryLocationModal}
            setEditInfo={setEditInfo}
        />
    </View>


    )
}


function DeliveryLocationModal({deliveryLocationModal,setDeliveryLocationModal,setEditInfo})
{
    const { t: translate} = useTranslation();
    const [mapInitialRegion,setMapInitialRegion] = useState();
    const [deliveryLocation,setDeliveryLocation] = useState();

    useEffect(() => {
        if(!mapInitialRegion)
        {
            (async () => {
              
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status === 'granted') {
                  let location = await Location.getCurrentPositionAsync({});
                  setMapInitialRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                  });
              }
        
            })();
        }
    }, [mapInitialRegion]);


    return (
        <Modal visible={deliveryLocationModal} animationType='slide' onRequestClose={() => setDeliveryLocationModal(false)}>
            <View style={{...styles['w-100'], ...styles['h-100'], ...styles['bg-white'], ...styles['shadow'], ...styles['al-items-c']}}>
                <Text style={{...styles['fs-1'], marginTop:75}}>
                    {translate("profile.set_delivery_point")}
                </Text>

                <View style={{...styles['w-100'], ...styles['p-2'], ...styles['al-items-c'], ...styles['j-content-c'], flex:1}}>
                    {/* <MapView
                        style={{...styles['w-100'], flex:1}}
                        region={mapInitialRegion}
                        onRegionChangeComplete={(newRegion) => setDeliveryLocation({latitude: newRegion.latitude, longitude: newRegion.longitude})}
                    >
                    </MapView> */}

                    <View style={{...styles['pos-abs'], transform:"translateY(-42px)translateX(-0.5px)"}}>
                        <Image source={require("../assets/img/map-marker.png")} style={{height:70}} resizeMode='contain'/>
                    </View>
                </View>

                <Button style={{...styles['mb-2']}} onPress={() => {
                    setEditInfo(e => ({...e, location: deliveryLocation}));
                    setDeliveryLocationModal(false);
                }}>
                    <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                        {translate("profile.confirm_point")}
                    </Text>
                </Button>

                <View style={{...styles['pos-abs'], ...styles['w-100'], ...styles['al-items-s']}}>
                    <Button style={{...styles['m-2']}} onPress={() => setDeliveryLocationModal(false)}>
                        <MaterialCommunityIcons name="close" color="white" size={25} />
                    </Button>
                </View>
            </View>
        </Modal>
    )
}