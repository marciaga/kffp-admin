const parseSearchResults = (results) => {
    const { tracks } = results;
    if (!Array.isArray(tracks.items)) {
        return;
    }

    return tracks.items.map(item => {
        const { artists, album, name } = item;
        const artist = artists.length > 0 ? artists.shift().name : 'Artist Not Found';
        const albumName = album.name || 'Album Not Found';
        const { images } = album;

        return {
            artist: artist,
            track: name || '',
            album: albumName,
            images: images
        }
    });
};

export { parseSearchResults };
