import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { id: 1, label: "I am a Patient" },
    { id: 2, label: "I am a Doctor" },
    { id: 3, label: "I am a Pharm" },
  ];

  const handleArrow = () => {
    router.push("/pages/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F8FF" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {/* Image */}
        <Image
          source={require("./splash-4.png")}
          style={{ width: 300, height: 300 }}
          resizeMode="contain"
        />

        {/* Text Section */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Tailor Your Experience with MediMate!
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#6B7280",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          To provide you with a great and seamless experience, please select one
          of the following!
        </Text>

        {/* Options */}
        <View style={{ width: "100%", marginTop: 24 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 12,
                backgroundColor:
                  selectedOption === option.id ? "#D1FAE5" : "transparent",
              }}
              onPress={() => setSelectedOption(option.id)}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  marginRight: 12,
                  borderColor:
                    selectedOption === option.id ? "#10B981" : "#D1D5DB",
                  backgroundColor:
                    selectedOption === option.id ? "#10B981" : "#FFFFFF",
                }}
              />
              <Text style={{ fontSize: 16 }}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation */}
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#3B82F6",
              padding: 16,
              borderRadius: 50,
            }}
            onPress={handleArrow}
          >
            <ArrowRightIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
