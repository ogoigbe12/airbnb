import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Constants from "expo-constants";
import Colors from '../constants/Colors';

interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    // top: 5,
    // flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});

export default Screen;