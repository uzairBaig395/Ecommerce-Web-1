// Import the initialized Firebase app and Firestore database from firebaseConfig.js
import { app, db } from "./firebaseConfig.js";

// Import specific Firestore functions needed for operations
import {
  collection,
  addDoc,
  onSnapshot, // To listen for real-time updates
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let nameinp = document.getElementById("nameinp");
let addname = document.getElementById("addname");
let namesList = document.getElementById("namesList"); // Get the div to display names

addname.addEventListener("click", async () => { // Made the event listener async
  const nameValue = nameinp.value.trim(); // Get the value and remove leading/trailing whitespace

  if (nameValue) { // Only save if the input is not empty
    try {
      // Add a new document with a generated ID to the 'names' collection
      await addDoc(collection(db, "names"), {
        name: nameValue,
        timestamp: new Date() // Add a timestamp for ordering
      });
      console.log("Document successfully written!");
      nameinp.value = ""; // Clear the input field after successful save
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  } else {
    alert("Please enter a name!"); // Alert if the input is empty
  }
});

// Real-time listener for the 'names' collection
// This will display names from the database in real-time
const q = query(collection(db, "names"), orderBy("timestamp", "desc")); // Order by timestamp

onSnapshot(q, (querySnapshot) => {
  namesList.innerHTML = ''; // Clear previous list
  querySnapshot.forEach((doc) => {
    const nameData = doc.data();
    const p = document.createElement("p");
    p.textContent = nameData.name;
    namesList.appendChild(p);
  });
});







    // console.log("Firebase App initialized:", app);
    // console.log("Firestore DB initialized:", db);

    // // Get references to your new input and button elements
    // let nameinp = document.getElementById("nameinp");
    // let addnameButton = document.getElementById("addname"); // Renamed for clarity

    // // --- Logic to Add Data to Firestore when 'addname' button is clicked ---
    // if (addnameButton) {
    //     addnameButton.addEventListener("click", async () => { // Made the function async
    //         const enteredName = nameinp.value.trim(); // Get the value and remove leading/trailing spaces

    //         if (enteredName) { // Only add if the input is not empty
    //             try {
    //                 // Reference to a new collection named 'names' (you can choose any name)
    //                 const namesCollection = collection(db, "names");

    //                 // Add a new document to the 'names' collection
    //                 // The document will have a field named 'name' with the entered value
    //                 // and a 'timestamp' to record when it was added.
    //                 const docRef = await addDoc(namesCollection, {
    //                     name: enteredName,
    //                     timestamp: new Date() // Use a client-side timestamp
    //                 });
    //                 console.log("Document for name written with ID: ", docRef.id);

    //                 nameinp.value = ""; // Clear the input field after successful addition

    //             } catch (e) {
    //                 console.error("Error adding name document: ", e);
    //             }
    //         } else {
    //             console.warn("Input field is empty. Please enter a name.");
    //         }
    //     });
    // }

    // // --- Optional: Real-time reading and displaying names from Firestore ---
    // // (Similar to the previous example, but now for the 'names' collection)
    // const namesList = document.getElementById('namesList'); // Reference to the div to display names
    // if (namesList) {
    //     // Create a query to get names, ordered by timestamp
    //     const q = query(collection(db, "names"), orderBy("timestamp", "desc"));

    //     // Set up a real-time listener for the 'names' collection
    //     onSnapshot(q, (querySnapshot) => {
    //         namesList.innerHTML = ''; // Clear previous data
    //         querySnapshot.forEach((doc) => {
    //             const nameData = doc.data();
    //             const li = document.createElement('li');
    //             li.textContent = nameData.name; // Display just the name
    //             namesList.appendChild(li);
    //         });
    //         console.log("Real-time name updates received!");
    //     });
    // }

    // // You can remove the previous addDataButton and dataList logic if they are no longer needed
    // // (I've commented them out below)

    // /*
    // // --- Example: Adding data to Firestore (OLD LOGIC - REMOVE IF NOT NEEDED) ---
    // const addDataButton = document.getElementById('addDataButton');
    // if (addDataButton) {
    //     addDataButton.addEventListener('click', async () => {
    //         try {
    //             // Reference to a collection named 'messages'
    //             const messagesCollection = collection(db, "messages");

    //             // Add a new document with a generated ID
    //             const docRef = await addDoc(messagesCollection, {
    //                 text: "Hello from my web app!",
    //                 timestamp: new Date(), // Using a client-side timestamp
    //                 user: "Web User"
    //             });
    //             console.log("Document written with ID: ", docRef.id);
    //         } catch (e) {
    //             console.error("Error adding document: ", e);
    //         }
    //     });
    // }

    // // --- Example: Reading data from Firestore in real-time (OLD LOGIC - REMOVE IF NOT NEEDED) ---
    // const dataList = document.getElementById('dataList');
    // if (dataList) {
    //     // Create a query to get messages, ordered by timestamp
    //     const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

    //     // Set up a real-time listener
    //     onSnapshot(q, snaps => {
    //         // Reset page
    //         dataList.innerHTML = '';
    //         // Loop through documents in database
    //         snaps.forEach(doc => {
    //           // Create an HTML entry for each document and add it to the chat
    //           const entry = document.createElement('p');
    //           entry.textContent = doc.data().name + ': ' + doc.data().text;
    //           dataList.appendChild(entry);
    //         });
    //         console.log("Real-time updates received!");
    //     });
    // }
    // */
