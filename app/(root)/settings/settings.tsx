import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Modal,
  SafeAreaView, // Import SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Navigation from "../navigation/navigation";

interface ListItemProps {
  icon: ImageSourcePropType;
  text: string;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.listText}>{text}</Text>
  </TouchableOpacity>
);

const Settings: React.FC = () => {
  const router = useRouter();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isMemoryModalVisible, setMemoryModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userSession");
      router.push("/pages/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Use SafeAreaView to avoid content going behind the notch */}
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Settings</Text>

          {/* Accounts Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accounts</Text>
            <View style={styles.card}>
              <ListItem
                icon={require("./Profile.png")}
                text="Edit Profile"
                onPress={() => router.push("/editprofile/editprofile")}
              />
              <ListItem
                icon={require("./Notifications.png")}
                text="Notifications"
                onPress={() => router.push("/notifications/notifications")}
              />
              <ListItem
                icon={require("./MedicationHostory.png")}
                text="Medication History"
                onPress={() =>
                  router.push("/medicationhistory/medicationhistory")
                }
              />
            </View>
          </View>

          {/* Actions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            <View style={styles.card}>
              <ListItem
                icon={require("./Flag.png")}
                text="Report a Problem"
                onPress={() => router.push("/report-problem/reportproblem")}
              />
              <ListItem
                icon={require("./Cart.png")}
                text="Become a Merchant"
                onPress={() => router.push("/become-merchant/becomemerchant")}
              />
              <ListItem
                icon={require("./Exit.png")}
                text="Free Up Space"
                onPress={() => setMemoryModalVisible(true)}
              />
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.card}>
              <ListItem
                icon={require("./Help.png")}
                text="Help and Support"
                onPress={() => router.push("/helpandsupport/helpsupport")}
              />
              <ListItem
                icon={require("./Info.png")}
                text="Terms and Conditions"
                onPress={() => router.push("/termsconditions/termsconditions")}
              />
              <ListItem
                icon={require("./Clipboard.png")}
                text="Privacy Policy"
                onPress={() => router.push("/privacypolicy/privacypolicy")}
              />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Logout Confirmation Modal */}
        <Modal
          visible={isLogoutModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Are you sure you want to Logout?
              </Text>
              <Text style={styles.modalBody}>
                Once you are logged out, you have to log in again to use any
                features of MediMate.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => {
                    setLogoutModalVisible(false);
                    handleLogout();
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => setLogoutModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Clear Memory Confirmation Modal */}
        <Modal
          visible={isMemoryModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMemoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Are you sure you want to Clear Memory?
              </Text>
              <Text style={styles.modalBody}>
                Once you clear memory, you have to log in again and downlaod all
                thing to get all the data.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => {
                    setMemoryModalVisible(false);
                    //* Add your logic to clear memory here */
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => setMemoryModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.navigation}>
          <Navigation />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
    marginTop: 20,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#000",
    fontWeight: "300",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  listText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  logoutButton: {
    alignSelf: "center",
    marginTop: 30,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  logoutText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalBody: {
    fontSize: 14,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonYes: {
    backgroundColor: "#FF4D4D", // Red
  },
  modalButtonNo: {
    backgroundColor: "#4CAF50", // Green
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  navigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd", // Optional styling for navigation separator
    backgroundColor: "#fff",
  },
});

export default Settings;
