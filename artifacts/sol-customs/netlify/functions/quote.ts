import type { Handler } from "@netlify/functions";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const handler: Handler = async (event) => {
  console.log("[quote] invoked", { method: event.httpMethod });

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("[quote] WEB3FORMS_ACCESS_KEY is not set");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Server misconfigured" }),
    };
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (err) {
    console.error("[quote] JSON parse error", err);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Invalid JSON" }),
    };
  }

  if (typeof payload.botcheck === "string" && payload.botcheck.length > 0) {
    console.log("[quote] bot detected, ignoring");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  }

  try {
    console.log("[quote] forwarding to Web3Forms");

    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload, access_key: accessKey }),
    });

    const contentType = res.headers.get("content-type") ?? "";
    const rawText = await res.text();

    console.log("[quote] Web3Forms status:", res.status);
    console.log("[quote] Web3Forms content-type:", contentType);
    console.log("[quote] Web3Forms raw response (first 500 chars):", rawText.slice(0, 500));

    if (!contentType.includes("application/json")) {
      console.error("[quote] Web3Forms returned non-JSON — likely HTML error page or plan restriction");
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "Form service returned an unexpected response. Please call or text Sol Customs directly.",
        }),
      };
    }

    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("[quote] Failed to parse Web3Forms JSON", parseErr);
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, message: "Invalid response from form service" }),
      };
    }

    console.log("[quote] Web3Forms parsed response:", { success: data?.success, message: data?.message });

    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("[quote] Unexpected error", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Internal server error" }),
    };
  }
};
