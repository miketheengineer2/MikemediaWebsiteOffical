<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $packageType = htmlspecialchars($_POST['packageType']);
    $date = htmlspecialchars($_POST['date']);
    $message = htmlspecialchars($_POST['message']);

    // Email to you (admin)
    $to = "miketheengineer2@gmail.com;
    $subject = "New Booking Request: $packageType";
    
    // Admin email template
    $adminMessage = "
    <html>
    <body style='font-family: Arial, sans-serif;'>
        <h2>New Booking Request</h2>
        <p><strong>Package:</strong> $packageType</p>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Date:</strong> $date</p>
        <h3>Client's Message:</h3>
        <p>$message</p>
    </body>
    </html>
    ";

    // Headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // Send admin email
    $adminMailSent = mail($to, $subject, $adminMessage, $headers);

    // Confirmation email to client
    $clientSubject = "Booking Confirmation - Mike M.E-dia";
    $clientMessage = "
    <html>
    <body style='font-family: Arial, sans-serif;'>
        <h2>Thank you for your booking!</h2>
        <p>Dear $name,</p>
        <p>We have received your booking request for the $packageType package.</p>
        <p>Here are your booking details:</p>
        <ul>
            <li>Package: $packageType</li>
            <li>Preferred Date: $date</li>
        </ul>
        <p>We will review your request and contact you shortly to confirm the details.</p>
        <p>Best regards,<br>Mike M.E-dia Team</p>
    </body>
    </html>
    ";

    // Send client confirmation email
    $clientMailSent = mail($email, $clientSubject, $clientMessage, $headers);

    if ($adminMailSent && $clientMailSent) {
        echo json_encode(array("status" => "success", "message" => "Emails sent successfully"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to send emails"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>