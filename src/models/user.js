import Joi from 'joi';

class User {

}

User.collection = 'users';

User.schema = Joi.object().keys({
    email: Joi.string(),
    password: Joi.string()
});

export default User;
