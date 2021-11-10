import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import initializeAuthentication from "../pages/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider= new FacebookAuthProvider();

    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const logInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logInUsingGithub = () => {
        setIsLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    const logInUsingFacebook = () => {
        setIsLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    const handleNameChange = e => {
        setName(e.target.value);
    }
    const handaleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handalePasswordChange = e => {
        setPassword(e.target.value);
    }

    const createNewUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailPassword = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }




    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {

            }
            setIsLoading(false);
        });
        // eslint-disable-next-line
    }, [])


    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setUser({});
            setError('');
        }).catch((error) => {
            setError(error);
        }).finally(() => setIsLoading(false));
    }

    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then((result) => {
            setError('');
        }).catch((error) => {
            setError(error);
        });
    }


    return {
        user,
        error,
        logInUsingGoogle,
        logOut,
        isLoading,
        setIsLoading,
        createNewUser,
        handleNameChange,
        handaleEmailChange,
        handalePasswordChange,
        loginWithEmailPassword,
        name,
        email,
        password,
        setUserName,
        setError,
        logInUsingGithub,
        logInUsingFacebook
    }

}

export default useFirebase;