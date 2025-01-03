import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Splash from "@/app/splash";
import SplashOne from "@/app/splashone";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true); // Splash screen state
  const router = useRouter(); // For navigation if needed

  useEffect(() => {
    // Simulate a delay for the splash screen
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide splash after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (showSplash) {
    // Splash screen content
    return <Splash />;
  }

  // Main content after splash screen
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SplashOne />
    </View>
  );
}
