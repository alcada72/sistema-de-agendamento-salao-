import { RequestHandler } from "express";

export const requestIntercepter: RequestHandler = (req, res, next) => {
  console.log(`🆗=> ${req.statusCode} ${req.method} ${req.originalUrl} `)
  next()
}