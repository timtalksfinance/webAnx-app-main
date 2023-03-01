import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import StartScreen from "./screens/StartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SettingScreen from "./screens/SettingScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <View style={styles.container}>
      <NavigationContainer theme={DarkTheme}>
        {authenticated ? (
          <>
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: "yellow", // set the active tab color
                inactiveTintColor: "gray", // set the inactive tab color
              }}
            >
              <Tab.Screen
                name="webAnx"
                component={ChatScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="chatbubbles-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Setting"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="settings-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              >
                {(props) => (
                  <SettingScreen
                    {...props}
                    setAuthenticated={setAuthenticated}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </>
        ) : (
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              initialParams={{ setState: setAuthenticated }}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
