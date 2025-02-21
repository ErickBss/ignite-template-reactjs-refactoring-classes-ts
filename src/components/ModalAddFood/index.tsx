import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

import { foodProps } from '../../types'

type ModalAddFood = {
  isOpen: boolean
  toggleModal: () => void
  handleAddFood: (food: foodProps) => void
}

function ModalAddFood({ isOpen, toggleModal, handleAddFood }: ModalAddFood) {
  function handleSubmit(data: foodProps) {
    handleAddFood(data)
    toggleModal()
  }

  return (
    <Modal isOpen={isOpen} toggleModal={toggleModal}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
