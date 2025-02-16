import React from "react";
import { View, Image, Text, ScrollView, StyleSheet } from "react-native";
import Navigation from "../navigation/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const MedicationHistory = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Medication History</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.archiveText}>Archive</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {[
              {
                name: "Paracetamole",
                time: "Jan 1 at 10 AM, 3 Pill",
                image: require("./Pharma.png"),
              },
              {
                name: "Paracetamole",
                time: "Jan 1 at 10 AM, 3 Pill",
                image: require("./Pharma.png"),
              },
              {
                name: "Paracetamole",
                time: "Jan 1 at 10 AM, 3 Pill",
                image: require("./Pharma.png"),
              },
              {
                name: "Paracetamole",
                time: "Jan 1 at 10 AM, 3 Pill",
                image: require("./Pharma.png"),
              },
              {
                name: "Paracetamole",
                time: "Jan 1 at 10 AM, 3 Pill",
                image: require("./Pharma.png"),
              },
            ].map((appointment, index) => (
              <View key={index} style={styles.appointmentContainer}>
                <Image
                  source={require("./Pharma.png")}
                  style={styles.appointmentImage}
                />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentName}>
                    {appointment.name}
                  </Text>
                  <Text style={styles.appointmentTime}>
                    {appointment.time}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      <Navigation />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A7AF9", // Matching the color palette
  },
  header: {
    backgroundColor: "#1A7AF9", // Header with the same color
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  archiveText: {
    fontSize: 18,
    color: "#747474",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  appointmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: "#CABEBE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  appointmentDetails: {
    marginLeft: 16,
    padding: 8,
  },
  appointmentName: {
    fontSize: 14,
    fontWeight: "600",
  },
  appointmentTime: {
    fontSize: 12,
    color: "#747474",
  },
});

export default MedicationHistory;
