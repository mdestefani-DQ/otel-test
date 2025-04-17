import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

const traceExporter = new OTLPTraceExporter()
const batchRecordProcessor = new BatchLogRecordProcessor(new OTLPLogExporter())

const sdk = new NodeSDK({
  traceExporter,
  logRecordProcessors: [batchRecordProcessor],
  instrumentations: [getNodeAutoInstrumentations()]
});

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

sdk.start();
