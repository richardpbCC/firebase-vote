import React, { useEffect } from "react";
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Vote({ db, updateUserVote }) {
    /* Firebase auth */
    const [user, loading, error] = useAuthState(firebase.auth());

    /* Function creates new vote document */
    const addVoteDocument = async (uid: string, username: string, vote: string) => {
        await db.collection("votes").doc(user.uid).set({
            uid,
            username,
            vote,
        });
        updateUserVote();
    }

    useEffect(() => {
        updateUserVote();
    });

    return (
        <>
            <h1>Cats or Dogs?</h1>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument(user.uid, user.displayName, "cats")}
                >
                    🐱
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument(user.uid, user.displayName, "dogs")}
                >
                    🐶
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument(user.uid, user.displayName, "cats and dogs")}
                >
                    🐱🐶
                </button>
            </div>

        </>
    )
}
