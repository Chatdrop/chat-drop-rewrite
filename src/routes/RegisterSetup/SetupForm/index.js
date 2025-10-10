import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { styleConstants } from "../../../config/styleConstants";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import PhotoAddSVG from "../../../assets/svg/photo-add.svg";
import PlusSVG from "../../../assets/svg/plus.svg";
import StyledText from "../../../components/StyledText";
import StyledTextInput from "../../../components/StyledTextInput";
import { useTheme } from "@react-navigation/native";
import SelectCard from "../../../components/SelectCard";
import StyledTextDynamic from "../../../components/StyledTextDynamic";
import ImageCropPicker from "react-native-image-crop-picker";


const today = new Date();
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

const genders = [
    { displayName: "Erkek", preferenceSelected: false, name: "male" },
    { displayName: "Kadın", preferenceSelected: false, name: "female" },
    { displayName: "LGBT", preferenceSelected: false, name: "lgbt" }
];
const motives = [
    { text: "Aşk", src: require('../../../assets/png/love.png'), selected: false, name: "love" },
    { text: "Arkadaşlık", src: require('../../../assets/png/friendship.png'), selected: false, name: "friendship" },
    { text: "Network", src: require('../../../assets/png/network.png'), selected: false, name: "network" },
];

function Layout(props) {
    return (
        <View style={{ width: '100%', height: '100%', padding: styleConstants.padding * 2.5 }} >
            <StyledTextDynamic text={props.title} style={{ fontWeight: '800', fontSize: 28, marginBottom: 20 }} >{props.title}</StyledTextDynamic>
            {/* {props.description != null ? <><StyledText style={{ opacity: 0.7, fontSize: 16, marginTop: 10 }} >{props.description}</StyledText>
                <View style={{ marginTop: 20 }} ></View></> : null} */}
            {props.error != null ? <StyledText style={{ opacity: 0.7, fontSize: 16, marginTop: 10, color: 'red' }} >{props.error}</StyledText> : null}

            {/* <StyledTextInput style={{padding:10,height:55 ,width:'100%', borderWidth:1 , borderRadius:15,marginTop:10}} placeholder="İsminiz" ></StyledTextInput> */}
            {props.children}
        </View>
    )
}

const Name = (props)=>{
    const param = props.route.params;
    const {name, surname, onChange} = param;

    return (
        <View>
            <Layout title={"İsminiz \\n Nedir?"} >
                <StyledTextInput padded defaultValue={name} placeholder="Adınız" onChangeText={(value) => { onChange("name", value) }} ></StyledTextInput>
                <StyledTextInput padded defaultValue={surname} placeholder="Soyadınız" onChangeText={(value) => { onChange("surname", value) }} ></StyledTextInput>
            </Layout>
        </View>
    );
};

const Birthdate = (props) => {
    const param = props.route.params;
    const {birthdate, onChange} = param;
    console.log(birthdate, "birtsdfasdfhdate");

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);

    const checkNaN = (value)=>{
        return value.toString() == "NaN" ? "" : value;
    }

    const parseDate = (birthdateStr)=>{
        if (!birthdateStr){
            return { day: "", month: "", year: "" };
        }
        const birthdate = new Date(birthdateStr);
        const day = birthdate.getDate().toString().padStart(2, '0');
        const month = (birthdate.getMonth() + 1).toString().padStart(2, '0');
        const year = birthdate.getFullYear().toString();
        return { day: checkNaN(day), month: checkNaN(month), year: checkNaN(year) };
    }

    const inputRef = useRef({
        day: "",
        month: "",
        year: ""
    }).current;

    useEffect(()=>{
        const parsedDate = parseDate(birthdate);
        Object.keys(parsedDate).forEach(key => {
            inputRef[key] = parsedDate[key];
        });
    }, [birthdate]);

    const handleTextChange = (text, nextInputRef) => {
        if (text.toString().length === 2) {
            nextInputRef.current.focus();
        }
    };

    const updateBirthdate = (newDay, newMonth, newYear) => {
        if (newDay && newMonth && newYear && newYear.length === 4) {
            const bdate = new Date(0);
            bdate.setFullYear(newYear);
            bdate.setMonth(newMonth - 1);
            bdate.setDate(newDay);
            console.log(bdate.toISOString(), "fosdugfiodj");
            onChange("birthdate", bdate.toISOString());
        }
    };

    const validateDay = (input) => { 
        if ((isNaN(Number(input)) ? false : input <= 31) == true) { 
            inputRef.day = input; 
            handleTextChange(input, input2Ref);
            updateBirthdate(input, inputRef.month, inputRef.year);
        } 
    }
    const validateMonth = (input) => { 
        if ((isNaN(Number(input)) ? false : input <= 12) == true) { 
            inputRef.month = input; 
            handleTextChange(input, input3Ref);
            updateBirthdate(inputRef.day, input, inputRef.year);
        } 
    }
    const validateYear = (input) => { 
        if ((isNaN(Number(input)) ? false : input <= 2010) == true) { 
            inputRef.year = input;
            updateBirthdate(inputRef.day, inputRef.month, input);
        } 
    }

    const commonInputProps = {
        keyboardType: "numeric",
        placeholderTextColor: 'grey',
        style: styles.textInput,
        multiline: false,
    }

    return (
        <View>
            <Layout title={"Doğum\nTarihiniz?"} error={inputRef.day.toString().length > 0 && inputRef.month.toString().length > 0 && inputRef.year.toString().length == 4 && new Date(`${inputRef.year}-${inputRef.month}-${inputRef.day}`) > eighteenYearsAgo && "chatdrop kullanmak için 18yaşınızı doldurmanız gerekmektedir"} >
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ flex: 1 }} >
                        <StyledTextInput childRef={input1Ref} maxLength={2} placeholder="Gün" defaultValue={parseDate(birthdate).day} onChangeText={validateDay} {...commonInputProps} ></StyledTextInput>
                    </View>
                    <View style={{ flex: 1 }} >
                        <StyledTextInput childRef={input2Ref} maxLength={2} placeholder="Ay" defaultValue={parseDate(birthdate).month} onChangeText={validateMonth} {...commonInputProps} ></StyledTextInput>
                    </View>
                    <View style={{ flex: 2 }} >
                        <StyledTextInput childRef={input3Ref} maxLength={4} placeholder="Yıl" defaultValue={parseDate(birthdate).year} onChangeText={validateYear} {...commonInputProps} ></StyledTextInput>
                    </View>
                </View>
            </Layout>
        </View>
    )
};

const rem = 16;

const Gender = (props) => {
    const param = props.route.params;
    const {gender, onChange} = param;
    const [selectedGender, setSelectedGender] = useState(gender);

    return (
        <View>
            <Layout
                title="Cinsiyetin\nNedir?"
            >
                <View style={{ gap: 10 }}>
                    {genders.map((genderOption, index) => (
                        <SelectCard
                            key={index}
                            height={5 * rem}
                            background={selectedGender === genderOption.name}
                            src={null}
                            text={genderOption.displayName}
                            isSelected={selectedGender === genderOption.name}
                            onSelect={() => {
                                setSelectedGender(genderOption.name);
                                onChange("gender", genderOption.name);
                            }}
                        />
                    ))}
                </View>
            </Layout>
        </View>
    );
};

const GenderPreference = (props) => {
    const param = props.route.params;
    const {genderPreference, onChange} = param;
    const [selectedPreferences, setSelectedPreferences] = useState(genderPreference || []);

    const togglePreference = (genderName) => {
        const newPreferences = selectedPreferences.includes(genderName)
            ? selectedPreferences.filter(name => name !== genderName)
            : [...selectedPreferences, genderName];
        onChange("genderPreference", newPreferences);
        setSelectedPreferences(newPreferences);
    }

    return (
        <View>
            <Layout title="Tercih\nSeçimi">
                <View style={{ gap: 10 }}>
                    {genders.map((genderOption, index) => (
                        <SelectCard
                            key={index}
                            height={5 * rem}
                            background={selectedPreferences.includes(genderOption.name)}
                            src={null}
                            text={genderOption.displayName}
                            isSelected={selectedPreferences.includes(genderOption.name)}
                            onSelect={() => togglePreference(genderOption.name)}
                        />
                    ))}
                </View>
            </Layout>
        </View>
    )
};



const Motive = (props) => {
    const param = props.route.params;
    const {motive, onChange} = param;
    const [selectedMotive, setSelectedMotive] = useState(motive);
    return (
        <View>
            <Layout title="ChatDrop'taki\nArayışın Ne?" >
                <View style={{ flex: 1, padding: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                        {motives.map((motiveOption, index) => (
                            <SelectCard
                                key={index}
                                height={6.5 * rem}
                                backgroundColor={selectedMotive == motiveOption.name ? 'grey' : '#f5f5f5'}
                                src={motiveOption.src}
                                text={motiveOption.text}
                                isSelected={selectedMotive == motiveOption.name}
                                onSelect={() => {
                                    setSelectedMotive(motiveOption.name);
                                    onChange("motive", motiveOption.name);
                                }}
                            />
                        ))}
                    </ScrollView>
                </View>
            </Layout>
        </View>
    )
};

const UploadPhoto = (props) => {
    const param = props.route.params;
    const {photos, onChange} = param;
    const [photoList, setPhotoList] = useState(photos || []);
    const [userSelectedPhoto, setUserSelectedPhoto] = useState(null);
    const theme = useTheme()

    const deletePhoto = (fileName) => {
        const newPhotos = photoList.filter(x => x.fileName != fileName);
        if (newPhotos.length != 0) {
            setUserSelectedPhoto(newPhotos[0].fileName)
        } else {
            setUserSelectedPhoto(null)
        }
        onChange("photos", newPhotos);
        setPhotoList(newPhotos);
    };

    const launchLibrary = () => {
        ImageCropPicker.openPicker({
            mediaType: "photo",
            cropping: true,
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            multiple: true,
            includeBase64: false,
            freeStyleCropEnabled: true,
        }).then(images => {
            const newPhotos = [...photoList, ...images.map(x => ({ fileName: x.filename, uri: "file://" + x.path }))];
            onChange("photos", newPhotos);
            setPhotoList(newPhotos);
        })
        // Stub function for layout - would normally launch image picker
        console.log('Launch image library')
    }

    let selectedPhoto = userSelectedPhoto != null ? userSelectedPhoto : photoList.length != 0 ? photoList[0].fileName : null

    return (
        <View>
            <Layout title="Profil Galerini\nOluştur">
                <TouchableOpacity onPress={() => { if (photoList.length == 0) { launchLibrary() } else { console.log(photoList) } }} style={{ backgroundColor: theme.colors.card, aspectRatio: 0.8, borderRadius: styleConstants.borderRadius, justifyContent: 'center', alignItems: 'center' }} >

                    {photoList.length != 0 ? <View style={{ width: '100%', height: '100%', borderRadius: styleConstants.borderRadius / 1.5, backgroundColor: 'red', position: 'absolute', zIndex: 99 }} >
                        <TouchableOpacity onPress={() => deletePhoto(photoList.find(x => x.fileName == selectedPhoto).fileName)} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 60, height: 60, right: 10, top: 10, borderRadius: 30, backgroundColor: theme.colors.card, zIndex: 99 }}>
                            <StyledText style={{ color: 'white' }}>×</StyledText>
                        </TouchableOpacity>
                        <Image style={{ flex: 1, borderRadius: styleConstants.borderRadius / 1.5 }} source={{ uri: photoList.find(x => x.fileName == selectedPhoto).uri }} />
                    </View> : null}

                    <View style={{ width: '60%', height: '60%', padding: styleConstants.padding * 3}} >
                        <PhotoAddSVG  width={"100%"} height={"100%"} color={theme.colors.text} />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', paddingVertical: styleConstants.padding / 3, flexDirection: 'row', gap: 8, marginTop: 5 }} >
                    {photoList.map((x, index) =>
                        <TouchableOpacity key={index} onPress={() => { if (userSelectedPhoto === x.fileName) { setUserSelectedPhoto(null) } else { setUserSelectedPhoto(x.fileName) } }} style={{ height: '100%', aspectRatio: 0.8, borderRadius: styleConstants.borderRadius / 1.5, }} >
                            <Image resizeMode="cover" style={{ flex: 1, borderRadius: styleConstants.borderRadius / 1.5, borderWidth: 2, borderColor: userSelectedPhoto === x.fileName ? 'transparent' : 'transparent' }} source={{ uri: x.uri }} />
                        </TouchableOpacity>
                    )}
                    {photoList.length != 0 & photoList.length < 5 ? <TouchableOpacity onPress={() => { launchLibrary() }} style={{ height: '100%', aspectRatio: 0.8, backgroundColor: 'black', borderRadius: styleConstants.borderRadius / 1.5, justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ height: '30%' }} >
                            <PlusSVG></PlusSVG>
                        </View>
                    </TouchableOpacity> : null}
                </View>
            </Layout>
        </View>
    )
};

export {
    Name,
    Birthdate,
    Gender,
    GenderPreference,
    Motive,
    UploadPhoto
}

const styles = StyleSheet.create({
    textInput: { padding: 10, height: 55, width: '100%', borderWidth: 1, borderRadius: 15, marginTop: 10 }
})