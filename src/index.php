<?php

include("includes/config.php");

//Kontrollerar om användaren är inloggad
if (!isset($_SESSION['username'])) {
    header("location: login.php");
}

// Skapar ny instans av Login
$user = new User;

// Logga ut
if (isset($_POST['logout'])) {
    $username = $_SESSION['username'];
    $user->logOutUser($username);
    header("location:login.php");
}

?>

<!DOCTYPE html>
<html lang="sv">

<head>
    <title>Admin-gränssnitt</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Amaranth|Archivo+Black|Lobster|Baloo+Bhai&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!--jQuery-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.js" integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI=" crossorigin="anonymous"></script>
</head>

<body>

    <!--Meny-->
    <header id="mainheader">
        <div id="logo-container">
            <a href="#">
                <h2>Admin</h2>
            </a>
        </div>
        <div id="mobile-container">
            <div id="mobile-menu">
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
            </div>
        </div>
        <div id="main-nav">
            <ul>
                <li><a href="#education-wrapper">Utbildning</a></li>
                <li><a href="#job-wrapper">Jobb</a></li>
                <li><a href="#webpage-wrapper">Webbplatser</a></li>
                <li>
                    <form action="" method="POST">
                        <input type="submit" id="logout-button" value="Logga ut" name="logout"><br>
                    </form>
                </li>
            </ul>
        </div>
    </header>
    <!--Slut på menyn-->

    <!--Start på container-->
    <div id="container">

        <div id="education-wrapper" class="box">
            <h2>Utbildning</h2>
            <!--Utbildning-->
            <form id="addEducationForm">
                <input type="text" id="hie" placeholder="Lärosäte" /><br />
                <input type="text" id="name" placeholder="Namn på kurs/program" /><br />
                <input type="text" id="credits" placeholder="Antal högskolepoäng" /><br />
                <input type="text" id="startdate" placeholder="Startdatum" /><br />
                <input type="text" id="enddate" placeholder="Slutdatum" /><br />
                <button class="add-button" id="add-education-button" onclick="addEducation()">Lägg till
                    utbildning</button>
            </form>
            <form id="updateEducationForm">
                <label for="educationId">ID</label>
                <input type="text" id="educationId" placeholder="ID" disabled /><br />
                <label for="updateHie">Lärosäte</label>
                <input type="text" id="updateHie" placeholder="Lärosäte" required /><br />
                <label for="updateName">Namn på kurs/program</label>
                <input type="text" id="updateName" placeholder="Namn på kurs/program" required /><br />
                <label for="updateCredits">Högskolepoäng</label>
                <input type="text" id="updateCredits" placeholder="Antal högskolepoäng" required /><br />
                <label for="updateStartdate">Startdatum</label>
                <input type="text" id="updateStartdate" placeholder="Startdatum" required /><br />
                <label for="updateEnddate">Slutdatum</label>
                <input type="text" id="updateEnddate" placeholder="Slutdatum" required /><br />
                <button class="form-update-button" id="update-education-button" onclick="updateEducation()">Uppdatera
                    utbildning</button>
                <button class="close-button" onclick="closeUpdateBox()">Stäng</button>
            </form>
        </div>
        <!--Utskrifter för utbildning-->
        <div id="output"></div>



        <div id="job-wrapper" class="box">
            <h2>Jobb</h2>
            <!--Jobb-->
            <form id="addJobForm">
                <input type="text" id="workplace" placeholder="Arbetsplats" /><br />
                <input type="text" id="title" placeholder="Arbetstitel" /><br />
                <input type="text" id="startdatejob" placeholder="Startdatum" /><br />
                <input type="text" id="enddatejob" placeholder="Slutdatum" /><br />
                <button class="add-button" onclick="addJob()">Lägg till jobb</button>
            </form>
            <form id="updateJobForm">
                <label for="jobId">ID</label>
                <input type="text" id="jobId" placeholder="ID" disabled /><br />
                <label for="updateWorkplace">Arbetsplats</label>
                <input type="text" id="updateWorkplace" placeholder="Arbetsplats" required /><br />
                <label for="updateTitle">Arbetstitel</label>
                <input type="text" id="updateTitle" placeholder="Arbetstitel" required /><br />
                <label for="updateStartdatejob">Startdatum</label>
                <input type="text" id="updateStartdatejob" placeholder="Startdatum" required /><br />
                <label for="updateEnddatejob">Slutdatum</label>
                <input type="text" id="updateEnddatejob" placeholder="Slutdatum" required /><br />
                <button class="form-update-button" onclick="updateJob()">Uppdatera jobb</button>
                <button class="close-button" onclick="closeUpdateBox()">Stäng</button>
            </form>
        </div>
        <!--Utskrifter för jobb-->
        <div id="outputjobs"></div>



        <div id="webpage-wrapper" class="box">
            <h2>Webbplatser</h2>
            <!--Skapade webbplatser-->
            <form id="addWebpageForm">
                <input type="text" id="webpagetitle" placeholder="Titel" /><br />
                <input type="text" id="webpageurl" placeholder="Url till webbplatsen" /><br />
                <textarea id="webpagedescription" placeholder="Beskrivning av webbplatsen"></textarea>
                <button class="add-button" onclick="addWebpage()">Lägg till webbplats</button>
            </form>
            <form id="updateWebpageForm">
                <label for="webpageId">ID</label>
                <input type="text" id="webpageId" placeholder="ID" disabled /><br />
                <label for="updateWebpagetitle">Titel</label>
                <input type="text" id="updateWebpagetitle" placeholder="Titel" required /><br />
                <label for="updateWebpageurl">Url</label>
                <input type="text" id="updateWebpageurl" placeholder="Url till webbplatsen" required /><br />
                <label for="updateWebpagedescription">Beskrivning</label>
                <textarea id="updateWebpagedescription" placeholder="Beskrivning av webbplatsen"></textarea>
                <button class="form-update-button" onclick="updateWebpage()">Uppdatera webbplats</button>
                <button class="close-button" onclick="closeUpdateBox()">Stäng</button>
            </form>
        </div>
        <!--Utskrifter för skapade webbplatser-->
        <div id="outputwebpages"></div>


    </div>
    <!--Slut på container-->

    <footer>
        <p>Projekt - Webbutveckling III - Joakim Rosqvist - 2020</p>
    </footer>


    <div id="added-div">
        <p id="added-p">Post tillagd!</p>
    </div>
    <div id="updated-div">
        <p id="updated-p">Post uppdaterad!</p>
    </div>
    <div id="deleted-div">
        <p id="deleted-p">Post raderad!</p>
    </div>


    <script src="js/main.js"></script>

</body>

</html>

<?php



?>