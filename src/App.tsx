import { useState } from 'react';
import { Dropdown } from './components/Dropdown'

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <Dropdown 
        value={value}
        onChange={setValue}
        onIconChange={() => {}}
      />
    </div>
  )
}

export default App 