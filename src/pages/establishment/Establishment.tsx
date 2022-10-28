import * as React from "react";
import {Button, Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {ListItem, TextInput} from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";
import {getCountriesFromApi} from "../../services/Country.service";
import {addEstablishmentAPI, getEstablishmentsAPI} from "../../services/Establishment.service";
import CreateEstablishment from "./Create-establishment";

interface Props {
}

interface States {
    displayAddEstModal: boolean,
    displaySelectCountryModal: boolean,
    countriesList: any[];
    establishment: {
        name: string,
        description: string,
        image: string,
        address: string,
        country: string
    }
    selectedCountryLabel: string,
    loading: boolean
}

class Establishment extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayAddEstModal: false,
            displaySelectCountryModal: false,
            countriesList: [],
            selectedCountryLabel: '',
            establishment: {
                name: '',
                description: '',
                image: '',
                address: '',
                country: ''
            },
            loading: false
        }

        this.getCountries();
    }

    private async getCountries() {
        return getCountriesFromApi()
            .then(res => res.json())
            .then(json => {
                this.setState({
                    countriesList: json
                })
            })
    }

    private async getEstablishments() {
        return getEstablishmentsAPI()
            .then(res => res.json())
            .then(json => {
                this.setState({
                    countriesList: json
                })
            })
    }

    private async addEstablishment(establishment: any) {
        return addEstablishmentAPI(establishment)
            .then(res => {
                console.log(res)
            })

    }

    render() {

        const Separator = () => (
            <View style={styles.separator}/>
        );


        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                this.setState({
                    establishment: {
                        ...this.state.establishment,
                        image: result.uri
                    }
                })
            }
        }

        return (
            <View style={styles.container}>
                {
                    !this.state.displayAddEstModal ? <Button title='Add new establishment' onPress={() => {
                        this.setState({displayAddEstModal: true})
                    }}
                    /> : <CreateEstablishment backToList={() => this.setState({displayAddEstModal: false})} />
                }
            </View>
            /*<View style={styles.container}>
                <Button title='Add new establishment' onPress={() => {
                    this.setState({displayAddEstModal: true})
                }}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.displayAddEstModal}
                    onRequestClose={() => {
                        this.setState({displayAddEstModal: !this.state.displayAddEstModal});
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView>
                                <TextInput label="Nom" style={{margin: 16}} onChangeText={(v: string) => {
                                    this.setState({
                                        establishment: {
                                            ...this.state.establishment,
                                            name: v
                                        }
                                    });
                                }}/>
                                <TextInput label="Description" style={{margin: 16}} onChangeText={(v: string) => {
                                    this.setState({
                                        establishment: {
                                            ...this.state.establishment,
                                            description: v
                                        }
                                    });
                                }}/>

                                <Separator/>

                                <TextInput label="Address" style={{margin: 16}} onChangeText={(v: string) => {
                                    this.setState({
                                        establishment: {
                                            ...this.state.establishment,
                                            description: v
                                        }
                                    });
                                }}/>

                                {(!this.state.establishment.country) ? <Button title="Select country" onPress={() => {
                                    this.setState({displaySelectCountryModal: true});
                                }}/> : <Text onPress={() => {this.setState({displaySelectCountryModal: true})}}>{this.state.selectedCountryLabel}</Text>}

                                <Separator/>

                                <Button title="Pick an image from gallery" onPress={pickImage}/>
                                {this.state.establishment.image && <Image source={{uri: this.state.establishment.image}} style={{width: 200, height: 200}}/>}

                                <Separator/>

                                <Button title='Save' onPress={() => {
                                    this.addEstablishment(this.state.establishment);
                                }}/>
                                <Separator />
                                <Button title='Close' onPress={() => {
                                    this.setState({
                                        displayAddEstModal: !this.state.displayAddEstModal,
                                        establishment: {
                                            country: '',
                                            address: '',
                                            image: '',
                                            description: '',
                                            name: ''
                                        }
                                    });
                                }}/>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.displaySelectCountryModal}
                    onRequestClose={() => {
                        this.setState({displaySelectCountryModal: !this.state.displaySelectCountryModal});
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalCountriesView}>
                            <Text>Select country</Text>
                            {this.state.countriesList && this.state.countriesList.map((l, i) => (
                                <ListItem key={l.id} title={l.label} onPress={() => {
                                    this.setState({
                                        establishment: {
                                            ...this.state.establishment,
                                            country: l.id
                                        },
                                        selectedCountryLabel: l.label,
                                        displaySelectCountryModal: false
                                    })
                                }}/>
                            ))}
                            <Button title='Close' onPress={() => {
                                this.setState({displaySelectCountryModal: !this.state.displaySelectCountryModal});
                            }}/>
                        </View>
                    </View>
                </Modal>
            </View>*/
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '95%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalCountriesView: {
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default (Establishment);
