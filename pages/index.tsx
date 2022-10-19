import styles from '../styles/Home.module.css';
import React, { useState } from "react";
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/SignIn";
import Vote from "../components/Vote";
import Results from "../components/Results";

export default function Home() {
  /* Firebase auth */
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user);

  /* Saves whether user has voted */
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)"
      }}
    >
      {loading && <h4>Loading...</h4>}
      {!user && !loading && <SignIn />}
      {user && !loading && <Vote />}
      {user && !loading && <Results />}
    </div>
  )
}
