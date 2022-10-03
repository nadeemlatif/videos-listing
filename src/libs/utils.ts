const parseVideo = (path: string): any => {
    let video: any = {};
    const ytRegExp: any = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const yt: any = isValidUrl(path, ytRegExp);
    if (yt.status) {
        video = {
            path: `https://www.youtube.com/embed/${yt[1]}`,
            source: 'Youtube',
            thumbnail: `http://img.youtube.com/vi/${yt[1]}/maxresdefault.jpg`
        };
    }
    
    const fbRegExp: any = /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/;
    const fb: any = isValidUrl(path, fbRegExp);
    if (fb.status) {
        video = {
            path: fb[0],
            source: 'Facebook'
        }
    }

    if (!(yt.status || fb.status)) {
        throw new Error("Please provide a valid path.");
    }

    return video;
}

const isValidUrl = (url: string, regExp: any): any => {

    let status = {
        status: false
    };

    if (url) {
        if (url.match(regExp)) {
            status = {
                status: true,
                ...url.match(regExp)
            };
        }
    }
    return status;
}


export default parseVideo;