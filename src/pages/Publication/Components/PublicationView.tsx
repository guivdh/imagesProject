import * as React from "react";
import {Text} from "react-native";

interface Props {
    navigation: any,
    route: any
}

interface States {
}

class PublicationView extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {

        const { pubId, otherParam } = this.props.route.params;

        return (
            <Text>{pubId}</Text>
        )
    }
}

export default (PublicationView);
