export const fetchRemoteRegistry = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Remote registry responded with HTTP ${response.status}`);
  }

  return response.json();
};