import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';

export default function HomeScreen({navigation}) {

    return (
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />

            {/* Screen Content */}
           <ScreenContent>
                <View style={s("al-items-c")}>
                    <Text style={s("fs-2")}>مرحبا بك</Text>
                    <Text style={s("fs-2 col-accent")}>اسم المستخدم</Text>
                </View>
            </ScreenContent>

            <StatusBar style="auto" />
        </View>
    );
}
 
