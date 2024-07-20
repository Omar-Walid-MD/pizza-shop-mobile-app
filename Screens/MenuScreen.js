import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuScreen({navigation}) {

    return (
        <View style={s("screen-container")}>
            <LinearGradient style={s("h-100 w-100 pos-abs")} colors={["#FEF7EA","#F8E8CC"]} />

      
            <StatusBar style="auto" />
        </View>
    );
}
 
