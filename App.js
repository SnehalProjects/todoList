import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Task from "./components/Task";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleAddTask = () => {
    if (!task || task.trim() === "") {
      Alert.alert("Invalid Task", "Please enter a task before adding.");
      return;
    }

    Keyboard.dismiss(); //keyboard go down after adding task
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); //remove item from array and store back to itemsCopy
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={30} color={"#333"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("./assets/profile.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        {/* <TouchableOpacity onPress={() => setSearchText("")}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity> */}
      </View>

      {/* Today;s Task */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>
          {/* This is where the Task lists */}
          <ScrollView>
            {taskItems
              .filter((item) =>
                item.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <TouchableOpacity key={index}>
                    <Task text={item} onDelete={() => completeTask(index)} />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          {/* <Task text={'Task - 1'}/>
          <Task text={'Task - 2'}/> */}
        </View>
      </View>

      {/* Write  a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Ionicons name="add" style={styles.addText} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  taskWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "C0C0C0",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 24,
  },
  searchBar: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 15,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    gap: 10,
  },
  searchInput: {
    flex: 1,
  },
});
