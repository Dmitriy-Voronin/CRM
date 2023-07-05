
export function deleteClientModal() {
    const deleteModalContent = document.createElement('div');
    const deleteModalWrap = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitle = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal = document.createElement('div');
    const deleteModalDelete = document.createElement('button');
    const deleteModalBack = document.createElement('button');

    deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
    deleteModalWrap.classList.add('modal__wrap');
    deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
    deleteModalText.classList.add('delete-modal__text');
    deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
    deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
    deleteModalBack.classList.add('delete-modal__back', 'btn-reset');
    modalClose.classList.add('modal__close', 'btn-reset');

    deleteModalTitle.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteModalDelete.textContent = 'Удалить';
    deleteModalBack.textContent = 'Отмена';

    deleteModalContent.append(
        modalClose,
        deleteModalTitle,
        deleteModalText,
        deleteModalDelete,
        deleteModalBack
    )
    deleteModalWrap.append(deleteModalContent);
    deleteModal.append(deleteModalWrap);

    modalClose.addEventListener('click', () => {
      deleteModal.remove();
       document.body.style.overflow = 'auto';
    });

    deleteModalBack.addEventListener('click', () => {
      deleteModal.remove();
       document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === deleteModalWrap || e.target === deleteModal) {
            deleteModal.remove();
            document.body.style.overflow = 'auto';
        }
    });

    return {
        deleteModal,
        deleteModalWrap,
        deleteModalContent,
        deleteModalDelete,
        deleteModalBack,
        modalClose,
    }
}
