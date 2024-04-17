import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
} from 'react-native';
import * as SMS from 'expo-sms';
import * as Mail from 'expo-mail-composer';
import Communications from 'react-native-communications';
import * as PhoneNumber from 'expo-phone-number';

export default class CommunicationView extends React.Component {
  state = {
    phoneNumber: '',
    message: '',
    emailRecipient: '',
    emailSubject: '',
    emailBody: '',
  };

  handleSendSMS = async () => {
    const { phoneNumber, message } = this.state;

    if (Platform.OS === 'android') {
      SMS.sendSMSAsync([phoneNumber], message)
        .then(() => {
          Alert.alert('SMS sent successfully');
        })
        .catch((error) => {
          Alert.alert(`Error sending SMS: ${error}`);
        });
    } else {
      Communications.text(phoneNumber, message);
      Alert.alert('SMS sent successfully');
    }
  };

  handleSendEmail = () => {
    const { emailRecipient, emailSubject, emailBody } = this.state;

    Mail.composeAsync({
      recipients: [emailRecipient],
      subject: emailSubject,
      body: emailBody,
    })
      .then(() => {
        Alert.alert('Email sent successfully');
      })
      .catch((error) => {
        Alert.alert(`Error sending email: ${error}`);
      });
  };

  handleMakeCall = async () => {
    const { phoneNumber } = this.state;

    try {
      await PhoneNumber.getPhoneNumberAsync('1234567890');
      if (Platform.OS === 'android') {
        Communications.phonecall(phoneNumber, true);
      } else {
        Linking.openURL(`tel:${phoneNumber}`);
      }
    } catch (error) {
      Alert.alert(`Error making call: ${error}`);
    }
  };

  render() {
    return (
      <View>
        <Text>Send SMS</Text>
        <TextInput
          value={this.state.phoneNumber}
          onChangeText={(phoneNumber) =>
            this.setState({ phoneNumber })
          }
          placeholder="Enter phone number"
        />
        <TextInput
          value={this.state.message}
          onChangeText={(message) => this.setState({ message })}
          placeholder="Enter message"
        />
        <Button title="Send SMS" onPress={this.handleSendSMS} />

        <Text>Send Email</Text>
        <TextInput
          value={this.state.emailRecipient}
          onChangeText={(emailRecipient) =>
            this.setState({ emailRecipient })
          }
          placeholder="Enter email recipient"
        />
        <TextInput
          value={this.state.emailSubject}
          onChangeText={(emailSubject) =>
            this.setState({ emailSubject })
          }
          placeholder="Enter email subject"
        />
        <TextInput
          value={this.state.emailBody}
          onChangeText={(emailBody) => this.setState({ emailBody })}
          placeholder="Enter email body"
        />
        <Button title="Send Email" onPress={this.handleSendEmail} />

        <Text>Make Call</Text>
        <TextInput
          value={this.state.phoneNumber}
          onChangeText={(phoneNumber) =>
            this.setState({ phoneNumber })
          }
          placeholder="Enter phone number"
        />
        <Button title="Make Call" onPress={this.handleMakeCall} />
      </View>
    );
  }
}