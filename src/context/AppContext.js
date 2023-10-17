import React, { createContext, useReducer } from 'react';


const AppReducer = (state, action) => {
    switch (action.type) {
        default:
        return {
          name: 'Product 1',
          price: 19.99,
            };
}
}

const products = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      description: "This is the first product.",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      description: "The second product is even better!",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      description: "Product 3 is the best of all.",
    },
    {
      id: 4,
      name: "iPhone 14",
      price: 999,
      description: "Product 4 is expensive.",
    },
    {
      id: 5,
      name: "Samsung Galaxy S23",
      price: 899,
      description: "Product 5 is less expensive.",
    },
    {
      id: 6,
      name: "Google Pixel 7",
      price: 799,
      description: "Product 7 is the least expensive.",
    },
];
  
export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, products);

    return (
        <AppContext.Provider
            value={{
                name: state.name,
                price: state.price,
                dispatch,        }}
        >
            {props.children}
            </AppContext.Provider>
    )
}