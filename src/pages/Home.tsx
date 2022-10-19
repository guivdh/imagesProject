import * as React from "react";
import {Text} from "react-native";

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
        return (
            <Text>Home working!</Text>
        )
    }
}

export default (Home);
