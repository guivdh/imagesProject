import * as React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import {getEstablishmentsAPI} from "../services/Establishment.service";
import {getPublicationsAPI} from "../services/Publication.service";
import {Avatar, ListItem} from "@react-native-material/core";
import * as ImagePicker from 'expo-image-picker';

interface Props {
}

interface States {
    publications: any[];
}

class PublicationList extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            publications: []
        }

        this.getPublications()
    }

    async getPublications() {
        return getPublicationsAPI()
            .then(res => res.json())
            .then(json => {
                this.setState({publications: json});
            })
    }

    render() {

        return (
            <View>
                {
                    this.state.publications.map((l ,i) => (
                        <ListItem
                            key={i}
                            title={l.description}
                            leading={
                                <Image source={{ uri: "https://cdn.sanity.io/images/czqk28jt/prod_bk_ch/3ed8e7bfb650a60be6224a314463b25a285624f9-1600x1600.png" }} />
                            }
                        />
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

export default (PublicationList);
