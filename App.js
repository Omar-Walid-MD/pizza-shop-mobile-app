import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Store/store';

import styles from './styles';
import { useFonts } from 'expo-font';
import { Cairo_400Regular as Cairo, Cairo_600SemiBold as Cairo_sb, Cairo_700Bold as Cairo_b } from '@expo-google-fonts/cairo';
import { Harmattan_400Regular as Harmattan } from '@expo-google-fonts/harmattan'
import Navigator from './Navigator/Navigator';

export default function App() {

	let [fontsLoaded] = useFonts({
		Cairo, Cairo_sb, Cairo_b, Harmattan
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
	<Provider store={store}>
		<NavigationContainer style={styles.container}>
			<Navigator />
		</NavigationContainer>
	</Provider>
	);
}
 
