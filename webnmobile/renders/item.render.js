import { Platform, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Divider, IconButton, Text } from "react-native-paper";
import renderRightActions from "./right.actions.render";

const renderItem = (item, onRemove) => {
  return (
    <>
      {Platform.OS !== "web" ? (
        <>
          <Swipeable
            containerStyle={styles.itemContainer}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, item, (i) => onRemove(i))
            }
          >
            <Text style={{ paddingLeft: 12 }}>
              {item.name} {item.lastname}
            </Text>
          </Swipeable>
          <Divider />
        </>
      ) : (
        <View
          style={[
            styles.itemContainer,
            { borderBottomColor: "#DFDFDF", borderBottomWidth: 1 },
          ]}
        >
          <Text style={{ paddingLeft: 12 }}>
            {item.name} {item.lastname}
          </Text>
          <View style={styles.itemButtonContainer}>
            <IconButton
              onPress={() => onRemove(item)}
              icon="delete"
              iconColor="red"
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  itemButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default renderItem;
