# Magento 2 AI Semantic Search
### Vector-Based • Self-Hosted • Production Ready

This extension replaces the native Magento search engine with an advanced **AI Semantic Search** powered by **Weaviate** and **Node.js**. By utilizing vector embeddings, it understands customer intent and processes complex queries that traditional keyword-based engines miss.

---

## 🚀 Key Features

* **Advanced AI Semantic Search** – Precise intent and concept matching using Weaviate vector technology.
* **Live Search Results Dropdown** – Instant product previews with images, price, and description as the user types.
* **High Speed & Accuracy** – Optimized performance designed to run smoothly without the need for an expensive GPU or high-end CPU server.
* **Fully Self-Hosted** – Pay only for a standard VPS and keep 100% of the data and search control in your hands.
* **Production Ready** – Robust Node.js backend integrated with Weaviate, fully containerized with **Docker Compose**.

---

## 🏗️ Technical Architecture

The system runs as a high-performance "sidecar" to your Magento installation:

1. **Weaviate:** The industrial-grade vector database that stores product "embeddings" (mathematical representations of meaning).
2. **Node.js Service:** A dedicated middleware that handles the heavy lifting of vectorization and API requests.
3. **Docker Compose:** Orchestrates the entire AI stack in an isolated environment to prevent conflicts with your Magento PHP processes.

---

## 🔍 Semantic Intelligence Examples

Stop losing sales to literal character matching. Our AI bridges the gap between customer language and your catalog:

* **The Synonym Gap:** A search for **"clock"** accurately returns **"watches"** and timepieces.
* **The Slang/Naming Gap:** If your catalog uses **"Tees"** but the customer types **"tshirts,"** the AI finds them instantly.
* **The Conceptual Gap:** Searching for **"weights"** surfaces kettlebells and dumbbells, even if that specific keyword isn't in the product title.

---
## 📦 Installation & Setup

To install the extension and the AI infrastructure (Docker, Node.js, and Weaviate), please follow the detailed step-by-step guide in our official documentation:

**[Official Installation Guide](https://www.mexbs.com/knowledge-base/docs/magento-extensions-docs/ai-search/installation)**

---

## 💡 Why Self-Hosted AI?

* **No "Success Tax":** Unlike SaaS search providers, you don't pay per-query. Your costs are fixed to your VPS.
* **Data Sovereignty:** Your customer search behavior and catalog data never leave your server.
* **Customizable:** Since you have the Node.js source and the Docker config, you have total control over the search logic.

---

© 2026 Mexbs. All rights reserved.
