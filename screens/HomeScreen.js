import React, { Component } from 'react'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import nav_style from '../components/nav_style';
import ApiKeys from '../ApiKeys'
import * as os from 'os';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableHighlight,
    Modal,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    ImageBackground,
    ViewPagerAndroid
} from 'react-native';
import { freemem } from 'os';
import NavigationBtn from '../components/NavigationBtn';
import styles from '../components/styles';
import { Icon } from 'react-native-elements';


require("firebase/database");

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            message: ' ',
            weekDays: {},
            iterator: 1
        };
    }
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const messRef = rootRef.child('message');
        const weekDaysRef = rootRef.child('weekDays');

        weekDaysRef.once('value', snap => {
            let newStateWeekDays = [];
            snap.forEach(child => {     //child - dzien tyg
                let events = child.val();
                let weekDay = child.key
                let newEvent = {}
                Object.keys(events).map((key) => {
                    let event = events[key]
                    newEvent[key] = event
                })

                let lastState = this.state.weekDays

                lastState[weekDay] = newEvent
                let newState = lastState
                this.setState({
                    weekDays: newState
                })
            })
        })



        messRef.on('value', snap => {
            this.setState({
                message: snap.val()
            });
        });



    }

    render() {
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        var pageViews = [];

        let days = 5;
        pageViews.push(<Text>{days}</Text>);

        for (let i = 0; i <= days; i++) {
            pageViews.push(
                    <Text> {this.state.weekDays[i]} </Text>
            );
        }

            // (Object.keys(this.state.weekDays).map((dayNameKey) => {
            //     let dayEvents = this.state.weekDays[dayNameKey];
            //     pageViews.push(<Text style={{ backgroundColor: 'pink' }}> BBB </Text>)
            //     // return (

            //     //     // <View style={{flex: 1}} >
            //     //     // {/* {this.setState({
            //     //     //     iterator: this.state.iterator + 1
            //     //     // })} */}


            //     //     // <View>
            //     //         <Text> BBB </Text>
            //     //     // </View>


            //     //     // </View>
            //     // )
            // }))

            return (
                <View >

                    <View style={{ top: 480, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', }}>

                        <View style={nav_style.HomeBtn}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon
                                    name='home'
                                    type='octicon'
                                    color='pink'
                                    size={36} />
                                <Text style={{ fontSize: 10, color: 'pink', textAlign: 'center' }} >Home</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={nav_style.HomeBtn}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Map')} >
                                <Icon
                                    name='marker'
                                    type='foundation'
                                    color='#1D3557'
                                    size={36} />
                                <Text style={{ fontSize: 10, textAlign: 'center' }}>Map</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={nav_style.HomeBtn}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Timetable')}>
                                <Icon
                                    name='calendar'
                                    type='octicon'
                                    color='#1D3557'
                                    size={36} />
                                <Text style={{ fontSize: 10, textAlign: 'center' }}>Timetable</Text>
                            </TouchableOpacity>
                        </View>


                    </View>



                    <View style={styles.notificationContainer}>
                        <View style={styles.notification}>
                            <Text style={styles.text}> Notifications </Text>
                        </View>
                        <Text style={styles.notificationsText}> {this.state.message} </Text>
                    </View>

                    {/* <ScrollView > */}
                    <View
                        style={styles.notificationContainer}>
                        <ViewPagerAndroid
                            style={{ flex: 1 }}
                            initialPage={0}>

                            <View>
                                <Text> AAAAAAAAAAAAAAAA </Text>
                            </View>
                            <View >
                                <Text> AAAAAAAAAAAAAAAA </Text>
                            </View>

                            {pageViews}




                        </ViewPagerAndroid>
                    </View>
                    {pageViews}
                    {/* </ScrollView>  */}


                    {/* <View style={styles.greyMedium_Container}>
                    <Text style={styles.eventText}> LECTURES </Text>
                    <Text style={styles.timeText}> 10:00 AM </Text>
                    <Text style={styles.placeText}> CZIiTT PW 4.05 </Text>
                </View>
                <View style={styles.greyMedium_Container}>
                    <Text style={styles.eventText}> COFFEE BREAK </Text>
                    <Text style={styles.timeText}> 12:30 AM </Text>
                    <Text style={styles.placeText}> CZIiTT PW 4.05 </Text>
                </View> */}






                </View>
            )

        }
    }

    export default HomeScreen;