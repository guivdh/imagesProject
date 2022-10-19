import * as React from "react";
import {Button, Text} from "react-native";

interface Props {
}

interface States {
}

class MyTabBar extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Button
                title="Go somewhere"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received

                }}
            />
        )
    }
}

export default (MyTabBar);
