import React from "react";
import { View, StyleSheet, Text, TextInput as Input } from "react-native";
import { theme } from "../core/theme";

export default function TextInput({
  errorText,
  description,
  label,
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder={label}
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={label === "Password" ? true : false}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.background,
    color: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Add border width
    borderColor: "gray", // Add border color
  },
  description: {
    fontSize: 13,
    color: "white",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
