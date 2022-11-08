import * as React from "react";
import {RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {getPublicationsAPI} from "../../../services/Publication.service";
import {Image} from '@rneui/themed';
import {REACT_APP_API_URL} from "@env";

interface Props {
    navigation: any,
    route: any
}

interface States {
    publications: any[];
    refreshing: boolean;
}

class PublicationList extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            publications: [],
            refreshing: false
        }

        this.getPublications();

        this.props.navigation.addListener('focus', () => {
            this.setState({
                refreshing: true
            }, () => {
                this.getPublications();
            })
        })
    }

    async getPublications() {
        return getPublicationsAPI()
            .then(res => res.json())
            .then(json => {
                this.setState({publications: json, refreshing: false});
            })
    }

    render() {

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({
                                refreshing: true
                            });
                            this.getPublications();
                        }}
                    />
                }
            >
                <View style={styles.list}>
                    {
                        this.state.publications &&
                        this.state.publications.map((el, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => {
                                        this.props.navigation.push('PublicationViewComponent', {pubId: el.id})
                                    }}>
                                        <Image
                                            source={{uri: REACT_APP_API_URL + '/' + el.path}}
                                            style={styles.item}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    list: {
        display: "flex",
        flexDirection: "row"
    },
    item: {
        aspectRatio: 1,
        flex: 1,
        width: 100,
        height: 100,
        margin: 1
    },
});

export default (PublicationList);
