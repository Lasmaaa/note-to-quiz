const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let errors = getSignupFormErrors(
        firstname_input.value,
        email_input.value,
        password_input.value,
        repeat_password_input.value
    )

    if (errors.length > 0) {
        return
    }

    localStorage.setItem("user_firstname", firstname_input.value)
    localStorage.setItem("user_email", email_input.value)
    localStorage.setItem("user_password", password_input.value)

    window.location.href = "login.html"
})


function getSignupFormErrors(firstname, email, password, repeat_password) {
    let errors = []

    resetError(firstname_input)
    resetError(email_input)
    resetError(password_input)
    resetError(repeat_password_input)

    if (!firstname.trim()) {
        errors.push("Firstname required")
        setError(firstname_input)
    }

    if (!email.trim()) {
        errors.push("Email required")
        setError(email_input)
    } else if (!validateEmail(email)) {
        errors.push("Email is invalid")
        setError(email_input)
    }

    if (!password.trim()) {
        errors.push("Password required")
        setError(password_input)
    }

    if (!repeat_password.trim()) {
        errors.push("Repeat password required")
        setError(repeat_password_input)
    } else if (repeat_password !== password) {
        errors.push("Passwords do not match")
        setError(repeat_password_input)
    }

    return errors
}


function setError(input) {
    const wrapper = input.closest("div").parentElement
    wrapper.classList.add("incorrect")
}

function resetError(input) {
    const wrapper = input.closest("div").parentElement
    wrapper.classList.remove("incorrect")
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}



