import { createTransport } from 'nodemailer';
import ses from 'nodemailer-ses-transport';
import Boom from 'boom';
import { createToken, updateField, hashPassword } from './user';

const transporter = createTransport(ses({
    accessKeyId: process.env.SES_KEY,
    secretAccessKey: process.env.SES_SECRET,
    region: process.env.SES_REGION
}));

const resetPassword = (request, reply) => {
    const { password } = request.payload;
    const { data } = request.pre;
    const { id } = data;
    const { db, ObjectID } = request.server.plugins.mongodb;

    hashPassword(password, async (error, hash) => {
        if (error) {
            console.log(error);
            return reply(Boom.badRequest());
        }

        try {
            const response = await updateField(
                id,
                'password',
                hash,
                db,
                ObjectID
            );

            const { ok, nModified } = response;

            if (ok && nModified) {
                return reply({ success: true });
            }

            reply({ success: false });
        } catch (e) {
            console.log(e);
            reply(Boom.internal('Something went wrong'));
        }
    });
};

const handlePasswordReset = async (request, reply) => {
    const { email } = request.payload;
    const { db } = request.server.plugins.mongodb;

    try {
        const result = await db.collection('users').findOne({ email },
        { password: 0 });
        // result is either an object or null
        if (result) {
            const { host } = request.info;
            const token = createToken(result, '1h');
            const link = `${host}/reset-password?token=${token}`
            const rendered = await request.render('password-email',
                { link }
            );
            // if it's a real user, send the reset email to the address
            transporter.sendMail({
                from: 'administrator@freeformportland.org',
                to: email,
                subject: 'Freeform Portland Reset Password Information',
                html: rendered
            });
        }
        // either way respond with 200 so we don't inadvertently reveal users
        return reply().code(200);
    } catch (e) {
        console.log(e)
        reply(Boom.internal('Something went wrong'));
    }
};

export { resetPassword, handlePasswordReset };
