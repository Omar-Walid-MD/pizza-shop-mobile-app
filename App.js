import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Store/store';

import styles from './styles';
import { useFonts } from 'expo-font';
import { Cairo_400Regular as Cairo,Cairo_600SemiBold as Cairo_sb, Cairo_700Bold as Cairo_b } from '@expo-google-fonts/cairo';
import { Harmattan_400Regular as Harmattan } from '@expo-google-fonts/harmattan';
import { Ubuntu_400Regular as Ubuntu, Ubuntu_500Medium as Ubuntu_sb, Ubuntu_700Bold as Ubuntu_b} from "@expo-google-fonts/ubuntu";
import { Caveat_400Regular as Caveat} from "@expo-google-fonts/caveat";
import Navigator from './Navigator/Navigator';
import Background from './Components/Background';

export default function App() {

	let [fontsLoaded] = useFonts({
		Cairo, Cairo_sb, Cairo_b, Harmattan,
		Ubuntu, Ubuntu_sb, Ubuntu_b ,Caveat
	});

	if (!fontsLoaded) {
		return null;
	}


	return (
	<Provider store={store}>
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer theme={{colors:{background:"transparent"}}}>
			<Background />
				<Navigator />
			</NavigationContainer>
		</SafeAreaView>
	</Provider>
	);
}
 
