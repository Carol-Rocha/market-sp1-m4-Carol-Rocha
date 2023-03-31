import express, { Application, Request, Response } from "express"
import market from "./database"
import { IProduct, TProductRequest } from "./interfaces"

const app: Application = express()
app.use(express.json())

app.post("/products", (req: Request, res: Response): Response => {
  const productData: TProductRequest = req.body
  const productsToAdd = productData.map((product) => {
    const newProduct: IProduct = {
      id: market.length + 1,
      ...product,
      expirationDate: new Date(),
    }
    market.push(newProduct)
    return newProduct
  })

  return res.status(201).json(productsToAdd)
})

app.get("/products", (req: Request, res: Response): Response => {
  return res.status(200).json(market)
})

const PORT: number = 3000
const runningMsg = `Server running on http://localhost:${PORT}`
app.listen(PORT, () => console.log(runningMsg))
