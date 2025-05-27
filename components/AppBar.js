import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icons } from "../constants/Icons";

const AppBar = ({ onMenuPress }) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
        <Text style={styles.menuIcon}>{Icons.menu}</Text>
      </TouchableOpacity>
      <Text style={styles.appTitle}>ToonPlay</Text>
      <View style={styles.appBarSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#16213e",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 12,
  },
  menuBtn: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 26,
    paddingTop: 20,
    color: "#F8FAFC",
  },
  appTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginLeft: 85,
  },
  appBarSpacer: {
    flex: 1,
  },
});

export default AppBar;
