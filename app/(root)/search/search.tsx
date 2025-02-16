import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { db } from "../../firebase";  // Ensure you import the firebase configuration file
import { collection, query, where, getDocs } from "firebase/firestore";
import Navigation from "../navigation/navigation";
import { router } from "expo-router";

const Search = () => {
  const [search, setSearch] = useState("");
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);

  // Fetch clinic data from Firestore
  const fetchClinics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clinics"));
      const clinicData = [];
      querySnapshot.forEach((doc) => {
        clinicData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setClinics(clinicData);
      setFilteredClinics(clinicData);  // Initially, display all clinics
    } catch (error) {
      console.error("Error fetching clinic data: ", error);
    }
  };

  // Filter clinics based on search input
  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    const results = clinics.filter(clinic =>
      clinic.clinic_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClinics(results);
  }, [search, clinics]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.text}>Search For Clinics</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            keyboardType="default"
            onChangeText={setSearch}
            value={search}
          />

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.clinicGrid}>
              {filteredClinics.map((clinic, index) => (
                <View key={clinic.id} style={styles.clinicCard}>
                  <Image
                    source={{ uri: clinic.imageUrl || "https://via.placeholder.com/150" }}  // Use clinic's imageUrl
                    style={styles.image}
                  />
                  <Text style={styles.clinicName}>{clinic.clinic_name}</Text>
                  <Text style={styles.distance}>{clinic.location}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.viewMoreButton}
                      accessibilityLabel="View more details"
                      onPress={() => router.push("/clinic/clinic")}
                    >
                      <Text style={styles.viewMoreButtonText}>View More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bookAppointmentButton}
                      accessibilityLabel="Book Appointment"
                      onPress={() => router.push("/appointment/appointmentform")}
                    >
                      <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Navigation at the Bottom */}
        <View style={styles.navigation}>
          <Navigation />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 60, // Ensure scrollable content does not overlap navigation
  },
  clinicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  clinicCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 250,
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 10,
  },
  clinicName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  distance: {
    fontSize: 12,
    color: "gray",
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  viewMoreButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  viewMoreButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  bookAppointmentButton: {
    backgroundColor: "#28A745",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  bookAppointmentButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
  navigation: {
    position: "absolute",
    width: "100%",
    bottom: -35,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default Search;
