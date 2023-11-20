import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  NativeModules,
  Dimensions,
  Image,
} from "react-native";

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const array = [
  { id: 1, textValue: "Bardzo ważne zadanie", background: "#EF476F" },
  { id: 2, textValue: "Self care zadanie", background: "#D7A3FF" },
  { id: 3, textValue: "Cykliczne zadanie", background: "#06D6A0" },
  { id: 4, textValue: "Mało ważne zadanie", background: "#118AB2" },
  { id: 5, textValue: "Jakieś zadanie", background: "#FFD166" },
  { id: 6, textValue: "Mało ważne zadanie", background: "#118AB2" },
  { id: 7, textValue: "Jakieś zadanie", background: "#FFD166" },
  { id: 8, textValue: "Bardzo ważne zadanie", background: "#EF476F" },
  { id: 9, textValue: "Self care zadanie", background: "#EF476F" },
  { id: 10, textValue: "Cykliczne zadanie", background: "#EF476F" },
  { id: 11, textValue: "Mało ważne zadanie", background: "#EF476F" },
  { id: 12, textValue: "Jakieś zadanie", background: "#118AB2" },
  { id: 13, textValue: "Mało ważne zadanie", background: "#118AB2" },
  { id: 14, textValue: "Jakieś zadanie", background: "#118AB2" },
];

export default function App() {
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          height: screenHeight,
          top: STATUSBAR_HEIGHT,
          backgroundColor: "#2B2E4A",
          display: "flex",
          flexDirection: "column",
        }}
        contentContainerStyle={{ paddingBottom: 100, alignItems: "center" }}
      >
        {array.map((i) => (
          <Panel objectProperties={i} key={i.id} />
        ))}
      </ScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: 100,
          height: 65,
          borderRadius: 25,
          backgroundColor: "#36373E",
          right: 0,
          bottom: 0,
        }}
      >
        <Image
          source={require("./plus.png")}
          style={{ width: 48, height: 48 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  panelRow: {
    flexDirection: "row",
    width: "90%",
  },

  article: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
  },
});

function Panel({ objectProperties }) {
  const { textValue, background } = objectProperties;
  return (
    <View
      style={{
        backgroundColor: background,
        height: screenHeight / 10,
        borderRadius: 15,
        width: "98%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.panelRow}>
        <View style={styles.article}>
          <Text>{textValue}</Text>
          <Text>Time</Text>
        </View>
      </View>
    </View>
  );
}
