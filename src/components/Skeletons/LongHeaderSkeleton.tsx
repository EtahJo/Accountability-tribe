"use client";
import { cn } from "@/lib/utils";
import React from "react";

const LongHeaderSkeleton = ({
	classNames,
	children,
}: {
	classNames: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={cn("w-3/4 rounded-3xl p-10 ", classNames)}>
			{children}
		</div>
	);
};

export default LongHeaderSkeleton;
