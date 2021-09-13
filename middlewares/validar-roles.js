const { response } = require("express");


const esAdminRole = (req, res=response) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el Token primero'
        })
    };

    const { rol, nombre } = req.user;
    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} NO es ADMIN - No puede hacer esto.`
        });
    }

    next();

};

const tieneRol = ( ...roles ) => {
    return (req, res=response, next ) => {

        if( !req.user ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el Token primero'
            })
        };

        if( !roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }
};


module.exports = {
    esAdminRole,
    tieneRol
}