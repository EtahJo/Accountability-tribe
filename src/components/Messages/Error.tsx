import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div
			className="bg-red-200 rounded-md flex p-3 items-center 
        gap-x-2 text-sm text-red-500"
		>
			<ExclamationTriangleIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	);
};
