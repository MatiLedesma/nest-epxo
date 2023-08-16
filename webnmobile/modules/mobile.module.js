import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
} from "react-native-paper";

export default function MobileModule({users}) {
  const [visible, setVisible] = useState(false);
  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar translucent />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(!visible)}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.modalContainer}>
              <TextInput
                label="Name"
                value={user.name}
                onChangeText={(value) =>
                  setUser((state) => ({ ...state, name: value }))
                }
                style={{
                  width: width * 0.7,
                  backgroundColor: "rgba(0,0,0,0)",
                  marginVertical: 12,
                }}
              />
              <TextInput
                label="Lastname"
                value={user.lastname}
                onChangeText={(value) =>
                  setUser((state) => ({ ...state, lastname: value }))
                }
                style={{
                  width: width * 0.7,
                  backgroundColor: "rgba(0,0,0,0)",
                  marginVertical: 12,
                }}
              />
              <TextInput
                label="Email"
                value={user.email}
                onChangeText={(value) =>
                  setUser((state) => ({ ...state, email: value }))
                }
                style={{
                  width: width * 0.7,
                  backgroundColor: "rgba(0,0,0,0)",
                  marginVertical: 12,
                }}
              />
              <Button
                onPress={addItem}
                icon="plus"
                mode="contained"
                style={{ width: width * 0.7, marginVertical: 12 }}
              >
                Agregar
              </Button>
            </View>
          </Modal>
        </Portal>
        <Appbar.Header statusBarHeight={10}>
          {/* {router.canGoBack() && (
          <Appbar.BackAction onPress={() => router.back()} />
        )} */}
          <Appbar.Content title="Header mobile" />
          <Appbar.Action onPress={() => router.push("/home")} icon="home" />
          <Appbar.Action onPress={() => setVisible(!visible)} icon="plus" />
        </Appbar.Header>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item, removeItem)}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  modalContainer: {
    margin: "auto",
    width: width * 0.8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
