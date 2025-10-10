import React, { useState } from "react";
import { Image, View, TouchableOpacity, Dimensions, Pressable } from "react-native";
import swipeCardStyles from "./styles";
import XIcon from "../../assets/svg/x.svg";
import LikeIcon from "../../assets/svg/like.svg";
import RoundButton from "../RoundButton";
import StyledText from "../StyledText";
import { useTheme } from "@react-navigation/native";
import { styleConstants } from "../../config/styleConstants";

function diff_years(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff / 365.25));
}

export default SwipeCard = ({ user = {
    name: 'Emma',
    uid: 1,
    birthdate: '1998-05-15T00:00:00.000Z',
    photos: [
        'https://picsum.photos/300/400?random=1',
        'https://picsum.photos/300/400?random=2',
        'https://picsum.photos/300/400?random=3',
        'https://picsum.photos/300/400?random=4',
    ],
    location: 'Istanbul, Turkey'
}, onLike, onPass, onSuperLike, onChat, onStar, onExamine }) => {
    const theme = useTheme();
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    // Enhanced filler data with multiple photos

    const userData = user;
    const currentAge = diff_years(new Date(), new Date(userData.birthdate));

    const dims = Dimensions.get('window');

    return (
            <Pressable onPress={() => onExamine(userData.uid)} style={[swipeCardStyles.card, {top: 0}]}>
            {/* Main photo */}
            <Image
                source={{ uri: userData.photos[selectedPhotoIndex] }}
                style={swipeCardStyles.image}
                resizeMode="cover"
            />
            
            {/* Overlay content */}
            <View style={swipeCardStyles.overlayContainer}>
                {/* Profile info at top */}
                <View style={swipeCardStyles.topSection}>
                    <TouchableOpacity 
                        onPress={() => console.log("profile navigation")} 
                        activeOpacity={0} 
                        style={swipeCardStyles.profileTouchArea} 
                    />
                    <View>
                        <StyledText style={swipeCardStyles.nameText}>
                            {userData.name}, {currentAge}{' '}
                            <View style={swipeCardStyles.statusBadge}>
                                <StyledText style={swipeCardStyles.statusText}>Seen 3h Ago</StyledText>
                            </View>
                        </StyledText>
                        <StyledText style={swipeCardStyles.locationText}>{userData.location}</StyledText>
                    </View>
                    <View style={swipeCardStyles.distanceContainer}>
                        {/* Distance info can go here */}
                    </View>
                </View>

                {/* Photo indicators */}
                <View style={swipeCardStyles.photoIndicators}>
                    {userData.photos.map((_, i) => (
                        <View 
                            key={i}
                            style={[
                                swipeCardStyles.indicator,
                                { opacity: i === selectedPhotoIndex ? 1 : 0.6 }
                            ]} 
                        />
                    ))}
                </View>

                {/* Spacer for layout */}
                <View style={swipeCardStyles.photoNavigation}>
                </View>

                {/* Action buttons */}
                <View style={swipeCardStyles.buttonsContainer}>
                    <RoundButton 
                        Icon={() => <StyledText style={{color: 'white', fontSize: 20}}>★</StyledText>} 
                        size={60} 
                        iconSize={30} 
                        backgroundColor='#F21D5B' 
                        onPress={() => onSuperLike(userData.uid)}
                    />
                    <RoundButton 
                        Icon={LikeIcon} 
                        size={60} 
                        iconSize={60} 
                        backgroundColor='#FFFFFF' 
                        color="black"
                        onPress={() => onLike(userData.uid)}
                    />
                    <RoundButton 
                        size={40} 
                        iconSize={20} 
                        backgroundColor='transparent' 
                        Icon={XIcon} 
                        onPress={() => onPass(userData.uid)}
                    />
                    <RoundButton 
                        Icon={() => <StyledText style={{color: 'black', fontSize: 20}}>💬</StyledText>} 
                        size={60} 
                        backgroundColor='white' 
                        iconSize={60} 
                        onPress={() => onChat(userData.uid)}
                    />
                    <RoundButton 
                        Icon={() => <StyledText style={{color: 'white', fontSize: 20}}>⭐</StyledText>} 
                        size={60} 
                        backgroundColor='black' 
                        iconSize={35} 
                        onPress={() => onStar(userData.uid)}
                    />
                </View>
            </View>
        </Pressable>
    );
};
