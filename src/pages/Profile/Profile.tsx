import * as React from "react";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class Profile extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Text>Profiles working!</Text>
        )
    }
}

export default (Profile);
