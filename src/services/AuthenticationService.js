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

isEmailValid = (email) => {
  let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if(email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}
  
  firebaseAuth = getAuth();
  firestore = getFirestore();
}

export class UserTestFailedException extends Error {}