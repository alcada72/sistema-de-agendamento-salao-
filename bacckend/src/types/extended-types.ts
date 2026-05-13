import { Request } from "express";

export interface extendedRequest extends Request {
  userId?: string;
  role?: string;

  file?: Express.Multer.File;

  files?: Express.Multer.File[];
}