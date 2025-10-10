import React from 'react';
import { 
  Image, 
  ImageBackground, 
  KeyboardAvoidingView, 
  SafeAreaView, 
  View, 
  Platform 
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from '../../../../components/StyledText';
import StyledTextInput from '../../../../components/StyledTextInput';
import TextButton from '../../../../components/TextButton';
import AppleSVG from '../../../../assets/svg/apple.svg';
import MetaSVG from '../../../../assets/svg/meta.svg';
import { googleLogin } from '../../../../network/auth';

const LoginScreen = () => {
  const theme = useTheme();

  return (
    <ImageBackground 
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        resizeMode: 'cover' 
      }} 
      source={require('../../../../assets/login-background/1.jpg')}
    >
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <View style={{ 
            width: '100%', 
            height: '100%', 
            padding: 40, 
            marginTop: 20 
          }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ gap: 20 }}>
              <View>
                <StyledText largeTitle>Telefon</StyledText>
                <StyledText largeTitle bold>Numaranı Gir</StyledText>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <StyledTextInput 
                  placeholder="+90" 
                  placeholderTextColor={theme.colors.text}  
                  padded 
                  style={{ 
                    width: 70,
                    backgroundColor: 'transparent',
                    borderColor: theme.colors.text
                  }}
                />
                <StyledTextInput 
                  maxLength={10}
                  padded 
                  style={{ 
                    width: '80%',
                    borderColor: theme.colors.text,
                    backgroundColor: 'transparent' 
                  }}
                />
              </View>
              
              <TextButton backgroundColor={theme.colors.text}>
                <StyledText action color={theme.colors.background}>
                  Devam Et
                </StyledText>
              </TextButton>
              
              <StyledText secondary center action>
                Ya da sosyal medya hesabın ile bağlan
              </StyledText>
              
              <View style={{ flexDirection: 'row', gap: 10, height: 60 }}>
                <TextButton 
                  style={{ paddingVertical: 0 }} 
                  flex
                  backgroundColor={theme.colors.text}
                  onPress={()=>{
                    googleLogin().catch(err=>{
                      console.log(err);
                    });
                  }}
                >
                  <Image 
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/150px-Google_%22G%22_logo.svg.png"
                    }}
                    style={{ width: 20, height: 20 }}
                  />
                </TextButton>

                <TextButton 
                  flex
                  backgroundColor={theme.colors.text}
                >
                  <View style={{ width: 20, height: 20 }}>
                    <AppleSVG />  
                  </View>
                </TextButton>
                
                <TextButton 
                  flex
                  backgroundColor={theme.colors.text}
                >
                  <View style={{ width: 25, height: 25 }}>
                    <MetaSVG />
                  </View>
                </TextButton>
              </View>
              
              <StyledText secondary center>
                Üye olduğunuz takdirde <StyledText bold>Kullanım Hizmetleri</StyledText> ve <StyledText bold> Gizlilik Politikalarımızı</StyledText> kabul etmiş olacaksınız.
              </StyledText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
