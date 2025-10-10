import { proxy } from "valtio";
import { supabase } from "../network/supabase";
import { appStore } from "./app_store";

const selfProfileAttributes = proxy({
    name: null,
    surname: null,
    birthdate: null,
    gender: null,
    genderPreference: null,
    motive: null,
    photos: null
});

const fetchUserProfileAttributes = async (userUid)=>{
    const {data, error} = await supabase
        .from("user_attributes")
        .select("attribute, value")
        .eq("user_uid", userUid)
        .in("attribute", Object.keys(selfProfileAttributes));

    if (error) {
        throw error;
    }

    const payload = {};

    data.forEach(({attribute, value})=>{
        payload[attribute] = value;
    });

    return payload;
};

const putAttribute = async (attribute, value)=>{
    const {_, error} = await supabase
        .from("user_attributes")
        .upsert({
            user_uid: appStore.userUid,
            attribute: attribute,
            value: value,
            created_at: new Date().toISOString()
        }, {
            onConflict: "user_uid, attribute"
        });

    if (error){
        throw error;
    }

    selfProfileAttributes[attribute] = value;
}

const implies = (op1, op2)=>{
    return !op1 || op2;
}

const setupComplete = ()=>{
    return Object.keys(selfProfileAttributes)
        .every(key => {
            const op = (selfProfileAttributes[key] != null && implies(typeof selfProfileAttributes[key]["length"] == "number", selfProfileAttributes[key]["length"] > 0));

            console.log(key, selfProfileAttributes[key], op, "asdfasdfaop");

            return op;
        });
}

export {
    fetchUserProfileAttributes,
    selfProfileAttributes,
    setupComplete,
    putAttribute
}