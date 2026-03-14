# Lura

**A modern chat interface that lets you talk to multiple AI models — with native support for tools and function calling.**

Lura is built for developers and power users who want a single, clean interface to work across different AI providers without switching apps, managing separate API keys in different dashboards, or losing conversation context.

---

## Why Lura?

Most chat interfaces lock you into a single model. Lura doesn't. Switch between models mid-workflow, compare responses side by side, or route specific tasks to the model best suited for them — all from one place.

When a model needs to act — look something up, retrieve user data, call an API — Lura's function calling support makes that visible and transparent. You see exactly what tool was invoked, what it received, and what it returned.

---

## Features

### Multi-Model Support
Connect to multiple AI providers and models from a single interface. Switch models per conversation or per message. Lura abstracts the provider differences so the experience stays consistent.

### Function Calling & Tools
First-class support for AI tool use. When a model calls a function, Lura surfaces the full call — name, input, and result — in a collapsible card inline with the conversation. No black boxes.

### Streaming Responses
Responses stream in real time as the model generates them. Tool calls appear live as they accumulate. Abort any generation mid-stream with a single click.

### Clean Conversation History
Full conversation context is preserved and correctly formatted across turns, including multi-step tool call cycles. The model always has the complete picture.

---

## Tech Stack

- **Next.js** — App Router, Edge & Node runtimes
- **Tailwind CSS** — utility-first styling
- **NVIDIA NIM API** — model inference (OpenAI-compatible)
- **Server-side tool execution** — sensitive data never reaches the client bundle
