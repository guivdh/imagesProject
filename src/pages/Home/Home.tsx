import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeComponent from "./Components/HomeComponents";

interface Props {
}

interface States {
}

class Home extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        const HomeStack = createNativeStackNavigator();
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen name='HomeScreen' component={HomeComponent} />
            </HomeStack.Navigator>
        )
    }
}

export default (Home);
