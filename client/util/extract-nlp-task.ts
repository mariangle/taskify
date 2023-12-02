import { TaskEntry } from "@/types"
import { danishPhoneNumberRegex, priorities, statuses } from "@/lib/constants"

const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)

export const extractNlpTask = async (prompt: string): Promise<TaskEntry> => {
    let doc = nlpEx(prompt);

    // Extract properties to create a task
    const dateString = doc.dates().out('text');
    const date = doc.dates().json()[0] // TODO: Distinguish between date and time
    const mentionsArray = doc.atMentions().out('array');
    const hashtagsArray = doc.hashTags().out('array');
    const emailsArray = doc.emails().out('array');
    const urlsArray = doc.urls().out('array');
    const phoneNumbersArray = prompt.match(danishPhoneNumberRegex) ?? [];
    const attachmentsArray = [...emailsArray, ...urlsArray, ...phoneNumbersArray];

    // Extract name by removing other properties
    const name = doc.text()
        .replace(dateString, '')
        .replace(mentionsArray.join(' '), '')
        .replace(hashtagsArray.join(' '), '')
        .replace(attachmentsArray.join(' '), '')
        .trim();

    let priority: string | undefined;
    let status: string | undefined;
    let hashtags: string[] = [];

    // Loop over hashtags and remove the #
    // TODO: This will be used to find listIds...
    hashtagsArray.forEach((hashtag: string) => {
        hashtags.push(hashtag.toLowerCase().replace('#', ''));
    });
    
    // Loop over each mention and check for match with an existing priority, status or category
    mentionsArray.forEach((mention: string) => {
        const lowerCaseMention = mention.toLowerCase().replace('@', '');

        const foundPriority = priorities.find(p => p.value.toLowerCase() === lowerCaseMention);
        if (foundPriority) {
            priority = foundPriority.value;
        }

        const foundStatus = statuses.find(s => s.value.toLowerCase() === lowerCaseMention);
        if (foundStatus) {
            status = foundStatus.value;
        }

    });

    let taskEntry: TaskEntry = {
        name: name,
        dueDate: date?.dates?.end,
        priority: priority,
        status: status,
    };

    return taskEntry;
};
