import { MercadoPagoConfig, Preference } from "mercadopago";

// Initialize Mercado Pago client
const client = new MercadoPagoConfig({
  accessToken:
    process.env.MP_ACCESS_TOKEN ||
    "TEST-6904935552924906-081410-86223977c447ac9c9e9f2e5de9a3c62b-178342503",
  options: {
    timeout: 5000,
    idempotencyKey: undefined,
  },
});

const preference = new Preference(client);

export interface PaymentItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

export interface PaymentData {
  items: PaymentItem[];
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: "approved" | "all";
  external_reference?: string;
  notification_url?: string;
  statement_descriptor?: string;
  payment_methods?: {
    excluded_payment_types?: { id: string }[];
    excluded_payment_methods?: { id: string }[];
    installments?: number;
  };
}

export interface MercadoPagoResponse {
  success: boolean;
  init_point?: string;
  sandbox_init_point?: string;
  preference_id?: string;
  error?: string;
}

export class MercadoPagoService {
  static async createPaymentPreference(
    paymentData: PaymentData
  ): Promise<MercadoPagoResponse> {
    try {
      console.log(
        "Creating preference with data:",
        JSON.stringify(paymentData, null, 2)
      );

      const response = await preference.create({
        body: paymentData,
      });

      console.log(
        "MercadoPago API response:",
        JSON.stringify(response, null, 2)
      );

      return {
        success: true,
        init_point: response.init_point || undefined,
        sandbox_init_point: response.sandbox_init_point || undefined,
        preference_id: response.id || undefined,
      };
    } catch (error) {
      console.error("Error creating Mercado Pago preference:", error);

      // Log more details about the error
      if (error && typeof error === "object") {
        console.error("Error details:", JSON.stringify(error, null, 2));
      }

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static async getPaymentStatus(preferenceId: string): Promise<any> {
    try {
      const response = await preference.get({ preferenceId });
      return response;
    } catch (error) {
      console.error("Error getting payment status:", error);
      throw error;
    }
  }

  static formatPaymentItems(
    services: any[],
    discountAmount: number = 0
  ): PaymentItem[] {
    const items: PaymentItem[] = services
      .filter((service) => service.quantity > 0)
      .map((service) => ({
        id: service.id,
        title: service.name,
        quantity: service.quantity,
        unit_price: service.price,
        currency_id: "ARS",
      }));

    // Add discount as a separate item if exists
    if (discountAmount > 0) {
      items.push({
        id: "discount",
        title: "Descuento aplicado",
        quantity: 1,
        unit_price: -discountAmount,
        currency_id: "ARS",
      });
    }

    return items;
  }

  static createPaymentData(
    items: PaymentItem[],
    baseUrl: string,
    externalReference?: string
  ): PaymentData {
    // For development, don't use back_urls and auto_return to avoid validation issues
    const isLocalhost =
      baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");

    const paymentData: PaymentData = {
      items,
      external_reference: externalReference,
      statement_descriptor: "FULLDATA - Búsquedas",
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12,
      },
    };

    // Only add back_urls and auto_return for production (HTTPS URLs)
    if (!isLocalhost) {
      paymentData.back_urls = {
        success: `${baseUrl}/searches/purchase/success`,
        failure: `${baseUrl}/searches/purchase/failure`,
        pending: `${baseUrl}/searches/purchase/pending`,
      };
      paymentData.auto_return = "approved";
    }

    return paymentData;
  }
}
