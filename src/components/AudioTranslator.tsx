import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Frame, useFrameDevice } from '@brilliant/frame-react';

const AudioTranslator = () => {
  const [isListening, setIsListening] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const { device } = useFrameDevice();

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e) => {
      if (e.value) {
        setOriginalText(e.value[0]);
        translateText(e.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const translateText = async (text: string) => {
    try {
      // Initialize translation client (replace with your preferred translation service)
      const translation = await Frame.translate(text, {
        from: 'en',
        to: 'ko'
      });
      setTranslatedText(translation);
      
      // Display translation on Frame glasses
      await device.display({
        text: translation,
        position: 'center'
      });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Voice recognition error:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Voice recognition error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.label}>Original Text:</Text>
        <Text style={styles.text}>{originalText}</Text>
        
        <Text style={styles.label}>Korean Translation:</Text>
        <Text style={styles.text}>{translatedText}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
};

export default AudioTranslator;