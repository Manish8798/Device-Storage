import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";

export default function App() {
  React.useEffect(() => {
    getStorage();
  }, []);
  const [storage, setStorage] = React.useState({
    usedStorage: 0,
    availableStorage: 0,
  });
  const [width, setWidth] = React.useState();
  const getStorage = async () => {
    let freeSpace = await FileSystem.getFreeDiskStorageAsync();
    let totalSpace = await FileSystem.getTotalDiskCapacityAsync();
    freeSpace = (freeSpace / 1000000000).toFixed(1);
    totalSpace = (totalSpace / 1000000000).toFixed(1);
    let used = (totalSpace - freeSpace).toFixed(1);
    setStorage({ usedStorage: used, availableStorage: freeSpace });
    let percent = Math.round(Math.abs((100 * used) / totalSpace - 100)) + "%";
    console.log(
      `free space ${freeSpace} GB, total space ${totalSpace} GB, used space ${used} GB, percentage ${percent}`
    );
    setWidth(percent);
  };

  return (
    <View style={styles.container}>
    <Text style={{fontWeight: 'bold', fontSize: 18}}>Device Storage</Text>
      <View style={styles.storageView}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#54A093", width: width },
          ]}
        ></Animated.View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%'
        }}
      >
        <Text>{`${storage?.usedStorage} GB used`}</Text>
        <Text>{`${storage?.availableStorage} GB available`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  storageView: {
    height: 20,
    backgroundColor: "#C9E4DF",
    width: "100%",
    marginVertical: 10,
  },
});
