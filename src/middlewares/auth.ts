import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { IRequest } from "../interfaces/myExpress";

export default function auth(req: IRequest, res: Response, next: NextFunction) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {
		req.isAuth = false;
		next();
	}

	jwt.verify(token, process.env.SECRET_KEY as string, (err: Error|null, user: object) => {
		if (err) {
			return next(err)
		}

		req.isAuth = true;
		req.user = user;
		next();
	})
}