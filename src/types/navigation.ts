export type AuthStackParamList = {
    Onboarding: undefined;
    CreateUsername: undefined;
    RecoveryPhrase: undefined;
    SignIn: undefined;
}

export type AuthScreenTypes = 'Onboarding' | 'CreateUsername' | 'RecoveryPhrase' | 'SignIn';

export type AppStackParamList = {
    Root: undefined;
    Send: undefined;
    Receive: undefined;
    Swap: undefined;
}

export type AppScreenTypes = 'Root' | 'Send' | 'Receive' | 'Swap';

export type RootTabParamList = {
    Dashboard: undefined;
    Explore: undefined;
    Settings: undefined;
}

export type RootScreenTypes = 'Dashboard' | 'Explore' | 'Settings';
