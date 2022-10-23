import * as React from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import {getEstablishmentsAPI} from "../services/Establishment.service";
import {TextInput} from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";

interface Props {
}

interface States {
    publication: {
        image: string,
        description: string,
        establishmentId: number,
    }
}

class Publication extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            publication: {
                image: '',
                description: '',
                establishmentId: 0
            }
        }
    }

    private async getEstablishments() {
        return getEstablishmentsAPI()
            .then(res => res.json())
            .then(json => {
                return json;
            })
    }

    render() {

        const pickImage = async () => {
            let result = await  ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1
            });
            if(!result.cancelled) {
                this.setState({
                   publication: {
                       ...this.state.publication,
                       image: result.uri
                   }
                })
            }
        }

        this.getEstablishments();

        return (
            <View>
                <TextInput label="Label" style={{ margin: 16 }} />
                <Button title="Pick an image from gallery" onPress={pickImage} />
                {this.state.publication.image && <Image source={{uri: this.state.publication.image}} style={{width: 200, height: 200}} />}
            </View>
        )
    }
}

export default (Publication);
