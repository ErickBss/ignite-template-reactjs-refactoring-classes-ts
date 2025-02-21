import { Component, createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

import { foodProps } from '../../types'

type ModalEditFoodProps = {
  isOpen: boolean
  toggleEditModal: () => void
  handleUpdatedFood: (food: foodProps) => void
  editingFood: foodProps
}

function ModalEditFood({
  isOpen,
  toggleEditModal,
  editingFood,
  handleUpdatedFood,
}: ModalEditFoodProps) {
  function handleSubmit(data: foodProps) {
    handleUpdatedFood(data)
    toggleEditModal()
  }

  return (
    <Modal isOpen={isOpen} toggleModal={toggleEditModal}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
