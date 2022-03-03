import { useState, useEffect } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

import { foodProps } from '../../types'

function Dashboard() {
  const [foods, setFoods] = useState<foodProps[]>([])
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editingFood, setEditingFood] = useState<foodProps>({
    id: 0,
    image: '',
    name: '',
    price: 0,
    description: '',
  })

  useEffect(() => {
    api.get('/foods').then((response) => setFoods(response.data))
  }, [])

  function toggleModal() {
    setModal(modal === true ? false : true)
  }

  async function handleAddFood(food: foodProps) {
    try {
      const updatedFoods = [...foods]
      const newFood: foodProps = await api.post('/foods', {
        ...food,
        available: true,
      })

      updatedFoods.push(newFood)
      setFoods(updatedFoods)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdatedFood(food: foodProps) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      console.log(food)

      const updatedFoods = foods.map((food) =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data
      )

      setFoods(updatedFoods)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/foods/${id}`)

      const updatedFoods = foods.filter((food) => food.id !== id)

      setFoods(updatedFoods)
    } catch (error) {
      console.error(error)
    }
  }

  function handleEditFood(food: foodProps) {
    setEditingFood(food)
    setEditModal(true)
  }

  function toggleEditModal() {
    setEditModal(editModal === true ? false : true)
  }

  return (
    <>
      <Header toggleModal={toggleModal} />

      <ModalAddFood
        isOpen={modal}
        toggleModal={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModal}
        toggleEditModal={toggleEditModal}
        editingFood={editingFood}
        handleUpdatedFood={handleUpdatedFood}
      />

      <FoodsContainer>
        {foods.map((food) => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDelete}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
