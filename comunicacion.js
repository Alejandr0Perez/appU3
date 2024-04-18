import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import Communications from 'react-native-communications';
import { MailComposer } from 'expo';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const sendSMS = () => {
    Communications.text(phoneNumber, 'Hola desde mi app de React Native');
  };

  const makeCall = () => {
    Communications.phonecall(phoneNumber, true);
  };

  const sendEmail = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      MailComposer.composeAsync({
        recipients: ['alejandroprz705@gmail.com'],
        subject: 'Correo de prueba',
        body: 'Hola,\n\nEste es un correo electrónico enviado desde mi aplicación de React Native.',
      });
    } else {
      Alert.alert('Permisos insuficientes', 'Se requieren permisos para enviar correos electrónicos.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Número de teléfono"
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Button title="Enviar SMS" onPress={sendSMS} />
      <Button title="Llamar" onPress={makeCall} />
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Correo electrónico"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button title="Enviar Correo Electrónico" onPress={sendEmail} />
    </View>
  );
}
