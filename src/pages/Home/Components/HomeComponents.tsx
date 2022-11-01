import * as React from "react";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class HomeComponent extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Text>HomeComponent working!</Text>
        )
    }
}

export default (HomeComponent);
