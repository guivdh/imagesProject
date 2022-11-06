import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Button, StyleSheet} from "react-native";
import {Icon} from '@rneui/themed';
import Home from "./Home/Home";
import Establishment from "./Establishment/Establishment";
import Profile from "./Profile/Profile";
import Publication from "./Publication/Publication";
import CreatePublication from "./CreatePublication/CreatePublication";

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

    render() {

        const MyTheme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                background:'#dcdcdc'
            },
        };

        return (
            <NavigationContainer theme={MyTheme}>
                <Tab.Navigator
                    sceneContainerStyle={styles.sceneContainer}
                    screenOptions={({route}) => ({
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            switch (route.name) {
                                case 'Home':
                                    iconName = focused
                                        ? 'home'
                                        : 'home-outline';
                                    return <Icon name={iconName} type='ionicon' color='#ffffff'/>
                                case 'Post':
                                    iconName = focused
                                        ? 'add-circle'
                                        : 'add-circle-outline';
                                    return <Icon size={50} iconStyle={styles.addPublicationIcon} name={iconName} type='ionicon'/>
                                case 'Publications':
                                    iconName = focused
                                        ? 'list'
                                        : 'list-outline';
                                    return <Icon name={iconName} type='ionicon' color='#ffffff'/>
                                case 'Establishment':
                                    iconName = focused
                                        ? 'restaurant'
                                        : 'restaurant-outline';
                                    return <Icon name={iconName} type='ionicon' color='#ffffff'/>
                                case 'Profile':
                                    iconName = focused
                                        ? 'person'
                                        : 'person-outline';
                                    return <Icon name={iconName} type='ionicon' color='#ffffff'/>
                            }

                        },
                        tabBarShowLabel: true,
                        tabBarActiveTintColor: '#ffffff',
                        tabBarInactiveTintColor: '#ffffff',
                        tabBarLabelStyle: styles.navBarLabel,
                        tabBarStyle: styles.navBar,
                    })}
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Publications" component={Publication}/>
                    <Tab.Screen name="Post" component={CreatePublication} />
                    <Tab.Screen name="Establishment" component={(Establishment)}/>
                    <Tab.Screen name="Profile" component={Profile} />
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
        backgroundColor: '#344955',
    },
    navBarLabel: {
        fontSize: 14,
        paddingBottom: 10
    },
    headerBar: {
        backgroundColor: '#01001c',
    },
    addPublicationIcon: {
        color: '#ffffff',
    },
    headerContainer: {
        height: 80,
        backgroundColor: '#3d0101',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        headerTitle: {
            color: 'white',
            marginTop: 20
        }
    },
    sceneContainer: {
        backgroundColor: '#5b5b5b'
    }
});

export default (Core);
