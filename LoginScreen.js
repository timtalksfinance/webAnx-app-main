import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { app, auth, database } from "../firebaseConfig";

function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/arrow_back.png")}
      />
    </TouchableOpacity>
  );
}

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const loginUser = async () => {
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value);
      return true;
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        throw new Error("Invalid email or password");
      } else if (error.code === "auth/user-not-found") {
        throw new Error("User not found");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address");
      } else {
        throw error;
      }
    }
  };

  const handleLogin = () => route.params.setState(true);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const authUser = await loginUser();
    if (authUser) {
      handleLogin();
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back</Header>
      <TextInput
        label="Email"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        errorText={email.error}
        autoCompleteType="email"
      />
      <TextInput
        label="Password"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        errorText={password.error}
      />

      <Button mode="contained" onPress={onLoginPressed} color="yellow">
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: "lightgray",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10,
    backgroundColor: "yellow",
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
});
