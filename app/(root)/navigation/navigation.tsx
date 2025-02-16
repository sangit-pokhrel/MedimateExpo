
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook

const Navigation = () => {
  const router = useRouter(); // Initialize router

  return (
    <View className="bg-white p-4 flex-row justify-between items-center shadow-md">
      {/* Home Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/home/home")} // Navigate to Home
      >
        <Image source={require("./Homeico.png")} className="w-6 h-6" />
        <Text className="text-xs text-gray-600">Home</Text>
      </TouchableOpacity>

      {/* Appointment Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/appointment/appointment")} // Navigate to Appointment
      >
        <Image source={require("./calendar.png")} className="w-6 h-6" />
        <Text className="text-xs text-gray-600">Appointment</Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/search/search")} // Navigate to Search
      >
        <Image source={require("./search.png")} className="w-6 h-6" />
        <Text className="text-xs text-gray-600">Search</Text>
      </TouchableOpacity>

      {/* Reminder Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/reminders/reminders")} // Navigate to Reminder
      >
        <Image source={require("./reminder.png")} className="w-6 h-6" />
        <Text className="text-xs text-gray-600">Reminder</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push('/settings/settings')}        // Navigate to Settings
      >
        <Image source={require("./settings.png")} className="w-6 h-6" />
        <Text className="text-xs text-gray-600">Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

