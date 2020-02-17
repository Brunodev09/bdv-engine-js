"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sleep = /** @class */ (function () {
    function Sleep() {
    }
    Sleep.now = function (ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, ms);
        });
    };
    return Sleep;
}());
exports.default = Sleep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xlZXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvU2xlZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBUUEsQ0FBQztJQVBVLFNBQUcsR0FBRyxVQUFDLEVBQVU7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLFVBQVUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBO0lBQ0wsWUFBQztDQUFBLEFBUkQsSUFRQztrQkFSb0IsS0FBSyJ9