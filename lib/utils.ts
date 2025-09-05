import { twMerge } from "tailwind-merge";

export function classNames(...args: Array<string | undefined | string | boolean | object>) {
    if (!args || args.length === 0 || args == null || args == undefined) return "";
    const className: string = args
        .map((arg) => {
            if (typeof arg === "undefined") return null;
            if (typeof arg === "boolean") return arg;
            if (typeof arg === "string") return arg;
            if (Array.isArray(arg)) return classNames(...arg);
            return Object.entries(arg || {})
                .map(([key, value]) => (value ? key : null))
                .filter(Boolean)
                .join(" ");
        })
        .filter(Boolean)
        .join(" ");
    return twMerge(className);
}