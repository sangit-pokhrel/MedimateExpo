import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";  // Firestore imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestore, db } from "../../firebase";  // Ensure firestore is initialized properly
import Navigation from "../navigation/navigation";

const AddReminder: React.FC = () => {
  const [medicineName, setMedicineName] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [time, setTime] = useState<Date>(new Date()); // Time state as Date
  const [frequency, setFrequency] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  // Retrieve user email from AsyncStorage when the component mounts
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("userSession");
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          setUserEmail(parsedData.email); // Set email in state
        }
      } catch (error) {
        console.error("Error retrieving email from AsyncStorage:", error);
      }
    };

    getUserEmail();
  }, []);



const handleSubmit = async () => {
  if (
    !medicineName ||
    !dosage ||
    !time ||
    !frequency ||
    !days ||
    !userEmail
  ) {
    Alert.alert(
      "Error",
      "Please fill in all fields and ensure you are logged in."
    );
    return;
  }

  setIsLoading(true); // Start the loader

  const reminderData = {
    medicineName,
    dosage,
    time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    frequency,
    days,
    createdAt: new Date().toISOString(),
    userEmail, // Add the user email to the reminder data
  };

  try {
    // Add the reminder data to the Firestore collection
    const remindersRef = collection(db, "reminders"); // Reference to the "reminders" collection in Firestore
    await addDoc(remindersRef, reminderData); // Add document to Firestore

    Alert.alert("Success", "Reminder added successfully!");
    setMedicineName("");
    setDosage("");
    setTime(new Date());
    setFrequency("");
    setDays("");
  } catch (error: any) {
    Alert.alert("Error", error.message);
  } finally {
    setIsLoading(false); // Stop the loader
  }
};


  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false); // Hide the picker
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loaderText}>Submitting...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Reminder</Text>
            <Text style={styles.subtitle}>
              Set Reminder For Your Medication
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Medicine Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Paracetamol"
                value={medicineName}
                onChangeText={setMedicineName}
              />

              <Text style={styles.label}>Pills Dosage per time</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                keyboardType="numeric"
                value={dosage}
                onChangeText={setDosage}
              />

              <Text style={styles.label}>Time</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onTimeChange}
                />
              )}

              <Text style={styles.label}>How Many Times in a day?</Text>
              <TextInput
                style={styles.input}
                placeholder="3 times"
                keyboardType="numeric"
                value={frequency}
                onChangeText={setFrequency}
              />

              <Text style={styles.label}>Days</Text>
              <TextInput
                style={styles.input}
                placeholder="How many days in a week?"
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.navigation}>
        <Navigation />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    padding: 20,
    justifyContent: "center",
  },
  loaderContainer: {
    justifyContent: "space-between",
    backgroundColor: "#F0F8FF",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  navigation: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default AddReminder;
