import { IUser } from ".";

export type IEvent = {
    id?: string;
    title: string;
    location?: string;
    time?: string;
    startDate: Date;
    endDate?: Date;
    userId?: string;
    user?: IUser;
};

export type IEventApiResponse = {
    id: string;
    title: string;
    location?: string;
    time?: string;
    startDate: string;
    endDate?: string;
    userId: string;
    user?: IUser;
}