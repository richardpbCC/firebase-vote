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

  interface UserVote {
    uid: String;
    displayName: String;
    photoURL: String;
    vote: String;
  }

  const [userVote, setUserVote] = useState<string>();
  const [allVotes, setAllVotes] = useState<UserVote[]>();

  /* Get votes collection from firestore */
  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {},
  );

  /* Get votes collection from firestore */
  const db = firebase.firestore();

  /* Function updates the user's vote displayed on the results component */
  const updateVotes = async () => {
    const userData = db?.collection("votes")?.doc(user?.uid);
    const vote = await userData.get();
    setUserVote(vote?.data()?.vote);

    const voteData = await db?.collection("votes").get();
    const formattedVotes = [];
    voteData.forEach((doc) => formattedVotes.push(doc.data()));
    setAllVotes(formattedVotes);
  }

  useEffect(() => {
    if (user) {
      console.log("useEffect")
      updateVotes();
      console.log("allVotes", allVotes)
    }
  }, [votes]);

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
      {user && !loading && !userVote && <Vote db={db} setUserVote={setUserVote} allVotes={allVotes} />}
      {user && !loading && userVote && <Results
        votes={votes}
        db={db}
        userVote={userVote}
        allVotes={allVotes}
        updateVotes={updateVotes}
      />
      }
    </div>
  )
}
