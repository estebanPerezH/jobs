const urlJobs = "http://localhost:3000/jobs";
const card = document.querySelector(".container");
const searchForm = document.querySelector("form");
const modalityFilter = document.getElementById("modality-filter");
const titleSearch = document.querySelector("input[type=search]");

async function paintJobs() {
  const response = await fetch(`${urlJobs}?_embed=company`);
  const data = await response.json();

  data.forEach(async (job) => {
    card.innerHTML += `
      <div class="card-job">
        <h2>${job.title}</h2>
        <p>${job.description}</p>
        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${job.location}</span>
            </div>
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${job.hour}</span>
            </div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <img
              src="${job.company.imageCompany}"
              alt="logo"
              height="80"
              width="80"
              class="object-fit-contain rounded-circle img-company"
            />
          </div>
        </div>
      </div>`;
  });
}

paintJobs();

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Fetch jobs with modality and title filters
  const modalityValue = modalityFilter.value;
  const titleValue = titleSearch.value;

  const response = await fetch(`${urlJobs}?_embed=company`);
  const data = await response.json();

  // Clear existing jobs before repainting
  card.innerHTML = "";

  data.forEach(async (job) => {
    // Check if the job matches the filters
    if (
      (modalityValue === "" || job.modality === modalityValue) &&
      (titleValue === "" ||
        job.title.toLowerCase().includes(titleValue.toLowerCase()))
    ) {
      card.innerHTML += `
        <div class="card-job">
          <h2>${job.title}</h2>
          <p>${job.description}</p>
          <div class="row">
            <div class="col-6">
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bx bx-current-location"></i>
                <span class="fw-semibold">${job.location}</span>
              </div>
              <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                <i class="bx bx-time"></i>
                <span class="fw-semibold">${job.hour}</span>
              </div>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <img
                src="${job.company.imageCompany}"
                alt="logo"
                height="80"
                width="80"
                class="object-fit-contain rounded-circle img-company"
              />
            </div>
          </div>
        </div>`;
    }
  });
});
