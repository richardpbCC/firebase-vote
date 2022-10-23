import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from "react";
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SignIn from "../components/SignIn";
import Vote from "../components/Vote";
import Results from "../components/Results";

export default function Home() {
  /* Firebase auth */
  const [user, loading, error] = useAuthState(firebase.auth());

  const [userVote, setUserVote] = useState<string>();

  /* Function updates the user's vote displayed on the results component */
  const updateUserVote = async () => {
    const userData = db.collection("votes").doc(user.uid);
    const userVote = await userData.get();
    setUserVote(userVote?.data()?.vote);
  }

  /* Get votes collection from firestore*/
  const db = firebase.firestore();

  /* Get votes collection from firestore*/
  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {},
  );

  const checkVoteStatus = () => {
    return votes?.docs?.find((doc) => doc.id === user.uid);
  }

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
      {user && !loading && !checkVoteStatus() && <Vote db={db} updateUserVote={updateUserVote} />}
      {user && !loading && checkVoteStatus() && <Results votes={votes} db={db} userVote={userVote} />}
    </div>
  )
}
