import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styleConstants } from '../../../../../config/styleConstants';
import StyledText from '../../../../../components/StyledText';
import RoundButton from '../../../../../components/RoundButton';
import XSvg from '../../../../../assets/svg/x.svg';
import CheckSvg from '../../../../../assets/svg/check.svg';

export default function ChatRequest(props = {
  id: null,
  name: "Kullanıcı Ad-soyad",
  message: "Kullanıcı mesajı",
  photo: null,
  onAccept: () => {},
  onReject: () => {}
}) {
  const theme = useTheme();
  
  return (
    <View style={{
      flex: 1,
      borderRadius: styleConstants.borderRadius * 3,
      backgroundColor: theme.colors.card,
      width: 200,
      padding: 15,
      marginRight: 10,

    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingRight: 40,
        
      }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          overflow: 'hidden',
          backgroundColor: theme.colors.lightGrey
        }}>
          {props.photo ? (
            <Image source={props.photo} style={{ width: '100%', height: '100%' }} />
          ) : null}
        </View>
        <StyledText
          adjustsFontSizeToFit={true}
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: theme.colors.onlineGreen,
            marginLeft: 15,
          }}
        >
          {props.name}
        </StyledText>
      </View>
      
      <View style={{ paddingBottom: 5 }}>
        <StyledText
          style={{
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {props.message.length > 20 ? props.message.substring(0, 20) + '...' : props.message}
        </StyledText>
      </View>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
      }}>
        <RoundButton
          size={50}
          iconSize={20}
          color="black"
          backgroundColor="white"
          Icon={XSvg}
          onPress={props.onReject}
        />
        <RoundButton
          size={50}
          iconSize={30}
          color="white"
          backgroundColor="black"
          borderWidth={0}
          Icon={CheckSvg}
          onPress={props.onAccept}
        />
      </View>
    </View>
  );
}
