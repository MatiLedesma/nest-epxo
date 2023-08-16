import { router } from "expo-router";
import { View, StyleSheet, Platform, FlatList, Dimensions } from "react-native";
import {
  Appbar,
  Modal,
  PaperProvider,
  Portal,
  TextInput,
  Button,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { data } from "../config/data";
import renderItem from "../renders/item.render";

const { width } = Dimensions.get("window");

export default function App() {
  const [users, setUsers] = useState(data);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
  });

  const removeItem = (i) => {
    const data = users;
    setUsers(data.filter((value) => value.id !== i.id));
    console.log("removed " + i.name);
  };

  const addItem = () => {
    const data = users;
    if (!(user.email !== "" || user.lastname !== "" || user.name !== ""))
      return;
    setUser((state) => ({ ...state, id: (users.length + 1).toString() }));
    data.push(user);
    setUsers(data);
    setUser({ name: "", lastname: "", email: "" });
    Platform.OS !== "web" && setVisible(!visible);
  };

  return (
    <>
      {Platform.OS !== "web" ? (
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
      ) : (
        <View style={styles.container}>
          <Appbar.Header statusBarHeight={10}>
            <Appbar.Content title="Header web" />
            <Appbar.Action onPress={() => router.push("/home")} icon="home" />
          </Appbar.Header>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              style={{ flex: 1 }}
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderItem(item, removeItem)}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <TextInput
                label="Name"
                value={user.name}
                onChangeText={(value) =>
                  setUser((state) => ({ ...state, name: value }))
                }
                style={{
                  width: width * 0.4,
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
                  width: width * 0.4,
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
                  width: width * 0.4,
                  backgroundColor: "rgba(0,0,0,0)",
                  marginVertical: 12,
                }}
              />
              <Button
                onPress={addItem}
                icon="plus"
                mode="contained"
                style={{ width: width * 0.4, marginVertical: 12 }}
              >
                Agregar
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
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
