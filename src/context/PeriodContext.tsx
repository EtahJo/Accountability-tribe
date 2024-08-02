"use client";

import React, { createContext, useState } from "react";

interface PeriodProps {
	period: string;
	changePeriod: (val: string) => void;
}

export const PeriodContext = createContext<PeriodProps>({
	period: "day",
	changePeriod(val) {},
});

export default function PeriodProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [period, setPeriod] = useState("day");
	const changePeriod = (period: string) => {
		setPeriod(period);
	};
	return (
		<PeriodContext.Provider value={{ period, changePeriod }}>
			{children}
		</PeriodContext.Provider>
	);
}
