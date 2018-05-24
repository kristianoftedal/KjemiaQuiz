import { AsyncStorage } from 'react-native';

export const getReceipt = async () => {
  const responseSubscription = await AsyncStorage.getItem('receipt1');
  if (responseSubscription) {
    return JSON.parse(responseSubscription);
  }
  return '';
};

export const setReceipt = async receipt => {
  if (receipt)
  await AsyncStorage.setItem('receipt1', JSON.stringify(receipt));
};
