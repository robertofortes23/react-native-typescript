import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {ActivityIndicator, View} from 'react-native';
import useAuth from '../contexts/auth';

const Routes: React.FC = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
