import { TextInput } from 'react-native';
import { s } from '../styles';

export default function Input(props) {
    return (
        <TextInput style={s("input fs-4 shadow")} {...props}/>
    );
}
