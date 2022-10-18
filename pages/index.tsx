import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import firebase from "../firebase/config";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Home() {
  return (
    <div>Hello</div>
  )
}
