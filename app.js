
// Firebase configuration
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyAktTEfiPN9R1NK0EQSVFaRCLMv7MzBvi8",
  authDomain: "varanasi-987c3.firebaseapp.com",
  projectId: "varanasi-987c3",
  storageBucket: "varanasi-987c3.appspot.com",
  messagingSenderId: "407197658056",
  appId: "1:407197658056:web:249cc7171e94e90e1c6efd",
  measurementId: "G-67SKYHQ2V6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Redirect to registration page
function redirectToRegistration() {
  window.location.href = "user.html";
}

// Redirect to login page
function redirectToLogin() {
  window.location.href = "user_login.html";
}

// Redirect to user page
function openUserPage() {
  window.location.href = "user_page.html";
}

// Redirect to admin login page
function openAdminLogin() {
  window.location.href = "admin_login.html";
}

// Check user status and redirect accordingly
function checkUserStatus() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      window.location.href = "user_login.html";
    } else {
      // User is not logged in
      window.location.href = "user.html";
    }
  });
}

// User login
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User login successful!");
      // Redirect to user dashboard or other page
      window.location.href = "user_dashboard.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

// User registration
function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Regular expression for email format validation
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailFormat.test(email)) {
    // Display an error message for badly formatted email
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "Please enter a valid email address.";
    errorContainer.style.display = "block";
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User registration successful!");
      // Redirect to user login page
      window.location.href = "user_login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

// Admin login
function loginAdmin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Provide fixed email and password for admin
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  if (email === adminEmail && password === adminPassword) {
    console.log("Admin login successful!");
    showAdminChoices();
    // Redirect to admin dashboard or other page
  } else {
    console.error("Incorrect email or password for admin.");
  }
}

// Show admin choices
function showAdminChoices() {
  const adminChoicesDiv = document.getElementById("adminChoices");
  adminChoicesDiv.style.display = "block";
}

// Redirect to fetch data page
function redirectToFetchData() {
  // Redirect to the page for fetching data
  window.location.href = "fetch.html";
}

// Redirect to add data page
function redirectToAddData() {
  // Redirect to the page for adding data
  window.location.href = "admin_dashboard.html";
}

// Retrieve user and employee data
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;

    // Retrieve user details from the database
    firebase.database().ref("users/" + uid).once("value")
      .then((snapshot) => {
        const userData = snapshot.val();
        const email = userData && userData.email; // Check if userData exists

        if (email) {
          document.getElementById("userEmail").innerText = email;
        }

        if (userData && userData.role === "user") { // Check if userData exists
          // Retrieve user's employee data from the database
          firebase.database().ref("employees/" + uid).once("value")
            .then((snapshot) => {
              const employeeData = snapshot.val();
              const employeeId = snapshot.key;
              const employeeName = employeeData && employeeData.name; // Check if employeeData exists
              const personalId = employeeData && employeeData.personalId; // Check if employeeData exists
              const dateOfBirth = employeeData && employeeData.dateOfBirth; // Check if employeeData exists
              const phoneNumber = employeeData && employeeData.phoneNumber; // Check if employeeData exists
              const address = employeeData && employeeData.address; // Check if employeeData exists
              const qualification = employeeData && employeeData.qualification; // Check if employeeData exists
              const currentExperience = employeeData && employeeData.currentExperience; // Check if employeeData exists
              const jobStartDate = employeeData && employeeData.jobStartDate; // Check if employeeData exists
              const employeeType = employeeData && employeeData.employeeType; // Check if employeeData exists
              const gender = employeeData && employeeData.gender; // Check if employeeData exists
              const timeShift = employeeData && employeeData.timeShift; // Check if employeeData exists

              if (employeeId && employeeName && personalId && dateOfBirth && phoneNumber && address && qualification && currentExperience && jobStartDate && employeeType && gender && timeShift) {
                document.getElementById("employeeId").innerText = employeeId;
                document.getElementById("employeeName").innerText = employeeName;
                document.getElementById("personalId").innerText = personalId;
                document.getElementById("dateOfBirth").innerText = dateOfBirth;
                document.getElementById("phoneNumber").innerText = phoneNumber;
                document.getElementById("address").innerText = address;
                document.getElementById("qualification").innerText = qualification;
                document.getElementById("currentExperience").innerText = currentExperience;
                document.getElementById("jobStartDate").innerText = jobStartDate;
                document.getElementById("employeeType").innerText = employeeType;
                document.getElementById("gender").innerText = gender;
                document.getElementById("timeShift").innerText = timeShift;
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Retrieve user's salary details from the database
    firebase.database().ref("salaries/" + uid).once("value")
      .then((snapshot) => {
        const salaryData = snapshot.val();
        const salary = salaryData && salaryData.salary;
        const taxesApplied = salaryData && salaryData.taxesApplied;
        const insurance = salaryData && salaryData.insurance;
        // const insurance = salaryData && salaryData.insurance;
        // const incentives = salaryData && salaryData.incentives;

        if (salary && taxesApplied && moneyDeducted && insurance && incentives) {
          document.getElementById("salary").value = salary;
          document.getElementById("taxesApplied").value = taxesApplied;
          document.getElementById("insurance").value = insurance;
          // document.getElementById("insurance").value = insurance;
          // document.getElementById("incentives").value = incentives;
        }
      })
      .catch((error) => {
        console.error("Error fetching salary details:", error);
      });

  } else {
    // Redirect to login page or handle as per your requirements
    window.location.href = "user_login.html";
  }
});
function addEmployee() {
  const user = firebase.auth().currentUser;
  if (user) {
    const uid = user.uid;

    // Retrieve the input values
    const employeeId = document.getElementById("employeeId").value;
    const employeeName = document.getElementById("employeeName").value;
    const personalId = document.getElementById("personalId").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("adminEmail").value;
    const address = document.getElementById("address").value;
    const qualification = document.getElementById("qualification").value;
    const currentExperience = document.getElementById("currentExperience").value;
    const jobStartDate = document.getElementById("jobStartDate").value;
    const employeeType = document.getElementById("employeeType").value;
    const gender = document.getElementById("gender").value;
    const timeShift = document.getElementById("timeShift").value;
    const salary = document.getElementById("salary").value;
    const taxesApplied = document.getElementById("taxesApplied").value;
    const insurance = document.getElementById("insurance").value;

    // Create an object with employee data
    const employeeData = {
      employeeId: employeeId,
      employeeName: employeeName,
      personalId: personalId,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      qualification: qualification,
      currentExperience: currentExperience,
      jobStartDate: jobStartDate,
      employeeType: employeeType,
      gender: gender,
      timeShift: timeShift,
      salary: salary,
      taxesApplied: taxesApplied,
      insurance: insurance,
    };

    // Update the data in the Firebase Realtime Database under the "employees" node
    firebase
      .database()
      .ref("employees/YJWhZoMHIBPhp1CZQDwuuAI823C3/" + uid + "/" + employeeId)
      
      .set(employeeData)
      .then(() => {
        console.log("Employee added successfully!");
        // Clear input fields
        document.getElementById("employeeId").value = "";
        document.getElementById("employeeName").value = "";
        document.getElementById("personalId").value = "";
        document.getElementById("dateOfBirth").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("adminEmail").value = "";
        document.getElementById("address").value = "";
        document.getElementById("qualification").value = "";
        document.getElementById("currentExperience").value = "";
        document.getElementById("jobStartDate").value = "";
        document.getElementById("employeeType").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("timeShift").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("taxesApplied").value = "";
        document.getElementById("insurance").value = "";
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  } else {
    console.error("User not logged in.");
  }
}
