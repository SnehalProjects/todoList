import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Task = (props) => {
  const [completed, setCompleted] = useState(false);

  const handleCompleteToggle = () => {
    setCompleted(!completed);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {/* Custom styled checkbox */}
        <TouchableOpacity onPress={handleCompleteToggle}>
          <View style={[styles.square, completed && styles.completedSquare]}>
            {completed && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.itemText,
            completed && { textDecorationLine: "line-through", color: "#aaa" },
          ]}
        >
          {props.text}
        </Text>
      </View>

      {/* Trash icon with toast */}
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "android") {
            ToastAndroid.show("Item Deleted", ToastAndroid.SHORT);
          }
          props.onDelete(); // <-- Call the delete function passed from App.jsx
        }}
      >
        <Ionicons name="trash" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 25,
    height: 25,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  completedSquare: {
    backgroundColor: "#55BCF6",
    opacity: 1,
  },
  itemText: {
    maxWidth: "80%",
    fontSize: 15,
  },
});

export default Task;
