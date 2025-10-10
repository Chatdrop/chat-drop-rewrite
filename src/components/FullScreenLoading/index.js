import { ActivityIndicator, View } from "react-native";

export default function FullScreenLoading() {
    <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'red' }} >
        <ActivityIndicator size={"large"} color={'black'} ></ActivityIndicator>
    </View>
}

