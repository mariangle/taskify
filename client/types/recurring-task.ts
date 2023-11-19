export type RecurringTask = {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval?: number; 
};