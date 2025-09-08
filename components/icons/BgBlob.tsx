import React from "react";

interface BgBlobProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BgBlob({ className, ...props }: BgBlobProps) {
	return (
		<div className={className} {...props}>
			<figure className="relative h-full w-full">
				<svg viewBox="0 0 50 50" className="absolute -left-10 -top-8 text-18xl" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<g transform="translate(25.190866240758844 27.246825474585357)">
						<path
							className="fill-primary-300"
							d="M12.2 -10.2C16.3 -4.6 20.3 0.5 19.4 4.3C18.4 8.2 12.5 10.9 6.4 14C0.4 17.1 -5.6 20.7 -9.3 19.1C-13 17.4 -14.3 10.5 -16.4 3.2C-18.5 -4.1 -21.5 -11.8 -18.9 -17.1C-16.3 -22.3 -8.1 -25.2 -2 -23.5C4.1 -21.9 8.1 -15.8 12.2 -10.2"
						></path>
					</g>
				</svg>
				<svg viewBox="0 0 50 50" className="absolute -left-20 -top-12 text-18xl" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<g transform="translate(22.558126371142116 29.5480087837498)">
						<path
							d="M9.5 -12.8C14.5 -9.5 22.1 -9.6 23.3 -7.2C24.6 -4.9 19.4 -0.1 16.2 3.9C13 7.9 11.8 11.3 9.4 13.1C7.1 15 3.5 15.5 0.5 14.8C-2.5 14.2 -5.1 12.3 -7 10.3C-8.9 8.2 -10.2 6 -12.5 3C-14.9 0.1 -18.4 -3.5 -18.6 -7.1C-18.9 -10.7 -15.9 -14.2 -12.3 -17.9C-8.6 -21.5 -4.3 -25.3 -1 -23.9C2.3 -22.5 4.6 -16 9.5 -12.8"
							className="fill-primary-500"
						></path>
					</g>
				</svg>
				<svg viewBox="0 0 50 50" className="absolute -bottom-6 -right-16 text-16xl" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<g transform="translate(25.190866240758844 27.246825474585357)">
						<path
							className="fill-primary-300"
							d="M12.2 -10.2C16.3 -4.6 20.3 0.5 19.4 4.3C18.4 8.2 12.5 10.9 6.4 14C0.4 17.1 -5.6 20.7 -9.3 19.1C-13 17.4 -14.3 10.5 -16.4 3.2C-18.5 -4.1 -21.5 -11.8 -18.9 -17.1C-16.3 -22.3 -8.1 -25.2 -2 -23.5C4.1 -21.9 8.1 -15.8 12.2 -10.2"
						></path>
					</g>
				</svg>
				<svg viewBox="0 0 50 50" className="absolute -bottom-32 right-24 text-16xl" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<g transform="translate(25.190866240758844 27.246825474585357)">
						<path
							className="fill-primary-500"
							d="M12.2 -10.2C16.3 -4.6 20.3 0.5 19.4 4.3C18.4 8.2 12.5 10.9 6.4 14C0.4 17.1 -5.6 20.7 -9.3 19.1C-13 17.4 -14.3 10.5 -16.4 3.2C-18.5 -4.1 -21.5 -11.8 -18.9 -17.1C-16.3 -22.3 -8.1 -25.2 -2 -23.5C4.1 -21.9 8.1 -15.8 12.2 -10.2"
						></path>
					</g>
				</svg>
				<svg viewBox="0 0 50 50" className="absolute -bottom-20 -right-20 text-18xl" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					<g transform="translate(22.558126371142116 29.5480087837498)">
						<path
							d="M9.5 -12.8C14.5 -9.5 22.1 -9.6 23.3 -7.2C24.6 -4.9 19.4 -0.1 16.2 3.9C13 7.9 11.8 11.3 9.4 13.1C7.1 15 3.5 15.5 0.5 14.8C-2.5 14.2 -5.1 12.3 -7 10.3C-8.9 8.2 -10.2 6 -12.5 3C-14.9 0.1 -18.4 -3.5 -18.6 -7.1C-18.9 -10.7 -15.9 -14.2 -12.3 -17.9C-8.6 -21.5 -4.3 -25.3 -1 -23.9C2.3 -22.5 4.6 -16 9.5 -12.8"
							className="fill-primary-500"
						></path>
					</g>
				</svg>
			</figure>
		</div>
	);
}
