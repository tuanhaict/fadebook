


export interface PostResponseDto {
    id: string,
    caption: string,
    image?: string,
    userId: string,
    comments: number,
    likes: number,
    user: {
        firstName: string,
        lastName: string,
        avatar: string,
    }
}

export interface CommentResponseDto {
    id: string,
    postId: string,
    userId: string,
    content: string,
    user: {
        firstName: string,
        lastName: string,
        avatar: string
    }
}
export interface PostCreateDto {
    caption: string,
    image?: string
}
export interface PostUpdateDto {
    caption: string,
    image?: string,
}
export interface CommentCreateDto {
    content: string,
}

export interface CommentUpdateDto {
    content: string,
}