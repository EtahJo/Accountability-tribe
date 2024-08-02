import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface NavbarIconProps {
	children: React.ReactNode;
	trigger: React.ReactNode;
}
const NavbarIcon = ({ children, trigger }: NavbarIconProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-10 max-h-[400px] overflow-y-scroll ml-2">
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavbarIcon;
