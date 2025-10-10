
import { proxy } from "valtio";
import { supabase } from "../network/supabase";
import { get_key } from "../utils/fs";
import { fetchUserProfileAttributes, selfProfileAttributes, setupComplete } from "./profile_attributes";

const appStore = proxy({
    onboardingFinished: false,
    isLoading: true,
    setupComplete:false,
    userUid: null

});

let init = false;

const appInit = async () => {
    if (init) return;
    init = true;

    const [
        onboardingFinished, 
        user
    ] = await Promise.all([
        get_key("onboarding_finished").catch(()=>false),
        supabase.auth.getUser().catch(()=>null)
    ]);

    appStore.onboardingFinished = onboardingFinished;
    appStore.userUid = user?.data?.user?.id;

    if (appStore.userUid){
        const attrs = await fetchUserProfileAttributes(appStore.userUid);;
        Object.keys(attrs).forEach(key=>{
            selfProfileAttributes[key] = attrs[key];
        });
    }
    
    appStore.setupComplete = setupComplete();
    appStore.isLoading = false;
}

const logout = ()=>{

};

export {
    appStore,
    appInit,
    logout
}