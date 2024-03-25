/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadInterface = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/interface.mjs");
});

const loadMessaging = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/JsMessaging.mjs");
});

Promise.all( [ loadInterface, loadMessaging ] ).then(start, fail);

function start([ Interface, Messaging ]) {
  try {
    const BODY = Interface.createBodyObject();
    const webInterfaceIframe = document.createElement("iframe");
    webInterfaceIframe.style.visibility = "hidden";
    webInterfaceIframe.src = "https://scotwatson.github.io/WebInterface/index.html";
    webInterfaceIframe.contentWindow;
    document.body.appendChild(webInterfaceIframe);
  } catch (e) {
    console.error(e);
  }
}
