import { AsyncStorage } from 'react-native';

export const getSubscription = async () => {
  const responseSubscription = await AsyncStorage.getItem('subscription');
  const subscription = JSON.parse(responseSubscription) || 0;
  return subscription;
};

export const setSubscription = async subscription => {
  await AsyncStorage.setItem('subscription', JSON.stringify(subscription));
};
