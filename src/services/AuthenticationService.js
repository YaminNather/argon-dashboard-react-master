import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";

export default class AuthenticationService {
  register = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    
    try {
      const documentData = {
        "name" : name,
        "email" : email
      };
      await setDoc(doc(this.firestore, `users/${userCredential.user.uid}`), documentData);
    }
    catch(e) {      
      await userCredential.user.delete();
      throw e;
    }
        
    if(this.testUser(userCredential.user) === false) {
      await deleteDoc(doc(this.firestore, `users/${userCredential.user.uid}`));
      await userCredential.user.delete();
      
      throw new UserTestFailedException();
    }

    return userCredential.user;
  };  

  login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);

    if(this.testUser(userCredential.user) === false) {
      await deleteDoc(doc(this.firestore, `users/${userCredential.user.uid}`));
      await userCredential.user.delete();
      
      throw new UserTestFailedException();
    }

    return userCredential.user;
  };

  testUser = async (user) => {
    const data = { "uid" : user.uid, "email" : user.email };
    const response = await axios(
      "https://registertest.free.beeceptor.com/init", 
      { method: "POST", data: data }
    );

    return response.status === 201;
  };

  
  firebaseAuth = getAuth();
  firestore = getFirestore();
}

export class UserTestFailedException extends Error {}