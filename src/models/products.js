import Joi from 'joi';
import Boom from 'boom';

const productSchema = Joi.object().keys({
    _id: Joi.number(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    primaryImage: Joi.string().allow('')
});

const getNextSequenceValue = async (sequenceName, db) => {
    try {
        const { value } = await db.collection('counters').findAndModify(
            { _id: sequenceName },
            null,
           { $inc: { sequence_value: 1 }},
           { new: true }
        );

        return value.sequence_value;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

const getProducts = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;

    try {
        const results = await db.collection('products').find({}).toArray();

        return reply(results);
    } catch (e) {
        console.log(e);

        return reply(Boom.serverUnavailable());
    }
};

const createProduct = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const newProduct = request.payload;

    try {
        const { err } = Joi.validate(newProduct, productSchema);

        if (err) {
            console.log(err);

            return reply({
                success: false,
                message: 'Validation Failed'
            });
        }

        const id = await getNextSequenceValue('productid', db);

        const doc = {
            _id: id,
            ...newProduct
        };

        const result = await db.collection('products').insertOne(doc).toJSON();

        return reply(result).code(201)
    } catch (e) {
        return reply({
            success: false,
            message: 'Adding this product failed'
        });
    }
};

const updateProduct = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    const { payload = {} } = request;

    const { err } = Joi.validate(payload, productSchema);

    if (err) {
        console.log(err);

        return reply({
            success: false,
            message: 'Validation Failed'
        });
    }

    try {
        const result = await db.collection('products').update(
            { _id: payload._id },
            payload
        );

        const { ok, nModified } = await result.toJSON();

        if (ok && nModified) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (e) {
        console.log(e);
        return reply(Boom.serverUnavailable());
    }
};

const deleteProduct = async (request, reply) => {
    const { db } = request.server.plugins.mongodb;
    // id comes in as a query string
    const { id } = request.query;
    try {
        const result = await db.collection('products').remove(
            { _id: parseInt(id) },
            { justOne: true }
        );
        // result, e.g. { ok: 1, n: 0 }
        const response = await result.toJSON();
        const { ok, n } = response;

        if (ok && n) {
            return reply({ success: true });
        }

        return reply({ success: false, message: 'Update was not successful' });
    } catch (e) {
        console.log(e);
        return reply(Boom.serverUnavailable());
    }
};

export { createProduct, getProducts, updateProduct, deleteProduct };
