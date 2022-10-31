import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SignIn from "../components/SignIn";
import Loader from "../components/Loader";
import Vote from "../components/Vote";
import Results from "../components/Results";

export default function Home() {
  /* Firebase auth */
  const [user, loading, error] = useAuthState(firebase.auth());

  let userCredentials = useRef(undefined);

  // const userDetails = JSON.stringify(user);

  // if (typeof window !== "undefined") {
  //   console.log("user", userDetails);
  //   localStorage.getItem("user")
  //   localStorage.setItem("user", userDetails);
  // }

  interface UserVote {
    uid: String;
    displayName: String;
    photoURL: String;
    vote: String;
  }

  const [userVote, setUserVote] = useState<UserVote>();
  const [savedVotes, setSavedVotes] = useState<UserVote[]>();
  const [isLoading, setIsLoading] = useState<Boolean>();

  /* Get votes collection from firestore */
  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {},
  );

  /* Get votes collection from firestore */
  const db = firebase.firestore();

  /* Function updates the user's vote displayed on the results component */
  const updateVotes = async () => {
    setIsLoading(true);
    const voteData = await db?.collection("votes").get();
    const formattedVotes = [];
    voteData.forEach((doc) => formattedVotes.push(doc.data()));
    const currentUserVote = formattedVotes.find((vote) => vote?.uid === user.uid);
    setSavedVotes(formattedVotes);
    setUserVote(currentUserVote);
    setIsLoading(false);
  }
  console.log(userCredentials);

  useEffect(() => {
    setIsLoading(true);
    console.log("useEffect", loading, votesLoading, user)
    if (user) {
      console.log(user);
      setIsLoading(false);
      userCredentials.current = user;
      updateVotes();
    }
  }, [votes, user]);

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
      {loading || votesLoading && <Loader />}
      {!user && !loading && !votesLoading && <SignIn />}
      {user && !userVote && <Vote
        db={db}
        setSavedVotes={setSavedVotes}
        savedVotes={savedVotes}
      />}
      {userVote && <Results
        userVote={userVote}
        db={db}
        savedVotes={savedVotes}
        updateVotes={updateVotes}
      />}
    </div>
  )
}
