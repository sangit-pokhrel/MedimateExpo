import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const Privacypolicy = () => {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("../settings/settings")}
      >
        <Image
          source={require("../../../assets/images/chevron-left.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Image source={require("./splash.png")} style={styles.logo} />
      <Text style={styles.headerText}>Privacy and Policy</Text>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.titleText}>Privacy and Policy</Text>
          <Text style={styles.bodyText}>
            Data Collection: We collect personal information like medication
            schedules and user preferences to provide app services.
          </Text>
          <Text style={styles.bodyText}>
            Data Usage: Your data is used solely for improving app functionality
            and providing reminders.
          </Text>
          <Text style={styles.bodyText}>
            Data Sharing: We do not share your data with third parties without
            your consent.
          </Text>
          <Text style={styles.bodyText}>
            User Control: You can modify or delete your data anytime within the
            app.
          </Text>
          <Text style={styles.bodyText}>
            Privacy: Data is collected as per our Privacy Policy.
          </Text>
          <Text style={styles.bodyText}>
            Security: Your data is stored securely to prevent unauthorized
            access.
          </Text>
          <Text style={styles.bodyText}>
            Contacts: For any privacy concerns, contact us at
            support@example.com.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A7AF9",
    alignItems: "center",
    paddingTop: 16, // Ensures space for the status bar on top
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 16,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
    marginBottom: 16,
    lineHeight: 20,
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
});

export default Privacypolicy;
