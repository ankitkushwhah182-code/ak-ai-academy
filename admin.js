// =====================================
// TVK Foundation Admin Panel
// admin.js (Part-1)
// Firebase Connection
// =====================================

import {

auth,
db,
onAuthStateChanged,
signOut,
collection,
getDocs,
doc,
updateDoc,
deleteDoc

} from "./firebase.js";


// ==========================
// Check Admin Login
// ==========================

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="login.html";

return;

}

if(user.email!="tvkfoundation4@gmail.com"){

alert("Access Denied");

window.location.href="login.html";

return;

}

loadDashboard();

});


// ==========================
// Logout
// ==========================

window.logout=async function(){

await signOut(auth);

window.location.href="login.html";

}


// ==========================
// Dashboard
// ==========================

async function loadDashboard(){

loadStudents();

}// =====================================
// PART 2
// Load Students From Firebase
// =====================================

async function loadStudents() {

    const tbody = document.getElementById("studentTable");

    const total = document.getElementById("totalStudents");

    const pending = document.getElementById("pendingStudents");

    const approved = document.getElementById("approvedStudents");

    tbody.innerHTML = "";

    let totalCount = 0;
    let pendingCount = 0;
    let approvedCount = 0;

    const querySnapshot = await getDocs(collection(db, "students"));

    querySnapshot.forEach((student) => {

        const data = student.data();

        totalCount++;

        if (data.status === "Pending") {

            pendingCount++;

        }

        if (data.status === "Approved") {

            approvedCount++;

        }

        tbody.innerHTML += `

<tr>

<td>${data.name}</td>

<td>${data.email}</td>

<td>${data.phone}</td>

<td>${data.course}</td>

<td>${data.status}</td>

<td>

<button onclick="approveStudent('${student.id}')">

Approve

</button>

<button onclick="rejectStudent('${student.id}')">

Reject

</button>

<button onclick="deleteStudentData('${student.id}')">

Delete

</button>

</td>

</tr>

`;

    });

    total.innerHTML = totalCount;

    pending.innerHTML = pendingCount;

    approved.innerHTML = approvedCount;

}

// =====================================
// Search Student
// =====================================

window.searchStudent = function () {

    const value = document
        .getElementById("searchStudent")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach((row) => {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

};// =====================================
// PART 3
// Approve / Reject / Delete Student
// =====================================

// Approve Student

window.approveStudent = async function (id) {

    try {

        await updateDoc(doc(db, "students", id), {

            status: "Approved"

        });

        alert("Student Approved Successfully.");

        loadStudents();

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// Reject Student

window.rejectStudent = async function (id) {

    try {

        await updateDoc(doc(db, "students", id), {

            status: "Rejected"

        });

        alert("Student Rejected.");

        loadStudents();

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// Delete Student

window.deleteStudentData = async function (id) {

    const ok = confirm("Delete this student permanently?");

    if (!ok) return;

    try {

        await deleteDoc(doc(db, "students", id));

        alert("Student Deleted Successfully.");

        loadStudents();

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// Refresh Dashboard Every 15 Seconds

setInterval(() => {

    loadStudents();

}, 15000);// =====================================
// PART 4
// Dashboard Analytics & Extra Features
// =====================================

// Update Payment Status
window.updatePayment = async function (id, status) {

    try {

        await updateDoc(doc(db, "students", id), {

            paymentStatus: status

        });

        alert("Payment Status Updated");

        loadStudents();

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// Certificate Approval
window.approveCertificate = async function (id) {

    try {

        await updateDoc(doc(db, "students", id), {

            certificate: true

        });

        alert("Certificate Approved");

        loadStudents();

    } catch (error) {

        console.log(error);

        alert(error.message);

    }

};


// Download Student List (CSV)
window.downloadCSV = async function () {

    const snapshot = await getDocs(collection(db, "students"));

    let csv =
        "Name,Email,Phone,Course,Status,Payment\n";

    snapshot.forEach((student) => {

        const data = student.data();

        csv +=

`${data.name},
${data.email},
${data.phone},
${data.course},
${data.status},
${data.paymentStatus}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "TVK_Students.csv";

    a.click();

};


// Dashboard Refresh

window.refreshDashboard = function () {

    loadStudents();

};


// Welcome Message

console.log("TVK Foundation Admin Panel Loaded Successfully");