
export interface ItemProps{
    title: string,
    subtitle: string,
    picture: number,
    top: number
}

export const items:Array<ItemProps> = [
    {
        title: "Upcoming Show Live from Paris",
        subtitle: "SPRING-SUMMER 2021",
        picture: require("../../../assets/images/1.jpeg"),
        top: 0,
    },
    {
        title: "In Boutiques",
        subtitle: "FALL-WINTER 2020/21",
        picture: require("../../../assets/images/2.jpeg"),
        top: 0,
    },
    {
        title: "Deauville Film Festival",
        subtitle: "CHANEL IN CINEMA",
        picture:require("../../../assets/images/3.jpeg"),
        top: 0,
    },
    {
        title: "IN BOUTIQUES",
        subtitle: "Métiers d'art 2019/20",
        picture: require("../../../assets/images/4.jpeg"),
        top: 0,
    },
    {
        title: "Haute Couture",
        subtitle: "FALL-WINTER 2020/21",
        picture:require("../../../assets/images/5.jpeg"),
        top: 50,
    },
    {
        title: "Balade en Méditerranée",
        subtitle: "CRUISE 2020/21",
        picture:require("../../../assets/images/6.jpeg"),
        top: 0,
    },
    {
        title: "Spring-Summer 2020 Campaign",
        subtitle: "EYEWEAR",
        picture: require("../../../assets/images/7.jpeg"),
        top: 0,
    },
];
