import * as React from "react";
import {Button, Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {Divider, ListItem} from "@react-native-material/core";
import {Input, Layout} from "@ui-kitten/components";
import {getCountriesFromApi} from "../../services/Country.service";
import {addEstablishmentAPI} from "../../services/Establishment.service";
import * as ImagePicker from "expo-image-picker";
import { Button as KittenButton, Icon } from '@ui-kitten/components';
import {uploadImageAPI} from "../../services/Image.service";

interface Props {
    backToList(): void
}

interface States {
    displayAddEstModal: boolean,
    displaySelectCountryModal: boolean,
    countriesList: any[];
    establishment: {
        name: string,
        description: string,
        image: string,
        street: string,
        country: string
    }
    selectedCountryLabel: string,
    loading: boolean
}

class CreateEstablishment extends React.Component<Props, States> {
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
                street: '',
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

    private async addEstablishment(establishment: any) {
        console.log('aa')
        await addEstablishmentAPI(establishment)
            .then((response) => response.json())
            .then((result) => {
                if(result.id) {
                    this.props.backToList();
                    this.setState({
                        establishment: {
                            country: '',
                            street: '',
                            image: '',
                            description: '',
                            name: ''
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                console.log(result)
                this.setState({
                    establishment: {
                        ...this.state.establishment,
                        image: result.uri
                    }
                })
            }
        }

        const checkIfFormComplete = () => {
            if(!this.state.establishment.name) {
                return false;
            } else if (!this.state.establishment.description) {
                return false;
            } else if (!this.state.establishment.street) {
                return false;
            } else if (!this.state.establishment.country) {
                return false;
            } else if (!this.state.establishment.image) {
                return false;
            } else {
                return true;
            }
        }

        return (
            <View>
                <ScrollView>

                    <Input size='small' label="Nom" style={{margin: 5}} onChangeText={(v: string) => {
                        this.setState({
                            establishment: {
                                ...this.state.establishment,
                                name: v
                            }
                        });
                    }}/>
                    <Input size='small' label="Description" style={{margin: 5}} onChangeText={(v: string) => {
                        this.setState({
                            establishment: {
                                ...this.state.establishment,
                                description: v
                            }
                        });
                    }}/>

                    <Divider style={{margin: 10}}/>

                    <Input size='small' label="street" style={{margin: 5}} onChangeText={(v: string) => {
                        this.setState({
                            establishment: {
                                ...this.state.establishment,
                                street: v
                            }
                        });
                    }}/>

                    <Input size='small' disabled value={this.state.selectedCountryLabel} label="Country" style={{margin: 5}}/>
                    <KittenButton style={styles.button} size='small' onPress={() => {
                        this.setState({displaySelectCountryModal: true});
                    }}>Select a country</KittenButton>

                    <Divider style={{margin: 10}}/>

                    <KittenButton style={styles.button} size='small' onPress={pickImage}>Pick an image from gallery</KittenButton>

                    {
                        this.state.establishment.image &&
                        <View style={styles.imageContainer}>
                             <Image source={{uri: this.state.establishment.image}} style={{width: 200, height: 200}}/>
                        </View>
                    }

                    <Divider style={{margin: 10}}/>

                    <KittenButton style={styles.button} status='success' onPress={() => this.addEstablishment(this.state.establishment)}>
                        SAVE
                    </KittenButton>
                    <KittenButton style={styles.button} status='danger' onPress={() => {
                        this.props.backToList();
                        this.setState({
                            establishment: {
                                country: '',
                                street: '',
                                image: '',
                                description: '',
                                name: ''
                            }
                        });
                    }}>Close</KittenButton>
                </ScrollView>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
        margin: 10
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
        elevation: 2,
        margin: 10
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

export default (CreateEstablishment);
