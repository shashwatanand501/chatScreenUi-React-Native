import CustomSearchBar from "@/component/CustomSearchBar/CustomSearchBar";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define what a User and a Chat Object look like
type User = {
  id: string;
  name: string;
};

type ChatConversation = {
  userId: string;
  userName: string;
  messages: { id: string; text: string; sender: "me" | "other" }[];
};

// Initial chats (Old Chats)
const INITIAL_CHATS: ChatConversation[] = [
  {
    userId: "1",
    userName: "Alice Johnson",
    messages: [
      { id: "m1", text: "Hey! Are we still meeting today?", sender: "other" },
      { id: "m2", text: "Yes! See you at 5 PM.", sender: "me" },
    ],
  },
  {
    userId: "2",
    userName: "Bob Smith",
    messages: [
      { id: "m1", text: "Did you check the project files?", sender: "other" },
    ],
  },
];

export default function ChatListScreen({ navigation }: any) {
  // Store all existing chats in React State
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CHATS);

  // Function to open direct chat (Handles both OLD and NEW chats)
  const handleOpenChat = (selectedUser: User) => {
    // 1. Check if we already have a conversation with this user
    const existingChat = conversations.find(
      (chat) => chat.userId === selectedUser.id
    );

    // 2. Extract existing messages, OR pass an empty array if it's a new user
    const existingMessages = existingChat ? existingChat.messages : [];

    // 3. Navigate to Direct Chat Screen
    navigation.navigate("DirectChat", {
      userId: selectedUser.id,
      userName: selectedUser.name,
      initialMessages: existingMessages, // Empty array [] if new user!
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar at Top */}
      <View style={styles.searchSection}>
        <CustomSearchBar onSelectItem={(user) => handleOpenChat(user)} />
      </View>

      {/* List of Old / Recent Chats */}
      <View style={styles.chatListSection}>
        <Text style={styles.title}>Recent Chats</Text>

        <FlatList
          data={conversations}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => {
            const lastMsg = item.messages[item.messages.length - 1]?.text || "No messages yet";
            return (
              <TouchableOpacity
                style={styles.chatCard}
                onPress={() =>
                  handleOpenChat({ id: item.userId, name: item.userName })
                }
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.userName[0]}</Text>
                </View>
                <View style={styles.chatInfo}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMsg}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  searchSection: { paddingTop: 10, zIndex: 10 },
  chatListSection: { flex: 1, paddingHorizontal: 15, marginTop: 15 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#5a33a998",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFF", fontWeight: "bold", fontSize: 18 },
  chatInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  lastMessage: { fontSize: 14, color: "#6B7280", marginTop: 2 },
});