//Selectores 
const title = document.querySelector("#title-job");
const experience = document.querySelector("#experience");
const salary = document.querySelector("#salary");
const location = document.querySelector("#Location");
const modality = document.querySelector("#modality");
const description = document.querySelector("#description");
const formVagancy = document.querySelector("#formVagancy");
const tbodyJobs = document.querySelector("#tbody-jobs");
const jobId = document.getElementById("idJobUpdate");

//Url Para obtener informacion
const urlJobs = "http://localhost:3000/jobs";

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    getDataJobs();  

    getDataCompanies();

    const companiesData = getCompaniesDataFromLocalStorage();
});



formVagancy.addEventListener("submit", (event) => {
    event.preventDefault();

    if (jobId.value) {
        console.log("Estamos editando");
        updateJob();
    } else {
        createJob();
    }
    console.log("Todo correcto");
});






async function createJob() {
    const companiesData = JSON.parse(localStorage.getItem("companiesData"));
    
    
    const selectedCompany = companiesData[0];

    const paintJob = {
        title: title.value,
        experience: experience.value,
        salary: salary.value,
        location: location.value,
        modality: modality.value,
        description: description.value,
        hour:new Date().toLocaleDateString('en-CA'),
        companyId : selectedCompany.id
    };

    await fetch(urlJobs, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paintJob),
    });
}




// ----------------------------------------------------



async function getDataCompanies() {
    const response = await fetch("http://localhost:3000/companies");
    const companiesData = await response.json();

    // Almacena la información en el localStorage
    localStorage.setItem("companiesData", JSON.stringify(companiesData));
}


function getCompaniesDataFromLocalStorage() {
    const storedData = localStorage.getItem("companiesData");
    return storedData ? JSON.parse(storedData) : [];
}

const btnDelete = document.querySelector("#delete")
console.log(btnDelete);



async function deleteJob(jobId){
    await fetch(`${urlJobs}/${jobId}`, {
        method: "DELETE",
    });
}



async function getDataJobs() {
    const response = await fetch(`${urlJobs}?_embed=company`);
    const data = await response.json();

    data.forEach(async (job) => {
        const row = document.createElement("tr");
        row.innerHTML = "";
        
        const companyImage = job.company?.imageCompany || ''; 

        row.innerHTML = `
            <td>
                <div class="d-middle">
                    <img
                        src="${companyImage.imageCompany}"
                        alt=""
                        width="60"
                        height="60"
                        class="img-fluid rounded-circle img-company"
                    />
                </div>
            </td>
            <td>${job.company ? job.company.nameCompany : ''}</td>
            <td>${job.description}</td>
            <td>${job.location}</td>
            <td>${job.experience}</td>
            <td>${job.modality}</td>
            <td>${job.salary}</td>
            <td>
                <button class="btn btn-primary edit-btn">
                    <i class="bx bx-edit"></i>
                </button>
                <button class="btn btn-danger delete-btn">
                    <i class="bx bx-trash"></i>
                </button>
            </td>
        `;
    
        const btnDelete = row.querySelector(".delete-btn");
        btnDelete.addEventListener("click", (event) => {
            event.preventDefault();
            deleteJob(job.id);
        });
  
        const btnEdit = row.querySelector(".edit-btn");
        btnEdit.addEventListener("click", (event) => {
            loadJob(job);
            console.log(`${urlJobs}/${job.id}`);
        });
        tbodyJobs.appendChild(row);
    });
}

const btnModal = document.getElementById("btnModal")
console.log(btnModal);

async function loadJob(job) {
    title.value = job.title;
    experience.value = job.experience;
    salary.value = job.salary;
    location.value = job.location;
    modality.value = job.modality;
    description.value = job.description;
    jobId.value = job.id;
    console.log(jobId.value);
    btnModal.click();
}

async function updateJob(){
    const dataUpdated = {
        title: title.value,
        experience: experience.value,
        salary: salary.value,
        location: location.value,
        modality: modality.value,
        description: description.value,
    }
    await fetch(`${urlJobs}/${jobId.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdated),
    });

    
}