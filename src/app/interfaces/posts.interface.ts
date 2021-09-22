import { Usuario } from './usuario.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface RespuestaPosts {
    ok?: boolean;
    pagina?: number;
    posts?: Post[];
}

export interface RespuestaPost {
    ok?: boolean;
    post?: Post;
}

export interface Post {
    favs?: number;
    imgs?: string[];
    _id?: string;
    message?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
}

