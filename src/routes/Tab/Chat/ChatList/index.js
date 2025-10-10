import { View, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ChatRequest from './components/ChatRequest';
import ChatListItem from './components/ChatListItem';
import TabBarAwareScrollView from '../../../../components/TabBarAwareScrollView';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyledTextDynamic from '../../../../components/StyledTextDynamic';
import EmptyContent from '../../../../components/EmptyContent';

// Mock data for demonstration - replace with actual data
const mockChatData = [
  {
    id: 1,
    first_name: "Ahmet",
    last_name: "Asilli",
    photo_url: "https://via.placeholder.com/50",
    last_msg: { content: "Merhaba nasılsın?", stamp: new Date().getTime() },
    is_read: false,
    badge_count: 2
  },
  {
    id: 2,
    first_name: "Zeynep",
    last_name: "Kaya",
    photo_url: "https://via.placeholder.com/50",
    last_msg: { content: "Görüşürüz", stamp: new Date().getTime() - 3600000 },
    is_read: true,
    badge_count: 0
  }
];

const mockRequestData = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    message: "Merhaba, tanışabilir miyiz?",
    photo: require('../../../../assets/png/friendship.png')
  },
  {
    id: 2,
    name: "Ayşe Demir",
    message: "Selam, nasılsın?",
    photo: require('../../../../assets/png/love.png')
  }
];

export default function ChatList() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const tab = navigation.getParent();
  const { setOptions } = tab || {};
  const focus = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState(mockChatData);

  const chat_list_click = (userId) => {
    // Stub navigation - replace with actual navigation
    console.log('Navigate to chat with user:', userId);
    // navigation.navigate('ChatUiActual', { user_uid: userId });
  };

  useEffect(() => {
    if (!focus) { return }
    console.log("chatlist effect", focus);

    if (setOptions) {
      setOptions({
        tabBarStyle: { 
          backgroundColor: '#2D2D2A', 
          position: 'absolute', 
          marginBottom: insets.bottom, 
          borderRadius: 35, 
          borderColor: "white", 
          paddingBottom: 0, 
          paddingHorizontal: 10, 
          marginHorizontal: 15,
          borderTopWidth: 0 
        }
      });
    }

    // Stub data loading - replace with actual API call
    setLoading(false);
  }, [focus]);

  return (
    <TabBarAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 115 + 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <StyledTextDynamic text={"Mesajlar"} />
        {/* Uncomment when add functionality is needed
        <RoundButton
          size={50}
          iconSize={30}
          color="white"
          backgroundColor='#2d2d2a'
          Icon={PlusSvg}
          onPress={() => {
            // Add new chat functionality
          }}
        />
        */}
      </View>
      
      {/* Chat Requests Section */}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={{ flexDirection: "row", marginTop: 10 }}
      >
        {mockRequestData.map((item) => (
          <ChatRequest
            key={item.id}
            name={item.name}
            message={item.message}
            photo={item.photo}
            onAccept={() => console.log(`Accepted chat with ${item.name}`)}
            onReject={() => console.log(`Rejected chat with ${item.name}`)}
          />
        ))}
      </ScrollView>

      {/* Chat List Section */}
      {!loading && (
        <View style={[
          { marginTop: 20 }, 
          chatList.length === 0 && { paddingTop: 160 }
        ]}>
          {chatList.map(chat => (
            <ChatListItem
              key={"cl" + chat.id}
              is_read={chat.is_read}
              badge_count={chat.badge_count}
              onPress={() => {
                chat_list_click(chat.id);
              }}
              first_name={chat.first_name}
              last_name={chat.last_name}
              photo_url={chat.photo_url}
              last_msg={chat.last_msg}
            />
          ))}
          {chatList.length === 0 && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <EmptyContent description="Mesaj alanınız boş" />
            </View>
          )}
        </View>
      )}
    </TabBarAwareScrollView>
  );
}
