// Define your routes
const routes: { [key: string]: string } = {
  "/": "Home content",
  "/about": "About content",
};

// Get the app element
const appDiv: HTMLElement | null = document.getElementById("body");

// Function to render the content

// function render(content: string): void {
//   if (appDiv) {
//     appDiv.innerHTML = content;
//   }
// }

// Function to handle navigation
function navigate(e: MouseEvent): void {
  if ((<HTMLElement>e.target).matches("[data-link]")) {
    e.preventDefault();
    navigateTo((<HTMLAnchorElement>e.target).href);
  }
}

// Function to navigate to a specific URL
function navigateTo(url: string): void {
  history.pushState("", "", url);
  if (appDiv) {
    appDiv.innerHTML = routes[window.location.hash] || "404 Not Found";
  }
}

// Listen for navigation events
window.addEventListener("popstate", () => {
  if (appDiv) {
    appDiv.innerHTML = routes[window.location.hash] || "404 Not Found";
  }
});
document.body.addEventListener("click", navigate);

// Navigate to the current route on initial load
navigateTo(window.location.href);
