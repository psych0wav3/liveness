import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: '700',
    fontSize: RFValue(24),
    lineHeight: RFValue(33.6),
    color: '#121212',
    maxWidth: '70%',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
    color: '#2d2d2d',
  },
  header: {
    width: '100%',
    height: RFPercentage(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    backgroundColor: 'white',
  },
  button: {
    width: '95%',
    height: RFPercentage(9),
    backgroundColor: '#FF4F0E',
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
    color: 'white',
  },
  contentWrapper: {
    alignItems: 'flex-start',
  },
});
