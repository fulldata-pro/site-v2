import { classNames } from "@/lib/utils";
import { Kick } from "@/lib/interfaces";
import React from "react";

interface MapsIconProps extends Kick<React.HTMLAttributes<HTMLElement>, "children"> {
	classPath1?: string;
	classPath2?: string;
	classPath3?: string;
}

export function MapsIcon({ className, classPath1, classPath2, classPath3, ...restProps }: MapsIconProps) {
	return (
		<i className={classNames("ki-duotone ki-map", className)} {...restProps}>
			<span className={classNames("path1", classPath1)}></span>
			<span className={classNames("path2", classPath2)}></span>
			<span className={classNames("path3", classPath3)}></span>
		</i>
	);
}
