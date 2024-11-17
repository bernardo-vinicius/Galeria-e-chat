document.querySelectorAll("[data-folder]").forEach(el => {
	const total = el.dataset.total
	const folder = el.dataset.folder
	let html = ''
	for (let i = 1; i <= total; i++) {
		html += `
			<div>
				<img src="assets/${folder}/${folder} (${i}).jpg">
			</div>    
		`
	}
	el.innerHTML = html
})

const imgs = document.querySelectorAll('.galeria img')
const modalGaleria = document.querySelector('.modal-fotos')
const modalConteudo = modalGaleria.querySelector('.conteudo')
const btClose = modalGaleria.querySelector('.bt-close')
const btPrev = modalGaleria.querySelector(".bt-prev")
const btNext = modalGaleria.querySelector(".bt-next")

btClose.addEventListener('click', () => {
	modalGaleria.close()
})

btPrev.addEventListener("click", () => {
	const index = parseInt(modalGaleria.dataset.index)
	const indexPrev = (index - 1 + imgs.length) % imgs.length
	modalGaleria.dataset.index = indexPrev
	modalConteudo.innerHTML = `<img src="${imgs[indexPrev].src}">`
})
  
btNext.addEventListener("click", () => {
  const index = parseInt(modalGaleria.dataset.index)
  const indexNext = (index + 1) % imgs.length
  modalGaleria.dataset.index = indexNext
  modalConteudo.innerHTML = `<img src="${imgs[indexNext].src}">`
})

imgs.forEach((img, index) => {
	img.addEventListener('click', () => {
		modalConteudo.innerHTML = `<img src="${img.src}">`
		modalGaleria.showModal()
		modalGaleria.dataset.index = index
	})
})