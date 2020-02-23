function _createModal(options){
  const modal = document.createElement('div')
  modal.classList.add('a-modal')
  modal.insertAdjacentElement('afterbegin', `
      <div class="a-modal__overlay">
        <div class="a-modal__window">
          <div class="a-modal__header">
            <div class="a-modal__title">
              Modal Title
            </div>
            <div class="a-modal__close">&times;</div>
          </div>
          <div class="a-modal__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis esse in similique soluta tenetur voluptatem.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis esse in similique soluta tenetur voluptatem.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis esse in similique soluta tenetur voluptatem.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis esse in similique soluta tenetur voluptatem.</p>
          </div>
          <div class="a-modal__footer">
            <button>ok</button>
            <button>cancel</button>
          </div>
        </div>
      </div>
    `)
}

$.modal = function(options){
  const $modal = _createModal(options)
  return {
    open(){

    },
    close(){

    },
    destroy(){

    }
  }
}
