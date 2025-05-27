import React, { useRef, useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

const AnimatedSplash = ({ onAnimationFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      // After fade-in, wait 1 sec, then fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }).start(() => {
          onAnimationFinish(); // notify parent to hide splash
        });
      }, 2000);
    });
  }, [fadeAnim, onAnimationFinish]);

  return (
    <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
      <Image
        source={require("../assets/toonSplash.jpeg")}
        style={styles.image}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
});

export default AnimatedSplash;
