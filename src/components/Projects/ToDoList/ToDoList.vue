<template>
  <div class="card mb-25 border-0 rounded-0 bg-white to-do-list-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between"
      >
        <h5 class="card-title fw-bold mb-0">To Do List</h5>
        <a
          href="#"
          class="card-link-btn text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"
          data-bs-toggle="modal"
          data-bs-target="#createNewTaskModal"
        >
          Add A New Task
        </a>
      </div>
      <ul class="to-do-list ps-0 list-unstyled mb-0">
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check form-check-primary mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task1"
            />
            <label class="form-check-label" for="task1">
              Design a Facebook Ad
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                12th March, 2024 - 10:20 AM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check mb-0 form-check-info mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task2"
            />
            <label class="form-check-label" for="task2">
              Analyze Dashboard Data
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                11th March, 2024 - 11:11 AM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i> Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check mb-0 form-check-success mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task3"
            />
            <label class="form-check-label" for="task3">
              Taking Interview
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                10th March, 2024 - 10:12 PM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check mb-0 form-check-danger mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task4"
            />
            <label class="form-check-label" for="task4">
              Stockholder Meeting
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                09th March, 2024 - 09:10 AM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check form-check-primary mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task5"
            />
            <label class="form-check-label" for="task5">
              Design a Instagram Ad
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                09th March, 2024 - 08:00 AM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          class="to-do-list-item ps-8 pe-5 d-flex align-items-center justify-content-between"
        >
          <div
            class="form-check mb-0 form-check-danger mb-0 fs-md-15 fs-lg-16 text-black fw-medium"
          >
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="task6"
            />
            <label class="form-check-label" for="task6">
              Adlash Stockholder Meeting
              <span class="fs-14 fw-normal text-muted ms-10 lh-1">
                08th March, 2024 - 07:00 PM
              </span>
            </label>
          </div>
          <div class="dropdown">
            <button
              class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="flaticon-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  View
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Edit
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="javascript:void(0);"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
};
</script>
