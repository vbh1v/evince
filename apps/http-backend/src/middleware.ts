import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(res: Response, req: Request, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded){
        //@ts-ignore
        req.userId = decoded.userId;
        next()
    }
    else{
        res.status(403).json({ message: "Unauthorized" });
    }
    
}