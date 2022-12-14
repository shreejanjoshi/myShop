// This initialize app function creates an app instance for you based off of some type of config, This config is an object that allows us to attach this Firebase app instance to that instance that we have online
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // And an observable listener is a way for us to hook into some kind of stream of events. Whether these events are seen at events or sign out events were actually able to trigger something based on these changes.
  onAuthStateChanged,
} from "firebase/auth";
// you need to actually get a document instance. But when you want to access the data on those documents, you need to use get dock. And when you want to set the data, you need to set dock.
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  // We want to make sure that all of our objects that we're trying to add to the collection are successfully added. And to do that, we need to use a batch.
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
// What this config does is it identifies this SDK, which is essentially a developer kit that we're using.
const firebaseConfig = {
  apiKey: "AIzaSyB9dCx0_VYkxWTRhsZchfGZOp5wBqx8P2c",
  authDomain: "crwn-clothing-db-c1364.firebaseapp.com",
  projectId: "crwn-clothing-db-c1364",
  storageBucket: "crwn-clothing-db-c1364.appspot.com",
  messagingSenderId: "644056466561",
  appId: "1:644056466561:web:4f6bd998ebe3cff01f3980",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// So Google Auth Provider is essentially a class that we get from Firebase Authentication and this is connected to Google auth itself.
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// same one for all app only one auth
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// to get json file to firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // And now what we're saying is, hey, set that location and set it with the value of the object itself.
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// And what this method is, is it's an async function that receives some user authentication object because that's really what we're getting back anyways from our Firebase authentication, our Google assignment.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // databse, collection, uqnik id tell what it was
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data not exits
  // create / set the doc with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // So here we want to set a display name, we want to set a email and we want to set a created at date.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // Let's say we get some additional information. And this additional information I'm just going to say is an object. And what I'll do is I will spread this object in at the end after all of these fields have been filled from any previous variable setting that we've done. So if display name exists on user off, then it will get spread through and we're not going to pass any additional information, meaning that this will probably by default be just an empty object, for example. But let's say in our current example display name, there's no value here. It was null as we saw. So what's going to happen is display name is going to get set to null. But then because what we're going to do is we are going to add the additional information ourselves. Then what'll happen is that this is instead going to be passed in like this, where we will have a string ourselves. So it'll be Mike, for example, and then this is going to overwrite that null value so that we do actually have a final display name inside of our user document.
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exits
  // return userDocRef
  return userDocRef;
};

export const createAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  // what on off state change does, as I mentioned, is that it will call this callback whenever the authentication state of our auth singleton changes. So when a user signs in, that's considered an off change because a user has authenticated when a user signs out, that's another change.
  onAuthStateChanged(auth, callback);
