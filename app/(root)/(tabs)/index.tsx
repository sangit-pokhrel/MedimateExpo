import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Splash from "@/app/splash";
import SplashOne from "@/app/splashone";


export default function Index() {
  const [isFirstTime, setIsFirstTime] = useState(false); // First-time user state
  const [loading, setLoading] = useState(true); // Loading state for session check
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if it's the user's first time opening the app
        const firstTime = await AsyncStorage.getItem("firstTime");
        const session = await AsyncStorage.getItem("userSession");

        if (!firstTime) {
          // If firstTime flag isn't set, show SplashOne
          setIsFirstTime(true);
          await AsyncStorage.setItem("firstTime", "false"); // Mark as not first time
        } else if (session) {
          // If user has an active session, redirect to home
          router.push("/home/home");
        } else {
          // If no session, redirect to login
          router.push("/pages/login");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false); // Hide splash screen
      }
    };

    checkSession();
  }, []);

  if (loading) {
    // Show splash screen while session is being checked
    return <Splash />;
  }

  if (isFirstTime) {
    // Show SplashOne only for first-time users
    return <SplashOne />;
  }

  // The component won't render anything if the user is being redirected to login/home
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Background color for the entire screen
  },
  content: {
    flex: 1, // Take up the remaining space
  },
});
