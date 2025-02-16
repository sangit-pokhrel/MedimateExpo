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
      {/* <Stack.Screen name="(root)/(tabs)/index" /> 
      <Stack.Screen name="(root)/home/home" />
      <Stack.Screen name="(root)/pages/splashtwo" /> 
      <Stack.Screen name="/splash" /> 
      <Stack.Screen name="/splashone" /> 
      <Stack.Screen name="/(root)/pages/login" />
      <Stack.Screen name="/(root)/appointment/appointment" />
      <Stack.Screen name="/(root)/navigation/navigation" />
      <Stack.Screen name="/(root)/medicationhistory/medicationhistory" />
      <Stack.Screen name="/(root)/settings/settings" />
      <Stack.Screen name="/(root)/reminders/reminders" /> */}
    </Stack>
  );
}
