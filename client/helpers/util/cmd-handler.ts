import EventService from "@/helpers/services/event-service"
import { IEvent } from "@/types"
import { crudOperations } from "@/helpers/constants"

const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)

export const handleCommand = async (command : string) => {

    let doc = nlpEx(command);
    let commandType: string;

    try {
       commandType = validateAndGetCmdType (doc);
    } catch (err) {
        throw err;
    }

    try {
        switch (commandType) {
            case 'create':
                try {
                    const event = createEventObject(doc);
                    await EventService.createEvent(event);
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
    } catch (err) {
        throw err;
    }
}

const createEventObject = (doc: any) => {
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

    if (!title){
        throw new Error("You must add a title");
    }
    
    let newEvent: IEvent = {
        title: title,
        startDate: dates.start,
        endDate: hasDateRange ? dates.end : undefined,
    };
    
    return newEvent;
};


const validateAndGetCmdType = (doc: any) => {
    const verbs: string[] = doc.verbs().out('array');

    if (verbs.length === 0) {
        throw new Error("Invalid command. Your command must contain one verb.");
    }

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

