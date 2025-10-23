import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Modal, StyleSheet } from "react-native";
import { styleConstants } from "../../config/styleConstants";
import StyledText from "../StyledText";
import ImageCropPicker from "react-native-image-crop-picker";
import Svg, { Path } from 'react-native-svg';

function Photo({ src, style, onDeletePress, onPress, ...rest }) {
    const theme = useTheme();
    const Wrapper = onPress ? TouchableOpacity : View;
  
    return (
      <Wrapper
        {...rest}
        onPress={onPress}
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            aspectRatio: 1,
            borderRadius: styleConstants.borderRadius,
            overflow: 'hidden',
          },
          !src && { backgroundColor: theme.colors.card },
          style,
        ]}
      >
        {src ? (
          <>
            <Image
              source={{ uri: src }}
              style={{
                flex: 1,
                width: '100%',
                aspectRatio: 1,
                borderRadius: styleConstants.borderRadius,
              }}
            />
            {typeof onDeletePress === "function" && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "transparent",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10,
                }}
                onPress={onDeletePress}
              >
                <StyledText style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold', lineHeight: 16 }}>×</StyledText>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: '#161616',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StyledText style={{ fontSize: 24, color: theme.colors.text, lineHeight: 24 }}>+</StyledText>
          </View>
        )}
      </Wrapper>
    );
}

const PhotosCard = ({
    photos = [''],
    editable = true,
    onChange = (updatedPhotos = [''])=>{}
})=>{
    // Prepare 9 slots - fill with photos or null
    const preparePhotoSlots = (photoList) => {
        if (!Array.isArray(photoList)) {
            photoList = [];
        }
        
        // Filter valid photos
        const validPhotos = photoList.filter(x => !!x && x !== "");
        
        // Create 9 slots
        const slots = [];
        for (let i = 0; i < 9; i++) {
            slots.push(validPhotos[i] || null);
        }
        
        return slots;
    };

    const [photoSlots, setPhotoSlots] = useState(preparePhotoSlots(photos));
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

    useEffect(()=>{
        setPhotoSlots(preparePhotoSlots(photos));
    }, [photos]);

    const handleImageSelected = (image) => {
        if (selectedSlotIndex === null) return;
        
        // Add the new photo
        const newSlots = [...photoSlots];
        newSlots[selectedSlotIndex] = "file://" + image.path;
        
        // Update state
        setPhotoSlots(newSlots);
        
        // Notify parent with valid photos
        const validPhotos = newSlots.filter(x => x !== null);
        onChange(validPhotos);
        
        // Reset
        setModalVisible(false);
        setSelectedSlotIndex(null);
    };

    const openGallery = () => {
        ImageCropPicker.openPicker({
            mediaType: "photo",
            cropping: true,
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            multiple: false,
            includeBase64: false,
            freeStyleCropEnabled: true,
        }).then(image => {
            handleImageSelected(image);
        }).catch(err => {
            console.log('Gallery cancelled or error:', err);
            setModalVisible(false);
        });
    };

    const openCamera = () => {
        ImageCropPicker.openCamera({
            mediaType: "photo",
            cropping: true,
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            includeBase64: false,
            freeStyleCropEnabled: true,
        }).then(image => {
            handleImageSelected(image);
        }).catch(err => {
            console.log('Camera cancelled or error:', err);
            setModalVisible(false);
        });
    };

    const photo_press = (idx) => {
        if (!editable) return;
        
        if (photoSlots[idx] === null) {
            // Empty slot - show modal
            setSelectedSlotIndex(idx);
            setModalVisible(true);
        }
    };

    const trash_click = (idx) => {
        if (!editable) return;
        
        // Remove photo from this slot
        const newSlots = [...photoSlots];
        newSlots[idx] = null;
        
        // Compact: move all photos to the beginning
        const validPhotos = newSlots.filter(x => x !== null);
        const compactedSlots = [];
        for (let i = 0; i < 9; i++) {
            compactedSlots.push(validPhotos[i] || null);
        }
        
        setPhotoSlots(compactedSlots);
        onChange(validPhotos);
    };

    return(
      <>
        <View style={{ width: '100%', aspectRatio: 1, gap: 10 }}>
          {[0, 3, 6].map(rowStart => (
            <View key={"row"+rowStart} style={{ flexDirection: 'row', gap: 10 }}>
              {[0, 1, 2].map(col => {
                const slotIndex = rowStart + col;
                const photo = photoSlots[slotIndex];
                
                return (
                  <Photo 
                    key={"slot"+slotIndex}
                    src={photo}
                    onDeletePress={editable && photo ? () => trash_click(slotIndex) : undefined}
                    onPress={() => photo_press(slotIndex)}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {/* Image Source Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={modalStyles.overlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={modalStyles.modalContainer}>
              <TouchableOpacity 
                activeOpacity={0.9}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={modalStyles.modalContent}>
                  <StyledText style={modalStyles.modalTitle}>Fotoğraf Ekle</StyledText>
                  
                  {/* Gallery Option */}
                  <TouchableOpacity 
                    style={modalStyles.option}
                    onPress={openGallery}
                  >
                    <View style={modalStyles.iconContainer}>
                      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                          fill="#FFFFFF"
                        />
                      </Svg>
                    </View>
                    <StyledText style={modalStyles.optionText}>Galeriden Seç</StyledText>
                  </TouchableOpacity>

                  {/* Camera Option */}
                  <TouchableOpacity 
                    style={modalStyles.option}
                    onPress={openCamera}
                  >
                    <View style={modalStyles.iconContainer}>
                      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path
                          d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"
                          fill="#FFFFFF"
                        />
                      </Svg>
                    </View>
                    <StyledText style={modalStyles.optionText}>Fotoğraf Çek</StyledText>
                  </TouchableOpacity>

                  {/* Cancel Button */}
                  <TouchableOpacity 
                    style={modalStyles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <StyledText style={modalStyles.cancelText}>İptal</StyledText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    )
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F21D5B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
});

export default PhotosCard;
