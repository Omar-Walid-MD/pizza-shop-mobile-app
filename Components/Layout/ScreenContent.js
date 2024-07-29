import { ScrollView, View } from "react-native"
import PropTypes from 'prop-types';
import styles from "../../styles";

export default function ScreenContent(props)
{
    return (
        <View
        //style[screen-content]
        style={{...styles['screen-content']}}
    
        >
        {props.header}
        {
            !props.scrollDisabled ?
            <ScrollView style={s("w-100")} contentContainerStyle={s("screen-content-scroll")}>
                {props.children}
            </ScrollView>
            :
            props.children

        }
        </View>
    )
}

ScreenContent.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    scrollDisabled: PropTypes.bool
}