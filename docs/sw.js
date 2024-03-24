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

// only one manager should be created per message port
function RemoteCallManager({
  messageSender,
  messageReceiver,
}) {
  const messageIds = new Map();
  // returns a promise, so acts as an async function
  function call({
    functionName,
    args,
    transferable,
  }) {
    return new Promise(function (resolve, reject) {
      const messageId = self.crypto.randomUUID();
      messageIds.set(messageId, { resolve, reject });
      messageSender.send({
        action: "request",
        data: {
          id: messageId,
          functionName: functionName,
          args: args,
        },
        transferable: transferable,
      });
    });
  }
  messageReceiver.setHandler({
    action: "response",
    handler: responseHandler,
  });
  function responseHandler(data) {
    const functions = messageIds.get(data.id);
    if (functions !== undefined) {
      functions.resolve(data.response);
    }
  };
  messageReceiver.setHandler({
    action: "error",
    handler: errorHandler,
  });
  function errorHandler(data) {
    const functions = messageIds.get(data.id);
    if (functions !== undefined) {
      functions.reject(data.error);
    }
  };
}

function createMessageSenderForWindow({
  window,
  expectedUrl,
}) {
  const obj = {};
  obj.send = function ({
    action,
    args,
    transferable,
  }) {
    window.postMessage({}, expectedUrl, transferable);
  };
}
function createMessageSenderForWorker({
  worker,
}) {
  const obj = {};
  obj.send = function ({
    action,
    args,
    transferable,
  }) {
    worker.postMessage({
      action: action,
      args: args,
    }, transferable);
  };
}
function createMessageSenderForSharedWorker({
  sharedWorker,
}) {
  const obj = {};
  obj.send = function ({
    action,
    args,
    transferable,
  }) {
    sharedWorker.postMessage({
      action: action,
      args: args,
    }, transferable);
  };
}
// Only applicable for window
function createMessageSenderForServiceWorker({
  sharedWorker,
}) {
  const obj = {};
  obj.send = function ({
    action,
    args,
    transferable,
  }) {
    sharedWorker.postMessage({
      action: action,
      args: args,
    }, transferable);
  };
}
// 
function createMessageSenderForClient({
  client,
}) {
  const obj = {};
  obj.send = function ({
    action,
    args,
    transferable,
  }) {
    client.postMessage({
      action: action,
      args: args,
    }, transferable);
  };
}
// only one handler per action
function createMessageReceiver() {
  let obj = {};
  const handlers = new Map();
  obj.command = function ({
    action,
    data,
    transferable,
  }) {
    self.postMessage({
      action: action,
      data: data,
    }, transferable);
  };
  obj.setHandler = function ({
    action,
    handler,
  }) {
    handlers.set(action, handler);
  };
  self.addEventListener("message", function (evt) {
    if ((typeof evt.data === "object") && (evt.data !== null) && (typeof evt.data.action === "string")) {
      const handler = handlers.get(evt.data.action);
      handler(evt.data.data);
    } else {
      console.warn(evt.data);
    }
  });
  return obj;
}

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
