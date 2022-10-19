import * as React from "react";
import {Text} from "react-native";

interface Props {
}

interface States {
}

class PublicationList extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Text>Publication-list working!</Text>
        )
    }
}

export default (PublicationList);
