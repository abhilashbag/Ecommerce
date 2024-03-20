const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const signupFormContainer = document.getElementById('signup-form-container');

// Toggle between login and signup forms
loginLink.addEventListener('click', () => {
    signupFormContainer.classList.add('hidden');
});

signupLink.addEventListener('click', () => {
    signupFormContainer.classList.remove('hidden');
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        // User logged in successfully
        window.alert('Login successful');
        // Redirect to homepage or dashboard
    } catch (error) {
        document.getElementById('login-error').textContent = error.message;
    }
});

// Sign up form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        // User signed up successfully
        window.alert('Sign Up successful');
        // Redirect to homepage or dashboard
    } catch (error) {
        document.getElementById('signup-error').textContent = error.message;
    }
});

// Firebase authentication state change listener
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in');
    } else {
        // No user is signed in
        console.log('No user is signed in');
    }
});
