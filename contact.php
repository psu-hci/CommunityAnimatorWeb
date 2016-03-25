<?php
require 'Mandrill.php';

$mandrill = new Mandrill(); 

// If are not using environment variables to specific your API key, use:
 $mandrill = new Mandrill("72f331ecdd33f56bf69221270623d116-us13")

$message = array(
    'subject' => 'Test message',
    'from_email' => 'you@yourdomain.com',
    'html' => '<p>this is a test message with Mandrill\'s PHP wrapper!.</p>',
    'to' => array(array('email' => 'recipient1@domain.com', 'name' => 'Recipient 1')),
    'merge_vars' => array(array(
        'rcpt' => 'recipient1@domain.com',
        'vars' =>
        array(
            array(
                'name' => 'FIRSTNAME',
                'content' => 'Recipient 1 first name'),
            array(
                'name' => 'LASTNAME',
                'content' => 'Last name')
    ))));

$template_name = 'Stationary';

$template_content = array(
    array(
        'name' => 'main',
        'content' => 'Hi *|FIRSTNAME|* *|LASTNAME|*, thanks for signing up.'),
    array(
        'name' => 'footer',
        'content' => 'Copyright 2012.')

);

print_r($mandrill->messages->sendTemplate($template_name, $template_content, $message));

?>

