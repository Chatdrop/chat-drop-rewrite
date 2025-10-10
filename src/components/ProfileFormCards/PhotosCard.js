import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styleConstants } from "../../config/styleConstants";
import StyledText from "../StyledText";

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
          },
          !src && { backgroundColor: theme.colors.card },
          style,
        ]}
      >
        {typeof onDeletePress == "function" && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: 15,
              padding: 8,
              zIndex: 10,
            }}
            onPress={onDeletePress}
          >
            <StyledText style={{ fontSize: 10, color: theme.colors.card }}>×</StyledText>
          </TouchableOpacity>
        )}
        {src ? (
          <Image
            source={{ uri: src }}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: styleConstants.borderRadius,
            }}
          />
        ) : (
          <StyledText style={{ fontSize: 40, color: theme.colors.text }}>+</StyledText>
        )}
      </Wrapper>
    );
}

const PhotosCard = ({
    photos = [''],
    editable = true,
    onChange = (photos = [''])=>{}
})=>{
    const empty_img = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

    const fix_ar = (ar = [""], elems = [""])=>{
        ar = ar.filter(x => !!x && x != empty_img);
        elems ? ar.push(...elems) : ar.pop();

        ar.push(editable ? null : empty_img);
        ar.length%3 && ar.push(...new Array(3 - (ar.length%3)).fill(empty_img));
        
        return ar;
    };

    const [photoArray, setPhotoArray2] = useState(fix_ar(photos, []));
    const setPhotoArray = (ar = [""])=>{
        setPhotoArray2(ar);
        onChange(ar.filter(x => !!x && x != empty_img));
    }

    useEffect(()=>{
        setPhotoArray2(fix_ar(photos, []));
    }, [photos]);

    const photo_press = (src = "", idx = 0)=>{
        if (src == empty_img){return}
        if (src === null){
            // Stub for image picker - no actual functionality
            console.log('Image picker would open here');
        }
    };

    const trash_click = (src = "")=>{
        setPhotoArray(fix_ar(photoArray.filter(x => x!=src), []))
    };

    return(
      <View style={{ width: '100%', aspectRatio: 1, gap: 10 }}>
        {[0,3,6].map(idx => (
          <View key={"pprw"+idx} style={{ flexDirection: 'row', gap: 10 }}>
            {photoArray.slice(idx,idx+3).map((x, ii) => 
              <Photo 
                onDeletePress={editable && x != empty_img && !!x && (()=>{trash_click(x)})} 
                onPress={()=>{photo_press(x, ii)}} 
                key={idx+"pp"+ii} 
                src={x} 
              />
            )}
          </View>
        ))}
      </View>
    )
};

export default PhotosCard;
