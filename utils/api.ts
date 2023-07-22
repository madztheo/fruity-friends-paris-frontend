export async function makeRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  params: any = undefined,
  headers: any = {},
  type: "json" | "blob" | "text" | "arrayBuffer" = "json"
) {
  const body = params ? JSON.stringify(params) : undefined;
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
    {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body,
    }
  );
  const result = await (async () => {
    switch (type) {
      case "arrayBuffer":
        return await apiRes.arrayBuffer();
      case "blob":
        return await apiRes.blob();
      case "json":
        return await apiRes.json();
      default:
        return await apiRes.text();
    }
  })();
  if (apiRes.ok) {
    return result;
  } else {
    throw await result;
  }
}

export async function clientSideRequest(
  endpoint: string,
  params: any,
  method: "GET" | "POST" | "DELETE" | "PUT" = "POST",
  type: "json" | "blob" | "text" | "arrayBuffer" = "json"
) {
  const apiRes = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (apiRes.ok) {
    const result = await (async () => {
      switch (type) {
        case "arrayBuffer":
          return await apiRes.arrayBuffer();
        case "blob":
          return await apiRes.blob();
        case "json":
          return await apiRes.json();
        default:
          return await apiRes.text();
      }
    })();
    return result;
  } else {
    const error = await apiRes.json();
    if (error && error.type === "NotAllowedException") {
      throw {
        redirect: true,
        ...error,
      };
    } else {
      throw error;
    }
  }
}
