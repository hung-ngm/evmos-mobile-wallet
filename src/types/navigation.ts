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
    Swap: undefined;
    Stake: undefined;
    Vote: undefined;
    ValidatorDetails: undefined;
}

export type AppScreenTypes = 'Root' | 'Send' | 'Stake' | 'Swap' | 'Vote' | 'ValidatorDetails';

export type RootTabParamList = {
    Dashboard: undefined;
    Explore: undefined;
    Settings: undefined;
    Tools: undefined;
}

export type RootScreenTypes = 'Dashboard' | 'Explore' | 'Settings';
