import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { signUp } = authContext;

  return (
    <View>
      <Text>Sign Up Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Sign Up"
        onPress={() => signUp(email, password)}
      />
    </View>
  );
};

export default SignUpScreen;
