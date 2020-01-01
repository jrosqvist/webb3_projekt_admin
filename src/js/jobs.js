/* Joakim Rosqvist - Mittuniversitetet - 2019 */
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
            let outputjobs = "";
            // Loopar igenom datat och skriver ut alla kurser
            data.forEach(function (post) {
                outputjobs += "<article class = 'box-wrapper'><div class = 'jobBox'><p><span class ='lead-text'>Arbetsplats: </span>" + post.workplace + "</p>"
                    + "<p><span class ='lead-text'>Arbetstitel: </span>" + post.title + "</p>"
                    + "<p><span class ='lead-text'>Startdatum: </span>" + post.startdate + "</p>"
                    + "<p><span class ='lead-text'>Slutdatum: </span>" + post.enddate + "</p></div>"
                    + '<div class ="button-box"><button class ="update-button" onClick="updateJobTwo(this.id,\'' + post.workplace + '\', \'' + post.title + '\', \'' +  post.startdate + '\',  \'' + post.enddate + '\'  )"'
                    + "id=" + post.id  + ">Uppdatera # " + post.id + "</button>"
                    // Lägger till en radera-knapp som får ID:t från kurs-ID:t
                    + "<button class ='delete-button' onclick ='deleteJob(this.id)' id =" 
                    + post.id + ">Radera #" + post.id + "</button></div></article>";
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
        method: "DELETE"
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
        body: updateJobJson
    })
        // Konverterar returnerad respons till JSON
        .then((res) => res.json())
        // Hämtar jobben
        .then((data) => getJobs())
        // Plockar upp felmeddelanden
        .catch((err) => console.log(err))
}

// Tar emot all data från posten vars uppdatera-knapp blivit klickad
function updateJobTwo(id, workplace, title, startdate, enddate) {
    document.getElementById('updateJobForm').style.display = "block";
    document.getElementById("jobId").value = id;
    document.getElementById("updateWorkplace").value = workplace;
    document.getElementById("updateTitle").value = title;
    document.getElementById("updateStartdatejob").value = startdate;
    document.getElementById("updateEnddatejob").value = enddate;

}
