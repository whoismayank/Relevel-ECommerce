const authController = require('../controllers/auth.controller');
module.exports = (app) => {
    app.post('/ecomm/api/v1/auth/signup', authController.signUp);
    app.post('/ecomm/api/v1/auth/signin', authController.signIn);

}