const filter = document.querySelector('.filters');
const resetBtn = document.querySelector('.btn-reset')
const nextBtn = document.querySelector('.btn-next')
const fileloadBtn = document.querySelector('.btn-load--input');
const downloadBtn = document.querySelector('.btn-save');
const picture = document.querySelector('img');
const canvas = document.querySelector('canvas');
let pictureNum = 0;
let filterValue = [];
const btnFullscreen = document.querySelector('.fullscreen');
const editorBtn = document.querySelectorAll('.btn');

function drawImage() {
	const img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.src = picture.src;
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext("2d");
		ctx.filter = `blur(${canvas.height/picture.height*filterValue[0]}px) invert(${filterValue[1]}%) sepia(${filterValue[2]}%) saturate(${filterValue[3]}%) hue-rotate(${filterValue[4]}deg)`;
		ctx.drawImage(img, 0, 0);
	};
}

function getFilterValue () {
	filterValue = [];
	document.querySelectorAll('output').forEach((elem) => {
		filterValue.push(elem.innerText);
	})
}

function toggleActiveBtn(target) {
	editorBtn.forEach((elem) => elem.classList.remove('btn-active'));
	target.classList.add('btn-active');
}

window.onload = drawImage;

function filterOverlay(target) {
	const sizing = target.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${target.name}`, `${target.value}${sizing}`);
}

filter.addEventListener('input', (e) => {
	if (e.target.matches('input')) {
		e.target.nextElementSibling.innerText = e.target.value;
		filterOverlay(e.target);
	}
	getFilterValue();
	drawImage();
})

resetBtn.addEventListener('click', (e) => {
	document.querySelectorAll('input[type=range]').forEach((elem) => {
		elem.value = elem.getAttribute('value');
		elem.nextElementSibling.innerText = elem.value;
		filterOverlay(elem);
	});

	toggleActiveBtn(e.target)
});

nextBtn.addEventListener('click', (e) => {
	let hourCur = new Date().getHours();
	let dayTime = null;
	pictureNum++;

	if (hourCur > 5 && hourCur < 12) {
		dayTime = 'morning';
	} else if (hourCur > 11 && hourCur < 18) {
		dayTime = 'day';
	} else if (hourCur > 17 && hourCur < 24) {
		dayTime = 'evening';
	} else if (hourCur >= 0  && hourCur < 6) {
		dayTime = 'night';
	}

	if (pictureNum > 20) {
		pictureNum = 1;
	}

	if (pictureNum < 10) {
		picture.setAttribute('src', `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/0${pictureNum}.jpg`);
	} else {
		picture.setAttribute('src', `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${pictureNum}.jpg`);
	}

	drawImage();

	toggleActiveBtn(e.target);
})

fileloadBtn.addEventListener('change', (e) => {
	const file = fileloadBtn.files[0];
	const reader = new FileReader();
	reader.onload = () => {
		picture.src = reader.result;
		drawImage();
	};
	reader.readAsDataURL(file);
	fileloadBtn.value = null;

	toggleActiveBtn(e.target.closest('label'))
});

downloadBtn.addEventListener('click', (e) => {
	let link = document.createElement('a');
	link.download = 'download.png';
	link.href = canvas.toDataURL();
	link.click();
	link.delete;

	toggleActiveBtn(e.target)
});

btnFullscreen.addEventListener('click', () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen()
	}
});







