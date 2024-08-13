"use client"
import ToolTip from "@/components/ToolTip/index";
import { cn } from "@/lib/utils";

interface FullTextOnHoverProps {
	text: string;
	className?: string;
}
const FullTextOnHover = ({
	text,
	className
}: FullTextOnHoverProps) => {
	return ( 
		<ToolTip trigger={
			<div className={cn("group relative w-52", className)}>
				<h1 className="truncate bg-lighterPink dark:bg-dark-lightPrimary
				p-1 rounded-md">{text}</h1>
			</div>
		
		}>
			{text}
		</ToolTip>
	);
};

export default FullTextOnHover;
