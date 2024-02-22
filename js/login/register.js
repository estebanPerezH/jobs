const inputRegisterEmail = document.querySelector("#email");
const inputRegisterPassword = document.querySelector("#password");
const inputConfirmationPassword = document.querySelector("#password-confirmation");
const inputNameCompany = document.querySelector("#company");
const imgCompany = document.querySelector("#img-company");
const formRegister = document.querySelector("#formRegister");

const URL = "http://localhost:3000/companies";

//Eventos


formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    createUser()
})

async function createUser() {
    //Validar la información

    if (!validatePassword()) {
        showAlert("Contraseña no válida")
        return
    }
    //Validar que el email no esté registrado
    if (await validateEmail()) {
        showAlert("El email ya se encuentra registrado.")
        return
    }

    console.log("PASASTE LAS VALIDACIONES")

    try {
        //Crear al usuario
        const data = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ email: inputRegisterEmail.value,
                                   password: inputRegisterPassword.value,
                                   nameCompany: inputNameCompany.value,
                                   imageCompany: imgCompany.value, 
                                   nit: Date.now().toString()
                                
                                })
        })
    } catch (error) {
        showAlert("Ocurrió un error al crear el usuario.")
    }

}

function showAlert(msg) {
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        showConfirmButton: false,
        timer: 4000,
        toast: "true",
        position: "bottom-right"
    })
}


function validatePassword() {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;


    //Validar que las dos contraseñas sean iguales, tengan una minima longitud de 6 caracteres y tengan un caracter especial
    return inputRegisterPassword.value === inputConfirmationPassword.value && regex.test(inputRegisterPassword.value)
}


async function validateEmail() {

    try {
        //
        const response = await fetch(`${URL}?email=${inputRegisterEmail.value}`)

        const data = await response.json()
        //Si data tiene elementos quiere decir que el email ya está registrado
        console.log(data)
        return data.length
    } catch (error) {
        return false
    }

}





