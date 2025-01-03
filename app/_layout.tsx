import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable headers globally
      }}
    >
      {/* Explicitly define routes */}
      <Stack.Screen name="(root)/(tabs)/index" /> {/* Default index screen */}
      <Stack.Screen name="(root)/home/home" /> {/* Home screen */}
      <Stack.Screen name="(root)/pages/splashtwo" /> {/* SplashTwo screen */}
      <Stack.Screen name="/splash" /> {/* Splash screen */}
      <Stack.Screen name="/splashone" /> {/* SplashOne screen */}
      <Stack.Screen name="/(root)/pages/login" /> {/* SplashOne screen */}
    </Stack>
  );
}
