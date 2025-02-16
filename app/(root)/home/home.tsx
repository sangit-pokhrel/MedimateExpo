import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Navigation from "../navigation/navigation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebase"; // Ensure this is correctly set up

const Home = () => {
  const db = getFirestore(app);
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch Clinics
  useEffect(() => {
    const fetchClinics = async () => {
      const clinicsCollection = collection(db, "clinics");
      const clinicSnapshot = await getDocs(clinicsCollection);
      const clinicList = clinicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClinics(clinicList);
    };

    const fetchAppointments = async () => {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentList);
    };

    fetchClinics();
    fetchAppointments();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingTop: 20 }}>
          {/* Header Section */}
          <View className="w-full pt-8">
            <Text className="text-xl text-center font-semibold">
              Welcome Back! Mr Rai
            </Text>
          </View>

          {/* Reminder Card */}
          <View className="m-4 p-4 bg-green-100 rounded-xl shadow-sm">
            <View className="flex-row-reverse">
              <Image source={require("./fivestar.png")} />
            </View>
            <Text className="text-xl font-semibold text-gray-700 mb-2">
              Are you worried about missing your medication time?
            </Text>
            <View className="flex-row items-center">
              <View className="flex-1">
                <Text className="text-sm text-gray-600 mb-4">
                  Never Miss a Dose, Stay in Control – Get Your Pill Dispenser Today!
                </Text>
                <TouchableOpacity
                  className="bg-white border border-green-500 py-2 px-4 rounded-full"
                  onPress={() => router.push("/reminders/addreminders")}
                >
                  <Text className="text-green-500 text-center">Set Reminder</Text>
                </TouchableOpacity>
              </View>
              <Image source={require("./DispenserImage.png")} className="w-40 h-40 ml-4" />
            </View>
          </View>

          {/* Top Clinics Section */}
          <View className="m-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Top Clinics Near You</Text>
              <TouchableOpacity>
                <Text className="text-blue-500 text-sm">See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal className="mt-4" showsHorizontalScrollIndicator={false}>
              {clinics.map((clinic, index) => (
                <View key={clinic.id} className="bg-white rounded-lg shadow-sm p-2 mr-4 min-w-64">
                  <Image source={require("./Pharma.png")} className="w-full h-18 rounded-md" />
                  <Text className="text-sm font-semibold mt-2">{clinic.clinic_name}</Text>
                  <Text className="text-xs text-gray-500">{clinic.location}</Text>
                  <Text className="text-xs text-gray-500">{clinic.rating} ⭐</Text>
                  <View className="flex-row mt-2 space-x-2">
                    <TouchableOpacity className="flex-1 bg-blue-500 py-1 mx-2 rounded-full">
                      <Text className="text-white text-center text-xs">Call Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 bg-blue-100 py-1 px-2 rounded-full"
                      onPress={() => router.push("../appointment/appointmentform")}
                    >
                      <Text className="text-blue-500 text-center text-xs">Book Appointment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* My Appointments Section */}
          <View className="m-4">
            <Text className="text-lg font-semibold">My Appointments</Text>
            {appointments.map((appointment) => (
              <View
                key={appointment.id}
                className="bg-white p-4 rounded-lg shadow-sm flex-row items-center mt-4"
              >
                <Image source={require("./Pharma.png")} className="w-12 h-12 rounded-md" />
                <View className="ml-4">
                  <Text className="text-sm font-semibold">{appointment.clinic_name}</Text>
                  <Text className="text-xs text-gray-500">
                    {appointment.appointment_date} at {appointment.appointment_time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Navigation at the bottom */}
      <Navigation />
    </>
  );
};

export default Home;
