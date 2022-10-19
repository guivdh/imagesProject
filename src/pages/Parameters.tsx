import * as React from "react";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class Parameters extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Text>Parameters working!</Text>
        )
    }
}

export default (Parameters);
