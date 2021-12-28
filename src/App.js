import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView
} from "react-native";
const { width, height } = Dimensions.get("screen");
import faker from "faker";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men"
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email()
  };
});

const SPACING = 20;
const AVATAR_SIZE = 80;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "white",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{ scale }]
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                  marginTop: 8
                }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>
                  {item.email}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={{
                      width: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 32,
                      borderRadius: 4,
                      elevation: 3,
                      backgroundColor: "#F47340",
                      marginTop: 5,
                      marginLeft: 30
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 10,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#121212"
                      }}
                    >
                      Hire!
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 32,
                      borderRadius: 4,
                      elevation: 3,
                      backgroundColor: "#F47340",
                      marginTop: 5,
                      marginLeft: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 10,
                        fontWeight: "bold",
                        letterSpacing: 0.25,
                        color: "#121212"
                      }}
                    >
                      View
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
