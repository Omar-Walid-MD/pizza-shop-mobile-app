import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View, Image, Pressable } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';

export default function HomeScreen({navigation}) {

    return (
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />

            {/* Screen Content */}
            <View style={s("screen-content")}>
                <View style={s("al-items-c")}>
                    <Text style={s("fs-2")}>مرحبا بك</Text>
                    <Text style={s("fs-2 col-accent")}>اسم المستخدم</Text>
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
 
