import { Text, View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import { Button as RNEUI_Button} from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';


export default function Button(props) {

    return (
        <RNEUI_Button
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
            colors: ["#CC6060", "#C03E3E","#C03E3E","#943030"],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
            locations: [0.1,0.3,0.7,1],
        }}
        
        style={{padding:0,borderRadius:5,overflow:'hidden'}}
        containerStyle={props.style}
        onPress={props.onPress}
        >
        {props.children}
        </RNEUI_Button>
    )
}

// Define the type for your props
Button.propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.object,
    class: PropTypes.string
};