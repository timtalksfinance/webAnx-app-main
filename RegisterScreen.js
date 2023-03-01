import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUp = async () => {
    try {
      const auth = getAuth();
      const response = createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const data = await response;
      const userName = name.value;
      const userEmail = email.value;
      const db = getDatabase();
      set(ref(db, "users/" + data.user.uid), {
        name: userName,
        email: userEmail,
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("That email address is already in use!");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters!");
      } else {
        console.error(error);
      }
    }
  };

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    await onSignUp();
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        errorText={email.error}
      />
      <TextInput
        label="Password"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        color="yellow"
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.secondary,
          }}
        >
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
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
