import { classNames } from "@/lib/utils";
import React from "react";

interface BankIconProps extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
}

export function BankIcon({ variant = "duotone", className, classPath1, classPath2, ...resProps }: BankIconProps) {
	return (
		<i className={classNames(`ki-${variant} ki-bank`, className)} {...resProps}>
			<i className={classNames("path1", classPath1)}></i>
			<i className={classNames("path2", classPath2)}></i>
		</i>
	);
}
