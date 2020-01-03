/* Joakim Rosqvist - Mittuniversitetet - 2019 */
"use strict";

// Lägger webbtjänst-adressen i en variabel
const WEBPAGEURL = "https://studenter.miun.se/~joro1803/dt173g/projekt/backend/webpagelist.php/webpages/";

// Funktion som lägger till en webbplats från formuläret
function addWebpage() {
    // Hämtar datat från fälten och lägger i variabler
    let webpageTitle = document.getElementById("webpagetitle").value;
    let webpageUrl = document.getElementById("webpageurl").value;
    let webpageDescription = document.getElementById("webpagedescription").value;

    // Laddar om sidan om något fält är tomt
    if (!(webpageTitle != '' && webpageUrl != '' && webpageDescription != '')) location.reload();

    // Skapar ett JSON-objekt av inmatat data
    let webpageJson = JSON.stringify({
        "title": webpageTitle,
        "url": webpageUrl,
        "description": webpageDescription
    });

    // Körs för att undvika att uppdatera formuläret (till tomt) innan det skickas
    event.preventDefault();

    // Skickar JSON-datat till URL:en
    fetch(WEBPAGEURL, {
        method: "POST",
        body: webpageJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Tömmer formulären (för att det ska fungera i Firefox)
        .then((data) => clearWebpageFields())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som hämtar webbplatserna från webbtjänsten
function getWebpages() {
    document.getElementById('updateWebpageForm').style.display = "none";
    // Håmtar jobb från URL:en
    fetch(WEBPAGEURL)
        // Konverterar till JSON
        .then((res) => res.json())
        .then((data) => {
            let outputWebpages = "";
            // Loopar igenom datat och skriver ut alla kurser
            data.forEach(function (post) {
                outputWebpages += "<article class = 'box-wrapper'><div class = 'webpageBox'><p>"
                    + "<p><span class ='lead-text'>Titel: </span>" + post.title + "</p>"
                    + "<p><span class ='lead-text'>URL: </span>" + post.url + "</p>"
                    + "<p><span class ='lead-text'>Beskrivning: </span>" + post.description + "</p></div>"
                    + '<div class ="button-box"><button class ="update-button" onClick="updateWebpageSend(this.id,\'' + post.title + '\', \'' + post.url + '\',  \'' + post.description + '\'  )"'
                    + "id=" + post.id + ">Uppdatera # " + post.id + "</button>"
                    // Lägger till en radera-knapp som får ID:t från webbplats-ID:t
                    + "<button class ='delete-button' onclick ='deleteWebpage(this.id)' id =" + post.id + ">Radera #"
                    + post.id + "</button></div></article>";
            })
            // Lägger in all text i den rätta diven
            document.getElementById("outputwebpages").innerHTML = outputWebpages;
        })
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som tar bort en webbplats med ID:t som skickas från radera-knappen
function deleteWebpage(id) {
    // Lägger till on-klassen för att visa ta-bort-diven
    $("#deleted-div").addClass('on');
    // Tar bort klassen efter animationseventet är slut
    $("#deleted-div").one(animationEvent, function (event) {
        $("#deleted-div").removeClass('on')
    });
    // Använder URL:en och lägger till id:t som ska raderas
    fetch(WEBPAGEURL + id + "/", {
        method: "DELETE"
    })
        // Uppdaterar webbplatserna
        .then((data) => getWebpages())
        // Visar felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som uppdaterar en webbplats
function updateWebpage() {
    // Hämtar datat från fälten och lägger i variabler
    let webpageId = document.getElementById("webpageId").value;
    let updateWebpageTitle = document.getElementById("updateWebpagetitle").value;
    let updateWebpageUrl = document.getElementById("updateWebpageurl").value;
    let updateWebpageDescription = document.getElementById("updateWebpagedescription").value;

    // Skapar ett JSON-objekt av inmatat data
    let updateWebpageJson = JSON.stringify({
        "title": updateWebpageTitle,
        "url": updateWebpageUrl,
        "description": updateWebpageDescription
    });
    // Körs för att undvika att uppdatera formuläret (till tomt) innan det skickas
    event.preventDefault();
    // Skickar JSON-datat till URL:en
    fetch(WEBPAGEURL + "/" + webpageId, {
        method: "PUT",
        body: updateWebpageJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Laddar om sidan
        .then(res => getWebpages())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}

// Tar emot all data från posten vars uppdatera-knapp blivit klickad
function updateWebpageSend(id, title, url, description) {
    document.getElementById('updateWebpageForm').style.display = "block";
    document.getElementById("webpageId").value = id;
    document.getElementById("updateWebpagetitle").value = title;
    document.getElementById("updateWebpageurl").value = url;
    document.getElementById("updateWebpagedescription").value = description;
}


// Stänger uppdateringsfönstret
function clearWebpageFields() {
    // Tömmer formuläret
    document.getElementById("webpagetitle").value = "";
    document.getElementById("webpageurl").value = "";
    document.getElementById("webpagedescription").value = "";
    // Hämtar webbbplatserna
    getWebpages();
}