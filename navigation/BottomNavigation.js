import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icons } from "../constants/Icons";

const BottomNavigation = ({ currentTab, setCurrentTab }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[
          styles.bottomNavItem,
          currentTab === "home" && styles.activeBottomNavItem,
        ]}
        onPress={() => setCurrentTab("home")}
      >
        <Text
          style={[
            styles.bottomNavIcon,
            currentTab === "home" && styles.activeBottomNavIcon,
          ]}
        >
          {Icons.home}
        </Text>
        <Text
          style={[
            styles.bottomNavText,
            currentTab === "home" && styles.activeBottomNavText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.bottomNavItem,
          currentTab === "favorites" && styles.activeBottomNavItem,
        ]}
        onPress={() => setCurrentTab("favorites")}
      >
        <Text
          style={[
            styles.bottomNavIcon,
            currentTab === "favorites" && styles.activeBottomNavIcon,
          ]}
        >
          {Icons.heartFilled}
        </Text>
        <Text
          style={[
            styles.bottomNavText,
            currentTab === "favorites" && styles.activeBottomNavText,
          ]}
        >
          Favorites
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    paddingTop: 8,
    paddingBottom: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeBottomNavItem: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 12,
    marginHorizontal: 8,
  },
  bottomNavIcon: {
    fontSize: 20,
    color: "#999",
    marginBottom: 4,
  },
  activeBottomNavIcon: {
    color: "#AAD7D9",
  },
  bottomNavText: {
    fontSize: 12,
    color: "#999",
  },
  activeBottomNavText: {
    color: "#AAD7D9",
    fontWeight: "bold",
  },
});

export default BottomNavigation;
