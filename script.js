$(document).ready(function() {

    // --- Form Switching Logic ---
    // Show Sign Up form
    $("#show-signup").click(function(e) {
        e.preventDefault();
        $("#login-form").fadeOut(200, function() {
            $("#signup-form").fadeIn(200);
        });
    });

    // Show Login form
    $("#show-login").click(function(e) {
        e.preventDefault();
        $("#signup-form").fadeOut(200, function() {
            $("#login-form").fadeIn(200);
        });
    });

    // --- Validation Logic for Sign Up Form ---
    $('#signup-form form').submit(function(e) {
        e.preventDefault(); 

        // Tanggalin ang lahat ng previous error messages at styling
        $('.error-message').remove();
        $('.form-control').removeClass('is-invalid');

        let isValid = true;
        const form = $(this);

        // 1. Check for Empty Required Fields
        form.find('input[required]').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).addClass('is-invalid');
                $(this).after('<div class="invalid-feedback error-message">This field is required.</div>');
            }
        });

        // 2. Check Password Match
        const password = form.find('input[placeholder="Password (minimum 5 characters)"]');
        const confirmPassword = form.find('input[placeholder="Confirm Password"]');

        if (password.val() !== confirmPassword.val()) {
            // Siguraduhing may laman ang dalawang field bago mag-check ng match, para hindi mag-doble ang error
            if (password.val().trim() !== '' && confirmPassword.val().trim() !== '') {
                isValid = false;
                password.addClass('is-invalid');
                confirmPassword.addClass('is-invalid');
                confirmPassword.after('<div class="invalid-feedback error-message">Passwords do not match.</div>');
            }
        }

        // --- Submission Action ---
        if (isValid) {
            // SUCCESS: Dito mo ilalagay ang code para i-submit sa server (AJAX)
            alert("Sign Up Successful! Data is ready to be sent to the server.");
            
            // Example: i-reset ang form at bumalik sa login
            form.trigger('reset');
            $("#show-login").click(); 
        } else {
            // ERROR: Scroll sa unang error para makita agad ng user
            $('html, body').animate({
                scrollTop: $('.is-invalid:first').offset().top - 100
            }, 500);
        }
    });

    // --- Validation Logic for Login Form ---
    $('#login-form form').submit(function(e) {
        e.preventDefault();
        
        $('.error-message').remove();
        $('.form-control').removeClass('is-invalid');
        
        let isValid = true;
        
        // Check for empty required fields
        $(this).find('input[required]').each(function() {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).addClass('is-invalid');
                $(this).after('<div class="invalid-feedback error-message">This field is required.</div>');
            }
        });

        if (isValid) {
            // SUCCESS: Dito ilalagay ang actual login code
            alert("Login attempt submitted! Authenticating...");
        } else {
             // ERROR: Scroll sa unang error para makita agad ng user
            $('html, body').animate({
                scrollTop: $('.is-invalid:first').offset().top - 100
            }, 500);
        }
    });
});
