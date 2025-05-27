import React, { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { AnimeContextProvider } from "./context/AnimeContext";
import AppBar from "./components/AppBar";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import BottomNavigation from "./navigation/BottomNavigation.js";
import Sidebar from "./components/Sidebar";
import AnimatedSplash from "./screens/AnimatedSplash";
import { StyleSheet } from "react-native";

const ToonPlayApp = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplash onAnimationFinish={() => setShowSplash(false)} />;
  }

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case "favorites":
        return <FavoritesScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <AnimeContextProvider>
      <SafeAreaView style={styles.appContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

        <AppBar onMenuPress={() => setSidebarVisible(true)} />

        {renderCurrentScreen()}

        <BottomNavigation
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <Sidebar
          isVisible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </SafeAreaView>
    </AnimeContextProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ToonPlayApp;
