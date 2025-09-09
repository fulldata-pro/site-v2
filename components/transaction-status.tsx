import { TransactionStatus, TransactionStatusLabel } from "@/lib/constants";
import { CrossCircleIcon } from "./icons/cross-circle-icon";
import { InformationIcon } from "./icons/information-icon";
import { TimeIcon } from "./icons/time-icon";
import { CheckIcon } from "./icons/CheckIcon";

const PropsWithStatus = {
    [TransactionStatus.PENDING]: { color: "bg-gray-100 text-gray-400 ", icon: <TimeIcon className="text-gray-400" /> },
    [TransactionStatus.PROCESSING]: { color: "bg-indigo-50 text-indigo-500 border-indigo-500", icon: <TimeIcon className="text-indigo-400" /> },
    [TransactionStatus.REVIEW_NEEDED]: { color: "bg-orange-100 text-orange-600 border-orange-600", icon: <InformationIcon className="text-orange-500" /> },
    [TransactionStatus.SUCCESS]: { color: "bg-green-100 text-green-600 border-green-600", icon: <CheckIcon className="text-green-500" /> },
    [TransactionStatus.ERROR]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
    [TransactionStatus.EXPIRED]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
    [TransactionStatus.INVALID]: { color: "bg-red-100 text-red-600 border-red-600", icon: <CrossCircleIcon className="text-red-500" /> },
};

export const StatusLabels = {
    [TransactionStatus.PENDING]: "Pendiente",
    [TransactionStatus.PROCESSING]: "En Proceso",
    [TransactionStatus.REVIEW_NEEDED]: "Requiere Revisión",
    [TransactionStatus.SUCCESS]: "Completado",
    [TransactionStatus.ERROR]: "Error",
    [TransactionStatus.EXPIRED]: "Expirado",
    [TransactionStatus.INVALID]: "Inválido",
};

export function ChipTransactionStatus({ status, size }: { status: TransactionStatus, size?: "sm" | "md" }) {
    const { color, icon } = PropsWithStatus[status] || {};
    const sizeClasses = size === "sm" ? "text-xs" : "text-sm";
    return (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium ${color} ${sizeClasses}`}>

            {icon}
            <span className="ml-1">{TransactionStatusLabel[status]}</span>
        </div>
    );
}
