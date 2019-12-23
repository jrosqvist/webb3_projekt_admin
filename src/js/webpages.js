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
        headers: {
            "Content-Type": "application/json"
        },
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
            let outputwebpages = "<h3>Skapade webbplatser</h3>";
            // Loopar igenom datat och skriver ut alla kurser
            data.forEach(function (post) {
                outputwebpages += "<div class = 'webpageBox'><p>"
                    + "<p>" + post.title + "</p>"
                    + "<p>" + post.url + "</p>"
                    + "<p>" + post.description + "</p>"
                    // Lägger till en radera-knapp som får ID:t från webbplats-ID:t
                    + "<button onclick ='deleteWebpage(this.id)' id =" + post.id + ">Radera</button></div>";
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
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        // Uppdaterar webbplatserna
        .then((data) => getWebpages())
        // Visar felmeddelanden
        .catch((err) => console.log(err))
}