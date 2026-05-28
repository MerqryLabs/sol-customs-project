const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: "Method not allowed" }) };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: "Server misconfigured" }) };
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: "Invalid JSON" }) };
  }

  if (typeof payload.botcheck === "string" && payload.botcheck.length > 0) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, access_key: accessKey }),
    });
    const data = await res.json();
    return { statusCode: res.status, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ success: false, message: "Upstream error" }),
    };
  }
};
