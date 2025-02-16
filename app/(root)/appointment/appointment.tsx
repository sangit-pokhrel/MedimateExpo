import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import Navigation from "../navigation/navigation";
import  {db}  from "../../firebase"; // Ensure db is properly initialized
import { collection, getDocs } from "firebase/firestore";

// Define the Appointment interface
interface Appointment {
  id: string;
  clinic_name: string;
  appointment_date: string;
  appointment_time: string;
  image?: string;
}

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Ensure db is correctly initialized
        const appointmentsRef = collection(db, "appointments");  // This should work if db is valid
        const snapshot = await getDocs(appointmentsRef);
        const appointmentList: Appointment[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Appointment[];

        setAppointments(appointmentList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>My Appointments</Text>

        <View style={styles.content}>
          <Text style={styles.infoText}>
            Please look at the time thoroughly. Don't miss your appointment.
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#1A7AF9" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {appointments.map((appointment) => (
                <View key={appointment.id} style={styles.appointmentCard}>
                  <Image
                    source={{ uri: appointment.image || "https://via.placeholder.com/50" }}
                    style={styles.appointmentImage}
                  />
                  <View style={styles.appointmentDetails}>
                    <Text style={styles.appointmentName}>{appointment.clinic_name}</Text>
                    <Text style={styles.appointmentTime}>
                      {appointment.appointment_date} at {appointment.appointment_time}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.navigation}>
          <Navigation />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A7AF9",
    alignItems: "center",
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    paddingBottom: 16,
  },
  content: {
    backgroundColor: "#f3f3f3",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#747474",
    textAlign: "center",
    marginHorizontal: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  appointmentImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  appointmentDetails: {
    marginLeft: 16,
  },
  appointmentName: {
    fontSize: 14,
    fontWeight: "600",
  },
  appointmentTime: {
    fontSize: 12,
    color: "#747474",
    marginTop: 4,
  },
  navigation: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default AppointmentScreen;
