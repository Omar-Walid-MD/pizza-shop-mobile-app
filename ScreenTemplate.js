import { StatusBar } from 'expo-status-bar';
import { Modal, Text, View, Image, Pressable, ScrollView } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../Components/Input';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { ListItem } from '@rneui/themed';
import MenuItem from '../Components/MenuItem';
import Accordion from '../Components/Accordion';
import { useState } from 'react';
import Button from '../Components/Button';
import { CheckBox } from '@rneui/base';


export default function Screen({navigation}) {

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <LinearGradient style={s("h-100 w-100 pos-abs")} colors={["#FEF7EA","#F8E8CC"]} />
            
            {/* Screen Content */}
            <View style={s("screen-content")}>
            </View>
        </View>
    )
}