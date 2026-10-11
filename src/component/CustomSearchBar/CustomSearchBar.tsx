import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type ChatItem = {
    id: string;
    name: string;
};

type CustomSearchBarProps = {
    onSelectItem?: (item: ChatItem) => void;
};

const SAMPLE_CHATS: ChatItem[] = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Brown" },
    { id: "4", name: "David Miller" },
    { id: "5", name: "Emma Watson" },
];

export default function CustomSearchBar({ onSelectItem }: CustomSearchBarProps) {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredResults = query.trim()
        ? SAMPLE_CHATS.filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    // 1. Handle typing
    const handleTextChange = (text: string) => {
        setQuery(text);
        setShowDropdown(text.trim().length > 0);
    };

    // 2. Handle selecting an item from the dropdown
    const handleSelectItem = (item: ChatItem) => {
        setQuery(item.name);       // Fill search bar with selected name
        setShowDropdown(false);    // Hide the dropdown list
        if (onSelectItem) {
            onSelectItem(item);    // Send selected object to parent screen
        }
    };

    // 3. Handle clearing the search field
    const handleClear = () => {
        setQuery("");
        setShowDropdown(false);
    };

    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="black"
                    style={styles.searchTextBar}
                    value={query}
                    onChangeText={handleTextChange}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Render Dropdown List */}
            {showDropdown && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={filteredResults}
                        keyExtractor={(item) => item.id}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => handleSelectItem(item)} // Handle click
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View style={styles.dropdownItem}>
                                <Text style={styles.noResultsText}>No results found</Text>
                            </View>
                        }
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: 10,
        zIndex: 10,
    },
    inputWrapper: {
        position: "relative",
        justifyContent: "center",
    },
    searchTextBar: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        paddingRight: 40, // Space for clear button
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    clearButton: {
        position: "absolute",
        right: 15,
        padding: 5,
    },
    clearButtonText: {
        fontSize: 16,
        color: "gray",
        fontWeight: "bold",
    },
    dropdown: {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        borderRadius: 10,
        maxHeight: 200,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    itemText: {
        fontSize: 15,
        color: "#1F2937",
    },
    noResultsText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
    },
});