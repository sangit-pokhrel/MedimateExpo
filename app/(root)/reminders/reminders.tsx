import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import * as Notifications from "expo-notifications";
import moment from "moment";
import Navigation from "../navigation/navigation";

type Reminder = {
  id: string;
  medicineName: string;
  time: string;
  dosage: string;
};

const Reminders: React.FC = () => {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const [editedName, setEditedName] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedDosage, setEditedDosage] = useState("");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reminders"));
        const fetchedReminders: Reminder[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Reminder[];
        setReminders(fetchedReminders);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  // Open Edit Modal
  const openEditModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setEditedName(reminder.medicineName);
    setEditedTime(reminder.time);
    setEditedDosage(reminder.dosage);
    setEditModalVisible(true);
  };

  // Update Reminder in Firebase & UI
  const updateReminder = async () => {
    if (!selectedReminder) return;
    try {
      const reminderRef = doc(db, "reminders", selectedReminder.id);
      await updateDoc(reminderRef, {
        medicineName: editedName,
        time: editedTime,
        dosage: editedDosage,
      });

      setReminders((prev) =>
        prev.map((item) =>
          item.id === selectedReminder.id
            ? {
                ...item,
                medicineName: editedName,
                time: editedTime,
                dosage: editedDosage,
              }
            : item
        )
      );

      Alert.alert("Success", "Reminder updated successfully!");
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating reminder:", error);
      Alert.alert("Error", "Failed to update reminder.");
    }
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setDeleteModalVisible(true);
  };

  // Delete Reminder from Firebase & UI
  const deleteReminder = async () => {
    if (!selectedReminder) return;
    try {
      await deleteDoc(doc(db, "reminders", selectedReminder.id));
      setReminders(
        reminders.filter((reminder) => reminder.id !== selectedReminder.id)
      );

      Alert.alert("Success", "Reminder deleted successfully!");
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting reminder:", error);
      Alert.alert("Error", "Failed to delete reminder.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Medicine Reminders</Text>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          Take your medicine on time as prescribed.
        </Text>

        <ScrollView style={styles.scrollContent}>
          {reminders.length > 0 ? (
            reminders.map((item) => (
              <View key={item.id} style={styles.reminderCard}>
                <Image
                  source={require("./Pharma.png")}
                  style={styles.reminderImage}
                />
                <View style={styles.reminderDetails}>
                  <Text style={styles.reminderName}>{item.medicineName}</Text>
                  <Text style={styles.reminderTime}>Time: {item.time}</Text>
                  <Text style={styles.reminderDosage}>
                    Dosage: {item.dosage} mg
                  </Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => openEditModal(item)}>
                    <Text style={styles.actionButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openDeleteModal(item)}>
                    <Text style={styles.actionButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>No reminders available.</Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("./addreminders")}
        >
          <Text style={styles.addButtonText}>Add New Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Reminder Modal */}
      <Modal isVisible={isEditModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Reminder</Text>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Medicine Name"
          />
          <TextInput
            style={styles.input}
            value={editedTime}
            onChangeText={setEditedTime}
            placeholder="Time (e.g., 8:00 AM)"
          />
          <TextInput
            style={styles.input}
            value={editedDosage}
            onChangeText={setEditedDosage}
            placeholder="Dosage (mg)"
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateReminder}>
              <Text style={styles.updateButton}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isVisible={isDeleteModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Reminder?</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete this reminder?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteReminder}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.navigation}>
        <Navigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between", // Ensures the button stays visible
    width: "100%",
  },

  infoText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContent: {
    width: "100%",
    flexGrow: 1,
  },
  reminderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  reminderDetails: {
    flex: 1,
  },
  reminderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  reminderTime: {
    fontSize: 14,
    color: "#666",
  },
  reminderDosage: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 70, // Ensures it's always at the bottom
    width: "90%", // Makes it responsive
  },

  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  // Modal Styles
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    padding: 10,
  },
  updateButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28A745",
    padding: 10,
  },
  deleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC3545",
    padding: 10,
  },

  // Bottom Navigation
  navigation: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default Reminders;
