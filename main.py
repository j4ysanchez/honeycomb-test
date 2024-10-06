from fastapi import FastAPI, Request
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Set up the tracer provider and exporter
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

# Configure the Honeycomb OTLP exporter
honeycomb_exporter = OTLPSpanExporter(
    endpoint="https://api.honeycomb.io:443",
    headers={
        "x-honeycomb-team": "AeDr1ZSX9DXA9EVQDZm1jG",
        "x-honeycomb-dataset": "my-service-name"
    }
)
span_processor = BatchSpanProcessor(honeycomb_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Optionally, add a console exporter for debugging
console_exporter = ConsoleSpanExporter()
trace.get_tracer_provider().add_span_processor(BatchSpanProcessor(console_exporter))

app = FastAPI()

# Integrate OpenTelemetry with FastAPI
FastAPIInstrumentor.instrument_app(app)

@app.middleware("http")
async def add_custom_attributes(request: Request, call_next):
    with tracer.start_as_current_span("custom_span") as span:
        # Add request metadata
        span.set_attribute("http.method", request.method)
        span.set_attribute("http.url", str(request.url))
        span.set_attribute("http.headers", dict(request.headers))

        # Process the request
        response = await call_next(request)

        # Add response metadata
        span.set_attribute("http.status_code", response.status_code)
        span.set_attribute("http.response_size", len(response.body))

        return response

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}