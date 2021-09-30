import { Usuario } from './usuario.interface';
import { Post } from './posts.interface';

export interface SocialResponse {
    ok?: boolean;
    social?: Social;
}

export interface Social {
    seguidos?: Usuario[];
    favoritos?: Post[];
    _id?: string;
    usuario?: Usuario;
}
