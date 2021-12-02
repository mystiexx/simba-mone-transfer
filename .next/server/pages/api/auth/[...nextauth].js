"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers":
/*!**************************************!*\
  !*** external "next-auth/providers" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers");

/***/ }),

/***/ "./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers */ \"next-auth/providers\");\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nlet userAccount = null;\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\n\nconst authHandler = (req, res) => next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, configuration);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authHandler);\nconst configuration = {\n  cookie: {\n    secure:  true && false\n  },\n  session: {\n    jwt: true,\n    maxAge: 30 * 24 * 60 * 60\n  },\n  providers: [next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default().Credentials({\n    id: \"credentials\",\n    name: \"Login\",\n\n    async authorize(credentials) {\n      const user = await prisma.user.findUnique({\n        where: {\n          email: credentials.email\n        }\n      });\n\n      if (!user) {}\n\n      const checkPassword = await bcrypt__WEBPACK_IMPORTED_MODULE_2__.compareSync(credentials.password, user.password);\n\n      if (!checkPassword) {\n        console.error(\"Password doesnt match\");\n      }\n\n      userAccount = user;\n      return user;\n    }\n\n  })],\n  callbacks: {\n    async signIn(user, account, profile) {\n      if (typeof user.id !== typeof undefined) {\n        if (user.isActive === 1) {\n          return user;\n        } else {\n          return false;\n        }\n      } else {\n        return false;\n      }\n    },\n\n    async session(session, token) {\n      if (userAccount !== null) {\n        session.user = userAccount;\n      } else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined || typeof session.user !== typeof undefined && typeof session.user.id === typeof undefined)) {\n        session.user = token.user;\n      } else if (typeof token !== typeof undefined) {\n        session.token = token;\n      }\n\n      return session;\n    },\n\n    async jwt(token, user, account, profile, isNewUser) {\n      if (typeof user !== typeof undefined) {\n        token.user = user;\n      }\n\n      return token;\n    }\n\n  }\n}; // export default ( req, res ) => NextAuth(req, res, configuration)//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNIOztBQUNELGFBQU94QixPQUFQO0FBQ0gsS0ExQk07O0FBMkJQLFVBQU1DLEdBQU4sQ0FBVXVCLEtBQVYsRUFBaUJmLElBQWpCLEVBQXVCVyxPQUF2QixFQUFnQ0MsT0FBaEMsRUFBeUNJLFNBQXpDLEVBQW9EO0FBQ2hELFVBQUksT0FBT2hCLElBQVAsS0FBZ0IsT0FBT2EsU0FBM0IsRUFBc0M7QUFDbENFLFFBQUFBLEtBQUssQ0FBQ2YsSUFBTixHQUFhQSxJQUFiO0FBQ0g7O0FBQ0QsYUFBT2UsS0FBUDtBQUNIOztBQWhDTTtBQTdCTyxDQUF0QixFQWlFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NpbWJhLW1vbmV5LXRyYW5zZmVyLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz8yZThiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlIYW5kbGVyIH0gZnJvbSBcIm5leHRcIjtcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IFByb3ZpZGVycyBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVyc1wiO1xyXG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSBcImJjcnlwdFwiO1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmxldCB1c2VyQWNjb3VudCA9IG51bGw7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG5jb25zdCBhdXRoSGFuZGxlcjogTmV4dEFwaUhhbmRsZXIgPSAocmVxLCByZXMpID0+IE5leHRBdXRoKHJlcSwgcmVzLCBjb25maWd1cmF0aW9uKTtcclxuZXhwb3J0IGRlZmF1bHQgYXV0aEhhbmRsZXI7XHJcblxyXG5jb25zdCBjb25maWd1cmF0aW9uID0ge1xyXG4gICAgY29va2llOiB7XHJcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgc2Vzc2lvbjoge1xyXG4gICAgICAgIGp3dDogdHJ1ZSxcclxuICAgICAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLFxyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFByb3ZpZGVycy5DcmVkZW50aWFscyh7XHJcbiAgICAgICAgICAgIGlkOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiTG9naW5cIixcclxuICAgICAgICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlU3luYyhjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFzc3dvcmQgZG9lc250IG1hdGNoXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXNlckFjY291bnQgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgYXN5bmMgc2lnbkluKHVzZXIsIGFjY291bnQsIHByb2ZpbGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1c2VyLmlkICE9PSB0eXBlb2YgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlci5pc0FjdGl2ZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIHNlc3Npb24oc2Vzc2lvbiwgdG9rZW4pIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJBY2NvdW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIgPSB1c2VyQWNjb3VudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0b2tlbi51c2VyICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAodHlwZW9mIHNlc3Npb24udXNlciA9PT0gdHlwZW9mIHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2Ygc2Vzc2lvbi51c2VyICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzZXNzaW9uLnVzZXIuaWQgPT09IHR5cGVvZiB1bmRlZmluZWQpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlciA9IHRva2VuLnVzZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRva2VuICE9PSB0eXBlb2YgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBqd3QodG9rZW4sIHVzZXIsIGFjY291bnQsIHByb2ZpbGUsIGlzTmV3VXNlcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVzZXIgIT09IHR5cGVvZiB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0ICggcmVxLCByZXMgKSA9PiBOZXh0QXV0aChyZXEsIHJlcywgY29uZmlndXJhdGlvbilcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiUHJvdmlkZXJzIiwiYmNyeXB0IiwiUHJpc21hQ2xpZW50IiwidXNlckFjY291bnQiLCJwcmlzbWEiLCJhdXRoSGFuZGxlciIsInJlcSIsInJlcyIsImNvbmZpZ3VyYXRpb24iLCJjb29raWUiLCJzZWN1cmUiLCJzZXNzaW9uIiwiand0IiwibWF4QWdlIiwicHJvdmlkZXJzIiwiQ3JlZGVudGlhbHMiLCJpZCIsIm5hbWUiLCJhdXRob3JpemUiLCJjcmVkZW50aWFscyIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsImNoZWNrUGFzc3dvcmQiLCJjb21wYXJlU3luYyIsInBhc3N3b3JkIiwiY29uc29sZSIsImVycm9yIiwiY2FsbGJhY2tzIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJ1bmRlZmluZWQiLCJpc0FjdGl2ZSIsInRva2VuIiwiaXNOZXdVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();