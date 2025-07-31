<?php
// upload.php - prosty backend do uploadu plików JPG dla szablonów CV
if(isset($_FILES['cv-upload'])){
    $target_dir = 'images/';
    $target_file = $target_dir . basename($_FILES['cv-upload']['name']);
    if(move_uploaded_file($_FILES['cv-upload']['tmp_name'], $target_file)){
        echo $target_file; // zwraca ścieżkę do pliku
    } else {
        echo 'Błąd podczas przesyłania pliku.';
    }
}
?>
