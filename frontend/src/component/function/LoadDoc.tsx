import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, setDoc, where, query, limit, QuerySnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../../../firebaseConfig';

const LoadDoc = async ({ persondata, setPersondata, setScrollcheck, isLogin }) => {
    if (isLogin) {
        console.log('test関数が実行されました');
        const getDocument = async () => {
            const usercollection = collection(db, "users");
            const randomNum = Math.random();
            const q = query(usercollection, where('randomField', '<=', randomNum), where('randomField', '>=', randomNum - 0.1), limit(1));
            const querySnapshot = await getDocs(q);
            return querySnapshot;
        };

        let persons = []
        getDocument().then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then((querySnapShot) => { //非同期で連続してドキュメントの読み取りができないためしょうがない
            // console.log(1);
            querySnapShot.forEach((doc) => {
                // console.log(doc.data());
                if (doc.data().userid != auth.currentUser.uid) {
                    persons.push(doc.data());
                }
            })
            return getDocument();
        }).then(() => {
            // console.log('hellooooo')
            // console.log(persons);
            setPersondata([...persondata, ...persons]);
        }).then(() => {
            setScrollcheck(false);
        })
    }

};
export default LoadDoc;