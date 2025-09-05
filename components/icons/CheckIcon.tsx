import React from "react";
import checkIconStyle from "@/styles/components/check-icon.module.sass";

export interface CheckIconProps {}

const CheckIcon = () => {
	return (
		<svg version="1.1" className={checkIconStyle.checked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
			<circle className={`${checkIconStyle.checked0} path circle`} cx="65.1" cy="65.1" r="62.1" />
			<polyline className={`${checkIconStyle.checked1} path check`} points="100.2,40.2 51.5,88.8 29.8,67.5 " />
		</svg>
	);
};

export default CheckIcon;
