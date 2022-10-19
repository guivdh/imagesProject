import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Button, StyleSheet, Text} from "react-native";
import Home from "./Home";
import Publication from "./Publication";
import Establishment from "./Establishment";
import Profile from "./Profile";
import {Ionicons} from "@expo/vector-icons";
import PublicationList from "./Publication-list";
import { Icon } from '@rneui/themed';
import {white} from "react-native-paper/lib/typescript/styles/colors";
import MyTabBar from "../components/MyTabBar";
import { getHeaderTitle } from '@react-navigation/elements';

interface Props {
    name: string;
    baseEnthusiasmLevel?: number;
}

interface States {
    name: string;
}

const Tab = createBottomTabNavigator();

class Core extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    myTabBar(){
        return (
            <Button
                title="Go somewhere"
                onPress={() => {

                }}
            />
        );
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            switch (route.name) {
                                case 'Home':
                                    iconName = focused
                                        ? 'home'
                                        : 'home-outline';
                                    return <Icon name={iconName} type='ionicon' color='#000000' />
                                case 'Publication':
                                    iconName = focused
                                        ? 'add-circle'
                                        : 'add-circle-outline';
                                    return <Icon size={50} iconStyle={styles.addPublicationIcon} name={iconName} type='ionicon' />
                                case 'Publication-list':
                                    iconName = focused
                                        ? 'list'
                                        : 'list-outline';
                                    return <Icon name={iconName} type='ionicon' color='#000000' />
                                case 'Establishment':
                                    iconName = focused
                                        ? 'restaurant'
                                        : 'restaurant-outline';
                                    return <Icon name={iconName} type='ionicon' color='#000000' />
                                case 'Profile':
                                    iconName = focused
                                        ? 'person'
                                        : 'person-outline';
                                    return <Icon name={iconName} type='ionicon' color='#000000' />
                            }

                        },
                        tabBarShowLabel: true,
                        tabBarActiveTintColor: '#ffffff',
                        tabBarInactiveTintColor: '#000000',
                        tabBarLabelStyle: styles.navBarLabel,
                        tabBarStyle: styles.navBar,
                        headerStyle: styles.headerBar,
                        headerShadowVisible: true
                    })}
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Publication-list" component={PublicationList}/>
                    <Tab.Screen name="Publication" component={Publication}/>
                    <Tab.Screen name="Establishment" component={Establishment}/>
                    <Tab.Screen name="Profile" component={Profile}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16
    },
    navBar: {
        height: 75,
        backgroundColor: '#8bacff',
    },
    navBarLabel: {
        fontSize: 14,
        paddingBottom: 10
    },
    headerBar: {
        backgroundColor: '#8bacff',
    },
    addPublicationIcon: {
        color: '#ffffff',
    },
});

export default (Core);
