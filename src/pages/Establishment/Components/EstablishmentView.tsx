import * as React from "react";
import EstablishmentCreate from "./EstablishmentCreate";
import {getPublicationsAPI, getPublicationsByEstablishmentIdAPI} from "../../../services/Publication.service";
import {getEstablishmentByIdAPI} from "../../../services/Establishment.service";
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect} from "react";
import {REACT_APP_API_URL} from "@env";
import {Image} from "@rneui/themed";
import Carousel from 'react-native-reanimated-carousel';

interface Props {
    navigation: any,
    route: any,
}

interface States {
    establishment: any;
    loading: boolean;
    publications: any[];
}

class EstablishmentView extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            establishment: null,
            publications: []
        }

        const {establishmentId} = this.props.route.params;
        this.getEstablishmentById(establishmentId);
        this.getPublicationsByEstablishmentId(establishmentId);
    }

    async getEstablishmentById(id: string) {
        return getEstablishmentByIdAPI(id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    establishment: json,
                    loading: false
                })
            })
    }

    async getPublicationsByEstablishmentId(id: string) {
        return getPublicationsByEstablishmentIdAPI(id)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    publications: json
                })
            })
    }
    render() {
        const width = Dimensions.get('window').width;
        return (
            this.state.loading ? <ActivityIndicator /> :
                <ScrollView>
                    <View>
                        <Image source={{uri: REACT_APP_API_URL + '/' + this.state.establishment.image.path}} style={styles.dishImage}/>
                    </View>
                    <View style={styles.details}>
                        <Text>Address: {this.state.establishment.address.street},  {this.state.establishment.address.country.label}</Text>
                    </View>
                    <View>
                        {
                            this.state.publications &&
                            <View style={{flex: 1}}>
                                <Carousel
                                    width={width}
                                    height={width / 2}
                                    autoPlay={true}
                                    data={this.state.publications}
                                    scrollAnimationDuration={1000}
                                    onSnapToItem={(index) => console.log('current index:', index)}
                                    renderItem={(item: any) => (
                                        <View
                                            style={{
                                                flex: 1,
                                                borderWidth: 1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Image source={{uri: REACT_APP_API_URL + '/' + item.item.image.path}} style={styles.dishImage}/>
                                            <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                                test
                                            </Text>
                                        </View>
                                    )}
                                />
                            </View>
                        }
                    </View>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    dishImage: {
        aspectRatio: 3 / 2,
    },
    details: {
        backgroundColor: 'white'
    }
})

export default (EstablishmentView);