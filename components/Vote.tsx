import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";


export default function Vote() {
    /* Firebase auth */
    const [user, loading, error] = useAuthState(firebase.auth());
    console.log("Loading:", loading, "|", "Current user:", user);

    /* Get votes collection from firestore*/
    const db = firebase.firestore();    
   
    /* Function creates new vote document */
    const addVoteDocument = async (vote: string) => {
        await db.collection("votes").doc(user.uid).set({
            vote,
        });
    }

    return (
        <>
            <h1>Are you a cat person or a dog person?</h1>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument("cats")}
                >
                    🐱
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument("dogs")}
                >
                    🐶
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVoteDocument("cats and dogs")}
                >
                    🐱🐶
                </button>
            </div>

        </>
    )
}
