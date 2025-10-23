import { View, TouchableOpacity, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import StyledText from "../../../../../components/StyledText";

export default function ChatListItem(props = { 
  first_name: "", 
  last_name: "", 
  photo_url: "", 
  last_msg: { content: "", stamp: null }, 
  is_read: false, 
  badge_count: 0, 
  onPress: () => {} 
}) {
  const theme = useTheme();

  // Determine styles based on read/unread status
  const isRead = props?.is_read;
  const backgroundColor = isRead ? "transparent" : theme.colors.card;
  const nameColor = isRead ? theme.colors.text : theme.colors.onlineGreen;
  const messageColor = isRead ? theme.colors.lightGrey : theme.colors.text;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        marginVertical: 2,
        borderWidth: 1,
        backgroundColor: backgroundColor,
        borderRadius: 40,
        padding: 10,
        borderColor: theme.colors.card,
        marginBottom: 10
      }}
    >
      <View style={{ width: 50, height: 50, borderRadius: 25, overflow: "hidden", backgroundColor: theme.colors.lightGrey }}>
        {props.photo_url ? (
          <Image 
            source={props.photo_url} 
            style={{ width: "100%", height: "100%" }} 
          />
        ) : null}
      </View>
      <View style={{ flex: 1, margin: 5, marginHorizontal: 10 }}>
        <View style={{ flex: 1 }}>
          <StyledText style={{ fontSize: 16, fontWeight: "700", color: nameColor }}>
            {props.first_name + " " + props.last_name}
          </StyledText>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <StyledText
            style={{
              fontSize: 14,
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "500",
              color: messageColor,
            }}
          >
            {props.last_msg?.content || ""}
          </StyledText>
        </View>
      </View>
      <View style={{ width: 50, height: 50 }}>
        <View style={{ flex: 1 }}>
          <StyledText
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
            }}
          >
            {props.last_msg?.stamp && new Date(props.last_msg.stamp).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </StyledText>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {props.badge_count > 0 ? (
            <View
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <StyledText style={{ color: "white" }}>{props.badge_count}</StyledText>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
