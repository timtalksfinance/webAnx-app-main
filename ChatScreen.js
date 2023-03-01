import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PressButton from "../components/PressButton";
import { generateContentByGPT } from "../utils/api";

function ChatScreen() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const currentModel = "text-davinci-003";

  async function generateContent() {
    setModalVisible(true);
    setLoading(true);
    console.log(prompt);
    const data = await generateContentByGPT(prompt, currentModel);
    console.log(data);
    setContent(data);
    setLoading(false);
  }

  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/logowebanx.png")}
        style={styles.image}
      />
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={25} color={"blue"} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          onChangeText={(text) => setPrompt(text)}
          value={prompt}
        />
      </View>
      <PressButton
        onPress={generateContent}
        title="Search"
        color="yellow"
        textColor="black"
        marginTop={10}
      />
      {content && (
        <PressButton
          onPress={() => setModalVisible(true)}
          title="Check Recent Answer"
          color="white"
          textColor="black"
          marginTop={10}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 10,
                  }}
                >
                  Generating...
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.qText}>Q: {prompt}</Text>
                <Text style={styles.genText}> {content}</Text>
              </>
            )}
            <View style={styles.closeButton}>
              <PressButton
                onPress={() => setModalVisible(false)}
                title="Close"
                color="red"
                textColor="white"
                marginTop={5}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 350,
    height: 120,
    marginBottom: 8,
  },
  searchBar: {
    width: "90%",
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 5,
    borderRadius: 15,
    alignItems: "center",
  },
  logo: {
    height: 24,
    width: 24,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "white",
    marginLeft: 10,
    color: "black",
    outlineStyle: "none",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 0,
    marginBottom: 0,
  },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: "auto",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  genText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginTop: -20,
  },
  qText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    color: "yellow",
  },
});
