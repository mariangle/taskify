import { format, formatDistanceToNow as formatDistanceToNowFns } from 'date-fns';

export const formatToEEEDDMMM = (dateString: string): string => {
    try {
        return format(new Date(dateString), 'EEE, dd MMM');
    } catch (error) {
        return '';
    }
};

export const formatToEEEDDMMMYYYYY = (dateString: string): string => {
    try {
        return format(new Date(dateString), 'EEE, dd MMM yyyy');
    } catch (error) {
        return '';
    }
};

export const formatStringToYYYYMMDD = (dateString?: string | null): string | null => {
    return dateString ? format(new Date(dateString), 'yyyy-MM-dd') : null; 
}

export const capitalizeFirstLetter = (dateString: string | null): string | null => {
    return dateString ? dateString.charAt(0).toUpperCase() + dateString.slice(1) : null;
}

export const formatDistanceToNow = ({date} : {date: Date}) => {
    return formatDistanceToNowFns(date, { addSuffix: true})
}