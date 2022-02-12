function genresToPath(genres) {
    if(genres.indexOf('+')==-1)
        return genres
    genres=[...genres]
    genres.splice(genres.indexOf('+')-1,1)
    genres.splice(genres.indexOf('+')+1,1)
    return genres.join('')
}

export default genresToPath
