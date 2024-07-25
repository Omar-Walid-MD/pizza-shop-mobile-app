import { View } from "react-native"
import { s } from "../../styles"

export default ScreenContent(props)
{
    return (
        <View style={s("screen-container")}>
        {props.children}
        </View>
    )
}