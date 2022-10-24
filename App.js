import {StyleSheet, View} from 'react-native';
import Core from "./src/pages/Core";
import { mapping, light as lightTheme } from '@eva-design/eva';
import {ApplicationProvider} from "@ui-kitten/components";

export default function App() {
    return (
        <ApplicationProvider
            mapping={mapping}
            theme={lightTheme}>
            <Core style={{flex: 1}} name={'test'}/>
        </ApplicationProvider>
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
