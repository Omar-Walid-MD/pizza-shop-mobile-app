import { LinearGradient } from 'expo-linear-gradient';
import styles from "../styles";

export default function Background() {
    return (
        <LinearGradient
        //style[h-100 w-100 pos-abs]
        style={{...styles['h-100'],...styles['w-100'],...styles['pos-abs']}}
        colors={["#FEF7EA","#F8E8CC"]} />
    );
}
