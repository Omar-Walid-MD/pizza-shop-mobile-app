import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({navigation}) {

    return (
        <View style={s("screen-container")}>
            <LinearGradient style={s("h-100 w-100 pos-abs")} colors={["#FEF7EA","#F8E8CC"]} />

            <View style={s("pt-4 al-items-c")}>
                <Text style={s("fs-1",{fontFamily:'Cairo'})}>مرحبا بك</Text>
                <Text style={s("fs-1 col-accent",{fontFamily:'Cairo'})}>اسم المستخدم</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
 
