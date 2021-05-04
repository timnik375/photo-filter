const filter = document.querySelector('.filters');
const resetBtn = document.querySelector('.btn-reset')
const nextBtn = document.querySelector('.btn-next')
const fileloadBtn = document.querySelector('.btn-load--input');
let picture = document.querySelector('img');
const downloadBtn = document.querySelector('.btn-save');
let canvas = document.querySelector('canvas')
let pictureNum = 0;


function drawImage() {
	const img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.src = picture.src;
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
	};
}

window.onload = drawImage;

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

resetBtn.addEventListener('click', () => {
	document.querySelectorAll('input[type=range]').forEach((elem) => {
		elem.value = elem.getAttribute('value')
		elem.nextElementSibling.innerText = elem.value
		filterOverlay(elem)
	})
});

nextBtn.addEventListener('click', (e) => {
	let hourCur = new Date().getHours();
	let dayTime = '';
	pictureNum++;

	if (hourCur > 5 && hourCur < 12) {
		dayTime = 'morning'
	} else if (hourCur > 11 && hourCur < 18) {
		dayTime = 'day'
	} else if (hourCur > 17 && hourCur < 24) {
		dayTime = 'evening'
	} else if (hourCur >= 0  && hourCur < 6) {
		dayTime = 'night'
	}

	if (pictureNum > 20) {
		pictureNum = 1
	}

	if (pictureNum < 10) {
		picture.setAttribute('src', `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/0${pictureNum}.jpg`)
	} else {
		picture.setAttribute('src', `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${pictureNum}.jpg`)
	}

	drawImage()
})

fileloadBtn.addEventListener('change', () => {
	const file = fileloadBtn.files[0];
	const reader = new FileReader();
	reader.onload = () => {
		picture.src = reader.result;
	}
	reader.readAsDataURL(file);
	fileloadBtn.value = '';
})

downloadBtn.addEventListener('click', () => {
	let link = document.createElement('a');
	link.download = 'download.png';
	link.href = canvas.toDataURL();
	link.click();
	link.delete;
})




