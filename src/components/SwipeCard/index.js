import React, { useState, useRef } from "react";
import { Image, View, TouchableOpacity, Dimensions, Pressable, Animated } from "react-native";
import swipeCardStyles from "./styles";
import XIcon from "../../assets/svg/x.svg";
import LikeIcon from "../../assets/svg/like.svg";
import ChatIcon from "../../assets/svg/chat.svg";
import ThunderIcon from "../../assets/icons/thunder.png";
import StarIcon from "../../assets/icons/star.png";
import LikeImage from "../../assets/png/like.png";
import SuperLikeImage from "../../assets/png/superlike.png";
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
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const [showSuperLikeAnimation, setShowSuperLikeAnimation] = useState(false);
    
    // Animasyon değerleri
    const likeAnimScale = useRef(new Animated.Value(0)).current;
    const likeAnimOpacity = useRef(new Animated.Value(0)).current;
    const superLikeAnimScale = useRef(new Animated.Value(0)).current;
    const superLikeAnimOpacity = useRef(new Animated.Value(0)).current;

    // Enhanced filler data with multiple photos

    const userData = user;
    const currentAge = diff_years(new Date(), new Date(userData.birthdate));

    const dims = Dimensions.get('window');

    // Like animasyonunu tetikleyen fonksiyon
    const triggerLikeAnimation = () => {
        setShowLikeAnimation(true);
        
        // Animasyon değerlerini sıfırla
        likeAnimScale.setValue(0);
        likeAnimOpacity.setValue(0);
        
        // Animasyonu başlat
        Animated.parallel([
            Animated.sequence([
                // Önce büyüyerek belir (0 -> 1.2)
                Animated.spring(likeAnimScale, {
                    toValue: 1.2,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                // Sonra biraz küçül (1.2 -> 1)
                Animated.spring(likeAnimScale, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                })
            ]),
            Animated.sequence([
                // Önce tam görünür hale gel
                Animated.timing(likeAnimOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                // Biraz bekle
                Animated.delay(300),
                // Sonra kaybol
                Animated.timing(likeAnimOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ])
        ]).start(() => {
            // Animasyon bittiğinde state'i sıfırla
            setShowLikeAnimation(false);
        });
    };

    // SuperLike animasyonunu tetikleyen fonksiyon
    const triggerSuperLikeAnimation = () => {
        setShowSuperLikeAnimation(true);
        
        // Animasyon değerlerini sıfırla
        superLikeAnimScale.setValue(0);
        superLikeAnimOpacity.setValue(0);
        
        // Animasyonu başlat
        Animated.parallel([
            Animated.sequence([
                // Önce büyüyerek belir (0 -> 1.2)
                Animated.spring(superLikeAnimScale, {
                    toValue: 1.2,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                // Sonra biraz küçül (1.2 -> 1)
                Animated.spring(superLikeAnimScale, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                })
            ]),
            Animated.sequence([
                // Önce tam görünür hale gel
                Animated.timing(superLikeAnimOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                // Biraz bekle
                Animated.delay(300),
                // Sonra kaybol
                Animated.timing(superLikeAnimOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ])
        ]).start(() => {
            // Animasyon bittiğinde state'i sıfırla
            setShowSuperLikeAnimation(false);
        });
    };

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
                        Icon={() => <Image source={ThunderIcon} style={{width: 28, height: 28, tintColor: 'white'}} />} 
                        size={56} 
                        iconSize={28} 
                        backgroundColor='#F21D5B' 
                        borderWidth={0}
                        onPress={() => {
                            triggerSuperLikeAnimation();
                            onSuperLike(userData.uid);
                        }}
                    />
                    <RoundButton 
                        Icon={LikeIcon} 
                        size={56} 
                        iconSize={56} 
                        backgroundColor='#FFFFFF' 
                        color="black"
                        borderWidth={0}
                        onPress={() => {
                            triggerLikeAnimation();
                            onLike(userData.uid);
                        }}
                    />
                    <RoundButton 
                        size={38} 
                        iconSize={16} 
                        backgroundColor='transparent' 
                        Icon={XIcon}
                        borderWidth={1.5}
                        borderColor='white'
                        onPress={() => onPass(userData.uid)}
                    />
                    <RoundButton 
                        Icon={ChatIcon} 
                        size={56} 
                        backgroundColor='white' 
                        iconSize={56} 
                        color="black"
                        borderWidth={0}
                        onPress={() => onChat(userData.uid)}
                    />
                    <RoundButton 
                        Icon={() => <Image source={StarIcon} style={{width: 28, height: 28, tintColor: 'white'}} />} 
                        size={56} 
                        backgroundColor='black' 
                        iconSize={28}
                        borderWidth={0}
                        onPress={() => onStar(userData.uid)}
                    />
                </View>
            </View>

            {/* Like Animasyonu - Overlay Container'ın Dışında */}
            {showLikeAnimation && (
                <Animated.Image
                    source={LikeImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 180,
                        height: 180,
                        marginLeft: -90,
                        marginTop: -90,
                        transform: [{ scale: likeAnimScale }],
                        opacity: likeAnimOpacity,
                        zIndex: 999999,
                    }}
                    resizeMode="contain"
                />
            )}

            {/* SuperLike Animasyonu - Overlay Container'ın Dışında */}
            {showSuperLikeAnimation && (
                <Animated.Image
                    source={SuperLikeImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 180,
                        height: 180,
                        marginLeft: -90,
                        marginTop: -90,
                        transform: [{ scale: superLikeAnimScale }],
                        opacity: superLikeAnimOpacity,
                        zIndex: 999999,
                    }}
                    resizeMode="contain"
                />
            )}
        </Pressable>
    );
};
