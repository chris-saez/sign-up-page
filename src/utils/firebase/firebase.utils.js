import { initializeApp } from 'firebase/app';

import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         GoogleAuthProvider,
         signInWithPopup,
         updateProfile,
         } from 'firebase/auth';

import {getFirestore,
        doc,
        getDoc,
        setDoc
        } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_enssJXJioARVUcuE4MBcKslZ1RrizYE",
    authDomain: "nft-marketplace-34329.firebaseapp.com",
    projectId: "nft-marketplace-34329",
    storageBucket: "nft-marketplace-34329.appspot.com",
    messagingSenderId: "152469259304",
    appId: "1:152469259304:web:9109b90ff34df88fa0a11d"
  };

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = await doc(db, 'user', userAuth.uid);
    const docSnapshot = await getDoc(userDocRef);

    const createdAt = new Date();
    const { displayName, email } = userAuth;

    if(!docSnapshot.exists()) {
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (error){
            console.log(error);
            alert('Error creating user document')
        }
    }

    return userDocRef;
}


export const signInWithGooglePopup = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    return user;
}

export const signUpUserWithEmailAndPassword = async (newUser) => {
    const { displayName, email, password } = newUser;

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(user, {
        displayName: displayName,
    })
    
    return user;
}

export const signInAuthUserWithEmailAndPassword = async (currentUser) => {
    const { email, password} = currentUser;

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
}