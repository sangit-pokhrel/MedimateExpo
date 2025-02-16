import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router"; // Navigation hook

const splashthree = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/pages/splashfour");
  };

  const handleSkip = () => {
    router.push("/home/home");
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
          source={require("./splash-3.png")}
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
          Find nearby clinics and doctors with ease!
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
          Quickly search and connect with nearby clinics and doctors. Get the
          care you need, right at your fingertips!
        </Text>
        {/* Footer Navigation */}
        <View
          className="mt-48"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
            marginTop: 40,
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

export default splashthree;
