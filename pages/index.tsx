import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user);

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {},
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  /* Create new vote document */
  const addVoteDocument = async (vote: string) => {
    await db.collection("votes").doc(user.uid).set({
      vote,
    });
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        style={{ fontSize: 32, marginRight: 8 }}
        onClick={() => addVoteDocument("cats")}
      >
        🐱
      </button>
      <h3>
        Cat People:{" "}
        {votes?.docs?.filter((doc) => doc.data().vote === "cats").length}
      </h3>
      <button
        style={{ fontSize: 32, marginRight: 8 }}
        onClick={() => addVoteDocument("dogs")}
      >
        🐶
      </button>
      <h3>
        Dog People:{" "}
        {votes?.docs?.filter((doc) => doc.data().vote === "dogs").length}
      </h3>
      <button
        style={{ fontSize: 32, marginRight: 8 }}
        onClick={() => addVoteDocument("cats and dogs")}
      >
        🐱🐶
      </button>
      <h3>
        Love Both:{" "}
        {votes?.docs?.filter((doc) => doc.data().vote === "cats and dogs").length}
      </h3>
    </div>
  )
}
