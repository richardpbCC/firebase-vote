import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/config";

/* Configure the firebase ui */
const uiConfig = {
    signInSuccessUrl: "/", /* If sign in is successful redirect to "/" */
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID], /* Display all sign in options */
}

const SignInScreen = () => {
    return (
        <div
            style={{
                maxWidth: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <h1>Login Screen</h1>
            <p>Please Sign In</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default SignInScreen;