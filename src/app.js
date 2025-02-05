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

        console.table(courses);
        //Felmeddelande om något går fel
    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Något gick fel - prova igen senare</p>";
    }
}

const codeEl = document.querySelector("#kurskod");
const courseEl = document.querySelector("#kursnamn");
const progressionEl = document.querySelector("#progression");

function printCourses(data) {

    //Rensa DOM
    codeEl.innerHTML = "";
    courseEl.innerHTML = "";
    progressionEl.innerHTML = "";

    //Filtrera kurskod, kursnamn och progression
    courses.forEach(course => {
        codeEl.innerHTML += `<li>${course.code}</li>`;
    })

    courses.forEach(course => {
        courseEl.innerHTML += `<li>${course.coursename}</li>`;
    })

    courses.forEach(course => {
        progressionEl.innerHTML += `<li class="sortprogression" >${course.progression}</li>`;
    })


}


//Tar ut elementet search, som är sökrutan
const search = document.querySelector("#search");

//Sökfunktion som aktiveras när besökaren klickar i sökfönstret
search.onclick = () => {
    document.querySelector("#search"), addEventListener("input", filterCourses);
    printChange(courses);
}

//Funktion som filtrerar kurser baserat på vad som skrivs in i sökrutan
function filterCourses() {
    let searchInput = document.querySelector("#search").value;
    let filteredCourses = courses.filter((course) =>
        course.code.toLowerCase().includes(searchInput) ||
        course.coursename.toLowerCase().includes(searchInput) ||
        course.progression.toLowerCase().includes(searchInput)
    );
    printChange(filteredCourses);
}

//Tar ut kolumnerna, tömmer dem och skriver ut det filtrerade resultatet
function printChange(courses) {
    const codeEl = document.querySelector("#kurskod");
    const courseEl = document.querySelector("#kursnamn");
    const progressionEl = document.querySelector("#progression");

    codeEl.innerHTML = "";
    courseEl.innerHTML = "";
    progressionEl.innerHTML = "";

    //Skriver ut filtrerade kurskoder
    courses.forEach(course => {
        codeEl.innerHTML += `<li>${course.code}</li>`;
    })

    //Skriver ut filtrerade kursnamn
    courses.forEach(course => {
        courseEl.innerHTML += `<li>${course.coursename}</li>`;
    })

    //Skriver ut filtrerade progressioner
    courses.forEach(course => {
        progressionEl.innerHTML += `<li>${course.progression}</li>`;
    })

}

//Funktion som sorterar listor
const codeElTitle = document.querySelector("#kurskod_titel");
const courseElTitle = document.querySelector("#kursnamn_titel");
const progressionElTitle = document.querySelector("#progression_titel");

//Vid klick på kurskod-titel körs en sortering av kurskoder
codeElTitle.onclick = () => {
    document.querySelector("#kurskod_titel"), addEventListener("onclick", sortedCoursesCode(courses));
    printSorted(courses);
}

//Vid klick på kursnamn-titel körs en sortering av kursnamn
courseElTitle.onclick = () => {
    document.querySelector("#kursnamn_titel"), addEventListener("onclick", sortedCoursesName(courses));
    printSorted(courses);
}

//Vid klick på progression-titel körs en sortering av progression
progressionElTitle.onclick = () => {
    document.querySelector("#progression_titel"), addEventListener("onclick", sortedProgression(courses));
    printSorted(courses);
}

//Sorterar kurskoder
function sortedCoursesCode(courses) {
    courses.sort((a, b) => a.code > b.code ? 1 : -1);
    printSorted(courses);
}

//Sorterar kursnamn
function sortedCoursesName(courses) {
    courses.sort((a, b) => a.coursename > b.coursename ? 1 : -1);
    printSorted(courses);
}

//Sorterar progression
function sortedProgression(courses) {
    courses.sort((a, b) => a.progression > b.progression ? 1 : -1);
    printSorted(courses);
}


//Skriver ut de sorterade listorna
function printSorted(courses) {
    const codeEl = document.querySelector("#kurskod");
    const courseEl = document.querySelector("#kursnamn");
    const progressionEl = document.querySelector("#progression");

    codeEl.innerHTML = "";
    courseEl.innerHTML = "";
    progressionEl.innerHTML = "";

    //Skriver ut filtrerade kurskoder
    courses.forEach(course => {
        codeEl.innerHTML += `<li>${course.code}</li>`;
    })

    //Skriver ut filtrerade kursnamn
    courses.forEach(course => {
        courseEl.innerHTML += `<li>${course.coursename}</li>`;
    })

    //Skriver ut filtrerade progressioner
    courses.forEach(course => {
        progressionEl.innerHTML += `<li>${course.progression}</li>`;
    })
}

