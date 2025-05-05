import React from 'react';
import AppStack from './src/components/route/AppStack';
import {NavigationContainer} from '@react-navigation/native';
import {Router} from './src/components/route/Route';
import {AuthProvider} from './src/contexts/Login/AuthProvider';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
