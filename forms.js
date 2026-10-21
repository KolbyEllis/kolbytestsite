document.querySelectorAll("form[data-netlify]").forEach(function (form) {
  var thanks = form.querySelector("[data-thanks]");
  var error = form.querySelector("[data-error]");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (thanks) thanks.hidden = true;
    if (error) error.hidden = true;

    var button = form.querySelector("[type=submit]");
    button.disabled = true;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Form was not accepted");
        form.reset();
        if (thanks) thanks.hidden = false;
      })
      .catch(function () {
        if (error) error.hidden = false;
      })
      .then(function () {
        button.disabled = false;
      });
  });
});
