import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/app/firebase"; // Import Firebase configuration
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleReset = async () => {
    setLoading(true); 
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setLoading(false); 
      router.push({ pathname: "/pages/resetsuccess", params: { email } }); // Navigate on success
    } catch (error) {
      setLoading(false); 
      // Handle error (optional, but we avoid using Alert here)
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {/* Container */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Illustration Image */}
        <Image
          source={require("./forgetpassword.png")} // Add your image here
          className="w-64 h-40"
          resizeMode="contain"
        />

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mt-4">
          Forgot Password?
        </Text>

        {/* Description */}
        <Text className="text-gray-600 text-center mt-2 text-sm">
          Don’t worry! It happens. Please carefully enter the email address
          associated with your account.
        </Text>

        {/* Email Input */}
        <View className="w-full mt-6">
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Text className="text-gray-400 mr-2">@</Text>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              className="flex-1 text-gray-900"
            />
          </View>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity
          className="bg-blue-500 w-full py-3 rounded-md mt-6"
          onPress={handleReset}
          disabled={loading} // Disable button if loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
