import { LogEntry, PeekOutputMethod } from ".";

export class ConsoleOutputMethod implements PeekOutputMethod {
	automaticFiltering = true;

	log(logEntry: LogEntry) {
		print(`[${logEntry.timestamp}] - [${logEntry.level}] - [${logEntry.loggerName}] - ${logEntry.message}`);	
	}
}