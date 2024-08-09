"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisH } from "react-icons/fa";
import DeleteConfirmation from "@/components/Confirmations/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

interface EllipsisDropdownProps {
	authorId: string;
	isAdmin?: boolean;
	isPending: boolean;
	showEditFunction: () => void;
	deleteAction: () => void;
}

const EllipsisDropdown = ({
	authorId,
	isAdmin,
	isPending,
	deleteAction,
	showEditFunction,
}: EllipsisDropdownProps) => {
	const { user }: any = useCurrentUser();
	const pathname = usePathname();

	const isAuthor = user?.id === authorId;
	const showMakeFirstConditionOne = isAdmin && pathname.startsWith("/tribe");
	const showMakeFirstConditionTwo = pathname.includes(user?.username);
	if (!isAuthor && !showMakeFirstConditionOne && !showMakeFirstConditionTwo)
		return null;
	return (
		<div className="z-[100]">
			<DropdownMenu>
				<DropdownMenuTrigger className="group">
					<FaEllipsisH className="text-purple group-hover:shadow-3xl group-hover:text-black rounded-3xl dark:text-dark-primary dark:group-hover:text-dark-text" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className=" flex flex-col items-center justify-center">
					{isAuthor && (
						<DropdownMenuItem
							onClick={showEditFunction}
							className="w-full flex justify-center"
						>
							Edit
						</DropdownMenuItem>
					)}
					{(showMakeFirstConditionOne || showMakeFirstConditionTwo) && (
						<DropdownMenuItem className="w-full flex justify-center">
							Make First
						</DropdownMenuItem>
					)}
					{isAuthor && (
						<DeleteConfirmation
							trigger={
								<Button
									variant={"destructive"}
									className="move-button"
									disabled={isPending}
								>
									Delete
								</Button>
							}
							confirmationMessage={"Are you sure you want to delete?"}
							consequenceMessage="This action can not be undone"
							action={<Button onClick={deleteAction}>Delete Anyway</Button>}
						/>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default EllipsisDropdown;
