# Peek

Peek is a lightweight logging library designed for Roblox applications, featuring comprehensive support for custom output methods and flexible configuration options.

## Installation

```bash
npm install @rbxts/peek
```

## Quick Start

The following example demonstrates basic usage of the Peek logging library:

```ts
const peek = new Peek({
	loggerName: "Global",
	logLevel: LogLevel.DEBUG,
});

peek.info("Hello, world!");
```

## Output Methods

By default, Peek utilizes a built-in console output method. However, the library provides extensive support for custom output methods tailored to specific use cases. Additionally, Peek supports multiple simultaneous output methods, as demonstrated in the example below:

```ts
export class ConsoleOutputMethod implements PeekOutputMethod {
	// This property indicates that this method will only receive logs 
	// that have already been filtered by the specified log level
	automaticFiltering = true;

	log(logEntry: LogEntry) {
		print(`[${logEntry.timestamp}] - [${logEntry.level}] - [${logEntry.loggerName}] - ${logEntry.message}`);	
	}
}

export class FileOutputMethod implements PeekOutputMethod {
	// This method performs its own filtering based on log severity
	automaticFiltering = false;
	private filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	log(logEntry: LogEntry) {
		// Only write ERROR and WARN level logs to file
		if (logEntry.level === LogLevel.ERROR || logEntry.level === LogLevel.WARN) {
			const logLine = `${logEntry.timestamp} | ${logEntry.level} | ${logEntry.loggerName} | ${logEntry.message}\n`;
			// Note: File writing implementation would depend on your Roblox environment
			this.writeToFile(logLine);
		}
	}

	private writeToFile(content: string) {
		// Implementation for file writing would go here
		// This is a placeholder for the actual file writing logic
	}
}

const peek = new Peek({
	loggerName: "Global",
	logLevel: LogLevel.DEBUG,
}, [
	new ConsoleOutputMethod(),
	new FileOutputMethod("logs/application.log")
]); // Multiple output methods registered simultaneously
```