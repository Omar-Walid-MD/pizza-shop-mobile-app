import { StatusBar } from 'expo-status-bar';
import { Modal, Text, View, Image, Pressable, ScrollView } from 'react-native';
import styles, { s } from '../styles';
import { useState } from 'react';
import Button from '../Components/Button';
import Background from './Components/Background';


export default function Screen({navigation}) {

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <View style={s("screen-content")}>
            </View>
        </View>
    )
}