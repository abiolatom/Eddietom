import React, {useState} from 'react'
import ProductForm from './ProductForm';

const AddSalesForm = () => {
  const [state, setState] = useState(0);

  const inc = () => {
    setState(state+1);
  }

  const dec = () => { 
    setState(state-1);  
  }

  const reset = () => { 
    setState(0);
  }


      return (
        <div> <div> 
          {state} </div>
          <button onClick={inc}>Add</button>
          <button onClick={dec}>Reduce</button>
          <button onClick={reset}>RESET COUNT</button>
          
          <ProductForm /> 
          
        </div>
        
  )
}

export default AddSalesForm