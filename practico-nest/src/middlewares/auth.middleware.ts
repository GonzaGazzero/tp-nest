import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate{
    url='http:/localhost:3000/can-do/'
    constructor(private permissionCode: string){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest()
            const token = request.headers.authorization;
            if(token==null){
                throw new UnauthorizedException('El token no existe')
            }
            (await axios.get(`${this.url}/${this.permissionCode}`,
                {headers:{
                    Authorization: token
                }
            })
        ).data;
            return true;
        }catch(error){
            throw new UnauthorizedException(error?.message)
        }
    }   
}