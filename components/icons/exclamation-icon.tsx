import { classNames } from "@/lib/utils";
import { Kick } from "@/lib/interfaces";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
	classPath3?: string;
}

export function ExclamationIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, ...restProps }: Props) {
	return (
		<i className={classNames(`ki-${variant} ki-information-3`, className)} {...restProps}>
			<span className={classNames("path1", classPath1)}></span>
			<span className={classNames("path2", classPath2)}></span>
			<span className={classNames("path3", classPath3)}></span>
		</i>
	);
}
