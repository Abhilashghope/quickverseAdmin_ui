import React from 'react';
import AppStack from './src/components/route/AppStack';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {' '}
      <AppStack />
    </NavigationContainer>
  );
}

export default App;
