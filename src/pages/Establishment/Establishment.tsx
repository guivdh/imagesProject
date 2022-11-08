import * as React from "react";
import {StyleSheet} from "react-native";
import {getCountriesFromApi} from "../../services/Country.service";
import {getEstablishmentsAPI} from "../../services/Establishment.service";
import EstablishmentCreate from "./Components/EstablishmentCreate";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EstablishmentList from "./Components/EstablishmentList";
import EstablishmentView from "./Components/EstablishmentView";

interface Props {
    navigation: any,
    route: any
}

interface States {
}

class Establishment extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const EstablishmentStack = createNativeStackNavigator();

        return (
            <EstablishmentStack.Navigator>
                <EstablishmentStack.Screen name='List' component={EstablishmentList} />
                <EstablishmentStack.Screen name='EstablishmentCreate' component={EstablishmentCreate} />
                <EstablishmentStack.Screen name='EstablishmentView' component={EstablishmentView} />
            </EstablishmentStack.Navigator>
        )
    }
}

export default (Establishment);
