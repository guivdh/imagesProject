import * as React from "react";
import {StyleSheet} from "react-native";
import {getCountriesFromApi} from "../../services/Country.service";
import {getEstablishmentsAPI} from "../../services/Establishment.service";
import EstablishmentCreate from "./Components/EstablishmentCreate";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EstablishmentList from "./Components/EstablishmentList";

interface Props {
    navigation: any,
    route: any
}

interface States {
    displayAddEstModal: boolean,
    displaySelectCountryModal: boolean,
    countriesList: any[];
    establishmentList: any[];
    establishment: {
        name: string,
        description: string,
        image: string,
        address: string,
        country: string
    }
    selectedCountryLabel: string,
    loading: boolean,
    refreshing: boolean
}

class Establishment extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayAddEstModal: false,
            displaySelectCountryModal: false,
            countriesList: [],
            establishmentList: [],
            selectedCountryLabel: '',
            establishment: {
                name: '',
                description: '',
                image: '',
                address: '',
                country: ''
            },
            loading: false,
            refreshing: false
        }

        this.getCountries();
        this.getEstablishments();
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
                    establishmentList: json,
                    refreshing: false
                })
            })
    }

    render() {
        const EstablishmentStack = createNativeStackNavigator();

        return (
            <EstablishmentStack.Navigator>
                <EstablishmentStack.Screen name='List' component={EstablishmentList} />
                <EstablishmentStack.Screen name='EstablishmentCreate' component={EstablishmentCreate} />
            </EstablishmentStack.Navigator>
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

export default (Establishment);
