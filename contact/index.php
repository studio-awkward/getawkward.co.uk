<?php
  sleep(1);
  $data = json_decode(file_get_contents('php://input'), true);

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
NAME: " . filter_var($data["name"], FILTER_SANITIZE_STRING) . "
EMAIL: " . filter_var($data["email"], FILTER_SANITIZE_STRING) . "
PHONE: " . filter_var($data["phone"], FILTER_SANITIZE_STRING) . "
MESSAGE: " . filter_var($data["message"], FILTER_SANITIZE_STRING) . "

-----

That's it.

Bye now.";

mail($to, $subject, $message, $headers);
echo $message;
