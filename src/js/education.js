"use strict";

// Lägger webbtjänst-adressen i en variabel
const URL = "http://localhost/projekt_w3_backend/educationlist.php/education/";

// Funktion som lägger till en utbildning från formuläret
function addEducation() {
    // Hämtar datat från fälten och lägger i variabler
    let hie = document.getElementById("hie").value;
    let name = document.getElementById("name").value;
    let credits = document.getElementById("credits").value;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;

    // Skapar ett JSON-objekt av inmatat data
    let eduJson = JSON.stringify({
        "hie": hie,
        "name": name,
        "credits": credits,
        "startdate": startdate,
        "enddate": enddate
    });
    // Skickar JSON-datat till URL:en
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: eduJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar kurserna
        .then((data) => getEducation())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som hämtar utbildningsposterna från webbtjänsten
function getEducation() {
    // Håmtar kurser från URL:en
    fetch(URL)
        // Konverterar till JSON
        .then((res) => res.json())
        .then((data) => {
            let output = "<h3>Slutförd utbildning</h3>";
            // Loopar igenom datat och skriver ut alla poster
            data.forEach(function (post) {
                output += "<div class = 'courseBox'><p>" + post.hie + "</p>"
                    + "<p>" + post.name + "</p>"
                    + "<p>" + post.credits + "</p>"
                    + "<p>" + post.startdate + "</p>"
                    + "<p>" + post.enddate + "</p>"
                    // Lägger till en radera-knapp som får ID:t från kurs-ID:t
                    + "<button onclick ='deleteEducation(this.id)' id =" + post.id + ">Radera # " + post.id + "</button></div>";
            })
            // Lägger in all text i diven output
            document.getElementById("output").innerHTML = output;
        })
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som tar bort en utbildning med ID:t som skickas från radera-knappen
function deleteEducation(id) {
    // Använder URL:en och lägger till id:t som ska raderas
    fetch(URL + "/" + id + "/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        // Uppdaterar lisstan med utbildningar
        .then((data) => getEducation())
        // Visar felmeddelanden
        .catch((err) => console.log(err))
}

// Uppdaterar en utbildnings-post
function updateEducation() {
    // Hämtar datat från fälten och lägger i variabler
    let educationId = document.getElementById("educationId").value;
    let updateHie = document.getElementById("updateHie").value;
    let updateName = document.getElementById("updateName").value;
    let updateCredits = document.getElementById("updateCredits").value;
    let updateStartdate = document.getElementById("updateStartdate").value;
    let updateEnddate = document.getElementById("updateEnddate").value;

    // Skapar ett JSON-objekt av inmatat data
    let updateEduJson = JSON.stringify({
        "hie": updateHie,
        "name": updateName,
        "credits": updateCredits,
        "startdate": updateStartdate,
        "enddate": updateEnddate
    });
    // Skickar JSON-datat till URL:en
    fetch(URL + "/" + educationId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: updateEduJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar kurserna
        .then((data) => getEducation())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))

}