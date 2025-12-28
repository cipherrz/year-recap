export { };

declare global {
	interface Window {
		onloadTurnstileCallback: () => void;
		turnstile: {
			render: (container: string | HTMLElement, options: any) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId?: string) => void;
		};
	}
}
