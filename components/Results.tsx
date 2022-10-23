import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Results({ db, votes, userVote }) {
    /* Firebase auth */
    const [user, loading, error] = useAuthState(firebase.auth());

    /* Function deletes vote document */
    const deleteVoteDocument = async () => {
        await db.collection("votes").doc(user.uid).delete();
    }   
    
    

    return (
        <>
            <h1>Results:</h1>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <div
                    style={{ fontSize: 32, marginRight: 8 }}
                >
                    🐱
                </div>
                <h3>
                    Cat People:{" "}
                    {votes?.docs?.filter((doc) => doc.data().vote === "cats").length}
                </h3>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <div
                    style={{ fontSize: 32, marginRight: 8 }}
                >
                    🐶
                </div>
                <h3>
                    Dog People:{" "}
                    {votes?.docs?.filter((doc) => doc.data().vote === "dogs").length}
                </h3>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <div
                    style={{ fontSize: 32, marginRight: 8 }}
                >
                    🐱🐶
                </div>
                <h3>
                    Love Both:{" "}
                    {votes?.docs?.filter((doc) => doc.data().vote === "cats and dogs").length}
                </h3>
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <div
                    style={{ fontSize: 32, marginRight: 8 }}
                >
                    You voted: {userVote}
                </div>                     
               
            </div>

            <div style={{ flexDirection: "row", display: "flex" }}>
                <button
                    style={{ fontSize: 28, marginRight: 8 }}
                    onClick={() => deleteVoteDocument()}
                >
                    Change my vote
                </button>
            </div>

        </>
    )
}
