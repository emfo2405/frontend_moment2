//Kör funktionen när sidan laddas
window.onload = fetchCourseData;

//Sparar kursdata i en array
let courses = [];

// En asynkron funktion som simulerar hämtning av data från en API
async function fetchCourseData() {
    try {
        //Hämtar in data
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
//Felmeddelande om datan inte läses in korrekt
if (!response.ok) {
    throw new Error("Fel vid anslutning till data...");
}

//sparar datan till den tomma arrayen
courses = await response.json();

//Kör funktioner för att skriva ut data
printCourses(courses);

//Skriver ut datan som en tabell i konsollen
        console.table(courses);

        //Felmeddelande om något går fel
    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Något gick fel - prova igen senare</p>";
    }
}

function printCourses(data) {
    const codeEl = document.querySelector("#kurskod");
    const courseEl = document.querySelector("#kursnamn");
    const progressionEl = document.querySelector("#progression");

    //Rensa DOM
    codeEl.innerHTML = "";
    courseEl.innerHTML = "";
   progressionEl.innerHTML = "";

    //Filtrera kurskod, kursnamn och progression
    courses.forEach (course => {
        codeEl.innerHTML += `<li>${course.code}</li>`;
    })

    courses.forEach (course => {
        courseEl.innerHTML += `<li>${course.coursename}</li>`;
    })

    courses.forEach (course => {
        progressionEl.innerHTML += `<li>${course.progression}</li>`;
    })




}
