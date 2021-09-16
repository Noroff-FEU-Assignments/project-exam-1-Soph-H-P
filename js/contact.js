const contactForm = document.querySelector(".contact_form");

const handleContactFormSubmit = async (event) => {
  event.preventDefault();

  const formData = event.target;

  const sendFormUrl = formData.action;
  const method = formData.method;
  const body = new FormData(formData);
  try {
    const response = await fetch(sendFormUrl, {
      method,
      body,
    });
    response.ok ? form.reset() : sendSuccess.innerHTML = "Message cannot be sent at this time";
  } catch (error) {
    sendSuccess.innerHTML = "Messaging not possible at this time please try again later"
    sendSuccess.style.backgroundColor = "var(--error-color)"
    console.log(error);
  }
};

contactForm.addEventListener("submit", handleContactFormSubmit);

