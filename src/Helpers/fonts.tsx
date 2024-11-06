import { Platform } from 'react-native';

export const defaultFontFamily = 'tahoma';
export const boldFontFamily =
    Platform.OS === 'ios' ? 'Tahoma-Bold' : 'tahomabd';
