import { useState } from 'react'

function Toggle({ initialValue, jsonData, updateJson }: any) {
  const [isActive, setIsActive] = useState(initialValue)

  const toggleValue = () => {
    // Inverte o valor de isActive
    setIsActive(!isActive)

    // Atualiza o arquivo JSON
    const updatedJson = { ...jsonData, isActive: !isActive }
    updateJson(updatedJson)
  }

  return (
    <div>
      <button onClick={toggleValue}>Toggle</button>
      <p>Chave: {isActive ? 'true' : 'false'}</p>
    </div>
  )
}

export default Toggle
