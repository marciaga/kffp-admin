const getAlbumIds = (results) => {
    const { tracks } = results;
    if (!Array.isArray(tracks.items)) {
        return;
    }

    return tracks.items.map(item => {
        const { id } = item && item.album ? item.album : '';

        return id;
    });
};

const parseSearchResults = (results, albums) => {
    const { tracks } = results;

    if (!Array.isArray(tracks.items) || !albums.length) {
        return;
    }

    return tracks.items.map(item => {
        const { artists, album, name } = item;
        const artist = artists.length > 0 ? artists.shift().name : 'Artist Not Found';
        const albumName = album.name || 'Album Not Found';
        const { images, id } = album;
        const { release_date } = albums.find(album => album.id === id);

        return {
            artist,
            track: name || '',
            album: albumName,
            releaseDate: release_date,
            images
        }
    });
};

export { parseSearchResults, getAlbumIds };
