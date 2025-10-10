// Dummy onboarding store for the rewrite app

import { set_key } from "../utils/fs";
import { navigationRef } from "../utils/navigationRef";
import { appStore } from "./app_store";

const skipOnboarding = () => {
  set_key("onboarding_finished", 1);
  appStore.onboardingFinished = true;
};

export { skipOnboarding };
