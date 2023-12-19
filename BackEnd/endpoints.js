const { products } = require("./Models/ProductSchema");
const { connectToDb, getDb } = require("./db");


//db connection
let db;
app.get("/products", async (req, res) => {
    try {
      let products = [];
      await db
  
        .collection("products")
        .find()
        .sort({ productName: 1 })
        .forEach((product) => products.push(product));
  
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not fetch products" });
    }
  });
  
  app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await products.findById(id);
    return res.status(200).json(product);
  });
  
  app.post("/products", async (req, res) => {
    try {
      const newProduct = new products(req.body);
      const insertedProduct = await newProduct.save();
      return res.status(200).json(insertedProduct);
    } catch (error) {
      console.error("Error adding product:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProduct = await products.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await products.findById(id);
    return res.status(200).json(deletedProduct);
  });
  