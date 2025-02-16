import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { useRouter } from "expo-router";

const PasswordResetScreen = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/pages/login");
  };
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <View className="flex-1 bg-inherit justify-center items-center px-6">
        <Image
          source={require("./resetsuccess.png")}
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <CheckCircleIcon className="text-blue-500 mb-4" size={48} />
        <Text className="text-center text-gray-700 text-lg font-medium mb-4">
          We have successfully sent a{" "}
          <Text className="font-bold">Password Reset Link</Text> to the email
          associated with your account.
        </Text>
        <TouchableOpacity>
          <Text
            className="text-center text-blue-500 font-medium"
            onPress={handleLogin}
          >
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordResetScreen;
