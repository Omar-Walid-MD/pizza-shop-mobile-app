import { TextInput } from 'react-native';
import styles from "../styles";

export default function Input(props) {
    return (
        <TextInput cursorColor={"#C03E3E"} textAlign='right'
        //style[input fs-4 shadow font-main]
        style={{...styles['input'],...styles['fs-4'],...styles['shadow'],fontFamily:"Cairo"}}
        {...props}/>
    );
}
