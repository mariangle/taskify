import { danishPhoneNumberRegex } from "@/helpers/constants";
import { HiMail, HiPhone, HiLink } from 'react-icons/hi'; 

const nlp = require('compromise')
const plg = require('compromise-dates')

const nlpEx = nlp.plugin(plg)

interface PriorityProps {
    attachment: string
}

const AttachmentLabel = ({
    attachment
}: PriorityProps) => {

    let doc = nlpEx(attachment);
    const email = doc.emails().out('text');
    const phoneNumber = attachment.match(danishPhoneNumberRegex);
    const url = doc.urls().out('text');

  return (
    <div 
    >
        <div  className="flex gap-1 items-center text-xs"  >
            {email && <HiMail />}
            {phoneNumber && <HiPhone />}
            {url && <HiLink />}
            <p>{attachment}</p>
        </div>
    </div>
  )
}

export default AttachmentLabel