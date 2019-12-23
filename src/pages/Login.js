import React, { useState } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  async function handleSubmit() {
    try {
      console.log(email);
      const response = await api.post('/sessions', {
        email,
      })

      const { _id } = response.data;
      console.log(response);

      await AsyncStorage.setItem('user', _id);
      await AsyncStorage.setItem('techs', techs);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          placeholder="Digite seu E-MAIL"
          style={styles.input}
          autoCapitalize="none"
          textContentType="emailAddress"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          placeholder="Suas tecnologias"
          style={styles.input}
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 44,
    color: '#444',
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 2,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#f05a5b',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingHorizontal: 30,
    alignSelf: 'stretch',
    marginHorizontal: 30
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});