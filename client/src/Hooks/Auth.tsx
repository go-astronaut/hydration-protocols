import React, { useState } from "react";
import { auth } from "../Firebase";
import {
  User,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { resetState } from "../Reducers/WaterTracker/WaterTracker";

interface AuthContextType {
  register: (email: string, password: string) => void;
  login: (
    email: string,
    password: string,
    remember: boolean
  ) => Promise<User | null>;
  logout: () => Promise<void>;
  currentUser: User | null;
  isAuthenticated: boolean;
  userIsLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(user !== null);
      setUserIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    try {
      // Set persistence based on the remember parameter
      const persistence = remember
        ? browserLocalPersistence
        : browserSessionPersistence;
      await auth.setPersistence(persistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user ? userCredential.user : null;
      setCurrentUser(user);
      setIsAuthenticated(user !== null);
      return user;
    } catch {
      setIsAuthenticated(false);
      return null;
    }
  };

  const logout = async () => {
    try {
      // Set the persistence to browserSessionPersistence
      await auth.setPersistence(browserSessionPersistence);
      await auth.signOut();

      // Reset the current user and isAuthenticated state
      setCurrentUser(null);
      setIsAuthenticated(false);

      // TODO: cheap solution to reset the state => reload page to clean up all states?
      // Reset the state of the water tracker)
      // dispatch(resetState());
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user ? userCredential.user : null;
      setCurrentUser(user);
      setIsAuthenticated(user !== null);
    } catch (error) {
      console.error("Error registering new user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        userIsLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
