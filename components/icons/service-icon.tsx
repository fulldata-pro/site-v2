import { classNames } from "@/lib/utils";
import React from "react";
import { BankIcon } from "./bank-icon";
import { Car2Icon } from "./car-2-icon";
import { Cube2Icon } from "./cube-2-icon";
import { FaceIdIcon } from "./face-id-icon";
import { ProfileUserIcon } from "./profile-user-icon";
import { Technology4 } from "./technology-4";
import { WhatsappIcon } from "./whatsapp-icon";
import { ServicesType } from "@/lib/constants";

interface ServiceIconProps extends React.HTMLAttributes<HTMLElement> {
	service: string | null;
	classPath1?: string;
	classPath2?: string;

}


export function ServiceIcon({ service, className, classPath1, classPath2, ...props }: ServiceIconProps) {
	if (service === ServicesType.PEOPLE) return <ProfileUserIcon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-people", className)} {...props} />;
	if (service === ServicesType.COMPANIES) return <Cube2Icon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-companies", className)} {...props} />;
	if (service === ServicesType.VEHICLES) return <Car2Icon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-vehicles", className)} {...props} />;
	if (service === ServicesType.PHONES) return <WhatsappIcon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-phones", className)} {...props} />;
	if (service === ServicesType.BANKS) return <BankIcon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-banks", className)} {...props} />;
	if (service === ServicesType.OSINT) return <Technology4 classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-osint", className)} {...props} />;
	if (service === ServicesType.IDENTITY) return <FaceIdIcon classPath1={classPath1} classPath2={classPath2} className={classNames("text-services-identity", className)} {...props} />;
	return null;
}
