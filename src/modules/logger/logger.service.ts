// config/custom.logger.ts
import pino, { Logger } from "pino";
import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class OtelLogger implements LoggerService {
  logger: Logger;

  constructor() {
    this.logger = pino()
  }

  log(message: string, ...optionalParams: any[]): void {
    this.logger.info(message + this._params(optionalParams));
  }

  error(message: string, ...optionalParams: any[]): void {
    this.logger.error(message + this._params(optionalParams));
  }

  fatal(message: string, ...optionalParams: any[]): void {
    this.logger.fatal(message + this._params(optionalParams));
  }

  warn(message: string, ...optionalParams: any[]): void {
    this.logger.warn(message + this._params(optionalParams));
  }

  debug?(message: string, ...optionalParams: any[]): void {
    this.logger.debug(message + this._params(optionalParams));
  }

  verbose?(message: string, ...optionalParams: any[]): void {
    this.logger.trace(message + this._params(optionalParams));
  }
  _params(optionalParams: any[]): string {
    if (!optionalParams?.length) return "";
    return " - " + optionalParams.map(p => {
      if (!p) return "";
      switch(typeof p) {
        case "number":
        case "boolean":
        case "string": return `${p}`;
        case "object": return JSON.stringify(p);
        case "symbol":
        case "bigint": return p.toString();
        case "function": return `[${p.name || "function"}(){...}]`;
        default: return "";
      }
    }).join(" - ");
  }
}
