import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type UserCardData = {
    username: string;
    imageSource: ImageSourcePropType;
    // Optional props for Bento Grid layout variations
    aspectRatio?: number; 
    bgColor?: string;
};

type ImageCardProps = {
    data: UserCardData;
};

export default function ImageCard({ data }: ImageCardProps) {
    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                { backgroundColor: data.bgColor || "#F3F4F6" },
            ]}
            activeOpacity={0.85}
        >
            {/* Header / Heart Icon */}
            <View style={styles.cardHeader}>
                <TouchableOpacity style={styles.iconCircle}>
                    <Ionicons name="heart-outline" size={16} color="#1F2937" />
                </TouchableOpacity>
            </View>

            {/* Image Component respecting aspect ratio */}
            <View style={styles.imageContainer}>
                <Image
                    source={data.imageSource}
                    style={[
                        styles.img,
                        { aspectRatio: data.aspectRatio || 1 }, // Default square (1:1) if not specified
                    ]}
                    resizeMode="cover"
                />
            </View>

            {/* User Label Footer */}
            <View style={styles.cardFooter}>
                <Text style={styles.usernameText} numberOfLines={1}>
                    {data.username}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        borderRadius: 20,
        padding: 12,
        marginBottom: 12,
        overflow: "hidden",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    iconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
    },
    img: {
        width: "100%",
        height:'auto'
    },
    cardFooter: {
        marginTop: 10,
    },
    usernameText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
});