import { db } from "./firebaseConfig.js";
import { collection, addDoc, getDocs, deleteDoc,doc } from "firebase/firestore"; 

let cityinp = document.getElementById("cityinp");
let countryinp = document.getElementById("countryinp");
let citybtn = document.getElementById("citybtn");
let main1 = document.getElementById("main1");

// Function to push data
let addcitydata = async () => {
  const cityName = cityinp.value.trim();
  const countryName = countryinp.value.trim();
  if (cityName === "" || countryName === "") {
    alert("Please fulfill all inputs!");
    return;
  }

  try {
    // Use addDoc to automatically generate a document ID
    const docRef = await addDoc(collection(db, "cities"), {
      city: cityName,
      country: countryName // Corrected key from 'county' to 'country' for consistency
    });
    main1.innerHTML += `<h3>City:${cityName}</h3>   <h3>Country:${countryName}</h3>`
    console.log(`Document written with ID: `, docRef.id);
    cityinp.value = ""; // Clear the input field after successful submission
    countryinp.value = ""; // Clear the country input field too
    getCityData();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Attach the addcitydata function to the button's click event
citybtn.addEventListener("click", addcitydata);



let getCityData = async () => {
  main1.innerHTML = ""; // clear old data

  const querySnapshot = await getDocs(collection(db, "cities"));
  console.log(querySnapshot);
  querySnapshot.forEach((docSnap) => {
  const data = docSnap.data();
  // console.log(data);
  let divelm = document.createElement("div");
  divelm.className = "box";

  let cityelm = document.createElement("h3");
  cityelm.innerText = `City:${data.city}`;

  let countryelm = document.createElement("h3");
  countryelm.innerText = `Country:${data.country}`;

  let deleteelm = document.createElement("button");
  deleteelm.innerText = "Delete";
  deleteelm.className = "del";

  deleteelm.onclick = async () => {
    await deleteDoc(doc(db, "cities", docSnap.id));
    getCityData();
  };
// console.log(docSnap.id);

  divelm.appendChild(cityelm);
  divelm.appendChild(countryelm);
  divelm.appendChild(deleteelm);
  main1.appendChild(divelm);
});
};
getCityData();
