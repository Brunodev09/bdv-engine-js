"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../core/Model");
var Rectangle_1 = __importDefault(require("./Rectangle"));
var CollisionManager = /** @class */ (function () {
    function CollisionManager() {
    }
    CollisionManager.getCollisionType = function (model, a, b) {
        switch (model) {
            case Model_1.Model.RECTANGLE:
                return new Rectangle_1.default(a, b);
        }
    };
    return CollisionManager;
}());
exports.default = CollisionManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGlzaW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsaXNpb24vQ29sbGlzaW9uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFzQztBQUd0QywwREFBNkM7QUFFN0M7SUFBQTtJQU9BLENBQUM7SUFOVSxpQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBWSxFQUFFLENBQWEsRUFBRSxDQUFhO1FBQzlELFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxhQUFLLENBQUMsU0FBUztnQkFDaEIsT0FBTyxJQUFJLG1CQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFQRCxJQU9DIn0=