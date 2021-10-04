const contactForm = document.querySelector(".contact_form");

const handleContactFormSubmit = async (e) => {
  e.preventDefault();
  sendSuccess.innerHTML = `<div class="loading_featured_image loader_container">
  <p>Sending...</p>
  <img class="lil_bug loading" src="icons/bug.svg" alt="small white bug" />
  <img class="magnifying_glass loading" src="icons/search.svg" alt="small white magnifying glass" />
  </div>`;
  const formData = e.target;

  const sendFormUrl = formData.action;
  const method = formData.method;
  const body = new FormData(formData);
  try {
    const response = await fetch(sendFormUrl, {
      method,
      body,
    });
    response.ok
      ? (form.reset(), (sendSuccess.innerHTML = "Message sent sit back and relax a reply could be with you shortly..."))
      : (sendSuccess.innerHTML = "Message cannot be sent at this time");
  } catch (error) {
    sendSuccess.innerHTML = "Messaging not possible at this time please try again later";
    sendSuccess.style.backgroundColor = "var(--error-color)";
    console.log(error);
  }
};

contactForm.addEventListener("submit", handleContactFormSubmit);
