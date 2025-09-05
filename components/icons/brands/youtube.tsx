import { classNames } from "@/lib/utils";
import { Kick } from "@/lib/interfaces";
import React from "react";

interface YoutubeIconProps extends Kick<React.HTMLAttributes<HTMLElement>, "children"> {
	classPath1?: string;
	classPath2?: string;
}

export function YoutubeIcon({ className, classPath1, classPath2, ...restProps }: YoutubeIconProps) {
	return (
		<i className={classNames("ki-duotone ki-youtube", className)} {...restProps}>
			<span className={classNames("path1", classPath1)}></span>
			<span className={classNames("path2", classPath2)}></span>
		</i>
	);
}
