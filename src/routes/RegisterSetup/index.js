import { KeyboardAvoidingView, SafeAreaView, Platform, ImageBackground, View, ActivityIndicator } from "react-native"
import { Birthdate, Gender, GenderPreference, Motive, Name, UploadPhoto } from "./SetupForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ArrowRightSVG from "../../assets/svg/arrow-right.svg"
import RoundButton from "../../components/RoundButton"
import { styleConstants } from "../../config/styleConstants"
import { TouchableOpacity } from "react-native"
import { useEffect, useRef, useState } from "react"
import { useIsFocused, useTheme } from "@react-navigation/native"
import StyledText from "../../components/StyledText"
import { navigationRef } from "../../utils/navigationRef"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { putAttribute, selfProfileAttributes, setupComplete } from "../../stores/profile_attributes"
import { appStore } from "../../stores/app_store"

const RegisterSetupNavigator = createNativeStackNavigator()

const navigate = (name) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name);
    }
};

const formData = [
    {
        name: "name",
        backgroundImg: require('../../assets/register-setup/1.jpg'),
        component: Name,
        infoText: "",
        otherKeys: ["surname"]
    },
    {
        name: "birthdate",
        backgroundImg: require('../../assets/register-setup/2.jpg'),
        component: Birthdate,
        infoText: "Yaş seçiminizi değiştiremezsiniz.Doğru yaşı seçtiğinizden emin olun"
    },
    {
        name: "gender",
        backgroundImg: require('../../assets/register-setup/3.jpg'),
        component: Gender,
        infoText: "Cinsiyet seçtikten sonra tekrar değiştiremezsiniz"
    },
    {
        name: "genderPreference",
        backgroundImg: require('../../assets/register-setup/4.jpg'),
        component: GenderPreference,
        infoText: "Seçimlerinizi daha sonra değiştirebilirsiniz"
    },
    {
        name: "motive",
        backgroundImg: "",
        component: Motive,
        infoText: "Seçimlerinizi daha sonra değiştirebilirsiniz"
    },
    {
        name: "photos",
        backgroundImg: "",
        component: UploadPhoto,
        infoText: "İnsanların seni görebilmesi için en iyi fotoğraflarını seç ve profilini en iyi haliyle oluştur."
    },
]


export default function RegisterSetupStack() {
    const theme = useTheme()
    const [currentStep, setCurrentStep] = useState(0)
    const [error, setError] = useState(false)
    const insets = useSafeAreaInsets();
    const f = useIsFocused();

    const steps = (()=>{
        const ar = formData.filter(x => {
            const val = selfProfileAttributes[x.name];
            const otherKeys = x.otherKeys;

            if (otherKeys){
                for (let i=0; i<otherKeys.length; i++){
                    if (!selfProfileAttributes[otherKeys[i]] || !selfProfileAttributes[otherKeys[i]].length){
                        return true
                    }
                }
            }

            if (!val || !val.length){
                return true
            }
            return false
        }).map(x => x.name);

        return ar;
    })();

    const getCurrentStepData = (stepName) => formData.find(x => x.name === stepName)

    const sendAttributes = async ()=>{
        const keys = Object.keys(currentPayload);
        await Promise.all(keys.map(key => putAttribute(key, currentPayload[key]))).then(()=>{
            keys.forEach(key => {
                delete currentPayload[key];
            });
        });
    };

    const Button = () => {
        return <RoundButton
            disabled={false}
            size={60}
            onPress={
                async () => {
                    if (currentStep + 1 < steps.length) {
                        // Navigate to next screen and update step
                        navigate(steps[currentStep + 1]);
                        setCurrentStep(currentStep + 1);
                        setError(false)
                        sendAttributes();
                        

                    } else {
                        // Last step - stub completion
                        console.log(currentPayload, "currentPayload")
                        console.log('Setup complete')
                        sendAttributes().then(()=>{
                            appStore.setupComplete = setupComplete();
                        }).catch(err => {
                            console.log(err, "sendAttributes error");
                        });
                    }
                }}
            Icon={ArrowRightSVG}
            color='black'
            loading={false}
            backgroundColor='white'
        />
    }

    const currentPayload = useRef({}).current;
    useEffect(()=>{
        if (!f){return}
        Object.keys(currentPayload).forEach(key => {
            delete currentPayload[key];
        });
    }, [f]);
    const onValueChange = (key, value) => {
        currentPayload[key] = value;
    };

    return (
        <>
        <ImageBackground source={getCurrentStepData(steps[currentStep])?.backgroundImg} style={{ flex: 1, backgroundColor: theme.colors.background }} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
                <View style={{ flex: 1, height: '100%', width: '100%' }}>
                    <View style={{ flexDirection: 'row', gap: 5, width: '90%', height: 10, borderRadius: 20, alignSelf: 'center', marginTop: insets.top, padding: 2 }} >
                        {steps.map((x, i) => <View key={i} style={{ flex: 1, height: 6, borderRadius: 20, backgroundColor: currentStep >= i ? 'white' : 'grey', alignSelf: 'left' }} ></View>)}
                    </View>
                    <View style={{ height: 50 }}  ></View>

                    <View style={{ flex: 1 }} >
                        <RegisterSetupNavigator.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'none' }} >
                            {steps.map((stepName, index) => {
                                const stepData = getCurrentStepData(stepName);
                                return <RegisterSetupNavigator.Screen key={index} name={stepName} component={stepData.component} initialParams={{...selfProfileAttributes, ...{onChange: onValueChange}}} ></RegisterSetupNavigator.Screen>
                            })}
                        </RegisterSetupNavigator.Navigator>
                    </View>
                    <SafeAreaView style={{ position: 'absolute', zIndex: 99, bottom: 0, padding: styleConstants.padding, width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: styleConstants.padding }} >
                            <Button />
                            {error ? <StyledText style={{ color: 'white' }} >Bir Hata Oluştu</StyledText> : null}
                            <StyledText secondary style={{ marginTop: 15, textAlign: 'center' }} >{getCurrentStepData(steps[currentStep])?.infoText}</StyledText>
                        </View >
                    </SafeAreaView>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    </>
    )
}