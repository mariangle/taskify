import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
  message?: string;
}

export function AuthError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive border border-destructive/20">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
