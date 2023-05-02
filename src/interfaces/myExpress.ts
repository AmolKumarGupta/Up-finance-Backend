import { NextFunction, Request, Response } from "express";

export interface IRequest extends Request {
	isAuth: boolean,
	user?: object
}