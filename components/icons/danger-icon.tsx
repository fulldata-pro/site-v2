import React from "react";
import dangerIconStyle from "@/styles/components/danger-icon.module.sass";

interface DangerIconProps {}

export function DangerIcon({}: DangerIconProps) {
	return (
		<svg version="1.1" className={dangerIconStyle.danger} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
			<circle className={`${dangerIconStyle.danger0} bg-danger-500 path circle`} cx="65" cy="65" r="62" />
			<path
				className={`bg-danger-500`}
				d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"
			/>
		</svg>
	);
}
