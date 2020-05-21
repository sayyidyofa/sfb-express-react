
exports.toUserDto = (userObject, withPosts = false) => {
    return withPosts ? {
        id: userObject.id,
        name: userObject.name,
        username: userObject.username,
        posts: userObject.posts,
        role: userObject.role
    } : {
        id: userObject.id,
        name: userObject.name,
        username: userObject.username,
        role: userObject.role
    }
}

exports.toPostDto = (postObject) => {
    return {
        id: postObject.id,
        title: postObject.title,
        content: postObject.content,
        createdAt: postObject.createdAt,
        updatedAt: postObject.updatedAt,
        author: postObject.author.name
    }
}
