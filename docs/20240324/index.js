/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadInterface = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/20240316/interface.mjs");
});

Promise.all( [ loadInterface ] ).then(start, fail);

const DOM_PARSER = new DOMParser();
const XML_SERIALIZER = new XMLSerializer();

function start([ Interface ]) {
  try {
    const BODY = Interface.createBodyObject();
    const articleWindow = BODY.createAttached({
      objectId: Interface.OBJECT_HTML,
    });
    addSection();
    function newArticle() {
      const xmlDoc = document.implementation.createDocument(null, "article");
      const obj = {};
      obj.createSection() {
        const element = xmlDoc.createElement("section");
      }
      xmlDoc.createElement("link");
      xmlDoc.createElement("paragraph");
      return obj;
    }
    function open({
      blob,
    }) {
      const xmlDoc = DOM_PARSER.parseFromString({ type: "application/xml" });
    }
    function save({
      xml,
    }) {
      
    }
    
    function addSection() {
      const divSection = document.createElement("div");
      const divHeader = document.createElement("div");
      divSection.appendChild(divHeader);
      const divText = document.createElement("div");
      divSection.appendChild(divText);
      divHeader.contentEditable = true;
      divText.contentEditable = true;
      articleWindow.appendChild(divSection);
    }
  } catch (e) {
    console.error(e);
  }
}
