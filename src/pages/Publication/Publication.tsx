import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PublicationList from "./Components/PublicationList";
import PublicationView from "./Components/PublicationView";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class Publication extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        const PublicationStack = createNativeStackNavigator();
        return (
            <PublicationStack.Navigator>
                <PublicationStack.Screen name='PublicationListComponent' component={PublicationList} />
                <PublicationStack.Screen name='PublicationViewComponent' component={PublicationView} />
            </PublicationStack.Navigator>
        )
    }
}

export default (Publication);
