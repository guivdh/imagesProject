import * as React from "react";
import {Button, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {getEstablishmentsAPI} from "../../../services/Establishment.service";
import {Avatar, ListItem} from "@react-native-material/core";
import {REACT_APP_API_URL} from "@env";

interface Props {
    navigation: any,
    route: any,
}

interface States {
    loading: boolean;
    refreshing: boolean;
    establishmentList: any[];
}

class EstablishmentList extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            establishmentList: []
        }

        this.getEstablishments();

        this.props.navigation.addListener('focus', () => {
            this.setState({
                refreshing: true
            }, () => {
                this.getEstablishments();
            })
        })
    }

    private async getEstablishments() {
        return getEstablishmentsAPI()
            .then(res => res.json())
            .then(json => {
                this.setState({
                    establishmentList: json,
                    refreshing: false
                })
            })
    }

    render() {

        let estList = (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({
                                refreshing: true
                            });
                            this.getEstablishments();
                        }}
                    />
                }
            >
                {
                    this.state.establishmentList.map((el, i) => {
                        return (
                            <ListItem
                                key={i}
                                title={el.name}
                                onPress={() => {
                                    this.props.navigation.push('EstablishmentView', {establishmentId: el.id})
                                }}
                                leading={
                                    <Avatar
                                        image={{uri: REACT_APP_API_URL + '/' + el.image.path}}
                                        size={32}
                                    />
                                }/>
                        )
                    })
                }
            </ScrollView>
        )

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Button title='Add new establishment' onPress={() => {
                        this.props.navigation.push('EstablishmentCreate')
                        //this.props.navigation.navigate('Establishment', {create: true})
                    }}
                    />
                    {estList}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1
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
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default (EstablishmentList);
