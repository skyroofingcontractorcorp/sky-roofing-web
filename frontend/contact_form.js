document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const status = document.getElementById("quoteFormStatus");
  const button = form.querySelector(".contact-form-submit");
  const label = button ? button.querySelector("span") : null;
  const idleText = label ? label.textContent : "";

  const setSending = (sending) => {
    if (!button) return;
    button.disabled = sending;
    if (label) label.textContent = sending ? "Sending…" : idleText;
  };

  const showStatus = (text, isError) => {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("is-error", Boolean(isError));
  };

  const showError = () => {
    showStatus("Your request couldn't be sent. Please try again, or call us at ", true);
    const tel = document.createElement("a");
    tel.href = "tel:+14127378150";
    tel.textContent = "412-737-8150";
    status.append(tel, ".");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    form.querySelectorAll("input[required]").forEach((el) => {
      if (!el.value.trim()) el.value = "";
    });
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    data.set("form-name", form.getAttribute("name"));

    setSending(true);
    showStatus("");

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      form.reset();
      showStatus("Request sent. Thank you! We'll be in touch soon.");
    } catch (err) {
      console.error("Quote form:", err);
      showError();
    } finally {
      setSending(false);
    }
  });
});
