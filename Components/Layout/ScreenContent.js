import { ScrollView, View } from "react-native"
import { s } from "../../styles"
import PropTypes from 'prop-types';

export default function ScreenContent(props)
{
    return (
        <View style={s("screen-content")}>
        {props.header}
        <ScrollView style={s("w-100")} contentContainerStyle={s("screen-content-scroll")}>
            {props.children}
        </ScrollView>
        </View>
    )
}

ScreenContent.propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
}