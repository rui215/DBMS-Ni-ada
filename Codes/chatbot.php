<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["message"])) {
    echo json_encode(["response" => "Invalid request"]);
    exit;
}

$userMessage = strtolower($data["message"]);

$responses = [
    "kupal ka ba?" => "MASKUPAL KA TANGA",
    "hi" => "Hello! How can I assist you today?",
    "hello" => "Hi! How can I assist you today?",
    "how are you?" => "I'm just a bot, but I'm doing great! 😊",
    "what is your name?" => "I'm your friendly chatbot!",
    "what do you do?" => "I help answer your questions!",
    "who created you?" => "I was created by an awesome developer! 🚀",
    "thank you" => "You're welcome! 😊"
];

$responseText = "Sorry, I don't understand that.";
foreach ($responses as $key => $value) {
    if (strpos($userMessage, $key) !== false) {
        $responseText = $value;
        break;
    }
}

echo json_encode(["response" => $responseText]);
?>
