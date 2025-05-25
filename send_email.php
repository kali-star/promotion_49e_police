<?php
// Désactiver l'affichage des erreurs pour l'utilisateur final en production
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// Inclure l'autoloader de Composer si vous utilisez Composer
// Ou inclure manuellement les fichiers PHPMailer si vous ne l'utilisez pas
require 'vendor/autoload.php'; // Chemin vers l'autoloader de Composer
// Si pas Composer :
// require 'vendor/phpmailer/src/PHPMailer.php';
// require 'vendor/phpmailer/src/SMTP.php';
// require 'vendor/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP; // Pour le débogage SMTP

// Récupération de l'URL de la page de contact pour les redirections
$contactPageUrl = 'contact.html';

// Vérifier si la requête est bien de type POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Mesures de Sécurité & Anti-Spam ---
    if (!empty($_POST['honeypot'])) {
        header("Location: " . $contactPageUrl . "?status=success");
        exit();
    }

    // 2. Récupération et Nettoyage des données du formulaire
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

    // 3. Validation Côté Serveur
    $errors = [];
    if (empty($name)) { $errors[] = "Le nom est requis."; }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = "Une adresse e-mail valide est requise."; }
    if (empty($subject)) { $errors[] = "L'objet est requis."; }
    if (empty($message)) { $errors[] = "Le message est requis."; }

    if (!empty($errors)) {
        header("Location: " . $contactPageUrl . "?status=error&msg=" . urlencode(implode(" ", $errors)));
        exit();
    }

    // --- Préparation et Envoi de l'E-mail avec PHPMailer ---
    $mail = new PHPMailer(true); // Passer `true` active les exceptions pour le débogage

    try {
        // Paramètres du serveur SMTP
        $mail->isSMTP();                                            // Envoyer via SMTP
        $mail->Host       = 'smtp.gmail.com';                       // Serveur SMTP (ex: 'smtp.gmail.com' pour Gmail)
        $mail->SMTPAuth   = true;                                   // Activer l'authentification SMTP
        $mail->Username   = 'votre_email_expediteur@gmail.com';    // <-- REMPLACEZ VOTRE ADRESSE EMAIL EXPÉDITEUR
        $mail->Password   = 'votre_mot_de_passe_ou_app_password';   // <-- REMPLACEZ VOTRE MOT DE PASSE OU MOT DE PASSE D'APPLICATION
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Activer le chiffrement TLS implicite
        $mail->Port       = 465;                                    // Port TCP auquel se connecter (465 pour SMTPS)

        // Débogage (décommenter pour voir les logs SMTP détaillés)
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;

        // Destinataires
        $mail->setFrom('no-reply@votre-domaine.com', 'Site 49e Promotion'); // <-- REMPLACEZ VOTRE NOM DE DOMAINE
        $mail->addAddress('contact@promotion49.fr', 'Destinataire 49e Promo'); // <-- ADRESSE DU RÉCEPTEUR
        $mail->addReplyTo($email, $name); // Pour répondre directement à l'expéditeur

        // Contenu
        $mail->isHTML(true);                                  // Définir le format de l'e-mail en HTML
        $mail->Subject = "Contact Site 49e Promo : " . $subject;
        $mail->Body    = "<h2>Nouveau message depuis le site de la 49e Promotion</h2>"
                        . "<p><strong>Nom :</strong> " . $name . "</p>"
                        . "<p><strong>Email :</strong> " . $email . "</p>"
                        . "<p><strong>Objet :</strong> " . $subject . "</p>"
                        . "<p><strong>Message :</strong></p>"
                        . "<p>" . nl2br($message) . "</p>";
        $mail->AltBody = "Nouveau message depuis le site de la 49e Promotion\n" // Version texte brut (important pour compatibilité)
                        . "Nom: " . $name . "\n"
                        . "Email: " . $email . "\n"
                        . "Objet: " . $subject . "\n"
                        . "Message: \n" . $message;

        $mail->send();
        header("Location: " . $contactPageUrl . "?status=success");
        exit();

    } catch (Exception $e) {
        // Erreur PHPMailer
        error_log("Erreur PHPMailer: " . $mail->ErrorInfo); // Log l'erreur pour le débogage
        header("Location: " . $contactPageUrl . "?status=error&msg=" . urlencode("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard."));
        exit();
    }

} else {
    // Rediriger si accès direct
    header("Location: " . $contactPageUrl);
    exit();
}
?>