import weaviate from "weaviate-client";

export type EmbedFunction = (text: string) => Promise<number[]>;

export class Weaviate {
  private client: any;
  private embedder: EmbedFunction;

  public static SEARCH_RESULT_COUNT = 5;

  constructor(client: any, embedder: EmbedFunction) {
    this.client = client;
    this.embedder = embedder;
  }

  static async create(embedder: EmbedFunction) {
    const httpHost = process.env.WEAVIATE_HOST || "localhost";
    const httpPort = Number(process.env.WEAVIATE_HTTP_PORT) || 8090;
    const grpcHost = process.env.WEAVIATE_GRPC_HOST || httpHost;
    const grpcPort = Number(process.env.WEAVIATE_GRPC_PORT) || 50051;

    const httpSecure = process.env.WEAVIATE_HTTP_SECURE === "true";
    const grpcSecure = process.env.WEAVIATE_GRPC_SECURE === "true";

    const client = await weaviate.connectToCustom({
      httpHost,
      httpPort,
      httpSecure,
      grpcHost,
      grpcPort,
      grpcSecure,
    });

    return new Weaviate(client, embedder);
  }

  private collection() {
    return this.client.collections.use("Product");
  }

  async indexProducts(products: any[]) {
    const collection = this.collection();
  
    const objects = [];
  
    for (const product of products) {
      const text =
        product.name +
        " " +
        product.categories_path +
        " " +
        product.description;
  
      const vector = await this.embedder(text);
  
      objects.push({
        properties: {
          name: product.name,
          categories_path: product.categories_path,
          description: product.description,
          db_id: String(product.id),
        },
        vectors: vector
      });
    }
  
    await collection.data.insertMany(objects);
  }

  async search(keyword: string, limit: number = 5) {
    const collection = this.collection();

    const vector = await this.embedder(keyword);


    const response = await collection.query.hybrid(keyword, {
      vector,
      limit,
      alpha: 0.75,
      returnMetadata: ["score"],
    });


    return response.objects.map((obj: any) => ({
      id: obj.properties.db_id,
      name: obj.properties.name,
      description: obj.properties.description,
      score: obj.metadata?.score,
    }));
  }

  async clearIndex() {
    await this.client.collections.delete("Product");

    // Optional: recreate collection immediately
    await this.client.collections.create({
      name: "Product",
      vectorizers: weaviate.configure.vectorizer.none(),
      properties: [
        { name: "name", dataType: "text" },
        { name: "categories_path", dataType: "text" },
        { name: "description", dataType: "text" },
        { name: "db_id", dataType: "text" },
      ],
    });
  }

  async clearProduct(productId: string | number) {
    const collection = this.collection();

    const response = await collection.query.fetchObjects({
      filters: collection.filter
        .byProperty("db_id")
        .equal(String(productId)),
      limit: 1,
    });

    if (!response.objects.length) {
      throw new Error("Product not found");
    }

    await collection.data.deleteById(response.objects[0].uuid);

    return { deleted: productId };
  }
}
