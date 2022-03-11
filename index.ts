const btn = document.querySelector("#btn")
const abortController = new AbortController()
const API_URL = "https://reqres.in/api/users?delay=5"
let controller: AbortController | null = null
let signal: AbortSignal | null = null

btn.addEventListener("click", async () => {
	if (controller) {
		controller.abort()
		controller = null
		signal = null
		console.log("Previous Request Cancelled")
	}
	console.log("Making New Request")

	controller = new AbortController()
	signal = controller.signal

	try {
		const data = await (
			await fetch(API_URL, {
				headers: { "Content-Type": "application/json" },
				signal,
			})
		).json()
		console.log("New Request Made", data)
	} catch (err) {
		console.log("API REQUEST ERROR", err)
	} finally {
		controller = null
		signal = null
	}
})
