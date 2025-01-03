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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignUp = async () => {
    // Validate if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Show loader

      // Firebase Authentication: Create User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore with default role
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        role: "user", // Default role
      });

      // Redirect to login page
      router.push("/pages/login");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSignIn = () => {
    router.push("/pages/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("./signup.png")}
          className="w-64 h-40"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-900 mt-4">Sign Up</Text>

        {/* Full Name Input */}
        <View className="w-full mt-6">
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Text className="text-gray-400 mr-2">👤</Text>
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              className="flex-1 text-gray-900"
            />
          </View>
        </View>

        {/* Email Input */}
        <View className="w-full mt-4">
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Text className="text-gray-400 mr-2">@</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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
        </View>

        {/* Confirm Password Input */}
        <View className="w-full mt-4">
          <View className="flex-row items-center bg-white border border-gray-300 rounded-md px-4 py-2">
            <Text className="text-gray-400 mr-2">🔒</Text>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 text-gray-900"
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Text className="text-blue-500">
                {confirmPasswordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View className="w-full mt-4">
          <Text className="text-gray-600 text-sm text-center">
            By signing up, you’re agree to our{" "}
            <Text className="text-blue-500 font-semibold">
              Terms and Conditions
            </Text>{" "}
            and{" "}
            <Text className="text-blue-500 font-semibold">Privacy policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-blue-500 w-full py-3 rounded-md mt-6"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center w-full my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Sign In */}
        <TouchableOpacity>
          <Text className="text-gray-600 text-sm">
            Already joined us Before?{" "}
            <Text
              className="text-blue-500 font-semibold"
              onPress={handleSignIn}
            >
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
