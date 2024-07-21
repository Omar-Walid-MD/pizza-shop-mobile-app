import { ListItem } from "@rneui/themed";
import { useState } from "react"
import { View } from "react-native";
import { s } from "../styles";

export default function Accordion(props) {

    const [expanded,setExpanded] = useState(true);

    return (
        <View style={s("w-100")}>
            <ListItem.Accordion content={props.content}
            style={s("w-100"+props.class||"",{borderBottomWidth:2,borderColor:"#7F7F7F",backgroundColor:"transparent",...props.style || {}})}
            containerStyle={s("",{backgroundColor:"transparent",...props.containerStyle || {}})}
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