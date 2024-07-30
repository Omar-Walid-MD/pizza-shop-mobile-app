import styles from "../styles";
import { View } from "react-native"
import { CheckBox as RNEUI_CheckBox } from "@rneui/base";

export default function CheckBox({checked,onPress,pointerEvents})
{
    return (
        <View
        //style[al-items-c j-content-c border-danger height:40 aspectRatio:1 overflow:"visible"]
        style={{...styles['al-items-c'],...styles['j-content-c'],...styles['border-danger'],height:40,aspectRatio:1,overflow:"visible"}}
        >
            <RNEUI_CheckBox
            checked={checked}
            onPress={onPress}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#820000"
            style={{position:"absolute"}}
            //style[al-items-c j-content-c height:50 aspectRatio:1 backgroundColor:"transparent"]
            containerStyle={{...styles['al-items-c'],...styles['j-content-c'],height:50,aspectRatio:1,backgroundColor:"transparent"}}
            pointerEvents={pointerEvents}
           />
        </View>
    )
}