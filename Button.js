import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

export default function Button({ mode, style, color, ...props }) {
  return (
    <PaperButton
      style={[styles.button, { backgroundColor: color }, style]}
      labelStyle={{
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 26,
        color: "black",
      }}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
});
