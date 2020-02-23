import './css/base-styles.css'
import './css/style.css'

const $ = {}
window.$ = $

function _createModal(options){
  const modal = document.createElement('div')
  modal.classList.add('a-modal')
  modal.insertAdjacentHTML('afterbegin', `
      <div class="a-modal__overlay" data-close="true">
        <div class="a-modal__window" style="width: ${options.width}">
          <div class="a-modal__header">
            <div class="a-modal__title">
              ${options.title || "Window"}
            </div>
            ${options.closable ? `<div class="a-modal__close" data-close="true">&times;</div>` : ""}
          </div>
          <div class="a-modal__body">
            ${options.content || ''}
          </div>
          <div class="a-modal__footer">
            <button>ok</button>
            <button>cancel</button>
          </div>
        </div>
      </div>
    `
  )
  document.body.appendChild(modal)
  return modal
}

$.modal = function(options){
  const $modal = _createModal(options)
  let closeing = false
  const modal = {
    open(){
      !closeing && $modal.classList.add('open')
    },
    close(){
      closeing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(()=>{
        closeing = false
        $modal.classList.remove('hide')
      },500)
    },
    destroy(){

    }
  }

  $modal.addEventListener('click', event => {
    if(event.target.dataset.close){
      modal.close()
    }
  })

  return modal
}

const modal = $.modal({
  title: "Alex Modal!",
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur.</p>
    <p>Lorem ipsum dolor sit amet, consectetur.</p>
    <p>Lorem ipsum dolor sit amet, consectetur.</p>
  `,
  width: '700px'
})
window.modal = modal




