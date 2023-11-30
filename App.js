import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  NativeModules,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const screenHeight = Dimensions.get("window").height;

export default function App() {
  const TODAY = new Date().setDate(new Date().getDate() - 1);

  const [textValue, setTextValue] = useState("");
  const [listOfTasks, setListOfTasks] = useState(true);
  const [openTask, setOpenTask] = useState(false);
  const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [colorOfNewTask, setColorOfNewTask] = useState("#EF476F");
  const [addEventDisabled, setAddEventDisabled] = useState(true);
  const [tasks, setTasks] = useState([]);
  function addNewEvent() {
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        textValue: textValue,
        dateValue: dateValue,
        background: colorOfNewTask,
      },
    ]);
    endChangingDate();
  }
  function changingDate() {
    setOpenTask(true);
    setListOfTasks(false);
  }
  function endChangingDate() {
    setOpenTask(false);
    setListOfTasks(true);
    setColorOfNewTask("#EF476F");
    setTextValue("");
    setDateValue(dayjs(new Date()));
    setAddEventDisabled(true);
  }
  function changeTaskColor(color) {
    setColorOfNewTask(color);
  }
  function changeText(text) {
    setTextValue(text);
    text.length === 0 ? setAddEventDisabled(true) : setAddEventDisabled(false);
  }

  return (
    <>
      {openTask &&
        ChooseDatePanel({
          textValue,
          changeText,
          dateValue,
          setDateValue,
          TODAY,
          endChangingDate,
          changeTaskColor,
          colorOfNewTask,
          addEventDisabled,
          addNewEvent,
        })}
      {listOfTasks && (
        <ScrollView
          style={{
            flex: 1,
            padding: 10,
            height: screenHeight,
            top: STATUSBAR_HEIGHT,
            backgroundColor: "#345B6F",
            display: "flex",
            flexDirection: "column",
          }}
          contentContainerStyle={{ paddingBottom: 100, alignItems: "center" }}
        >
          {tasks.map((i) => (
            <Panel objectProperties={i} tasks={tasks} key={i.id} />
          ))}
          <AddPanel
            changingDate={changingDate}
            changeTaskColor={changeTaskColor}
          />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  panelRow: {
    width: "90%",
  },
  dateRow: {
    flexDirection: "row",
    width: "100%",
    top: 10,
    height: "30%",
    justifyContent: "space-between",
    alignContent: "center",
  },

  article: {
    justifyContent: "center",
    alignItems: "left",
    height: "60%",
  },
  button: {
    backgroundColor: "#FFDAB9",
    width: "98%",
    height: "auto",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});

function Panel({ objectProperties, tasks }) {
  const { textValue, dateValue, background } = objectProperties;
  const { $D, $M, $y: $Y, $H, $m: $Min } = dateValue;
  console.log($Min.length);

  return (
    <View
      style={{
        backgroundColor: background,
        height: screenHeight / 8,
        borderRadius: 15,
        width: "98%",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.panelRow}>
        <View style={styles.dateRow}>
          <Text style={styles.item}>{`${$H}:${
            $Min < 10 ? `0${$Min}` : $Min
          }`}</Text>
          <Text style={styles.item}>{`${$D}-${$M}-${$Y}`}</Text>
        </View>
        <View style={styles.article}>
          <Text
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {textValue}
          </Text>
        </View>
      </View>
    </View>
  );
}
function AddPanel({ changingDate }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => changingDate()}>
      <Text
        style={{
          textTransform: "uppercase",
          color: "black",
          fontWeight: 800,
        }}
      >
        Add new task
      </Text>
    </TouchableOpacity>
  );
}

function ChooseDatePanel({
  textValue,
  dateValue,
  setDateValue,
  changeText,
  TODAY,
  endChangingDate,
  changeTaskColor,
  colorOfNewTask,
  addEventDisabled,
  addNewEvent,
}) {
  const styles = StyleSheet.create({
    colorPickerRow: {
      flexDirection: "row",
      flex: 0.1,
      marginTop: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    colorPickerItem: {
      textAlign: "center",
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: "white",
      width: "15%",
      height: "100%",
      borderRadius: 90,
    },
    textColorOfTask: {
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: 10,
      color: "white",
      fontSize: 15,
    },
    colorBorder: {
      borderWidth: 2,
      borderColor: "black",
      borderStyle: "solid",
    },
    color_red: {
      backgroundColor: "#EF476F",
    },
    color_purple: {
      backgroundColor: "#D7A3FF",
    },
    color_green: {
      backgroundColor: "#06D6A0",
    },
    color_blue: {
      backgroundColor: "#118AB2",
    },
    color_yellow: {
      backgroundColor: "#FFD166",
    },
    buttonStyle: {
      backgroundColor: "#FFDAB9",
      flex: 0.1,
      left: "20%",
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 30,
      marginTop: 5,
    },
    smallOppacity: {
      opacity: 0.3,
    },
    inputField: {
      backgroundColor: "#FFDAB9",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      left: "10%",
      width: "80%",
      flex: 0.1,
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 30,
    },
  });
  const colorsPanels = [
    { id: 0, color: "#EF476F", styles: styles.color_red },
    { id: 1, color: "#D7A3FF", styles: styles.color_purple },
    { id: 2, color: "#06D6A0", styles: styles.color_green },
    { id: 3, color: "#118AB2", styles: styles.color_blue },
    { id: 4, color: "#FFD166", styles: styles.color_yellow },
  ];
  return (
    <View
      style={{
        top: STATUSBAR_HEIGHT,
        height: screenHeight,
        justifyContent: "center",
        backgroundColor: "#345B6F",
      }}
    >
      <TextInput
        style={styles.inputField}
        onChangeText={(i) => changeText(i)}
        value={textValue}
        placeholder="Name of the event"
      />
      <View style={styles.container}>
        <DateTimePicker
          value={dateValue}
          onValueChange={(date) => setDateValue(dayjs(date))}
          minimumDate={TODAY}
          calendarTextStyle={{
            color: "#000",
          }}
          weekDaysTextStyle={{
            color: "#000",
          }}
          selectedItemColor="#000"
          headerTextStyle={{ color: "#000" }}
          headerButtonColor="#FFDAB9"
          displayFullDays="true"
        />
      </View>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          addEventDisabled ? styles.smallOppacity : "",
        ]}
        disabled={addEventDisabled}
        onPress={() => addNewEvent()}
      >
        <Text style={{ textTransform: "uppercase", fontWeight: "600" }}>
          Add event
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => endChangingDate()}
      >
        <Text style={{ textTransform: "uppercase", fontWeight: "600" }}>
          Close
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.textColorOfTask}>Choose color of a task</Text>
      </View>
      <View style={styles.colorPickerRow}>
        {colorsPanels.map((i) => (
          <TouchableOpacity
            style={[
              styles.colorPickerItem,
              i.styles,
              colorOfNewTask === i.color ? styles.colorBorder : "",
            ]}
            onPress={() => changeTaskColor(i.color)}
            key={i.id}
          />
        ))}
      </View>
    </View>
  );
}
