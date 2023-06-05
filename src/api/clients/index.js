import qs from "qs";

const COHESIVE_HOST = "https://localhost:3000";

export const postMessage = async (message) => {
  const res = await queryCohesive({
    endpoint: "/api/v1/reply", 
    method: HttpMethod.POST,
    header: {},
    body: JSON.stringify({
      message
    })
  });
  if (res.ok) {
    const body = await res.json();
    return body;
  } else {
    throw await handleErrorResponse(res);
  }
}

export const applyQueryParams = ({
  endpoint,
  queryParams
}) => {
  const queryString = queryParams
  ? qs.stringify(queryParams, {
    encodeValuesOnly: true,
    indices: false
  })
  : ``;
  return `${endpoint}${!isEmpty(queryString) ? `?${queryString}` : ``}`;
}

const queryCohesive = ({
  endpoint,
  method,
  header,
  queryParams,
  body
}) => {
  const endpointWithQueryParams = applyQueryParams({
    endpoint,
    queryParams
  });
  const url = `${COHESIVE_HOST}${endpointWithQueryParams}`;
  const headers = {
    ...header
  };
  return fetch(url, {
    method,
    headers,
    body
  });
}