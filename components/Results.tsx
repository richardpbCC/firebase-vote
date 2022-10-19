import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";


export default function Results() {
    /* Firebase auth */
    const [user, loading, error] = useAuthState(firebase.auth());
    console.log("Loading:", loading, "|", "Current user:", user);

    /* Get votes collection from firestore*/    
    const [votes, votesLoading, votesError] = useCollection(
        firebase.firestore().collection("votes"),
        {},
    );

    if (!votesLoading && votes) {
        votes.docs.map((doc) => console.log(doc.data()));
    }    

    return (
        <>
            <h1>Here are the results:</h1>

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

        </>
    )
}
