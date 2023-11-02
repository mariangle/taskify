import { IUser } from ".";

export type IEvent = {
    id: string;
    title: string;
    location?: string;
    time?: string;
    startTime: Date;
    endTime?: Date;
    userId: string;
    user?: IUser;
};