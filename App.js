import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import { store, persistor } from '~/store';
import Index from '~/';

YellowBox.ignoreWarnings([
  'Warning: forwardRef render functions do not support propTypes or defaultProps.',
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
        <Index />
      </PersistGate>
    </Provider>
  );
}
