import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Store/store';

import styles from './styles';
import { useFonts } from 'expo-font';
import { Cairo_400Regular as Cairo } from '@expo-google-fonts/cairo';
import Navigator from './Navigator/Navigator';

export default function App() {

	let [fontsLoaded] = useFonts({
		Cairo,
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
 
