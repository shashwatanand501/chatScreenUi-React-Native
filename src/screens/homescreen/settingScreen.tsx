import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    ActionSheetIOS,
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    // Pick from Gallery
    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Needed", "Please grant photo library permissions.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Take Photo
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Needed", "Please grant camera permissions.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Handle Image Picker Action Sheet
    const handleAvatarPress = () => {
        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["Cancel", "Take Photo", "Choose from Library", "Remove Photo"],
                    destructiveButtonIndex: imageUri ? 3 : undefined,
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) takePhoto();
                    if (buttonIndex === 2) pickFromGallery();
                    if (buttonIndex === 3) setImageUri(null);
                }
            );
        } else {
            Alert.alert("Profile Photo", "Choose an option", [
                { text: "Take Photo", onPress: takePhoto },
                { text: "Choose from Library", onPress: pickFromGallery },
                ...(imageUri
                    ? [{ text: "Remove Photo", onPress: () => setImageUri(null), style: "destructive" as const }]
                    : []),
                { text: "Cancel", style: "cancel" as const },
            ]);
        }
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Text style={styles.headerTitle}>Account Settings</Text>

            {/* Profile Avatar Section */}
            <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={handleAvatarPress}
                activeOpacity={0.8}
            >
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.avatarImage} />
                ) : (
                    <View style={styles.placeholderAvatar}>
                        <Ionicons name="person" size={56} color="#9CA3AF" />
                    </View>
                )}
                <View style={styles.cameraBadge}>
                    <Ionicons name="camera" size={18} color="#FFFFFF" />
                </View>
            </TouchableOpacity>

            <Text style={styles.changePhotoText}>Tap to change photo</Text>

            {/* User Information Card */}
            <View style={styles.userInformationContainer}>
                <View style={styles.infoRow}>
                    <View>
                        <Text style={styles.label}>USER NAME</Text>
                        <Text style={styles.userName}>John Doe</Text>
                    </View>
                    <Ionicons name="pencil-sharp" size={18} color="#6B7280" />
                </View>

                <View style={styles.divider} />

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginTop: 10,
        marginBottom: 25,
    },
    avatarWrapper: {
        position: "relative",
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    placeholderAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#2563EB",
        borderWidth: 2,
    },
    cameraBadge: {
        position: "absolute",
        bottom: 2,
        right: 2,
        backgroundColor: "#2563EB",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFFFFF",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    changePhotoText: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 10,
        marginBottom: 25,
    },
    userInformationContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    userName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginVertical: 16,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#EF4444",
    },
});