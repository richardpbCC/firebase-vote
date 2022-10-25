import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Vote({ db, setUserVote, allVotes }) {
    /* Firebase auth */
    const [user, loading, error] = useAuthState(firebase.auth());

    /* Function creates new vote document */
    const addVote = async (vote: string) => {

        const userVote = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            vote,
        }

        await db.collection("votes").doc(user.uid).set(userVote);
        setUserVote(vote);
        allVotes.push(userVote);
    }

    return (
        <>
            <h1>Cats or Dogs?</h1>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVote("cats")}
                >
                    🐱
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVote("dogs")}
                >
                    🐶
                </button>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 32, marginRight: 8 }}
                    onClick={() => addVote("cats and dogs")}
                >
                    🐱🐶
                </button>
            </div>

        </>
    )
}
