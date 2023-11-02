import { IEvent } from ".";

export type IUser = {
    id: string;
    username: string;
    name: string;
    // passwordHash: Uint8Array;
    // passwordSalt: Uint8Array;
    events?: IEvent[];
}