import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
}

const ToolTip = ({ trigger, children }: ToolTipProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{trigger}</TooltipTrigger>
				<TooltipContent className="z-30">{children}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ToolTip;
