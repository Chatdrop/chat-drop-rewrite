import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { supabase } from "./supabase"
import { appStore } from "../stores/app_store";

GoogleSignin.configure({
    webClientId: "559442169151-rd0plqdua674l8f3clos6areefb41rqv.apps.googleusercontent.com",
    iosClientId: "559442169151-uk2ip27tpoqlbpn6okjgb81o52aki26a.apps.googleusercontent.com"
});

supabase.auth.onAuthStateChange(async (event, session)=>{
    switch(event){
        case "INITIAL_SESSION":
        case "SIGNED_IN":
            appStore.userUid = session.user.id;
            break;
        case "SIGNED_OUT":
            appStore.userUid = null;
            break;
    }
})

const googleLogin = async ()=>{
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;

    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
        
    });

    if (error) {
        console.log(error, "SPB ERR");
      throw error;
    }

    return data;
}

export {
    googleLogin,
}