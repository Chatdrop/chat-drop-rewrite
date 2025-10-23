import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import StyledText from '../StyledText';

const ProfileCircle = ({ 
  imageSource = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  percentage = 70,
  onEditPress,
  size = 200
}) => {
  const strokeWidth = 6;
  const imageSize = size - strokeWidth * 2;
  const radius = imageSize / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Profile Circle Container */}
      <View style={{ width: size, height: size }}>
        {/* Profile Image */}
        <View style={[styles.imageContainer, { 
          width: imageSize, 
          height: imageSize,
          borderRadius: imageSize / 2,
          top: strokeWidth,
          left: strokeWidth
        }]}>
          <Image
            source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
            style={[styles.image, { 
              width: imageSize, 
              height: imageSize,
              borderRadius: imageSize / 2
            }]}
          />
        </View>

        {/* Progress Circle Overlay - Inside the image */}
        <Svg 
          width={imageSize} 
          height={imageSize} 
          style={{
            position: 'absolute',
            top: strokeWidth,
            left: strokeWidth
          }}
        >
          {/* Background Circle - Transparent dark */}
          <Circle
            cx={imageSize / 2}
            cy={imageSize / 2}
            r={radius - strokeWidth / 2}
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress Circle - Pink */}
          <Circle
            cx={imageSize / 2}
            cy={imageSize / 2}
            r={radius - strokeWidth / 2}
            stroke="#F21D5B"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            rotation="-90"
            origin={`${imageSize / 2}, ${imageSize / 2}`}
          />
        </Svg>

        {/* Edit Button */}
        <TouchableOpacity 
          style={[styles.editButton, { 
            right: size * 0.05,
            top: size * 0.05 
          }]} 
          onPress={onEditPress}
        >
          <View style={styles.editIconContainer}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                fill="#FFFFFF"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Percentage Text - Inside the image at bottom, half outside */}
        <View style={[styles.percentageContainer, {
          position: 'absolute',
          bottom: -16,
          alignSelf: 'center',
        }]}>
          <StyledText style={styles.percentageText} contentEmph>
            %{percentage} Tamamlandı
          </StyledText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  imageContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    minWidth: 130,
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: '#2F2F2F',
    borderRadius: 21,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});

export default ProfileCircle;

