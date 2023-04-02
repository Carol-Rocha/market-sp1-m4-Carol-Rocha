import { Request, Response } from "express"
import market from "./database"
import { IProduct, TProductRequest } from "./interfaces"

const createProducts = (req: Request, res: Response): Response => {
  const productData: TProductRequest = req.body

  const productsToAdd = productData.map((product) => {
    const newProduct: IProduct = {
      id: market.length + 1,
      ...product,
      expirationDate: new Date(),
    }

    const checkProducts = market
      .map((product) => product.name)
      .includes(newProduct.name)

    if (!checkProducts) {
      market.push(newProduct)
      return newProduct
    } else {
      return res.status(409).json({ error: "Registered product " })
    }
  })

  const total = () => {
    const currentTotal = market
      .map((teste) => teste.price)
      .reduce((acc, cur) => acc + cur)

    return currentTotal
  }

  return res.status(201).json({
    total: total(),
    marketProducts: productsToAdd,
  })
}

const getProducts = (req: Request, res: Response): Response => {
  const total = () => {
    const currentTotal = market
      .map((teste) => teste.price)
      .reduce((acc, cur) => acc + cur)

    return currentTotal
  }

  return res.status(200).json({
    total: total(),
    marketProducts: market,
  })
}

const getProductsById = (req: Request, res: Response): Response => {
  return res.status(200).json(market[res.locals.product.indexProduct])
}

const updateChocolate = (req: Request, res: Response): Response => {
  const index = res.locals.product.indexProduct
  const updatedData = req.body

  market[index] = {
    ...market[index],
    ...updatedData,
  }

  return res.json(market[index])
}

const deleteProductById = (req: Request, res: Response): Response => {
  market.splice(res.locals.product.indexProduct, 1)

  return res.status(204).send()
}

export {
  createProducts,
  getProducts,
  getProductsById,
  updateChocolate,
  deleteProductById,
}
