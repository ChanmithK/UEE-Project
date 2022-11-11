import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { getDatabase, get, ref, onValue, off, update } from "firebase/database";
import TopBar from "../../components/Common/TopBar";

const Chat = ({ navigator, route }) => {
  const myData = route.params.user;
  const selectedUser = route.params.reciever;

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      if (myChatroom.messages) {
        setMessages(renderMessages(myChatroom.messages));
      } else {
        setMessages([]);
      }
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    var chatroomRef = null;
    myData.friends.find((friend) => {
      if (friend.username === selectedUser.username) {
        chatroomRef = ref(database, `chatrooms/${friend.chatroomId}`);
        onValue(chatroomRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.messages) {
            setMessages(renderMessages(data.messages));
          }
        });
      }
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages]);

  const renderMessages = useCallback(
    (msgs) => {
      //structure for chat library:
      // msg = {
      //   _id: '',
      //   user: {
      //     avatar:'',
      //     name: '',
      //     _id: ''
      //   }
      // }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
              avatar:
                msg.sender === myData.username
                  ? myData.avatar
                  : selectedUser.avatar,
              name:
                msg.sender === myData.username
                  ? myData.username
                  : selectedUser.username,
            },
          }))
        : [];
    },
    [myData.avatar, myData.username, selectedUser.avatar, selectedUser.username]
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    var chatroomRef = myData.friends.find((friend) => {
      if (friend.username === selectedUser.username) {
        return ref(database, `chatrooms/${friend.chatroomId}`);
      }
    });
    const snapshot = await get(chatroomRef.chatroomId);
    return snapshot.val() ? snapshot.val() : {};
  }, [selectedUser]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server


      var chatroomRef = myData.friends.find((friend) => {
        if (friend.username === selectedUser.username) {
          return ref(database, `chatrooms/${friend.chatroomId}`);
        }
      });
      // const snapshot = chatroomRef.chatroomId;

      const snapshot = await get(
        ref(database, `chatrooms/${chatroomRef.chatroomId}`)
      );
      const currentChatroom = snapshot.val() ? snapshot.val() : {};

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${chatroomRef.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.username,
            createdAt: new Date(),
          },
        ],
      });
      
      setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, myData.username]
  );

  return (
    <>
      <View style={{ paddingVertical: 25 }}>
        <TopBar title={selectedUser.username} />
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: myData.username,
        }}
      />
    </>
  );
};

export default Chat;
