import { format, parseISO } from 'date-fns';

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

export const formatStringToYYYYMMDD = (dateString?: string): string | undefined => {
    return dateString ? format(new Date(dateString), 'yyyy-MM-dd') : ''; 
}

export const capitalizeFirstLetter = (dateString: string) => dateString.charAt(0).toUpperCase() + dateString.slice(1)
