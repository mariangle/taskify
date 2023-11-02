const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)

export const HandleCommand = (command : string) => {

    // Creating a compromise document
    const doc = nlpEx('see you on june 8 2026 at 14 thank you.');

    // Extracting dates from the document
    const dates = doc.dates().get()[0]
    const duration = doc.durations().get()[0];
    const times = doc.times().get()[0];
    const text = doc.text();

    // Logging the results
    console.log("Dates:", dates);
    console.log("Detected duration:", duration);
    console.log("Detected times:", times);
    console.log("Original text:", text);

    // validate the command
    /*
    if (!command) throw new Error("Your command cannot be empty.")

    // check what type command it is and return the type

    if (command === "Hallo") {
        throw new Error("hehe")
    }
    
    throw new Error("Your command is not valid. Please try again."); 




    // use the type delegate to corresponding validation

    // if command is a query

    // if command is an action validate the event
    */
}
