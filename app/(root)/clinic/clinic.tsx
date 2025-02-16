import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

const Clinic = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample clinic data
  const clinicData = {
    name: "Suyog Pharmacy",
    image: require("./Pharma.png"),
    distance: "2.1 miles",
    about: "Suyog Pharmacy is a leading healthcare provider offering a wide range of pharmaceutical services. We provide expert consultation and prescription management. Our clinic is dedicated to providing top-notch medical services and healthcare products to our community. Whether you're looking for over-the-counter medications, prescription drugs, or professional advice, Suyog Pharmacy has got you covered.",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.clinicDetails}>
          {/* Clinic Image */}
          <Image source={clinicData.image} style={styles.image} />
          
          {/* Clinic Name */}
          <Text style={styles.clinicName}>{clinicData.name}</Text>

          {/* Distance */}
          <Text style={styles.distance}>{clinicData.distance}</Text>

          {/* About Us */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              {isExpanded ? clinicData.about : `${clinicData.about.substring(0, 100)}...`}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.seeMoreButton}>{isExpanded ? "See Less" : "See More"}</Text>
            </TouchableOpacity>
          </View>

          {/* Book Appointment Button */}
          <TouchableOpacity
            style={styles.bookAppointmentButton}
            onPress={() => router.push("/appointment/appointmentform")}
          >
            <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Ensuring content stays within the safe area
  },
  container: {
    padding: 20,
  },
  clinicDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  clinicName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  distance: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 5,
  },
  aboutContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  seeMoreButton: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  bookAppointmentButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  bookAppointmentButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Clinic;
