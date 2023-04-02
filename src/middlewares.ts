import { NextFunction, Request, Response } from "express"
import market from "./database"

const findIndexMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(req.params.id)

  const findIndex = market
    .map((product) => product)
    .findIndex((product) => product.id === id)

  if (findIndex === -1) {
    return res.status(404).json({ error: "Product not found" })
  }

  res.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  }

  return next()
}

const totalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const totalProducts = market
    .map((product) => product.price)
    .reduce((acc, cur) => acc + cur)

  res.locals.total = {
    currentTotal: totalProducts,
  }

  return next()
}

export { findIndexMiddleware, totalMiddleware }
