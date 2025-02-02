import { LoadingManager } from "three";

const loadManager = new LoadingManager();
loadManager.setURLModifier((url) => {
  // Check if the URL matches the dependent files (e.g., `.bin` files)
  if (url.endsWith(".bin") || url.endsWith(".jpg")) {
    // Rewrite the URL to point to the new endpoint
    return (
      import.meta.env.VITE_API_URL + "/api/sub-models/" + url.split("/").pop()
    );
  }
  return url; // Return unchanged for other files
});

export default loadManager;
