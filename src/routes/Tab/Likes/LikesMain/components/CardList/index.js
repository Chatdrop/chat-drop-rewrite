import { Image, View } from "react-native";
import cardListStyles from "./styles";
import XIcon from "../../../../../../assets/svg/x.svg";
import LikeIcon from "../../../../../../assets/svg/like.svg";
import RoundButton from "../../../../../../components/RoundButton";
import { useTheme } from "@react-navigation/native";

export default CardList = ({ disabled, like_press, dispose_press, style, ...props }) => {
    const theme = useTheme();

    // Filler image URLs - using placeholder images
    const fillerImages = [
        'https://picsum.photos/300/400?random=1',
        'https://picsum.photos/300/400?random=2',
        'https://picsum.photos/300/400?random=3',
        'https://picsum.photos/300/400?random=4',
        'https://picsum.photos/300/400?random=5',
    ];

    const imageUrl = props.photo_url || fillerImages[Math.floor(Math.random() * fillerImages.length)];

    return (
        <View style={[cardListStyles.card, props["quick_match_accept_key"] && { borderColor: theme.colors.primary }, style]}>
            <Image
                source={{ uri: imageUrl }}
                style={cardListStyles.image}
                resizeMode="cover"
                blurRadius={disabled ? 20 : 0}
            />
            <View style={cardListStyles.buttonContainer}>
                <View style={{ flex: 1 }}></View>
                <View style={cardListStyles.bottomButtons}>
                    {!disabled && (
                        <>
                            <RoundButton
                                size={50}
                                iconSize={40}
                                color="black"
                                backgroundColor='white'
                                Icon={LikeIcon}
                                onPress={like_press}
                            />
                            <RoundButton
                                color="white"
                                backgroundColor='#2d2d2a'
                                size={50}
                                iconSize={25}
                                Icon={XIcon}
                                borderColor="transparent"
                                onPress={dispose_press}
                            />
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};
