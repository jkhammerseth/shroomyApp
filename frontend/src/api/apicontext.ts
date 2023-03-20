export const mushroomServerURL = "http://localhost:8000";
export const frontEndServerURL = "http://localhost:3000";

export const mushroomFetch = async ({
  endpoint,
  method = "GET",
  qs = {},
  body,
  contentType = "application/json",
}: {
  endpoint: string;
  method?: string;
  qs?: Record<string, any>;
  body?: BodyInit;
  headers?: any;
  contentType?: string;
}): Promise<any> => {
  const searchParams = new URLSearchParams(qs);
  const url = `${mushroomServerURL}/${endpoint}`;
  const response = await fetch(
    `${url}${
      searchParams.values.length == 0 ? "/" : "?"
    }${searchParams.toString()}`,
    {
      method: method,
      headers: {
        "Content-Type": contentType,
        "X-CSRFToken": "scNYw4KZUHpt4wFhGXarU64CmcgcZMIw",
      },
      body,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
