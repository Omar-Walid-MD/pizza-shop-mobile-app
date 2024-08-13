import { Text as RN_Text } from 'react-native';
import styles from "../styles";
import PropTypes from 'prop-types';
import i18n from '../I18n/i18n';

/**
 * MyComponent description
 * @param {object} props - Component props
 * @param {"sb"|"b"} props.weight - The variant of the component
 * @param {"main"|"accent"} props.font - The variant of the component
 */

export default function Text(props) {

    const fontFamily = props.font==="main" || !props.font ? (i18n.language==="ar" ? "Cairo" : "Ubuntu")
                    : props.font==="accent" && (i18n.language==="ar" ? "Harmattan" : "Caveat");

    if(!fontFamily) print("null?")

    const font = `${fontFamily}${props.weight ? "_" : ""}${props.weight || ""}`;
    return (
        <RN_Text
        style={{
            fontFamily:font,
            ...(props.style || {})
        }}
        >
        {props.children}
        </RN_Text>
    )
}

Text.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    font: PropTypes.string,
    weight: PropTypes.string
};