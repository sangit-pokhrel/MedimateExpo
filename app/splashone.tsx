import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router"; // Navigation hook

const SplashOne = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/pages/splashtwo");
  };

  const handleSkip = () => {
    router.push("/pages/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F8FF" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "97%",
          margin: "auto",
        }}
      >
        {/* Illustration Section */}
        <Image
          source={require("../assets/images/splash-1.png")}
          style={{ width: 300, height: 300, marginBottom: 20 }}
          resizeMode="contain"
        />
        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Appointment At Your Fingertips
        </Text>
        {/* Subtitle */}
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            color: "#555",
            paddingHorizontal: 20,
          }}
        >
          Effortlessly book, manage, and track all your appointments in one
          place. Stay organised and never miss a schedule, all at your
          fingertips!
        </Text>
        {/* Footer Navigation */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
            marginTop: 60,
          }}
        >
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ fontSize: 16, color: "#555" }}>Skip</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: "#0067F6",
                marginHorizontal: 4,
              }}
            />
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: "#ccc",
                marginHorizontal: 4,
              }}
            />
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: "#ccc",
                marginHorizontal: 4,
              }}
            />
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: "#ccc",
                marginHorizontal: 4,
              }}
            />
          </View>

          <TouchableOpacity onPress={handleNext}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#14C13C" }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SplashOne;
