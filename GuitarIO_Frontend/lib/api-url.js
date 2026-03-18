function getRequiredEnvVar(name, fallbackName) {
  const value = process.env[name] || (fallbackName ? process.env[fallbackName] : undefined);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}${fallbackName ? ` or ${fallbackName}` : ""}`);
  }

  return value;
}

function buildUrl(baseUrl, path) {
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(normalizedPath, normalizedBaseUrl).toString();
}

export function buildPublicApiUrl(path) {
  return buildUrl(getRequiredEnvVar("NEXT_PUBLIC_API_URL"), path);
}

export function buildPublicPythonApiUrl(path) {
  return buildUrl(getRequiredEnvVar("NEXT_PUBLIC_PYTHON_API_URL"), path);
}

export function buildServerApiUrl(path) {
  return buildUrl(getRequiredEnvVar("API_URL", "NEXT_PUBLIC_API_URL"), path);
}

export function buildServerPythonApiUrl(path) {
  return buildUrl(getRequiredEnvVar("PYTHON_API_URL", "NEXT_PUBLIC_PYTHON_API_URL"), path);
}