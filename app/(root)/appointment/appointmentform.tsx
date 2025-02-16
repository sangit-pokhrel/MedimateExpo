import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const AppointmentForm: React.FC = () => {
  const router = useRouter();
  const [pharmaName, setPharmaName] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (itemValue: string) => {
    setTime(itemValue);
  };

  const handleConfirmAppointment = () => {
    if (pharmaName && patientName && time) {
      router.push("./appointment");
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleBackToSearch = () => {
    router.push("/search/search");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Pharmacy Name:</Text>
        <TextInput
          style={styles.input}
          value={pharmaName}
          onChangeText={setPharmaName}
          placeholder="Enter pharmacy name"
        />

        <Text style={styles.label}>Patient Name:</Text>
        <TextInput
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
          placeholder="Enter patient name"
        />

        <Text style={styles.label}>Gender:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              gender === "Male" && styles.radioButtonSelected,
            ]}
            onPress={() => setGender("Male")}
          >
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              gender === "Female" && styles.radioButtonSelected,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Available Time:</Text>
        <Picker
          selectedValue={time}
          onValueChange={handleTimeChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Time" value="" />
          {[
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
          ].map((slot) => (
            <Picker.Item key={slot} label={slot} value={slot} />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmAppointment}
        >
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBackToSearch}>
          <Text style={styles.backButtonText}>Back to Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F8FF",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  radioText: {
    color: "#000",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppointmentForm;
