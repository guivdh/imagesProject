import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreatePublicationComponent from "./Components/CreatePublicationComponent";
import EstablishmentCreate from "../Establishment/Components/EstablishmentCreate";

interface Props {
}

interface States {
}

class CreatePublication extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        const CreatePublicationStack = createNativeStackNavigator();
        return (
            <CreatePublicationStack.Navigator>
                <CreatePublicationStack.Screen name='CreatePublicationComponent' component={CreatePublicationComponent}/>
                <CreatePublicationStack.Screen name='CreateEstablishmentPublication' component={EstablishmentCreate}/>
            </CreatePublicationStack.Navigator>
        )
    }
}

export default (CreatePublication);
