
// // import firebase from 'firebase';
// import { Auth } from "firebase/auth";
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//cua KHOA
const firebaseConfig = {
  apiKey: "AIzaSyAUbn0DZLA78mbtXhhmSmm5gckDYHmOa0I",
  authDomain: "timbacsi-59a15.firebaseapp.com",
  projectId: "timbacsi-59a15",
  storageBucket: "timbacsi-59a15.appspot.com",
  messagingSenderId: "757567747442",
  appId: "1:757567747442:web:daec31682ce274f7bf19eb"
};

//Cua Duyen
// const firebaseConfig = {
//   apiKey: "AIzaSyBKY5KXdeSpNm-vXlP8ukkSDO1_45Vf3tw",
//   authDomain: "singinotp-8de32.firebaseapp.com",
//   projectId: "singinotp-8de32",
//   storageBucket: "singinotp-8de32.appspot.com",
//   messagingSenderId: "521281613156",
//   appId: "1:521281613156:web:7d88441c11c32ab86e5e71"
// };




firebase.initializeApp(firebaseConfig);
const auth =   firebase.auth();
export { auth, firebase };
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app;