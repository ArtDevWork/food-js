function hideModal(modalSelector) {
  const modalContent = document.querySelector(modalSelector);
  modalContent.classList.add("hide");
  modalContent.classList.remove("show");
  document.body.style.overflow = "";
}
function showModal(modalSelector, modalTimerId) {
  const modalContent = document.querySelector(modalSelector);
  modalContent.classList.add("show");
  modalContent.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalBtns = document.querySelectorAll(triggerSelector),
    modalClose = document.querySelector("[data-close]"),
    modalContent = document.querySelector(modalSelector);

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => showModal(modalSelector, modalTimerId));
  });

  modalContent.addEventListener("click", (e) => {
    if (
      e.target === modalContent ||
      e.target.getAttribute("data-close") == ""
    ) {
      hideModal(modalSelector);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalContent.classList.contains("show")) {
      hideModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;

export { showModal, hideModal };
