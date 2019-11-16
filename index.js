/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/** IGNORE YELLOW WARNINGS */
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
