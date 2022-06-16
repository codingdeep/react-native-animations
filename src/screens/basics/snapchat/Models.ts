export interface Story{
    id:string,
    source:number,
    user:string,
    avatar:number,
    video?:number
}

export type SnapchatRoutes={
    snapchat: undefined,
    story: {story:Story}
}
