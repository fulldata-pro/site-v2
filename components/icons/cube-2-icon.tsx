import { classNames } from "@/lib/utils";
import React from "react";

interface Cube2IconProps extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
	classPath3?: string;
}

export function Cube2Icon({ variant = "duotone", className, classPath1, classPath2, classPath3, ...restProps }: Cube2IconProps) {
	return (
		<i className={classNames(`ki-${variant} ki-cube-2`, className)} {...restProps}>
			<i className={classNames("path1", classPath1)}></i>
			<i className={classNames("path2", classPath2)}></i>
			<i className={classNames("path3", classPath3)}></i>
		</i>
	);
}
