/* eslint-disable @typescript-eslint/naming-convention */
export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
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

export interface Usuario {
    avatar?: string;
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
}
