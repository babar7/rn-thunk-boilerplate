import { AppRegistry, Platform } from 'react-native';
import 'react-native-gesture-handler';
import App from './App';

AppRegistry.registerComponent('viewedv2', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('viewedv2', { rootTag });
}
