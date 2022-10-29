import * as React from "react";
import {ActivityIndicator, Button, Image, Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {getEstablishmentByIdAPI, getLightEstablishmentsAPI} from "../services/Establishment.service";
import {Divider, TextInput} from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";
import {Icon, Slider} from "@rneui/base";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {Card} from "@rneui/themed";
import {ENV_API_URL} from "@env";
import {Button as KittenButton, Input, Tab, TabView} from "@ui-kitten/components";

interface Props {
    navigation: any,
    route: any
}

interface States {
    publication: {
        description: string,
        dishName: string,
        dishType: string,
        establishmentId: string,
        image: any,
        rating: {
            presentation: number,
            price: number,
            quantity: number,
            taste: number,
            description: string
        },
    }
    currentEstablishment: any,
    modalEstablishment: boolean,
    modalResume: boolean,
    loading: boolean,
    establishmentList: any[],
    currentTabRating: number
}

class Publication extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            publication: {
                description: '',
                dishName: '',
                dishType: '',
                establishmentId: '',
                image: null,
                rating: {
                    presentation: 0,
                    price: 0,
                    quantity: 0,
                    taste: 0,
                    description: ''
                },
            },
            modalEstablishment: false,
            modalResume: false,
            loading: false,
            establishmentList: [],
            currentTabRating: 0,
            currentEstablishment: null
        }
    }

    private async getEstablishments() {
        return getLightEstablishmentsAPI()
            .then(res => res.json())
            .then(json => {
                this.setState({
                    establishmentList: json,
                    loading: false
                })
            })
    }

    render() {

        const navigation = this.props;

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                this.setState({
                    publication: {
                        ...this.state.publication,
                        image: result.uri
                    }
                })
            }
        }

        const interpolate = (start: number, end: number, el: number) => {
            let k = el / 10; // 0 =>min  && 10 => MAX
            return Math.ceil((1 - k) * start + k * end) % 256;
        };

        const color = (el: number) => {
            let r = interpolate(0, 252, el);
            let g = interpolate(0, 186, el);
            let b = interpolate(0, 3, el);
            return `rgb(${r},${g},${b})`;
        };

        return (
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <Button title="Picture of the dish" onPress={pickImage}/>
                {
                    this.state.publication.image &&
                    <Image source={{uri: this.state.publication.image}} style={{width: 200, height: 200}}/>
                }
                <TextInput
                    label="Dish name"
                    value={this.state.publication.dishName}
                    onChangeText={(v) => {
                        this.setState({
                            publication: {
                                ...this.state.publication,
                                dishName: v
                            }
                        })
                    }}
                    style={{margin: 16}}
                />
                <TextInput
                    label="Type (Italian, vegan, Chinese, ...)"
                    value={this.state.publication.description}
                    onChangeText={(v) => {
                        this.setState({
                            publication: {
                                ...this.state.publication,
                                description: v
                            }
                        })
                    }}
                    style={{margin: 16}}
                />
                <TextInput
                    label="Description"
                    value={this.state.publication.dishType}
                    onChangeText={(v) => {
                        this.setState({
                            publication: {
                                ...this.state.publication,
                                dishType: v
                            }
                        })
                    }}
                    style={{margin: 16}}
                />
                <Divider style={{marginBottom: 10}}/>
                <Button
                    title='Select establishment'
                    onPress={() => {
                        this.getEstablishments();
                        this.setState({
                            modalEstablishment: true,
                            loading: true
                        })
                    }}
                />
                {this.state.currentEstablishment &&
                    <Card>
                        <Card.Title>{this.state.currentEstablishment.name}</Card.Title>
                        <Card.Divider/>
                        <View style={{display: 'flex', alignItems: 'center'}}>
                            <Card.Image
                                style={{padding: 0, width: 200}}
                                source={{
                                    uri: ENV_API_URL + '/' + this.state.currentEstablishment.image.path,
                                }}
                            />
                            <Text style={{marginBottom: 10}}>
                                {this.state.currentEstablishment.description}
                            </Text>
                        </View>
                    </Card>
                }
                <View>
                    <TabView
                        selectedIndex={this.state.currentTabRating}
                        onSelect={index => this.setState({currentTabRating: index})}
                        tabBarStyle={{height: 50}}
                        style={{marginTop: 10}}
                    >
                        <Tab title='Taste'>
                            <View style={{margin: 20}}>
                                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
                                    <Text>Bad</Text>
                                    <Text>Very good</Text>
                                </View>
                                <Slider
                                    value={this.state.publication.rating.taste}
                                    onValueChange={(v) => {
                                        this.setState({
                                            publication: {
                                                ...this.state.publication,
                                                rating: {
                                                    ...this.state.publication.rating,
                                                    taste: v
                                                }
                                            }
                                        })
                                    }}
                                    maximumValue={10}
                                    minimumValue={0}
                                    step={1}
                                    allowTouchTrack
                                    trackStyle={{height: 5, backgroundColor: 'transparent'}}
                                    thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                                    thumbProps={{
                                        children: (
                                            <Icon
                                                name="heartbeat"
                                                type="font-awesome"
                                                size={20}
                                                reverse
                                                containerStyle={{bottom: 20, right: 20}}
                                                color={color(this.state.publication.rating.taste)}
                                            />
                                        ),
                                    }}
                                />
                            </View>
                        </Tab>
                        <Tab title='Presentation'>
                            <View style={{margin: 20}}>
                                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
                                    <Text>Bad</Text>
                                    <Text>Very good</Text>
                                </View>
                                <Slider
                                    value={this.state.publication.rating.presentation}
                                    onValueChange={(v) => {
                                        this.setState({
                                            publication: {
                                                ...this.state.publication,
                                                rating: {
                                                    ...this.state.publication.rating,
                                                    presentation: v
                                                }
                                            }
                                        })
                                    }}
                                    maximumValue={10}
                                    minimumValue={0}
                                    step={1}
                                    allowTouchTrack
                                    trackStyle={{height: 5, backgroundColor: 'transparent'}}
                                    thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                                    thumbProps={{
                                        children: (
                                            <Icon
                                                name="heartbeat"
                                                type="font-awesome"
                                                size={20}
                                                reverse
                                                containerStyle={{bottom: 20, right: 20}}
                                                color={color(this.state.publication.rating.presentation)}
                                            />
                                        ),
                                    }}
                                />
                            </View>
                        </Tab>
                        <Tab title='Quantity'>
                            <View style={{margin: 20}}>
                                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
                                    <Text>Bad</Text>
                                    <Text>Very good</Text>
                                </View>
                                <Slider
                                    value={this.state.publication.rating.quantity}
                                    onValueChange={(v) => {
                                        this.setState({
                                            publication: {
                                                ...this.state.publication,
                                                rating: {
                                                    ...this.state.publication.rating,
                                                    quantity: v
                                                }
                                            }
                                        })
                                    }}
                                    maximumValue={10}
                                    minimumValue={0}
                                    step={1}
                                    allowTouchTrack
                                    trackStyle={{height: 5, backgroundColor: 'transparent'}}
                                    thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                                    thumbProps={{
                                        children: (
                                            <Icon
                                                name="heartbeat"
                                                type="font-awesome"
                                                size={20}
                                                reverse
                                                containerStyle={{bottom: 20, right: 20}}
                                                color={color(this.state.publication.rating.quantity)}
                                            />
                                        ),
                                    }}
                                />
                            </View>
                        </Tab>
                        <Tab title='Price'>
                            <View style={{margin: 20}}>
                                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
                                    <Text>Bad</Text>
                                    <Text>Very good</Text>
                                </View>
                                <Slider
                                    value={this.state.publication.rating.price}
                                    onValueChange={(v) => {
                                        this.setState({
                                            publication: {
                                                ...this.state.publication,
                                                rating: {
                                                    ...this.state.publication.rating,
                                                    price: v
                                                }
                                            }
                                        })
                                    }}
                                    maximumValue={10}
                                    minimumValue={0}
                                    step={1}
                                    allowTouchTrack
                                    trackStyle={{height: 5, backgroundColor: 'transparent'}}
                                    thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                                    thumbProps={{
                                        children: (
                                            <Icon
                                                name="heartbeat"
                                                type="font-awesome"
                                                size={20}
                                                reverse
                                                containerStyle={{bottom: 20, right: 20}}
                                                color={color(this.state.publication.rating.price)}
                                            />
                                        ),
                                    }}
                                />
                            </View>
                        </Tab>
                    </TabView>
                </View>
                <View>
                    <Input
                        multiline={true}
                        textStyle={{minHeight: 64}}
                        placeholder='Your rating'
                        value={this.state.publication.rating.description}
                        onChangeText={(v: string) => this.setState({
                            publication: {
                                ...this.state.publication,
                                rating: {
                                    ...this.state.publication.rating,
                                    description: v
                                }
                            }
                        })}
                    />

                </View>
                <Divider style={{marginBottom: 10}}/>

                <KittenButton
                    style={styles.button}
                    status='success'
                    onPress={() => {
                        this.setState({
                            modalResume: true
                        })
                    }}
                >
                    Visualiser
                </KittenButton>

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalEstablishment}
                    onRequestClose={() => {
                        this.setState({modalEstablishment: false})
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Select establishment</Text>
                            {
                                this.state.loading ? <ActivityIndicator/> :
                                    <AutocompleteDropdown
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        closeOnSubmit={false}
                                        onSelectItem={(item) => {
                                            if (item) {
                                                this.setState({
                                                    publication: {
                                                        ...this.state.publication,
                                                        establishmentId: item.id
                                                    },
                                                    modalEstablishment: false,
                                                    loading: true
                                                })
                                                getEstablishmentByIdAPI(item.id)
                                                    .then(res => res.json())
                                                    .then(json => {
                                                        this.setState({
                                                            currentEstablishment: json,
                                                            loading: false
                                                        })
                                                    })
                                            }
                                        }}
                                        dataSet={this.state.establishmentList}
                                    />
                            }
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalResume}
                    onRequestClose={() => {
                        this.setState({modalResume: false})
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Card>
                                <Card.Title>{this.state.publication.dishName}</Card.Title>
                                <Card.Divider style={{marginBottom: 10}} />
                                <Card.Image
                                    source={{uri: this.state.publication.image}}
                                />
                                <Text>{this.state.publication.dishType}</Text>
                                <Text>{this.state.publication.description}</Text>
                                <Card.Divider style={{marginBottom: 10}} />
                                <Card>
                                    {
                                        this.state.currentEstablishment &&
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Image
                                                style={{padding: 0, width: 50}}
                                                source={{
                                                    uri: ENV_API_URL + '/' + this.state.currentEstablishment.image.path,
                                                }}
                                            />
                                            <Text>{this.state.currentEstablishment.name}</Text>
                                        </View>
                                    }
                                </Card>
                                <Card.Divider style={{marginBottom: 10, marginTop: 10}} />
                                <View>
                                    <Text>Taste: </Text>
                                    <Slider
                                        value={this.state.publication.rating.taste}
                                        disabled={true}
                                        maximumValue={10}
                                        minimumValue={0}
                                        step={1}
                                        allowTouchTrack
                                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}

                                    />
                                </View>
                                <View>
                                    <Text>Presentation: </Text>
                                    <Slider
                                        value={this.state.publication.rating.presentation}
                                        disabled={true}
                                        maximumValue={10}
                                        minimumValue={0}
                                        step={1}
                                        allowTouchTrack
                                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}

                                    />
                                </View>
                                <View>
                                    <Text>Quantity: </Text>
                                    <Slider
                                        value={this.state.publication.rating.quantity}
                                        disabled={true}
                                        maximumValue={10}
                                        minimumValue={0}
                                        step={1}
                                        allowTouchTrack
                                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}

                                    />
                                </View>
                                <View>
                                    <Text>Price: </Text>
                                    <Slider
                                        value={this.state.publication.rating.price}
                                        disabled={true}
                                        maximumValue={10}
                                        minimumValue={0}
                                        step={1}
                                        allowTouchTrack
                                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}

                                    />
                                </View>
                                <Text>{this.state.publication.rating.description}</Text>
                                <KittenButton
                                    style={styles.button}
                                    status='success'
                                    onPress={() => {
                                        console.log(this.state.publication)
                                        this.setState({
                                            modalResume: false
                                        })
                                    }}
                                >
                                    Publish
                                </KittenButton>
                            </Card>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalView: {
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
        elevation: 5,
        width: '97%'
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


export default (Publication);
