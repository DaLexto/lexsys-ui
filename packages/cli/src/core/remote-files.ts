export const fetchRemoteFile = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status}`);
  }

  return response.text();
};