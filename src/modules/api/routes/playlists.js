const showRoutes = [
    {
        path: '/api/playlists/{slug}',
        method: 'GET',
        config: {
            validate: {
                //
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj']
            },
            handler: async (request, reply) => {
                const { db } = request.server.plugins['hapi-mongodb'];
                const { slug } = request.params;

                try {
                    const show = await getShow(db, slug);
                    const playlists = await getPlaylists(db, show);
                    const mergedData = {
                        playlists: playlists,
                        show
                    };
                    // return merged show data and playlist data...
                    return reply(mergedData);

                } catch (err) {
                    console.log(err);
                    return err;
                }
            }
        }
    }
];

const getPlaylists = async (db, show) => {
    return await db.collection('playlists').find({
        showId: show._id
    })
    .toArray();
};

const getShow = async (db, slug) => {
    return await db.collection('shows').findOne({
        slug: slug
    });
};

export default showRoutes;
