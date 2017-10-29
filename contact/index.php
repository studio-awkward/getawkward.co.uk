<?php
  sleep(1);
  $data = json_decode(file_get_contents('php://input'), true);

  // catch those dastardly bots
  $honeypot = filter_var($data["honeypot"], FILTER_SANITIZE_STRING);
  $name = filter_var($data["name"], FILTER_SANITIZE_STRING);
  $email = filter_var($data["email"], FILTER_SANITIZE_STRING);
  $phone = filter_var($data["phone"], FILTER_SANITIZE_STRING);
  $message = filter_var($data["message"], FILTER_SANITIZE_STRING);

  if (strlen($honeypot) > 0) {
    return;
  }

  if (
    strlen($name) === 0 &&
    strlen($email) === 0 &&
    strlen($phone) === 0 &&
    strlen($message) === 0
  ) {
    return;
  }

  // send
  $to = "all@getawkward.co.uk";
  $subject = "[GetAwkward] Website contact form response";
  $headers = 'From: Get Awkward website <all@getawkward.co.uk>' . "\r\n" .
    'Reply-To: all@getawkward.co.uk' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  $message = "Hello human.

We have received a message through our website.

How exciting.

-----

IP: " . $_SERVER["REMOTE_ADDR"] . "
DATE: " . date("r") . "
NAME: " . $name . "
EMAIL: " . $email . "
PHONE: " . $phone . "
MESSAGE: " . $message . "

-----

That's it.

Bye now.";

mail($to, $subject, $message, $headers);
echo $message;
