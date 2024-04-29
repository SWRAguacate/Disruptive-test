export interface usuario {
  _id?: String,
  username?: String,
  email?: String,
  password?: String,
  idRole?: String
}

export interface categoria {
  _id?: String,
  name?: String,
  idContentType?: String
}

export interface contenido {
  _id?: String,
  name?: String,
  idContentType?: String,
  idCategory?: String,
  resource?: String,
  credits?: string,
  creationDate?: String
}

export interface tipoContenido {
  _id?: String,
  name?: String
}

export interface perfil {
  _id?: String,
  name?: String,
  permissions?: String
}
