import { NextFunction, Request, Response } from "express";
export const getColor = (status: number) => {
  if (status >= 500) return "\x1b[31m"; // vermelho
  if (status >= 400) return "\x1b[33m"; // amarelo
  if (status >= 200) return "\x1b[32m"; // verde
  return "\x1b[0m";
};

export const requestInterceptor = (req: Request, res: Response, next: NextFunction) => {

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const color = getColor(res.statusCode);

    console.log(
      `${color}${res.statusCode}\x1b[0m | ${req.method} | ${req.originalUrl} | ${duration}ms  ${JSON.stringify(req.body)}`
    );
  });


  next();
};
