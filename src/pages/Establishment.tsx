import * as React from "react";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class Establishment extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Text>Establishment working!</Text>
        )
    }
}

export default (Establishment);
