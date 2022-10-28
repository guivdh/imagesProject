import * as React from "react";
import {Button, Image, Text, View} from "react-native";
import {getEstablishmentsAPI} from "../services/Establishment.service";
import {TextInput} from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from "@react-navigation/native";
import Establishment from "./establishment/Establishment";
import {AirbnbRating, Icon, Slider} from "@rneui/base";

interface Props {
    navigation: any,
    route: any
}

interface States {
    description: string,
    dishName: string,
    establishmentId: string,
    image: string,
    presentation: number,
    price: number,
    quantity: number,
    rating: string
    taste: number,
}

class Publication extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            description: '',
            dishName: '',
            establishmentId: '',
            image: '',
            presentation: 0,
            price: 0,
            quantity: 0,
            rating: '',
            taste: 0
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

        const navigation  = this.props;

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                this.setState({
                   image: result.uri
                })
            }
        }

        const interpolate = (start: number, end: number) => {
            let k = (this.state.taste) / 10; // 0 =>min  && 10 => MAX
            return Math.ceil((1 - k) * start + k * end) % 256;
        };

        const color = () => {
            let r = interpolate(0, 252);
            let g = interpolate(0, 186);
            let b = interpolate(0, 3);
            return `rgb(${r},${g},${b})`;
        };

        this.getEstablishments();


        return (
            <View>
                <Button title="Pick an image from gallery" onPress={pickImage}/>
                {this.state.image && <Image source={{uri: this.state.image}} style={{width: 200, height: 200}}/>}
                <TextInput label="Dish name" value={this.state.dishName} onChangeText={(v) => {this.setState({dishName: v})}} style={{margin: 16}}/>
                <TextInput label="Description" value={this.state.description} onChangeText={(v) => {this.setState({description: v})}} style={{margin: 16}}/>
                <TextInput label="Label" value={this.state.description} onChangeText={(v) => {this.setState({description: v})}} style={{margin: 16}}/>
                <Button title='go to establishments' onPress={() => {
                    this.props.navigation.navigate('Establishment', {create: true})
                }}  />
                <View style={{padding: 30}}>
                    <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
                        <Text>Bad</Text>
                        <Text>Very good</Text>
                    </View>
                    <Slider
                        value={this.state.taste}
                        onValueChange={(v) => this.setState({
                            taste: v
                        })}
                        maximumValue={10}
                        minimumValue={0}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                            children: (
                                <Icon
                                    name="heartbeat"
                                    type="font-awesome"
                                    size={20}
                                    reverse
                                    containerStyle={{ bottom: 20, right: 20 }}
                                    color={color()}
                                />
                            ),
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default (Publication);
