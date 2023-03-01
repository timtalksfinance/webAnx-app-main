import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PressButton from "../components/PressButton";

function SettingScreen({ setAuthenticated }) {
  return (
    <View style={styles.screen}>
      <PressButton
        onPress={() => setAuthenticated(false)}
        title="Log Out"
        color="red"
        textColor="white"
        marginTop={5}
      />
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff", // white text
    fontSize: 24,
  },
});
