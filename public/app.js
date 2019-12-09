let form = document.getElementById("contact__form")
let sendmailURL = "https://us-central1-mail-firebase-functions.cloudfunctions.net/sendmail"

form.addEventListener("submit", function(event) {
	event.preventDefault()

	let loader = form.querySelector(".loader")

	while (loader.firstChild) {
    loader.removeChild(loader.firstChild);
	}
	
	let spinner = document.createElement("span")
	spinner.setAttribute("class", "fa fa-spinner fa-spin")
	loader.appendChild(spinner)

	fetch(sendmailURL, {
		method: "POST",
		body: JSON.stringify({
			name: form.name.value,
			email: form.email.value,
			message: form.message.value
		})
	})
		.then(response => response.text())
		.then(function(data) {
			while (loader.firstChild) {
				loader.removeChild(loader.firstChild);
			}
			
			if (data == "ok") {
				let p = document.createElement("p")
				let status = document.createTextNode("Din besked er sendt.")
				p.appendChild(status)
				loader.appendChild(p)
			} else {
				let p = document.createElement("p")
				let status = document.createTextNode("Din besked kunne desværre ikke sendes.")
				p.appendChild(status)
				loader.appendChild(p)
			}
		})
})


/* fetch("https://us-central1-mail-firebase-functions.cloudfunctions.net/sendmail")
      .then(response => response.text())
      .then(function(data) {
        const div = document.getElementsByClassName("response")[0]
        div.innerText = data
      }) */