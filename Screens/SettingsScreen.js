import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Components/Button';
import { auth } from "../Firebase/firebase";
import { MaterialIcons } from "react-native-vector-icons";
import Loading from '../Components/Loading';
import Toggle from '../Components/Toggle';
import CheckBox from '../Components/CheckBox';
import { useState } from 'react';
import { setLanguage } from '../Store/Settings/settingsSlice';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../I18n/i18n';

export default function SettingsScreen({navigation}) {

    const dispatch = useDispatch();
    const { t: translate } = useTranslation();

    const notifSettings = [
        "order-notifs",
        "offer-notifs",
        "menu-notifs"
    ];
    
    const languageOptions = ["ar","en"];

    const currentLang = useSelector(store => store.settings.lang);

    return (
        <View style={{...styles['screen-container']}}>
        {/* Background */}
        {/* <Background /> */}

        {/* Screen Content */}
        <ScreenContent
            header={
                <Text font='accent' style={{width:"100%",textAlign:"center",fontSize:40}}>{translate("settings.title")}</Text>
            }
        >
            <View
                style={{...styles['al-items-c'],...styles['gap-4']}}
            >
                <View
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['gap-3']}}
                >
                    <Text
                        style={{...styles['fs-1']}}
                        weight='b'
                    >
                        {translate("settings.notifications")}
                    </Text>

                    <View
                        style={{...styles['w-100'],...styles['gap-3']}}
                    >
                        {
                            notifSettings.map((notifLabel,i)=>
                                <View
                                    style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['al-items-c']}}
                                    key={`notif-settings-${i}`}
                                >
                                    <Text
                                        style={{...styles['fs-3'],...styles['w-75']}}
                                    >
                                        {translate(`settings.${notifLabel}`)}
                                    </Text>

                                    <Toggle />
                                </View>
                            )
                        }
                    </View>

                </View>

                <View
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['gap-3']}}
                >
                    <Text
                        style={{...styles['fs-1']}}
                        weight='b'
                    >
                        {translate("settings.language")}
                    </Text>

                    <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-c'],...styles['gap-3']}}
                    >

                        
                            {
                                languageOptions.map((lang,i)=>
                                    <Pressable
                                        style={{...styles['flex-row'],...styles['j-content-b'],...styles['al-items-c'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                        backgroundColor: currentLang===lang ? "#589941" : "white"}}
                                        key={`language-option-${i}`}
                                        onPress={() => {
                                            dispatch(setLanguage({lang}));
                                            changeLanguage(lang);
                                        }}
                                    >

                                        <Text style={{...styles['fs-3'],...styles[`col-${currentLang===lang ? "white" : "black"}`]}} weight="sb">
                                            {lang.toUpperCase()}
                                        </Text>

                                        <View>
                                            <CheckBox
                                                checked={currentLang===lang}
                                                pointerEvents={"none"}
                                                checkedColor={"white"}
                                                uncheckedColor={"#589941"}
                                            />
                                        </View>
                                    </Pressable>
                                )
                            }
                       
                    </View>

                </View>

                <View
                    style={{...styles['gap-2'],...styles['mt-3']}}
                >
                    <Pressable
                        style={{...styles['al-items-c']}}
                    >
                        <Text
                            style={{...styles['fs-3'],...styles['col-gray']}}
                        >
                            {translate("settings.privacy_policy")}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={{...styles['al-items-c']}}
                    >
                        <Text
                            style={{...styles['fs-3'],...styles['col-gray']}}
                        >
                            {translate("settings.terms_of_service")}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={{...styles['al-items-c']}}
                    >
                        <Text
                            style={{...styles['fs-3'],...styles['col-gray']}}
                        >
                            {translate("settings.contact_us")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenContent>

        <StatusBar style="light"/>
    </View>

    );
}
 
