/* Joakim Rosqvist - Mittuniversitetet - 2019 */
"use strict";

// Lägger webbtjänst-adressen i en variabel
const URL = "https://studenter.miun.se/~joro1803/dt173g/projekt/backend/educationlist.php/education/";


// Funktion som lägger till en utbildning från formuläret
function addEducation() {
    // Hämtar datat från fälten och lägger i variabler
    let hie = document.getElementById("hie").value;
    let name = document.getElementById("name").value;
    let credits = document.getElementById("credits").value;
    let startDate = document.getElementById("startdate").value;
    let endDate = document.getElementById("enddate").value;

    // Laddar om sidan om något fält är tomt
    if (!(hie != '' && name != '' && credits != '' && startDate != '' && endDate != '')) location.reload();
    // Kollar så att inmatat data för högskolepoäng är ett numrerisk värde
    if (isNaN(credits)) {
        alert("Ange ett numreriskt värde för antal högskolepoäng!");
        location.reload();
    }
    // Skapar ett JSON-objekt av inmatat data
    let eduJson = JSON.stringify({
        "hie": hie,
        "name": name,
        "credits": credits,
        "startdate": startDate,
        "enddate": endDate
    });
    // Körs för att undvika att uppdatera formuläret (till tomt) innan det skickas
    event.preventDefault();
    // Skickar JSON-datat till URL:en
    fetch(URL, {
        method: "POST",
        body: eduJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar kurserna
        .then((data) => clearEducationFields())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som hämtar utbildningsposterna från webbtjänsten
function getEducation() {
    document.getElementById('updateEducationForm').style.display = "none";
    // Håmtar kurser från URL:en
    fetch(URL)
        // Konverterar till JSON
        .then((res) => res.json())
        .then((data) => {
            let output = "";
            // Loopar igenom datat och skriver ut alla poster
            data.forEach(function (post) {
                output += "<article class = 'box-wrapper'><div class = 'educationBox'><p><span class ='lead-text'>Lärosäte: </span>" + post.hie + "</p>"
                    + "<p><span class ='lead-text'>Utblidning: </span>" + post.name + "</p>"
                    + "<p><span class ='lead-text'>Högskolepoäng: </span>" + post.credits + "</p>"
                    + "<p><span class ='lead-text'>Startdatum: </span>" + post.startdate + "</p>"
                    + "<p><span class ='lead-text'>Slutdatum: </span>" + post.enddate + "</p></div>"
                    + '<div class ="button-box"><button class ="update-button" onClick="updateEducationSend(this.id,\'' + post.hie + '\', \'' + post.name + '\', \'' + post.credits + '\', \'' + post.startdate + '\',  \'' + post.enddate + '\'  )"'
                    + "id=" + post.id + ">Uppdatera # " + post.id + "</button>"
                    // Lägger till en radera-knapp som får ID:t från kurs-ID:t
                    + "<button class ='delete-button' onclick ='deleteEducation(this.id)' id =" + post.id + ">Radera # " + post.id + "</button></div></article>";
            })
            // Lägger in all text i diven output
            document.getElementById("output").innerHTML = output;
        })
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som tar bort en utbildning med ID:t som skickas från radera-knappen
function deleteEducation(id) {
    // Lägger till on-klassen för att visa ta-bort-diven
    $("#deleted-div").addClass('on');
    // Tar bort klassen efter animationseventet är slut
    $("#deleted-div").one(animationEvent, function (event) {
        $("#deleted-div").removeClass('on')
    });
    // Använder URL:en och lägger till id:t som ska raderas
    fetch(URL + id + "/", {
        method: "DELETE",

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
    // Körs för att undvika att uppdatera formuläret (till tomt) innan det skickas
    event.preventDefault();
    // Skickar JSON-datat till URL:en
    fetch(URL + "/" + educationId, {
        method: "PUT",
        body: updateEduJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar kurserna
        .then((data) => getEducation())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))

}

// Tar emot all data från posten vars uppdatera-knapp blivit klickad
function updateEducationSend(id, hie, name, credits, startdate, enddate) {
    document.getElementById('updateEducationForm').style.display = "block";
    document.getElementById("educationId").value = id;
    document.getElementById("updateHie").value = hie;
    document.getElementById("updateName").value = name;
    document.getElementById("updateCredits").value = credits;
    document.getElementById("updateStartdate").value = startdate;
    document.getElementById("updateEnddate").value = enddate;
}

// Stänger uppdateringsfönstret
function clearEducationFields() {
    // Tömmer formuläret
    document.getElementById("hie").value = "";
    document.getElementById("name").value = "";
    document.getElementById("credits").value = "";
    document.getElementById("startdate").value = "";
    document.getElementById("enddate").value = "";
    // Hämtar utbildnignarna
    getEducation();
}





