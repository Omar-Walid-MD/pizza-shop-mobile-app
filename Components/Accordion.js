import { ListItem } from "@rneui/themed";
import { useState } from "react"
import { View } from "react-native";
import styles from "../styles";

export default function Accordion(props) {

    const [expanded,setExpanded] = useState(true);

    return (
        <View style={{...styles['w-100']}}>
            <ListItem.Accordion content={props.content}
            //style[w-100 borderBottomWidth:2 borderColor:"#7F7F7F" backgroundColor:"transparent"]
            style={{...styles['w-100'],borderBottomWidth:2,borderColor:"#7F7F7F",backgroundColor:"transparent",...(props.style || {})}}
            //containerStyle[w-100 flex-row j-content-b backgroundColor:"transparent"]
            containerStyle={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],backgroundColor:"transparent",...(props.style || {})}}
            isExpanded={expanded}
            onPress={()=>setExpanded(!expanded)}
            >
            {
                props.children
            }
            </ListItem.Accordion>
        </View>
    )
}