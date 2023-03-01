import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
        color="yellow"
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
        color="white"
      >
        Sign Up
      </Button>
    </Background>
  );
}
