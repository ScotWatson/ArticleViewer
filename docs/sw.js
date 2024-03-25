/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
// Returns a Promise for a Client matching a given id.
self.clients.get();
// Returns a Promise for an array of Client objects. An options argument allows you to control the types of clients returned.
self.clients.matchAll();
// Opens a new browser window for a given URL and returns a Promise for the new WindowClient.
self.clients.openWindow();
// Allows an active service worker to set itself as the controller for all clients within its scope.
self.clients.claim();
*/

/*
self.registration
self.serviceWorker 
self.skipWaiting()
*/

self.addEventListener("activate", function (evt) {
  // fired when a ServiceWorkerRegistration acquires a new ServiceWorkerRegistration.active worker.
});
self.addEventListener("install", function (evt) {
  self.skipWaiting();
});

self.addEventListener("fetch", function (evt) {
  // fired in the service worker's global scope when the main app thread makes a network request
});

self.addEventListener("message", function (evt) {
  
});
self.addEventListener("messageerror", function (evt) {
  
});

self.addEventListener("notificationclick", function (evt) {
  
});
self.addEventListener("notificationclose", function (evt) {
  
});
self.addEventListener("push", function (evt) {
  
});
self.addEventListener("pushsubscriptionchange", function (evt) {
  
});
self.addEventListener("sync", function (evt) {
  
});


/*
Experimental

.cookieStore

"backgroundfetchabort"
"backgroundfetchclick"
"backgroundfetchfail"
"backgroundfetchsuccess"
"canmakepayment"
"contentdelete"
"cookiechange"
"paymentrequest"
"periodicsync"
*/
