import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/config";

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
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
            <h1>Vote Login</h1>
            <p>Please Sign In</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default SignInScreen;