import { RequestStatus } from "@/lib/constants";
import { CrossCircleIcon } from "./icons/cross-circle-icon";
import { InformationIcon } from "./icons/information-icon";
import { TimeIcon } from "./icons/time-icon";
import { CheckIcon } from "./icons/CheckIcon";

const PropsWithStatus = {
    [RequestStatus.PENDING]: { color: "bg-gray-100 text-gray-400 ", icon: <TimeIcon className="text-gray-400" /> },
    [RequestStatus.PROCESSING]: { color: "bg-indigo-50 text-indigo-500 border-indigo-500", icon: <TimeIcon className="text-indigo-400" /> },
    [RequestStatus.REVIEW_NEEDED]: { color: "bg-orange-100 text-orange-600 border-orange-600", icon: <InformationIcon className="text-orange-500" /> },
    [RequestStatus.SUCCESS]: { color: "bg-green-100 text-green-600 border-green-600", icon: <CheckIcon className="text-green-500" /> },
    [RequestStatus.ERROR]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
    [RequestStatus.EXPIRED]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
    [RequestStatus.INVALID]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
};

export const StatusLabels = {
    [RequestStatus.PENDING]: "Pendiente",
    [RequestStatus.PROCESSING]: "En Proceso",
    [RequestStatus.REVIEW_NEEDED]: "Requiere Revisión",
    [RequestStatus.SUCCESS]: "Completado",
    [RequestStatus.ERROR]: "Error",
    [RequestStatus.EXPIRED]: "Expirado",
    [RequestStatus.INVALID]: "Inválido",
};

export function ChipRequestStatus({ status, size }: { status: RequestStatus, size?: "sm" | "md" }) {
    const { color, icon } = PropsWithStatus[status] || {};
    const sizeClasses = size === "sm" ? "text-xs" : "text-sm";
    return (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium ${color} ${sizeClasses}`}>

            {icon}
            <span className="ml-1">{StatusLabels[status]}</span>
        </div>
    );
}
