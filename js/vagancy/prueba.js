// ... (previous code)

async function getDataJobs() {
    const response = await fetch(`${urlJobs}?_embed=company`);
    const data = await response.json();
  
    data.forEach(async (job) => {
      const row = document.createElement("tr");
      row.innerHTML = "";
  
      row.innerHTML = `
        <!-- Your HTML code for each job row -->
      `;
  
      const btnDelete = row.querySelector(".delete-btn");
      btnDelete.addEventListener("click", (event) => {
        event.preventDefault();
        deleteJob(job.id);
      });
  
      const btnEdit = row.querySelector(".edit-btn");
      btnEdit.addEventListener("click", (event) => {
        editJob(job);
        console.log(`${urlJobs}/${jobId.value}`);
      });
  
      tbodyJobs.appendChild(row);
    });
  
    const btnModal = document.getElementById("btnModal");
    console.log(btnModal);
  
    console.log(jobId);
    formVagancy.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      console.log(jobId.value);
      if (jobId.value) {
        updateJob(jobId.value);
      } else {
        createJob();
      }
      console.log("Todo correcto");
    });
  }
  
  // Call getDataJobs after DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    getDataJobs();
    getDataCompanies();
    const companiesData = getCompaniesDataFromLocalStorage();
  });
  