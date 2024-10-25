import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { FrameProvider } from '@brilliant/frame-react';
import AudioTranslator from './components/AudioTranslator';

const App = () => {
  return (
    <FrameProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <AudioTranslator />
      </SafeAreaView>
    </FrameProvider>
  );
};

export default App;