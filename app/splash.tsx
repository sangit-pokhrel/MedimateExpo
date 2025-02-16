import React, { useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {

  return (
    <SafeAreaView className="bg-[#F0F8FF] h-full">
      <ScrollView contentContainerClassName="flex-1 justify-center items-center">
        {/* Logo Section */}
        <Image
          source={require("../assets/images/splash.png")}
          className="w-40 h-40 mb-4"
          resizeMode="contain"
        />

        {/* App Name */}
        <View>
          <Text className="text-4xl font-bold uppercase text-[#14C13C] text-center tracking-[5px]">
            medimate
          </Text>
        </View>

        {/* Tagline */}
        <View className="absolute bottom-10">
          <Text className="text-center text-black text-sm">
            A Smart Health Companion
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Splash;
