// import EncryptedStorage from "react-native-encrypted-storage";

export function isArabic(string: string | undefined) {
  if (string) {
    const arabic = /[\u0600-\u06FF]/;
    return arabic.test(string);
  }
  return false;
}
export const getMonthformat = month => {
  return (month + 1).toString().padStart(2, '0'); // Convert to string and pad
};
