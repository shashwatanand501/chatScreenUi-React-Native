import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DirectChatScreen({ route, navigation }: any) {
  // Read passed parameters
  const { userName, initialMessages } = route.params;

  // Initialize messages state with whatever was passed (can be empty [])
  const [messages, setMessages] = useState(initialMessages || []);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "me",
    };

    setMessages((prev: any) => [...prev, newMsg]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}</Text>
      </View>

      {/* Chat Messages or Empty Glass Placeholder */}
      <View style={styles.body}>
        {messages.length === 0 ? (
          // --- EMPTY GLASS STATE ---
          <View style={styles.emptyContainer}>
            <Ionicons name="wine-outline" size={80} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Empty Glass!</Text>
            <Text style={styles.emptySubtext}>
              No messages here yet. Say hello to {userName} to start the conversation!
            </Text>
          </View>
        ) : (
          // --- EXISTING MESSAGES LIST ---
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubble,
                  item.sender === "me" ? styles.myBubble : styles.otherBubble,
                ]}
              >
                <Text
                  style={
                    item.sender === "me" ? styles.myText : styles.otherText
                  }
                >
                  {item.text}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backText: { fontSize: 18, color: "#5a33a998", marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  body: { flex: 1, paddingHorizontal: 15 },
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 8,
  },

  // Message Bubble Styles
  bubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: "80%",
  },
  myBubble: { alignSelf: "flex-end", backgroundColor: "#5a33a998" },
  otherBubble: { alignSelf: "flex-start", backgroundColor: "#F3F4F6" },
  myText: { color: "#FFF" },
  otherText: { color: "#1F2937" },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: "#5a33a998",
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});