import { LinearGradient } from 'expo-linear-gradient';
import styles from "../../styles";

export default function Background() {
    return (
        <LinearGradient style={s("h-100 w-100 pos-abs")} colors={["#FEF7EA","#F8E8CC"]} />
    );
}
