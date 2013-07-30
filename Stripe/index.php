<?php
header("Access-Control-Allow-Origin: *");

require 'stripe/Stripe.php';
Stripe::setApiKey("sk_test_LmGuxhHp5lVDQkliT9kHjoxH");

try {
  if (!isset($_GET['stripeToken']))
    throw new Exception("The Stripe Token was not generated correctly");
  Stripe_Charge::create(array("amount" => 1000,
                              "currency" => "gbp",
                              "card" => $_GET['stripeToken']));
  $success = 'Your payment was successful.';
}
catch (Exception $e) {
  $error = $e->getMessage();
}

$resp = array();
$resp['token'] = $_GET['stripeToken']; // Just for debugging
$resp['success'] = $success;
$resp['error'] = $error;
echo json_encode($resp);

?>