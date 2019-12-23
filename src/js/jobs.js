"use strict";

// Lägger webbtjänst-adressen i en variabel
const JOBURL = "http://localhost/projekt_w3_backend/joblist.php/jobs/";

// Funktion som lägger till ett jobb från formuläret
function addJob() {
    // Hämtar datat från fälten och lägger i variabler
    let workplace = document.getElementById("workplace").value;
    let title = document.getElementById("title").value;
    let startdatejob = document.getElementById("startdatejob").value;
    let enddatejob = document.getElementById("enddatejob").value;

    // Skapar ett JSON-objekt av inmatat data
    let jobJson = JSON.stringify({
        "workplace": workplace,
        "title": title,
        "startdate": startdatejob,
        "enddate": enddatejob
    });
    // Skickar JSON-datat till URL:en
    fetch(JOBURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jobJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar jobben
        .then((data) => getJobs())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som hämtar jobben från webbtjänsten
function getJobs() {
    // Håmtar jobb från URL:en
    fetch(JOBURL)
        // Konverterar till JSON
        .then((res) => res.json())
        .then((data) => {
            let outputjobs = "<h3>Arbetslivserfarenhet</h3>";
            // Loopar igenom datat och skriver ut alla kurser
            data.forEach(function (post) {
                outputjobs += "<div class = 'jobBox'><p>" + post.workplace + "</p>"
                    + "<p>" + post.title + "</p>"
                    + "<p>" + post.startdate + "</p>"
                    + "<p>" + post.enddate + "</p>"
                    // Lägger till en radera-knapp som får ID:t från kurs-ID:t
                    + "<button onclick ='deleteJob(this.id)' id =" + post.id + ">Radera #" + post.id + "</button></div>";
            })
            // Lägger in all text i diven outputjobs
            document.getElementById("outputjobs").innerHTML = outputjobs;
        })
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}


// Funktion som tar bort ett jobb med ID:t som skickas från radera-knappen
function deleteJob(id) {
    // Använder URL:en och lägger till id:t som ska raderas
    fetch(JOBURL + id + "/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        // Uppdaterar jobblistan
        .then((data) => getJobs())
        // Visar felmeddelanden
        .catch((err) => console.log(err))
}

// Funktion som uppdaterar ett jobb
function updateJob() {
    // Hämtar datat från fälten och lägger i variabler
    let jobId = document.getElementById("jobId").value;
    let updateWorkplace = document.getElementById("updateWorkplace").value;
    let updateTitle = document.getElementById("updateTitle").value;
    let updateStartdatejob = document.getElementById("updateStartdatejob").value;
    let updateEnddatejob = document.getElementById("updateEnddatejob").value;

    // Skapar ett JSON-objekt av inmatat data
    let updateJobJson = JSON.stringify({
        "workplace": updateWorkplace,
        "title": updateTitle,
        "startdate": updateStartdatejob,
        "enddate": updateEnddatejob
    });
    // Skickar JSON-datat till URL:en
    fetch(JOBURL + "/" + jobId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: updateJobJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar jobben
        .then((data) => getJobs())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}
