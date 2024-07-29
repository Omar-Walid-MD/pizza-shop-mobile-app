import { Text as RN_Text } from 'react-native';
import styles from "../../styles";
import PropTypes from 'prop-types';


export default function Text(props) {

    return (
        <RN_Text style={s("font-main",props.style || {})}>
        {props.children}
        </RN_Text>
    )
}

Text.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
};