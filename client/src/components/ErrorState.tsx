import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  message: string;
}

const ErrorState = ({ title, message }: ErrorStateProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <div className="flex items-center justify-center py-6">
        <div className="rounded-full bg-red-100 p-3 mr-4">
          <AlertCircle className="h-6 w-6 text-error" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
