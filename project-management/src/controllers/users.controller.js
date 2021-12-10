const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = (req, res) => {
    res.send('Registrarme');
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = (req, res) => {
    res.send('Iniciar sesión');
};

usersCtrl.logout = (req, res) => {
    res.send('Cerrar sesión');
};

module.exports = usersCtrl;