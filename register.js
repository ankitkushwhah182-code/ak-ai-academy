import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc
} from "./firebase.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value.trim();
  const password = document.getElementById("password").value;

  try {

    // Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Firestore
    await setDoc(doc(db, "students", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      phone: phone,
      course: course,
      role: "student",
      status: "Pending",
      createdAt: new Date()
    });

    alert("Registration Successful");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

});<form id="registerForm">

<input type="text" id="name" placeholder="Full Name" required>

<input type="email" id="email" placeholder="Email" required>

<input type="text" id="phone" placeholder="Phone Number" required>

<input type="text" id="course" placeholder="Course Name" required>

<input type="password" id="password" placeholder="Password" required>

<button type="submit">
Register
</button>

</form>

<script type="module" src="register.js"></script>export {
auth,
db,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
collection,
addDoc,
getDocs,
getDoc,
doc,
setDoc,
updateDoc,
deleteDoc
};