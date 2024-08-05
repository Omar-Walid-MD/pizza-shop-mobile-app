import { ListItem } from "@rneui/themed";
import { useState } from "react"
import { View } from "react-native";
import styles from "../styles";

export default function Accordion(props) {

    const [expanded,setExpanded] = useState(true);

    return (
        <View style={{...styles['w-100']}}>
            <ListItem.Accordion content={props.content}
            //style[w-100 rounded backgroundColor:"#F8E8CC" borderBottomWidth:2 borderBottomColor:"#D1AC6B"]
            style={{...styles['w-100'],...styles['rounded'],backgroundColor:"#F8E8CC",borderBottomWidth:2,borderBottomColor:"#D1AC6B"}}
            //containerStyle[w-100 flex-row j-content-b backgroundColor:"transparent"]
            containerStyle={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],backgroundColor:"transparent",...(props.style || {})}}
            isExpanded={expanded}
            onPress={()=>setExpanded(!expanded)}
            >
            {props.children}
            </ListItem.Accordion>
        </View>
    )
}