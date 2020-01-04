<?php

include("includes/config.php");

// Nytt objekt av message
$user = new User;

// Kontroll vid inloggning
if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $log = $user->logInUser($username, $password);
    if ($log == true) {
        header("Location:index.php");
    } else {
        $error = "Fel användarnamn/lösenord!";
    }
}

?>

<!DOCTYPE html>
<html lang="sv">

<head>
    <title>Logga in</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Amaranth|Archivo+Black|Baloo+Bhai&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!--jQuery-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.js" integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI=" crossorigin="anonymous"></script>
</head>

<body>
    <!--Meny-->
    <nav>
        <h1>Admin</h1>
        <div id="mainmenu">

        </div>
    </nav>
    <!--Slut på menyn-->
    <!--Start på container-->
    <div id="container">

        <div id="login-wrapper" class="box">
            <h2>Inloggning</h2>
            <form action="login.php" id="loginForm" method="POST">
                <input type="text" name="username" placeholder="Användarnamn" /><br />
                <input type="password" name="password" placeholder="Lösenord" /><br />
                <input type="submit" id ="login-button" value="Logga in"><br>
                <?php
                // Kollar om felmeddeande är genererat, isf - skriv ut den
                if (isset($error) && !empty($error)) {
                ?>
                    <p class="error"><?= $error; ?></p>
                <?php
                }
                ?>
            </form>
        </div>

    </div>
    <!--Slut på container-->

    <!--<script src="js/main.js"></script>-->

</body>

</html>