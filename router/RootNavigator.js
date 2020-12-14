import * as  React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerNavigator from './Drawer/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';


/*
* Navigation diagram:
* https://drive.google.com/file/d/1b1H_1OsDRW0BPlf-I0Sbv7yoGZ3bNwO8/view?usp=sharing
*
* Root of navigation.
* In defoult contains only DrawerNavigator.
* It's a good place for modal which can be show up from many places in app.
* */

const RootNavigator = createStackNavigator(
    {
        Drawer: {screen: DrawerNavigator},
    }, {
        defaultNavigationOptions: {
            headerShown: false,
        }
    });

export default RootNavigator
