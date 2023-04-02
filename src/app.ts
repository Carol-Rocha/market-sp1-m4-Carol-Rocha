import express, { Application } from "express"
import {
  createProducts,
  deleteProductById,
  getProducts,
  getProductsById,
  updateChocolate,
} from "./logics"
import { findIndexMiddleware, totalMiddleware } from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/products", createProducts)
app.get("/products", getProducts)
app.get("/products/:id", findIndexMiddleware, getProductsById)
app.patch("/products/:id", findIndexMiddleware, updateChocolate)
app.delete("/products/:id", findIndexMiddleware, deleteProductById)

const PORT: number = 3000
const runningMsg = `Server running on http://localhost:${PORT}`
app.listen(PORT, () => console.log(runningMsg))
