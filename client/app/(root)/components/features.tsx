import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { HiOutlineMicrophone, HiOutlineBell, HiOutlineCalendar, HiOutlineMoon } from "react-icons/hi"

export const features = [
  { title: "Speech Recognition", description: "Effortlessly manage your events with simple voice commands.", icon: <HiOutlineMicrophone /> },
  { title: "Reminders", description: "Set up reminders for your events, ensuring you never miss an important moment.", icon: <HiOutlineBell /> },
  { title: "Smart Scheduling", description: "Optimize your schedule automatically and efficiently with intelligent scheduling algorithms.", icon: <HiOutlineCalendar /> },
  { title: "Dark Mode", description: "Reduce eye strain and enjoy a visually comfortable experience.", icon: <HiOutlineMoon /> },
];

const Features = () => {
  return (
    <>
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
        ))}
    </>
  );
};

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <Card isBlurred className="bg-white/5 dark:bg-default-400/10">
        <CardHeader className="pb-0 px-5 pt-4 text-base font-semibold">
            <div className="text-purple p-2 rounded-full bg-secondary-100/80 mr-3">
                {icon}
            </div>
            {title}
        </CardHeader>
        <CardBody  className="text">{description}</CardBody>
    </Card>
  );
};

export default Features;
