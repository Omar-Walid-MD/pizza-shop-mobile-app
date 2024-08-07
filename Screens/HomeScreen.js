import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';

import { MaterialIcons } from "react-native-vector-icons";

export default function HomeScreen({navigation}) {

    const currentOrderID = useSelector(store => store.orders.currentOrderID); 

    return (
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />

            {/* Screen Content */}
           <ScreenContent>
                <View
                style={{...styles['al-items-c']}}
                >
                    <Text style={{...styles['fs-2']}}>مرحبا بك</Text>
                    <Text
                    style={{...styles['fs-2'],...styles['col-accent']}}
                    >اسم المستخدم</Text>

                    {
                        currentOrderID &&
                        <Button
                        //style[mt-3 w-100]
                        style={{...styles['mt-3'],...styles['w-100']}}
                        containerStyle={{...styles['flex-row'],...styles['gap-2']}}
                        onPress={()=>navigation.navigate("Cart")}
                        >
                            <Text
                            //style[col-white fs-3]
                            style={{...styles['col-white'],...styles['fs-3']}}
                            weight='sb'
                            >لديك طلب قيد الإنتظار</Text>
                            <MaterialIcons name="delivery-dining" color="white" size={30} />
                        </Button>
                    }
                </View>
            </ScreenContent>

            <StatusBar style="auto" />
        </View>
    );
}
 
