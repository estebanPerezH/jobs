(() => {
    //Logica
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const path = window.location.pathname;

    const routeActu = path.substring(path.lastIndexOf("/") + 1)

    const privateRoutes = ["administrator.html"]

        if (privateRoutes.includes(routeActu) && !isAuthenticated) {
        console.log("NO TIENES PERMISOS")
        window.location.href = "index.html"
    }

}
)()