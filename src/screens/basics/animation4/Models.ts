export interface Story{
    id:string,
    source:number,
    user:string,
    avatar:number,
    video?:number
}

export type ChatRoutes={
    chat: undefined,
    chatStory:{story:Story}
}
