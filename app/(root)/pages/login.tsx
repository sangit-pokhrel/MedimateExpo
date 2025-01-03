import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "@/app/firebase"; // Import Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/pages/signup");
  };

  const handleForget = () => {
    router.push("/pages/forgotpass");
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Show loader
      // Firebase Authentication: Sign In
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Optionally, fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData) {
        // Redirect to home or other authenticated pages
        router.push("/pages/home");
      } else {
        showCustomAlert("Error", "User data not found.");
      }
    } catch (error) {
      if (error instanceof Error) {
        showCustomAlert("Error", error.message);
      } else {
        showCustomAlert("Error", "An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const showCustomAlert = (title: string, message: string | undefined) => {
    Alert.alert(title, message, [{ text: "Success" }]);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {/* Container */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Welcome Image */}
        <Image
          source={require("./login.png")} // Add your image here
          className="w-64 h-40"
          resizeMode="contain"
        />

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mt-4">Log In</Text>

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

        {/* Password Input */}
        <View className="w-full mt-4">
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Text className="text-gray-400 mr-2">🔒</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              className="flex-1 text-gray-900"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Text className="text-blue-500">
                {passwordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="self-end mt-2">
            <Text className="text-blue-500 text-sm" onPress={handleForget}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-blue-500 w-full py-3 rounded-md mt-6"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Login
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center w-full my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Sign Up */}
        <TouchableOpacity>
          <Text className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Text
              className="text-blue-500 font-semibold"
              onPress={handleSignUp}
            >
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
