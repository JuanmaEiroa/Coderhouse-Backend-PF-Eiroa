//FUNCIONES PARA AUTENTICACIÓN DE USUARIO
//Chequeo si el usuario está autenticado para acceder a la aplicación. Caso contrario, se envía al login.
export function isAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}

//Chequeo si el usuario no está autenticado para enviarlo al login. Caso contrario, accede a la aplicación.
export function isGuest(req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.redirect("/products");
  }
}

//FUNCION PARA VALIDACION DE ENDPOINTS
//Admin
export function isAdmin(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "Admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Acceso no permitido. Se requiere ser Admin" });
  }
}

//Premium
export function isPremium(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "Premium") {
    next();
  } else {
    res
    .status(403)
    .json({ message: "Acceso no permitido. Se requiere ser Premium" });
  }
}

//User
export function isUser(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "User") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Acceso no permitido. Se requiere ser User" });
  }
}

//Premium/Admin
export function isPremiumOrAdmin (req,res,next) {
  const {user} = req.session;
  if (user.role === "Premium" || user.role === "Admin") {
    next()
  } else {
    res.status(403).json({message: "Acceso no permitido. Se requiere ser Premium o Admin"})
  }
}

//User/Premium
export function isUserOrPremium (req,res,next) {
  const {user} = req.session;
  if (user.role === "User" || user.role === "Premium") {
    next()
  } else {
    res.status(403).json({message: "Acceso no permitido. Se requiere ser User o Premium"})
  }
}
