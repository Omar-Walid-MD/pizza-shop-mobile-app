import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({navigation}) {

    return (
        <View style={s("screen-container")}>
            {/* Background */}
            <LinearGradient style={s("h-100 w-100 pos-abs")} colors={["#FEF7EA","#F8E8CC"]} />

            {/* Screen Content */}
            <View style={s("screen-content")}>
                <View style={s("al-items-c")}>
                    <Text style={s("fs-1")}>مرحبا بك</Text>
                    <Text style={s("fs-1 col-accent")}>اسم المستخدم</Text>
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
 
