// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyASRcswoVRumHI3UATiQKdgR7aAFp9CUnw",
    authDomain: "anseon-d452b.firebaseapp.com",
    projectId: "anseon-d452b",
    storageBucket: "anseon-d452b.firebasestorage.app",
    messagingSenderId: "679495427557",
    appId: "1:679495427557:web:3565ae1ec1516468a97b0c",
    measurementId: "G-0J7ZVRV3D5"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();