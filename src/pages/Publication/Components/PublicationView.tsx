import * as React from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, ToastAndroid, Vibration, View} from "react-native";
import {getOnePublicationAPI} from "../../../services/Publication.service";
import {REACT_APP_API_URL} from "@env";
import {Divider, Icon, Slider} from "@rneui/base";
import {Card} from "@rneui/themed";
import {likeAPI} from "../../../services/Like.service";
import {TextInput} from "@react-native-material/core";
import {addCommentAPI, getCommentsByPublicationAPI} from "../../../services/Comment.service";

interface Props {
    navigation: any,
    route: any
}

interface States {
    currentPublication: any;
    loading: boolean;
    showRate: boolean;
    isLike: boolean;
    addCommentView: boolean;
    addCommentValue: string;
    commentCreated: boolean;
    comments: any[];
}

class PublicationView extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentPublication: null,
            loading: false,
            showRate: false,
            isLike: false,
            addCommentView: false,
            addCommentValue: '',
            commentCreated: false,
            comments: []
        }

        const {pubId} = this.props.route.params;
        this.getPublicationById(pubId);
        this.getCommentsByPublicationId(pubId);

        this.props.navigation.addListener('focus', () => {
            this.setState({
                loading: true
            }, () => {
                this.getPublicationById(pubId);
                this.getCommentsByPublicationId(pubId);
            })
        })
    }

    async getPublicationById(id: string) {
        return getOnePublicationAPI(id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    currentPublication: json,
                    loading: false,
                    isLike: json.isLike
                });
            })
    }

    async getCommentsByPublicationId(publicationId: string) {
        return getCommentsByPublicationAPI(publicationId)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    comments: json
                });
            })
    }

    render() {
        const {pubId} = this.props.route.params;

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

        const slider = (value: number, icon: string, iconFamily = 'ionicon') => {
            return (
                <View>
                    <Slider
                        style={styles.sliderContainer}
                        value={value}
                        maximumValue={10}
                        minimumValue={1}
                        step={1}
                        animationType='timing'
                        disabled
                        trackStyle={{height: 5, backgroundColor: 'transparent'}}
                        thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                        thumbProps={{
                            children: (
                                <Icon
                                    name={icon}
                                    type={iconFamily}
                                    size={20}
                                    reverse
                                    containerStyle={{bottom: 20, right: 20}}
                                    color={color(value)}
                                />
                            ),
                        }}
                    />
                </View>
            )
        }

        const commentCreatedSuccess = () => {
            ToastAndroid.show("Comment successfully added", ToastAndroid.SHORT);
        };

        return (
            <ScrollView>
                {
                    this.state.currentPublication &&
                    <View>
                        <View style={styles.dishImageContainer}>
                            <Text style={styles.dishImageContainertitle}>{this.state.currentPublication.dishName}</Text>
                            <Image source={{uri: REACT_APP_API_URL + '/' + this.state.currentPublication?.image.path}} style={styles.dishImage}/>
                            <Divider style={{margin: 10}}/>
                            <View style={{display: 'flex', padding: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon
                                    name='comment-plus-outline'
                                    type='material-community'
                                    size={30}
                                    style={{marginRight: 20}}
                                    onPress={() => this.setState({addCommentView: !this.state.addCommentView})}
                                />
                                <Icon
                                    name={this.state.isLike ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    size={30}
                                    color={this.state.isLike ? 'red' : 'black'}
                                    onPress={() => {
                                        Vibration.vibrate(10)
                                        likeAPI(pubId)
                                            .then((res) => res.json())
                                            .then(json => {
                                                if (!json) {
                                                    this.setState({isLike: false})
                                                } else if (json) {
                                                    this.setState({isLike: true})
                                                }
                                            })
                                    }
                                    }
                                />
                            </View>
                            <View style={{...styles.addCommentContainer, display: this.state.addCommentView ? 'flex' : 'none'}}>
                                <TextInput
                                    value={this.state.addCommentValue}
                                    onChangeText={v => this.setState({addCommentValue: v})}
                                    trailing={props => (
                                        <Icon
                                            name='send'
                                            type='font-awesome'
                                            size={20}
                                            onPress={() => {
                                                if (this.state.addCommentValue) {
                                                    addCommentAPI(pubId, this.state.addCommentValue)
                                                        .then((res) => res.json())
                                                        .then(json => {
                                                            this.setState({
                                                                commentCreated: true,
                                                                addCommentView: false,
                                                                addCommentValue: ''
                                                            }, () => {
                                                                this.getCommentsByPublicationId(pubId);
                                                                commentCreatedSuccess();
                                                            })
                                                        });
                                                }
                                            }}
                                        />
                                    )}
                                    trailingContainerStyle={{width: 50}}
                                    variant="outlined"
                                    label="Comment"
                                    style={{margin: 16}}/>
                            </View>
                            <View>
                                {
                                    this.state.comments.map((comment, i) => (
                                        <View key={i} style={{display: 'flex', flexDirection: 'row', marginLeft: 5}}>
                                            <Text style={{fontWeight: 'bold'}}>{comment.user.pseudo}</Text>
                                            <Text> : {comment.comment}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title onPress={() => {
                                    this.setState({showRate: !this.state.showRate})
                                }}>
                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                        <Text>Show rating</Text>
                                        <Icon name='expand-more' type='material' size={20}/>
                                    </View>
                                </Card.Title>
                                {
                                    this.state.showRate &&
                                    <View style={styles.sliderContainer}>
                                        {slider(parseInt(this.state.currentPublication.taste), 'fast-food')}
                                        {slider(parseInt(this.state.currentPublication.presentation), 'silverware-fork-knife', 'material-community')}
                                        {slider(parseInt(this.state.currentPublication.quantity), 'weight', 'font-awesome-5')}
                                        {slider(parseInt(this.state.currentPublication.price), 'money', 'font-awesome')}
                                        <Card containerStyle={{borderRadius: 10}}>
                                            <Card.Title>{this.state.currentPublication.establishment.name}</Card.Title>
                                            <Card.Divider/>
                                            <View style={{display: 'flex', alignItems: 'center'}}>
                                                <Card.Image
                                                    style={{padding: 0, width: 200}}
                                                    source={{
                                                        uri: REACT_APP_API_URL + '/' + this.state.currentPublication.establishment.image.path,
                                                    }}
                                                />
                                                <Text style={{margin: 10}}>
                                                    {this.state.currentPublication.establishment.description}
                                                </Text>
                                            </View>
                                        </Card>
                                    </View>
                                }
                            </Card>
                        </View>
                    </View>
                }
                {
                    !this.state.currentPublication &&
                    <ActivityIndicator size="large"/>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    dishImageContainer: {
        backgroundColor: 'white',
    },
    dishImageContainertitle: {
        textAlign: 'center',
        fontSize: 30
    },
    dishImage: {
        aspectRatio: 3 / 2,
    },
    cardContainer: {
        borderRadius: 10,
        flex: 1,
        marginBottom: 10,
    },
    sliderContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    addCommentContainer: {}
})

export default (PublicationView);
