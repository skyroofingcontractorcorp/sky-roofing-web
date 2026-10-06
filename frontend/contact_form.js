document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const status = document.getElementById("quoteFormStatus");
  const number = (form.dataset.whatsapp || "").replace(/\D/g, "");
  if (!number) return;

  const buildMessage = () => {
    const data = new FormData(form);
    const get = (key) => String(data.get(key) || "").trim();

    return [
      "Hello Sky Roofing! I'd like to request a free quote.",
      "",
      `*Name:* ${get("name")}`,
      `*Email:* ${get("email")}`,
      `*Subject:* ${get("subject")}`,
      `*Cell phone:* ${get("phone")}`,
      `*Interested in:* ${get("interest")}`,
    ].join("\n");
  };

  const showStatus = (url) => {
    if (!status) return;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open WhatsApp";

    status.textContent = "WhatsApp is opening with your message. Press Send there to finish. Didn't open? ";
    status.appendChild(link);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.querySelectorAll("input[required]").forEach((el) => {
      if (!el.value.trim()) el.value = "";
    });
    if (!form.reportValidity()) return;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`;

    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }

    showStatus(url);
  });
});
