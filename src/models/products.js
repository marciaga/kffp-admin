import Joi from 'joi';
import Boom from 'boom';

const productSchema = Joi.object().keys({
    _id: Joi.number(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    primaryImage: Joi.string().allow(''),
    isDJPremium: Joi.string(),
    sortOrder: Joi.number().required(), // TODO this comes in as a string of a number,
    disabled: Joi.boolean(),
    sizes: Joi.array()
});

const addPropertyIfExists = ary => ary.reduce((o, v) => {
    const val = Object.values(v).reduce(f => f);

    if (typeof val === 'undefined') {
        return o;
    }

    return {
        ...o,
        ...v
    };
}, {});

const getNextSequenceValue = async (sequenceName, db) => {
    try {
        const { value } = await db.collection('counters').findAndModify(
            { _id: sequenceName },
            null,
            { $inc: { sequence_value: 1 } },
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
    const { params, query } = request;

    const slug = params.slug ? params.slug : undefined;
    // disabled is false by default: don't return products that are disabled
    /* eslint-disable */
    const disabled = query.admin
        ? undefined
        : query.disabled && parseInt(query.disabled, 10) > 0
        ? true
        : false;
    /* eslint-ensable */
    const paramsToTest = [{ slug }, { disabled }];
    const q = addPropertyIfExists(paramsToTest);

    try {
        const results = await db.collection('products').find(q).toArray();

        const docs = results.map(doc => ({ ...doc, productId: doc._id }));

        if (slug && !docs.length) {
            return reply(Boom.notFound('no products found'));
        }

        return reply(docs);
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
            disabled: newProduct.disabled ? newProduct.disabled : false,
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
