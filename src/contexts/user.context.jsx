import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value u want to access
export const UserContext = createContext({
  // obj
  currentUser: null,
  // empty function
  setCurrentUser: () => null,
});

// actual component
// this provider is essentially allowing any of its child components to access the values inside of its use state.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubcribe;
  }, []);

  // So on every context that gets built for us, there is a dot provider and the dot provider is the component that will wrap around any other components that need access to the values inside.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
