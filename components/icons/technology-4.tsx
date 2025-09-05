import { classNames } from "@/lib/utils";
import React from "react";

interface technology4Props extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
	classPath3?: string;
	classPath4?: string;
	classPath5?: string;
	classPath6?: string;
	classPath7?: string;
}

export function Technology4({ variant = "duotone", className, classPath1, classPath2, classPath3, classPath4, classPath5, classPath6, classPath7, ...restProps }: technology4Props) {
	return (
		<i className={classNames(`ki-${variant} ki-technology-4`, className)} {...restProps}>
			<i className={classNames("path1", classPath1)}></i>
			<i className={classNames("path2", classPath2)}></i>
			<i className={classNames("path3", classPath3)}></i>
			<i className={classNames("path4", classPath4)}></i>
			<i className={classNames("path5", classPath5)}></i>
			<i className={classNames("path5", classPath6)}></i>
			<i className={classNames("path5", classPath7)}></i>
		</i>
	);
}
