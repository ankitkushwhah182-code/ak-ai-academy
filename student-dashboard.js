// =====================================
// TVK Foundation
// student-dashboard.js
// =====================================

import {
  auth,
  db,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc
} from "./firebase.js";

// ---------------------------
// Authentication Check
// ---------------------------

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    const studentRef = doc(db, "students", user.uid);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      alert("Student record not found.");
      return;
    }

    const data = studentSnap.data();

    // Profile
    document.getElementById("studentName").textContent = data.name || "-";
    document.getElementById("studentEmail").textContent = data.email || "-";
    document.getElementById("studentStatus").textContent = data.status || "Pending";

    // Cards
    document.getElementById("courseName").textContent = data.course || "-";
    document.getElementById("phone").textContent = data.phone || "-";
    document.getElementById("paymentStatus").textContent =
      data.paymentStatus || "Pending";

    // Table
    document.getElementById("tableName").textContent = data.name || "-";
    document.getElementById("tableEmail").textContent = data.email || "-";
    document.getElementById("tableCourse").textContent = data.course || "-";
    document.getElementById("tableAddress").textContent =
      data.address || "-";

    // Certificate Button
    const btn = document.querySelector(".download-btn");

    if (data.status === "Approved") {
      btn.style.pointerEvents = "auto";
      btn.style.opacity = "1";

      if (data.certificateUrl) {
        btn.href = data.certificateUrl;
      }
    } else {
      btn.href = "#";
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
      btn.textContent = "Certificate Not Available";
    }

  } catch (err) {
    console.error(err);
    alert("Failed to load student data.");
  }

});

// ---------------------------
// Logout
// ---------------------------

window.logout = async function () {

  try {

    await signOut(auth);

    window.location.href = "login.html";

  } catch (err) {

    console.error(err);

  }

};