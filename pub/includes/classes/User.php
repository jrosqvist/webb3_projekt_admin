<?php

class User {

    public function logInUser($username, $password) {
        // Kollar om lösenordet stämmer med det förinställda
        if($username == "admin" && $password == "password") {
            //Skapar en sessions-variabel
            $_SESSION['username'] = $username;
            return true;
        } else {
            return false;
        }
    }

    public function logOutUser($username) {
        $_SESSION['username'] = $username;
        // Tar bort sessionen
        unset($_SESSION["username"]);
        return;
    }

}
