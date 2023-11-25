import { TaskStatus } from '@/types';
import { 
    format, 
    formatDistanceToNow as formatDistanceToNowFns, 
    isSameDay as IsSameDayFns,
    isBefore
} from 'date-fns';

export const formatToEEEDDMMM = (dateString: string): string => {
    try {
        return format(new Date(dateString), 'EEE, dd MMM');
    } catch (error) {
        return '';
    }
};

export const formatToEEEDDMMMYYYYY = (date: string | Date): string => {
    try {
        return format(new Date(date), 'EEE, dd MMM yyyy');
    } catch (error) {
        return '';
    }
};

export const formatStringToYYYYMMDD = (dateString?: string | null): string | null => {
    return dateString ? format(new Date(dateString), 'yyyy-MM-dd') : null; 
}

export const capitalizeFirstLetter = (string: string | null): string | null => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : null;
}

export const formatDistanceToNow = ({date} : {date: Date}) => {
    return formatDistanceToNowFns(date, { addSuffix: true})
}

export const IsSameDay = (firstDate: Date, secondDate: Date): boolean => {
    return IsSameDayFns(new Date(firstDate), secondDate)
}

interface IsOverdueProps {
    date?: Date | string | undefined | null;
    status: TaskStatus;
  }
  
  export const isOverdue = ({ date, status }: IsOverdueProps): boolean => {
    if (!date) return false;
  
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
    return isBefore(parsedDate, new Date()) && status !== "Completed";
  };