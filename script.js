const inputs = document.querySelectorAll("input[type=text], textarea")
const queryType = document.querySelector("input[name='query_type']");
const consentBox = document.getElementById("consent");

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", function() {
    if (!validateInputs()) return;

    const successMessage = document.getElementById("success-message"); 
    successMessage.style.opacity = 1;

    setTimeout(() => {
        successMessage.style.opacity = 0;
    }, 3000);
    // todo: clear all inputs
});

inputs.forEach(input => input.addEventListener("input", (e) => {
    const {id, value} = input;

    if (value.replace(/\s/, "").trim() !== "") {
        document.getElementById(`${id}-required-error`).style.display = "none";
        input.classList.remove("error-input");
    }

    const emailRegex = /([A-Z]|[a-z])*@([a-z])*(\.)(com|org|ph|edu)/
    if (emailRegex.test(value)) {
        document.getElementById(`valid-email-error`).style.display = "none";
    } 
}));

queryType.addEventListener("change", (e) => {
    const value = e.target.value;

    document.getElementById("query-type-required-error").style.display = "none";
})

consentBox.addEventListener("change", (e) => {
    document.getElementById("consent-required-error").style.display = "none";
})

function validateInputs () {
    let valid = true;

    inputs.forEach(input => {
        const { type, id, value } = input;
 
        if (value.replace(/\s/, "").trim() === "") {
            document.getElementById(`${id}-required-error`).style.display = "block";
            input.classList.add("error-input");
            valid = false;
        } else {
            document.getElementById(`${id}-required-error`).style.display = "none";
            input.classList.remove("error-input");
        }

        const emailRegex = /([A-Z]|[a-z])*@([a-z])*(\.)(com|org|ph|edu)/
        if (id === 'email' && !emailRegex.test(value)) {
            document.getElementById(`valid-email-error`).style.display = "block";
            valid = false;
        } else if (emailRegex.test(value)) {
            document.getElementById(`valid-email-error`).style.display = "none";
        }
    });

    const radioButtonElements = document.querySelectorAll("input[type=radio]");
    let queryTypeValid = false;
    radioButtonElements.forEach(element => {
        if (!queryTypeValid) {
            queryTypeValid = element.checked;
        }
    })
    if (!queryTypeValid) {
        document.getElementById("query-type-required-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("query-type-required-error").style.display = "none";
    }

    if (!consentBox.checked) {
        document.getElementById("consent-required-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("consent-required-error").style.display = "none";
    }

    return valid;
}
