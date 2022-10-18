import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user);

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {},
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
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
      <button style={{ fontSize: 32, marginRight: 8 }}>🐱</button>
      <button style={{ fontSize: 32, marginRight: 8 }}>🐶</button>
      <button style={{ fontSize: 32, marginRight: 8 }}>🐱🐶</button>
    </div>
  )
}
