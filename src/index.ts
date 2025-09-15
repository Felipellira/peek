import { ConsoleOutputMethod } from "./console-output-method";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export interface LogEntry {
	loggerName?: string;
	message: string;
	level: LogLevel;
	timestamp: number;
}

export interface PeekOptions {
	loggerName?: string;
	logLevel: LogLevel;
}

export interface PeekOutputMethod {
	/*
	 * Whether to automatically filter log entries based on the log level.
	 * If true, the log entry will be filtered based on the log level.
	 * If false, the log entry will be called regardless of the log level.
	 */
	automaticFiltering: boolean;

	/*
	 * Log the log entry.
	 */
	log(logEntry: LogEntry): void;
}

export class Peek {
	private options: PeekOptions;
	private outputMethods: PeekOutputMethod[] = [new ConsoleOutputMethod()];

	constructor(options: PeekOptions = { logLevel: LogLevel.INFO }, outputMethods?: PeekOutputMethod[]) {
		this.options = options;
		outputMethods && (this.outputMethods = outputMethods);
	}

	buildLogEntry(message: string, level: LogLevel) {
		return {
			loggerName: this.options.loggerName,
			message,
			level,
			timestamp: os.time(),
		};
	}

	filterLogLevelEntry(logEntry: LogEntry) {
		return logEntry.level >= this.options.logLevel;
	}

	changeOptions(options: PeekOptions) {
		this.options = options;
	}

	sendLogEntry(logEntry: LogEntry) {
		this.outputMethods.forEach(outputMethod => {
			if (outputMethod.automaticFiltering) {
				if (this.filterLogLevelEntry(logEntry)) {
					outputMethod.log(logEntry);
				}
			} else {
				outputMethod.log(logEntry);
			}
		});

	}

	debug(message: string) {
		this.sendLogEntry(this.buildLogEntry(message, LogLevel.DEBUG));
	}

	info(message: string) {
		this.sendLogEntry(this.buildLogEntry(message, LogLevel.INFO));
	}
	
	warn(message: string) {
		this.sendLogEntry(this.buildLogEntry(message, LogLevel.WARN));
	}

	error(message: string) {
		this.sendLogEntry(this.buildLogEntry(message, LogLevel.ERROR));
	}
}
