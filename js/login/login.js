const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const formLogin = document.querySelector("#formLogin")

const urlUsers = "http://localhost:3000/companies"


// console.log(inputEmail.value,inputPassword.value);

formLogin.addEventListener("submit", (event) => {
    event.preventDefault()

    login()
})

async function login() {
    const response = await fetch(`${urlUsers}?email=${inputEmail.value}`)
    const data = await response.json()

    console.log(data)


    if (!data.length) {
        console.log("Email no registrado")
        return
    }


    if (data[0].password === inputPassword.value) {
        //Autenticar

        localStorage.setItem("isAuthenticated", "true")
        //window es un objeto global que nos permite acceder a la información la ventana
        window.location.href = "administrator.html"
        localStorage.setItem("companiesData", JSON.stringify(data[0]))

    } else {
        console.log("Contraseña incorrecta.")
    }

}