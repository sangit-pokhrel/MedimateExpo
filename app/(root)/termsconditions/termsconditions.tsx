import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

const TermsConditions = () => {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("../settings/settings")}
      >
        <Image
          source={require("../../../assets/images/chevron-left.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Header Section */}
      <Image
        source={require("./splash.png")}
        style={styles.logo}
      />
      <Text style={styles.headerText}>Terms & Conditions</Text>

      {/* Terms and Conditions Content */}
      <View style={styles.content}>
        <Text style={styles.text}>
          Make sure to read carefully before agreeing in order to use MediMate.
        </Text>
        <Text style={styles.text}>
          Purpose: Manage medication schedules; not a substitute for medical
          advice.
        </Text>
        <Text style={styles.text}>
          Disclaimer: Consult healthcare providers for medical concerns.
        </Text>
        <Text style={styles.text}>
          Notifications: May face delays due to technical issues.
        </Text>
        <Text style={styles.text}>
          User Responsibility: Ensure accurate medication data entry.
        </Text>
        <Text style={styles.text}>
          Privacy: Data is collected as per our Privacy Policy.
        </Text>
        <Text style={styles.text}>
          Liability: App is "as is"; no liability for functionality issues.
        </Text>
        <Text style={styles.text}>
          Changes: Terms may update; continued use implies consent.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A7AF9",
    alignItems: "center",
    paddingTop: 16, // Ensure space for status bar
  },
  backButton: {
    position: "absolute",
    top: 60, // Increased the value to move the back button lower
    left: 16,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  text: {
    fontSize: 14,
    color: "#000000",
    marginTop: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default TermsConditions;
