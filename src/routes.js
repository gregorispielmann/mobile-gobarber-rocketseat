import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

/** SIGN */
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

/** DASHBOARD */
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

/** NEW APPOINTMENT */
import Confirm from './pages/New/Confirm';
import SelectDateTime from './pages/New/SelectDateTime';
import SelectProvider from './pages/New/SelectProvider';
import {createStackNavigator} from 'react-navigation-stack';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            New: {
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: ({tintColor}) => (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color={tintColor}></Icon>
                ),
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
