import { Text, View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

/**
 * MyComponent description
 * @param {object} props - Component props
 * @param {"green"|"white"|"red"} props.variant - The variant of the component
 */

export default function Button(props) {

    return (
        <LinearGradient
        style={{borderRadius:5,shadowColor:"black",elevation:2}}
        colors={
            props.variant==="red" || !props.variant ? 
            ["#CC6060", "#C03E3E","#C03E3E","#943030"]
            : props.variant==="white" ?
            ["#FFFFFF", "#FAFAFA","#FAFAFA","#D1D1D1"]
            : props.variant==="green" &&
            ["#6EB755", "#589941","#589941","#4B8237"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1,0.3,0.7,1]}
        >
            <Pressable
            
            style={{backgroundColor:"transparent",paddingVertical:5,paddingHorizontal:15,alignItems:"center"}}
            onPress={props.onPress}
            >
            {props.children}
            </Pressable>
        </LinearGradient>
    )
}

// Define the type for your props
Button.propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.object,
    class: PropTypes.string,
    variant: PropTypes.oneOf(["red","white","green"])
};