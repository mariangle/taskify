export type IEvent = {
    EventID: number;
    Title: string;
    Description: string;
    Location: string;
    StartTime: Date;
    EndTime: Date;
    Organizer: string;
    Participants: string[];
};