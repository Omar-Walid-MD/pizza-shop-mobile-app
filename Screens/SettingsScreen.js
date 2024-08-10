import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import { auth } from "../Firebase/firebase";
import { MaterialIcons } from "react-native-vector-icons";
import Loading from '../Components/Loading';
import Toggle from '../Components/Toggle';
import CheckBox from '../Components/CheckBox';
import { useState } from 'react';

export default function SettingsScreen({navigation}) {

    const notifSettings = [
        "إشعارات الطلبات",
        "إشعارات العروض",
        "إشعارات القائمة"
    ];
    const languageOptions = ["AR","EN"];

    const [selectedLanguage,setSelectedLanguage] = useState("AR");

    return (
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />

            {/* Screen Content */}
            <ScreenContent
            header={
                <Text font="Harmattan" style={{fontSize:35}}>الإعدادات</Text>
            }
            >
                <View
                //style[al-items-c gap-4]
                style={{...styles['al-items-c'],...styles['gap-4']}}
                >
                    <View
                    //style[w-100 al-items-c gap-3]
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['gap-3']}}
                    >
                        <Text
                        //style[fs-1]
                        style={{...styles['fs-1']}}
                        weight='b'
                        >الإشعارات</Text>

                        <View
                        //style[w-100 gap-3]
                        style={{...styles['w-100'],...styles['gap-3']}}
                        >
                        {
                            notifSettings.map((notifLabel,i)=>
                            <View
                            //style[w-100 flex-row j-content-b]
                            style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b']}}
                            key={`notif-settings-${i}`}
                            >
                                <Text
                                //style[fs-3]
                                style={{...styles['fs-3']}}
                                >{notifLabel}</Text>

                                <Toggle />
                            </View>
                            )
                        }
                        </View>

                    </View>

                    <View
                    //style[w-100 al-items-c gap-3]
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['gap-3']}}
                    >
                        <Text
                        //style[fs-1]
                        style={{...styles['fs-1']}}
                        weight='b'
                        >اللغة</Text>

                        <View
                        //style[w-100 flex-row j-content-b al-items-s]
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['al-items-s']}}
                        >
                            <Text
                            //style[fs-3]
                            style={{...styles['fs-3']}}
                            >لغة العرض</Text>

                            <View
                            //style[gap-2 flex-row]
                            style={{...styles['gap-2'],...styles['flex-row']}}
                            >
                            {
                                languageOptions.map((lang,i)=>
                                    <Pressable
                                    style={{...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                    backgroundColor: selectedLanguage===lang ? "#589941" : "#FEF7EA"}}
                                    key={`language-option-${i}`}
                                    onPress={() => setSelectedLanguage(lang)}
                                    >
    
                                        <Text style={{...styles['fs-3'],...styles[`col-${selectedLanguage===lang ? "white" : "black"}`]}} weight="sb">{lang}</Text>
    
                                        <View>
                                            <CheckBox
                                            checked={selectedLanguage===lang}
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

                    </View>

                    <View
                    //style[gap-2 mt-3]
                    style={{...styles['gap-2'],...styles['mt-3']}}
                    >
                        <Pressable
                        //style[al-items-c]
                        style={{...styles['al-items-c']}}
                        >
                            <Text
                            //style[fs-3 col-gray]
                            style={{...styles['fs-3'],...styles['col-gray']}}
                            >سياسة الخصوصية</Text>
                        </Pressable>

                        <Pressable
                        //style[al-items-c]
                        style={{...styles['al-items-c']}}
                        >
                            <Text
                            //style[fs-3 col-gray]
                            style={{...styles['fs-3'],...styles['col-gray']}}
                            >شروط الخدمة</Text>
                        </Pressable>

                        <Pressable
                        //style[al-items-c]
                        style={{...styles['al-items-c']}}
                        >
                            <Text
                            //style[fs-3 col-gray]
                            style={{...styles['fs-3'],...styles['col-gray']}}
                            >تواصل معنا</Text>
                        </Pressable>
                    </View>
                </View>
            </ScreenContent>

            <StatusBar style="auto" />
        </View>
    );
}
 
