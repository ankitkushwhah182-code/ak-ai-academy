// ===========================================
// TVK Foundation
// student-dashboard.js
// ===========================================

import {
    auth,
    db,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc
} from "./firebase.js";

// ============================
// Check Login
// ============================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    try {

        const studentRef = doc(db, "students", user.uid);

        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {

            alert("Student Record Not Found");

            return;

        }

        const data = studentSnap.data();

        // ==========================
        // Profile
        // ==========================

        document.getElementById("studentName").textContent =
            data.name || "-";

        document.getElementById("studentEmail").textContent =
            data.email || "-";

        document.getElementById("studentStatus").textContent =
            data.status || "Pending";

        // ==========================
        // Cards
        // ==========================

        document.getElementById("courseName").textContent =
            data.course || "-";

        document.getElementById("phone").textContent =
            data.phone || "-";

        document.getElementById("paymentStatus").textContent =
            data.paymentStatus || "Pending";

        // ==========================
        // Table
        // ==========================

        document.getElementById("tableName").textContent =
            data.name || "-";

        document.getElementById("tableEmail").textContent =
            data.email || "-";

        document.getElementById("tableCourse").textContent =
            data.course || "-";

        document.getElementById("tableAddress").textContent =
            data.address || "-";

        // ==========================
        // Status Color
        // ==========================

        const status =
            document.getElementById("studentStatus");

        if (data.status === "Approved") {

            status.style.background = "green";

        }

        if (data.status === "Rejected") {

            status.style.background = "red";

        }

        if (data.status === "Pending") {

            status.style.background = "orange";

        }

        // ==========================
        // Certificate
        // ==========================

        const btn =
            document.querySelector(".download-btn");

        if (data.certificate === true &&
            data.certificateUrl) {

            btn.href = data.certificateUrl;

            btn.style.pointerEvents = "auto";

            btn.style.opacity = "1";

        } else {

            btn.href = "#";

            btn.style.pointerEvents = "none";

            btn.style.opacity = ".5";

            btn.innerHTML =
                "Certificate Not Available";

        }

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

});

// ============================
// Logout
// ============================

window.logout = async function () {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

};

// ============================
// Auto Refresh Every 30 Seconds
// ============================

setInterval(() => {

    location.reload();

}, 30000);