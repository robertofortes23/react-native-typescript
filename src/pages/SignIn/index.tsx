import React from 'react';
import {Button, View} from 'react-native';
import useAuth from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signed, signIn} = useAuth();

  console.log(signed);

  async function onSignIn() {
    await signIn();
  }

  return (
    <View>
      <Button title="Logar" onPress={onSignIn} />
    </View>
  );
};

export default SignIn;
