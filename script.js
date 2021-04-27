const filter = document.querySelector('.filters');
const resetBtn = document.querySelector('.btn-reset')

function filterOverlay(target) {
	const sizing = target.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${target.name}`, `${target.value}${sizing}`)
}

filter.addEventListener('input', (e) => {
	if (e.target.matches('input')) {
		e.target.nextElementSibling.innerText = e.target.value
		filterOverlay(e.target)
	}
})

resetBtn.addEventListener('click', (e) => {
	document.querySelectorAll('input[type=range]').forEach((elem) => {
		elem.value = elem.getAttribute('value')
		elem.nextElementSibling.innerText = elem.value
		filterOverlay(elem)
	})
})
