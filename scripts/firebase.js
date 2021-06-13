var firebaseConfig = {
    apiKey: "AIzaSyChoUInYN6hWDmbNCuHwHTfQBPeC93pZQA",
    authDomain: "anime-keyo.firebaseapp.com",
    databaseURL: "https://anime-keyo-default-rtdb.firebaseio.com",
    projectId: "anime-keyo",
    storageBucket: "anime-keyo.appspot.com",
    messagingSenderId: "473838311733",
    appId: "1:473838311733:web:c1f0444785c7617be9d47c",
    measurementId: "G-3YG1S4N1D6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const appCheck = firebase.appCheck();
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
appCheck.activate('6LfvDi4bAAAAAHHHhHuL580-qxK89amdtKXaw2hk');