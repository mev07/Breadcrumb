// Initialize an array to store the user's path
let userPath = JSON.parse(sessionStorage.getItem('userPath')) || [];

// Function to update the breadcrumb and sessionStorage
function updateBreadcrumb() {

    // Get the breadcrumb ul-Element
    let breadcrumb = document.getElementById('breadcrumbUL');

    // Clear the current breadcrumb
    breadcrumb.innerHTML = '';

    // Build the new breadcrumb
    for (let i = 0; i < userPath.length; i++) {

        // Create a new list element for each link and add it
        let listElement = document.createElement('li');
        breadcrumb.appendChild(listElement);

        // Create a new link element for each page in the user's path
        let link = document.createElement('a');
        link.href = userPath[i].url;
        link.textContent = userPath[i].title;

        // Add the link to the list element
        listElement.appendChild(link);
    }

    // Store the userPath in sessionStorage
    sessionStorage.setItem('userPath', JSON.stringify(userPath));
}

function handleNavigation(event) {
    // Check if the new/current page is already in the user's path
    let pageIndex = userPath.findIndex(page => page.url === window.location.href);

    if (pageIndex !== -1) {
        // If the page is already in the user's path, remove it and all following pages
        userPath = userPath.slice(0, pageIndex + 1);
    } else {
        // Otherwise, add the new/current page to the user's path
        userPath.push({ "url": window.location.href, "title": document.title });
    }

    // Update the breadcrumb
    updateBreadcrumb();
}

// Listen for the popstate event, which is fired when the user navigates
window.addEventListener('popstate', handleNavigation);

// Add the current page to the user's path when the page loads
window.addEventListener('load', handleNavigation);



