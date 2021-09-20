export interface LoginResponse {
    ok?: boolean;
    token?: string;
}

export interface UsuarioResponse {
    ok?: boolean;
    usuario?: Usuario;
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
}
