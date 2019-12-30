/* Joakim Rosqvist - Mittuniversitetet - 2019 */
"use strict";

// Lägger webbtjänst-adressen i en variabel
const WEBPAGEURL = "http://localhost/projekt_w3_backend/webpagelist.php/webpages/";

// Funktion som lägger till en webbplats från formuläret
function addWebpage() {
    // Hämtar datat från fälten och lägger i variabler
    let webpagetitle = document.getElementById("webpagetitle").value;
    let webpageurl = document.getElementById("webpageurl").value;
    let webpagedescription = document.getElementById("webpagedescription").value;

    // Skapar ett JSON-objekt av inmatat data
    let webpageJson = JSON.stringify({
        "title": webpagetitle,
        "url": webpageurl,
        "description": webpagedescription
    });
    // Skickar JSON-datat till URL:en
    fetch(WEBPAGEURL, {
        method: "POST",
        body: webpageJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar webbplatserna
        .then((data) => getWebpages())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som hämtar webbplatserna från webbtjänsten
function getWebpages() {
    // Håmtar jobb från URL:en
    fetch(WEBPAGEURL)
        // Konverterar till JSON
        .then((res) => res.json())
        .then((data) => {
            let outputwebpages = "";
            // Loopar igenom datat och skriver ut alla kurser
            data.forEach(function (post) {
                outputwebpages += "<article class = 'box-wrapper'><div class = 'webpageBox'><p>"
                    + "<p>Titel: " + post.title + "</p>"
                    + "<p>URL: " + post.url + "</p>"
                    + "<p>Beskrivning: " + post.description + "</p></div>"
                    // Lägger till en radera-knapp som får ID:t från webbplats-ID:t
                    + "<div class ='button-box'><button class ='delete-button' onclick ='deleteWebpage(this.id)' id =" + post.id + ">Radera #"
                    + post.id + "</button>"
                    + '<button class ="update-button" onClick="updateWebpageTwo(this.id,\'' + post.title + '\', \'' + post.url + '\',  \'' + post.description + '\'  )"'
                    + "id=" + post.id + ">Uppdatera # " + post.id + "</button></div></article>";
            })
            // Lägger in all text i den rätta diven
            document.getElementById("outputwebpages").innerHTML = outputwebpages;
        })
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som tar bort en webbplats med ID:t som skickas från radera-knappen
function deleteWebpage(id) {
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
    let updateWebpagetitle = document.getElementById("updateWebpagetitle").value;
    let updateWebpageurl = document.getElementById("updateWebpageurl").value;
    let updateWebpagedescription = document.getElementById("updateWebpagedescription").value;

    // Skapar ett JSON-objekt av inmatat data
    let updateWebpageJson = JSON.stringify({
        "title": updateWebpagetitle,
        "url": updateWebpageurl,
        "description": updateWebpagedescription
    });
    // Skickar JSON-datat till URL:en
    fetch(WEBPAGEURL + "/" + webpageId, {
        method: "PUT",
        body: updateWebpageJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar webbplatserna
        .then((data) => getWebpages())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}

// Tar emot all data från posten vars uppdatera-knapp blivit klickad
function updateWebpageTwo(id, title, url, description) {
    document.getElementById('updateWebpageForm').style.display = "block";
    document.getElementById("webpageId").value = id;
    document.getElementById("updateWebpagetitle").value = title;
    document.getElementById("updateWebpageurl").value = url;
    document.getElementById("updateWebpagedescription").value = description;
}