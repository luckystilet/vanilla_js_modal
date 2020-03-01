import './css/base-styles.css'
import './css/style.css'

const $ = {}
window.$ = $

const cars = [
  {id: 1, title: 'Audi', price: '55123', imgPath: '1'},
  {id: 2, title: 'Chevrolet', price: '30212', imgPath: '2'},
  {id: 3, title: 'Ford', price: '28999', imgPath: '3'},
  {id: 4, title: 'Honda', price: '35999', imgPath: '4'},
  {id: 5, title: 'Nissan', price: '32222', imgPath: '5'},
  {id: 6, title: 'Peugeot', price: '18000', imgPath: '6'},
  {id: 7, title: 'Sitroen', price: '19000', imgPath: '7'},
  {id: 8, title: 'Toyota', price: '40000', imgPath: '8'},
  {id: 9, title: 'Volkswagen', price: '38000', imgPath: '9'},
]

const toHTML = car => `
  <div class="car">
    <img class="car__img" style="height: 300px;" src="../src/img/${car.imgPath}.jpg" alt="${car.title}">
    <div class="car__body">
      <h5 class="car__title">${car.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}">Удалить</a>
    </div>
  </div>
`
function render(){
  const HTML = cars.map(toHTML).join('')
  document.getElementById('cars').innerHTML = HTML
}
render()

Element.prototype.appendAfter = function(afterEl){
  afterEl.parentNode.insertBefore(this, afterEl.nextSibling)
}

function noop(){}

function _createModalFooter(buttons = []){
  const footer = document.createElement('div')
  footer.classList.add('alex-modal__footer')
  
  buttons.forEach(el=>{
    const $btn = document.createElement('button')
    $btn.classList.add(...el.class)
    $btn.innerText = el.value
    $btn.onclick = el.handler || noop
    footer.appendChild($btn)
  })
  return footer
}

function _createModal(options){
  const modal = document.createElement('div')
  modal.classList.add('alex-modal')
  modal.innerHTML = `
     <div class="alex-modal__overlay" data-close="true">
      <div class="alex-modal__window" style="width: ${options.width}">
        <div class="alex-modal__header">
          <h1 class="alex-modal__title">${options.title || 'Modal'}</h1>
          ${options.closeable?'<button class="alex-modal__close" data-close="true">&times;</button>':''}
        </div>
        <div class="alex-modal__body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `
  
  const footer = _createModalFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)
  return modal
}

$.modal = function(options){
  let closing = false
  let destroyed = false
  const $modal = _createModal(options)
  
  const modal = {
    close(){
      console.log("CLOSE",       );
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      $modal.removeEventListener("click", closeHandler)
      setTimeout(()=>{
        $modal.classList.remove('hide')
        closing = false
      },500)
    },
    open(){
      if(!destroyed && !closing){
        console.log("OPEN",       );
        $modal.classList.add('open')
        $modal.addEventListener("click", closeHandler)
      }
    },
    setContent(html){
      $modal.querySelector('[data-content]').innerHTML = html
    },
    destroy(){
      $modal.remove()
      $modal.removeEventListener("click", closeHandler)
      destroyed = true
    }
  }
  const closeHandler=(e)=>{
    console.log("closeHandler",       );
    e.target.dataset.close && modal.close()
  }
  
  return modal
}

const priceModal = $.modal({
  title: "Цена на товар",
  closeable: true,
  width: '500px',
  footerButtons: [
    {value: 'Закрыть', class: ['btn', 'btn-danger', 'btn-lg'], handler(){
        priceModal.close()
    }}
  ]
})

document.addEventListener("click", e=>{
  e.preventDefault()
  const BtnType = e.target.dataset.btn
  const id = +e.target.dataset.id
  const car = cars.find(c=>c.id===id)
 
  if(BtnType==='price'){
    priceModal.setContent(`<p>Цена на ${car.title}: <strong>${car.price}$</strong></p>`)
    priceModal.open()
  }else if(BtnType==='remove'){
    // priceModal.setContent(`<p>Вы удаляете конте ${car.title}: <strong>${car.price}$</strong></p>`)
    // confirmModal.open()
  }
})

$.confirm = function(options){
  return new Promise((resolve, reject) =>{})
}













window.priceModal = priceModal
const openModal = document.querySelector('[data-open-modal]')
openModal.addEventListener("click", priceModal.open)
document.addEventListener('keyup', e=>{
  if(e.keyCode === 27){
    priceModal.close()
  }
})
