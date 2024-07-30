import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';

export default function HomeScreen({navigation}) {

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
                </View>
            </ScreenContent>

            <StatusBar style="auto" />
        </View>
    );
}
 
