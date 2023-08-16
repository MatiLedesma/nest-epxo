import { Animated, View } from "react-native";
import { IconButton } from "react-native-paper";

const renderRightActions = (progress, dragX, item, callback) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ backgroundColor: "#E1E1E1" }}>
          <Animated.View style={{ transform: [{ scale: trans }] }}>
            <IconButton
              icon="pencil"
              size={30}
              onPress={() => console.log(item)}
            />
          </Animated.View>
        </View>
        <View style={{ backgroundColor: "#FF9999" }}>
          <Animated.View style={{ transform: [{ scale: trans }] }}>
            <IconButton
              icon="delete"
              size={30}
              iconColor="#B00000"
              onPress={() => callback(item)}
            />
          </Animated.View>
        </View>
      </View>
    );
  };

  export default renderRightActions;