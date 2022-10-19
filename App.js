import {StyleSheet, View} from 'react-native';
import Core from "./src/pages/Core";

export default function App() {
    return (
        <Core name={'test'}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
