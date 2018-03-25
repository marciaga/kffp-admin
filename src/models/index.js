import AWS from 'aws-sdk';
import Boom from 'boom';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.S3_IMAGE_BUCKET_REGION
});

const imageUpload = (request, reply) => {
    const { file } = request.payload;

    if (!file) {
        return reply(Boom.badData('Failed to read file'));
    }

    if (file) {
        const name = `${Date.now()}-${file.hapi.filename}`;
        const contentType = file.hapi.headers['content-type'];

        s3.upload({
            Bucket: process.env.S3_IMAGE_BUCKET,
            Key: name,
            Body: file,
            ContentType: contentType
        }, (err, data) => {
            if (err) {
                console.log(err);
                return reply(Boom.internal('S3 upload failed'));
            }

            const { Location } = data;

            return reply({ filePath: Location }).code(201);
        });
    }
};

const imageRemove = (request, reply) => {
    const { fileName } = request.params;
    s3.deleteObject({
        Bucket: process.env.S3_IMAGE_BUCKET,
        Key: fileName
    }, (err) => {
        if (err) {
            console.log(err);
            return reply(Boom.internal('S3 delete failed'));
        }

        return reply({ success: true }).code(201);
    });
};

export { imageUpload, imageRemove };
