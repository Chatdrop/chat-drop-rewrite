import { ScrollView, View } from "react-native";
import { styleConstants } from "../../config/styleConstants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBarAwareScrollView(props) {
    const insets = useSafeAreaInsets()
    return (
        <ScrollView {...props} >
            {props.children}
            <View style={{height: styleConstants.tabBarHeight + insets.bottom + styleConstants.padding }} ></View>
        </ScrollView>
    )
}
