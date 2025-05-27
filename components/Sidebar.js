import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { Icons } from "../constants/Icons";

const Sidebar = ({ isVisible, onClose, currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: Icons.home },
    { id: "favorites", label: "Favorites", icon: Icons.heartFilled },
  ];

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.sidebarOverlay}>
        <TouchableOpacity style={styles.sidebarBackground} onPress={onClose} />
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Image
              source={require("../assets/toonSplash.jpeg")}
              style={styles.sidebarAvatar}
            />
            <Text style={styles.sidebarTitle}>ToonPlay</Text>
          </View>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.sidebarItem,
                currentTab === item.id && styles.activeSidebarItem,
              ]}
              onPress={() => {
                setCurrentTab(item.id);
                onClose();
              }}
            >
              <Text style={styles.sidebarIcon}>{item.icon}</Text>
              <Text style={styles.sidebarItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sidebarOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: 280,
    backgroundColor: "#1a1a2e",
    paddingTop: 50,
  },
  sidebarHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  sidebarAvatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  sidebarTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F8FAFC",
    paddingBottom: 40,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  activeSidebarItem: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRightWidth: 3,
    borderRightColor: "#F8FAFC",
  },
  sidebarIcon: {
    fontSize: 20,
    color: "#fff",
    marginRight: 16,
    width: 24,
  },
  sidebarItemText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Sidebar;
