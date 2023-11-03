import EventService from "@/helpers/services/event-service"
import { IEvent } from "@/types"

const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)
const eventService = new EventService();

const crudOperations: { [key: string]: string[] } = {
    create: ['create', 'add', 'insert'],
    read: ['read', 'get', 'fetch', 'retrieve', 'show'],
    update: ['update', 'edit', 'modify', 'change'],
    delete: ['delete', 'remove', 'erase', 'clear'],
};

export const HandleCommand = (command : string): string => {

    let doc = nlpEx(command);
    let commandType: string;

    try {
       ValidateCommand(doc);
       commandType = GetCommandType(doc);

    } catch (err) {
        throw err;
    }

    switch (commandType) {
        case 'create':
            console.log('Performing create operation');
            try {
                const event = CreateEventObject(doc)
                const createdEvent = eventService.createEvent(event);
                return "SUCESSFULY CREATED!!";
             } catch (err) {
                throw err;
             }            
            break;
        case 'read':
            console.log('Performing read operation');
            break;
        case 'update':
            console.log('Performing update operation');
            break;
        case 'delete':
            console.log('Performing delete operation');
            break;
        default:
            console.log('Unknown command type');
    }
    return "YEP"; 

}

const CreateEventObject = (doc: any) => {
    const values = doc.dates().out('array');

    if (!values || values.length === 0) {
        throw new Error("You need at least one date to create an event.");
    }
    
    let hasDateRange: boolean = false;

    if (values.length === 1 && values[0].includes("to")) {
        hasDateRange = true;
    }

    const { dates } = doc.dates().json()[0]

    if (dates.length === 0 || dates.length > 2) {
        throw new Error("You can only use one or two dats.");
    }

    const verbsArray = doc.verbs().out('array');
    const datesArray = doc.dates().out('array');
    const title = doc.text().replace(verbsArray.join(' '), '').replace(datesArray.join(' '), '').trim();
    
    let newEvent: IEvent = {
        title: title,
        startDate: dates.start,
        endDate: hasDateRange ? dates.end : undefined,
        userId: "9ab57868-47eb-4f76-b823-47ba2538f4fc",
    };
    
    return newEvent;
};


const ValidateCommand = (doc : any) => {
    const verbs: string[] = doc.verbs().out('array');
    if (verbs.length === 0) {
        throw new Error("Invalid command. Your command must contain one verb.");
    }

} 

const GetCommandType = (doc: any) => {

    const verbs: string[] = doc.verbs().out('array');

    for (let verb of verbs) {
        verb = verb.toLowerCase();  
        for (let operation in crudOperations) {
            if (crudOperations[operation as keyof typeof crudOperations].includes(verb)) {
                return operation;
            }
        }
    }

    throw new Error("Invalid command. Could not determine CRUD operation.");
};


