/**
* @fileoverview This script generates a user-path based breadcrumb navigation.
*/

// DOM
const breadcrumb = document.getElementById('breadcrumb');

// Variables
let pageOrder = []; // Stores the order of pages visited, because sessionStorage is not ordered

/**
 * Adds the current page location to the breadcrumb
 */
const addLocation = () => {
    const URL = window.location.href;
    const title = document.title;
    if (sessionStorage.getItem(title)) {
        removeCircle(title);
    }
    sessionStorage.setItem(title, URL);
    pageOrder.push(title);
    buildBreadcrumb();
};

/**
 * Builds the breadcrumb navigation based on the entries stored in sessionStorage
 */
const buildBreadcrumb = () => {
    breadcrumb.innerHTML = '';
    pageOrder.forEach(key => {
        const value = sessionStorage.getItem(key);
        const li = document.createElement('li');
        breadcrumb.appendChild(li);
        const a = document.createElement('a');
        a.href = value;
        a.textContent = key;
        li.appendChild(a);
    });
};

/**
 * Removes all entries from first to second appearance including of site
 * @param {string} title of site with more than one appearance
 */
const removeCircle = entry => {
    const index = pageOrder.indexOf(entry);
    if (index !== -1) {
        pageOrder = pageOrder.slice(0, index);
        Object.keys(sessionStorage).forEach(key => {
            if (!pageOrder.includes(key)) {
                sessionStorage.removeItem(key);
            }
        });
    }
};

// Event listeners
window.addEventListener('load', addLocation);





