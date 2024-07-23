import { TextInput } from 'react-native';
import { s } from '../styles';

export default function Input(props) {
    return (
        <TextInput cursorColor={"#C03E3E"} textAlign='right' style={s("input fs-4 shadow font-main")} {...props}/>
    );
}
