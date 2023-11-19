import { TaskEntry } from "@/types"
import { danishPhoneNumberRegex, categories, priorities, statuses } from "@/helpers/constants"

const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)

export const extractNlpCommand = async (command: string): Promise<TaskEntry> => {
    let doc = nlpEx(command);

    const dateString = doc.dates().out('text');
    const date = doc.dates().json()[0]
    const mentionsArray = doc.atMentions().out('array');
    const location = doc.places().out('text');
    const hashtagsArray = doc.hashTags().out('array');
    const emailsArray = doc.emails().out('array');
    const urlsArray = doc.urls().out('array');
    const phoneNumbersArray = command.match(danishPhoneNumberRegex) ?? [];
    const attachmentsArray = [...emailsArray, ...urlsArray, ...phoneNumbersArray];
    
    const title = doc.text()
        .replace(dateString, '')
        .replace(mentionsArray.join(' '), '')
        .replace(location, '')
        .replace(hashtagsArray.join(' '), '')
        .replace(attachmentsArray.join(' '), '')
        .trim();

    let priority: string | undefined;
    let status: string | undefined;
    let category: string | undefined;
    let hashtags: string[] = [];

    hashtagsArray.forEach((hashtag: string) => {
        hashtags.push(hashtag.toLowerCase().replace('#', ''));
    });

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

        const foundCategory = categories.find(c => c.value.toLowerCase() === lowerCaseMention);
        if (foundCategory) {
            category = foundCategory.value;
        }
    });

    let taskEntry: TaskEntry = {
        title: title,
        description: '',
        location: location,
        dueDate: date?.dates?.end,
        category: category,
        priority: priority,
        status: status,
        tags: hashtags,
        attachments: attachmentsArray
    };

    console.log(taskEntry);

    return taskEntry;
};
