import ImageCard, { UserCardData } from "@/component/ImageCardSection/ImageCard";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoImage() {
    // 1. Data array with custom aspect ratios and background tint colors
    const userData: (UserCardData & { id: string })[] = [
        {
            id: "1",
            username: "Shashwat Anand",
            imageSource: require("../../../assets/qq.jpg"),
            aspectRatio: 0.8, // Tall / Portrait (4:5)
            bgColor: "#E0E7FF", // Soft Indigo
        },
        {
            id: "2",
            username: "Raj Deep",
            imageSource: require("../../../assets/ww.jpg"),
            aspectRatio: 1.2, // Wide / Landscape
            bgColor: "#FEF3C7", // Soft Amber
        },
        {
            id: "3",
            username: "Puma RS-X",
            imageSource: require("../../../assets/qq.jpg"),
            aspectRatio: 1, // Square (1:1)
            bgColor: "#DCFCE7", // Soft Mint
        },
        {
            id: "4",
            username: "Gel-Kayano 14",
            imageSource: require("../../../assets/ww.jpg"),
            aspectRatio: 0.75, // Extra Tall Portrait
            bgColor: "#F3E8FF", // Soft Purple
        },
    ];

    // 2. Separate array items into even and odd columns for Bento Masonry Layout
    const leftColumn = userData.filter((_, index) => index % 2 === 0);
    const rightColumn = userData.filter((_, index) => index % 2 !== 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Trending Collection</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add-outline" size={16} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.bentoGrid}>
                    {/* Left Column */}
                    <View style={styles.column}>
                        {leftColumn.map((user) => (
                            <ImageCard key={user.id} data={user} />
                        ))}
                    </View>

                    {/* Right Column */}
                    <View style={styles.column}>
                        {rightColumn.map((user) => (
                            <ImageCard key={user.id} data={user} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        width: '100%'
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111827",
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    bentoGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        width: "48.5%", // Fits 2 masonry columns seamlessly
    },
    addBtn: {
        borderWidth: 1,
        width: 30,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: '#9f1c62',
        borderColor: '#9f1c62',
        shadowColor: '#9f1c62'
    }
});