import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function MyText(props) {

    return (
        <Text style={[styles.text, props.style]}>{props.text}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        padding: 20
    }
})