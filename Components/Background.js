import { LinearGradient } from 'expo-linear-gradient';
import styles from "../styles";
import { Image } from 'react-native';

export default function Background() {
    return (
        <LinearGradient
        //style[h-100 w-100 pos-abs]
        style={{...styles['h-100'],...styles['w-100'],...styles['pos-abs']}}
        colors={["#FFFCF7","#FEF7EA"]}>
            <Image source={require("../assets/img/background.png")} style={{...styles['h-100'],...styles['w-100']}} />
        </LinearGradient>
    );
}
