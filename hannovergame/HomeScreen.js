// import React from 'react';
// import {StatusBar, View} from 'react-native';
// import PostersList from "../components/Abstracts/PostersList";

// const HomeScreen = props => {
//     return (
//         <View>
//             <StatusBar barStyle="light-content"/>
//             <View>
//                 <PostersList navigation={props.navigation}/>
//             </View>
//         </View>
//     )
// };

// export default HomeScreen;

import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window');

class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', fontLoaded: false};
    };

    async componentDidMount() {
        await Font.loadAsync({
            'tw-cen-met': require('C:/Users/Simone/Documents/HiIGSM/node_modules/native-base/Fonts/FontAwesome.ttf'),
        });
        this.setState({fontLoaded: true})
    }


    render() {

        //Anmeldebedingungen: Benutzername - mindestens 3 Zeichen,
        //Sie müssen immer noch anders nach der deaktivierten Schaltfläche und den Meldungen suchen, dass das Kennwort falsch ist
         const {username, password} = this.state;
        const isEnabled =
            username.length > 3 &&
            (password === "syrenka9102" ||
                password === "bazyliszek345" ||
                password === "warszawa654" ||
                password === "vodka" ||
                password === "geoida" ||
                password === "mermaid" ||
                password === "654123");

        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
                <ImageBackground source={require('./../assets/images/Places/party.jpg')}
                                 blurRadius={0.7}
                                 style={styles.background}>
                    <View style={styles.container}>
                        {/* <Image style={styles.logo} source={require('./../assets/Logo.png')} /> */}
                        <Image style={styles.chest} source={require('./../assets/images/Places/city_game.jpg')}/>
                        {
                            this.state.fontLoaded ? (
                                <Text style={styles.title}>Treasure Hunters</Text>
                            ) : null
                        }
                    </View>
                    <View style={{alignItems: "center"}}>

                        {/* Login*/}

                        {this.state.fontLoaded ? (
                            <TextInput style={styles.textInput}        
                                       placeholder="Name of your team"
                                       placeholderTextColor="#A4A6A6"
                                       returnKeyType="next"
                                       keyboardType="email-address"
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       ref={(input) => this.UsernameInput = input}
                                       onChangeText={(username) => this.setState({username})}
                                       onSubmitEditing={() => this.passwordInput.focus()}
                            />) : null}

                        {/* Password*/}
                        {this.state.fontLoaded ? (
                            <TextInput style={styles.textInput}
                                       secureTextEntry
                                       placeholder="Password"
                                       //placeholderTextColor="#A4A6A6"
                                       ref={(input) => this.passwordInput = input}
                                       onChangeText={(password) => this.setState({password})}
                            />
                        ) : null}

                        {/* Start button*/}

                        <TouchableOpacity
                            disabled={!isEnabled}
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Introduction', {teamName: this.state.username})}
                        >
                            {this.state.fontLoaded ? (
                                <Text style={styles.textButton}> LOG IN </Text>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height + 100
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height + 100
    },

    logo: {
        alignSelf: 'flex-start',
        height: 45,
        width: 89,
        marginBottom: 50,
        marginLeft: 20,
    },

    button: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        //backgroundColor:'#dfbf9f',
        backgroundColor: '#57A7B3',
        borderRadius: 25,
        height: 55,
        width: width * 0.8,
        justifyContent: 'center',
    },

    textButton: {
        fontFamily: 'tw-cen-met',
        fontSize: 25,
        color: "white"
    },

    textInput: {
        height: 50,
        fontSize: 20,
        fontFamily: 'tw-cen-met',
        borderWidth: 2,
        borderColor: '#edeff2',
        backgroundColor: '#edeff2',
        borderRadius: 6,
        width: width * 0.8,
        marginBottom: 10,
        textAlign: 'center',
    },

    title: {
        fontSize: height / 15,
        color: "rgba(20, 51, 56, 1.0)",
        fontFamily: 'tw-cen-met',
        textShadowColor: "white",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
    },

    chest: {
        height: 170,
        width: 170,
    }
});