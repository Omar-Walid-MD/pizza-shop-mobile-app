import { Text as RN_Text } from 'react-native';
import styles from "../styles";
import PropTypes from 'prop-types';

/**
 * MyComponent description
 * @param {object} props - Component props
 * @param {"sb"|"b"} props.weight - The variant of the component
 */

export default function Text(props) {

    const font = `${props.font || "Cairo"}${props.weight ? "_" : ""}${props.weight || ""}`;
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