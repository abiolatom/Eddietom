import React from 'react'
import ProductDetails from './ProductDetails'


const ProductForm = () => {
   
  return (
      <div>
          <h1>Product Form</h1>
          <form>
              <section>
              <label>Product Name</label>
              <input type="text" placeholder='product name' />
              </section>
              <section>
              <label>Product Cost</label>
              <input type="text" placeholder='Cost Price' />
              </section>
              <section>
              <label>Transport Cost</label>
              <input type="text" placeholder='Transport Price' />
              </section>
              <section>
              <label>Purchase Quantity</label>
              <input type="text" placeholder='Product Quantity' />
              </section>
              <section>
              <label>Purchase Date</label>
              <input type="date" placeholder='Cost Price' />
              </section>
              <section>
              <label>Delivery Date</label>
              <input type="date" placeholder='Cost Price' />
              </section>
          </form>
          <ProductDetails/>

    </div>
  )
}

export default ProductForm