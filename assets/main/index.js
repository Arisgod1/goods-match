System.register("chunks:///_virtual/ArrayUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4ec22SiSCtIH5tIfhLB1ntc", "ArrayUtil", undefined);
      var ArrayUtil = exports('ArrayUtil', /*#__PURE__*/function () {
        function ArrayUtil() {}
        ArrayUtil.has = function has(array, v) {
          if (!array) return false;
          if (array.length <= 0) return false;
          return array.indexOf(v) != -1;
        };
        ArrayUtil.shuffle = function shuffle(array) {
          if (!array || array.length <= 1) return;
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
          }
        };
        ArrayUtil.remove = function remove(array, v) {
          if (!array) return false;
          if (array.length <= 0) return false;
          var idx = array.indexOf(v);
          if (idx === -1) return false;
          array.splice(idx, 1);
        };
        ArrayUtil.removeMultiIdx = function removeMultiIdx(arr, indices) {
          if (!indices) return arr;
          if (indices.length <= 0) return arr;
          var result = [];
          var removedIndices = new Set(indices);
          for (var i = 0; i < arr.length; i++) {
            if (!removedIndices.has(i)) {
              result.push(arr[i]);
            }
          }
          return result;
        };
        ArrayUtil.pickItem = function pickItem(array) {
          if (!array) return null;
          if (array.length <= 0) return null;
          var idx = Math.floor(Math.random() * array.length);
          return array[idx];
        };
        ArrayUtil.pickIndex = function pickIndex(array) {
          if (!array) return null;
          if (array.length <= 0) return null;
          var idx = Math.floor(Math.random() * array.length);
          return idx;
        };
        ArrayUtil.pickItems = function pickItems(array, cnt, diff) {
          if (diff === void 0) {
            diff = false;
          }
          if (!array) return null;
          if (array.length <= 0) return null;
          var res = [];
          if (!diff) {
            for (var i = 0; i < cnt; i++) {
              var item = this.pickItem(array);
              res.push(item);
            }
            return res;
          } else {
            var arr = [].concat(array);
            for (var _i = 0; _i < cnt; _i++) {
              var idx = this.pickIndex(arr);
              var _item = arr[idx];
              res.push(_item);
              arr.splice(idx, 1);
              if (arr.length <= 0) break;
            }
            return res;
          }
        };
        ArrayUtil.pickIndexs = function pickIndexs(array, cnt, diff) {
          if (diff === void 0) {
            diff = false;
          }
          if (!array) return null;
          if (array.length <= 0) return null;
          var res = [];
          if (!diff) {
            for (var i = 0; i < cnt; i++) {
              var idx = this.pickIndex(array);
              res.push(idx);
            }
            return res;
          } else {
            var arr = [].concat(array);
            for (var _i2 = 0; _i2 < cnt; _i2++) {
              var _idx = this.pickIndex(arr);
              res.push(_idx);
              arr.splice(_idx, 1);
              if (arr.length <= 0) break;
            }
            return res;
          }
        };
        ArrayUtil.removeSame = function removeSame(arr, minCnt, compareFunc) {
          if (!compareFunc) {
            compareFunc = function compareFunc(a, b) {
              return a === b;
            };
          }
          var removeIdxArr = [];
          var indices = [];
          var sameCnt = 1;
          for (var i = 1; i < arr.length; i++) {
            var isSame = compareFunc(arr[i], arr[i - 1]);
            if (isSame) {
              sameCnt++;
              if (sameCnt >= minCnt) {
                var idxArr = [];
                removeIdxArr.push(idxArr);
                for (var j = 0; j < minCnt; j++) {
                  var idx = i + j - sameCnt + 1;
                  idxArr.push(idx);
                  indices.push(idx);
                }
              }
            } else {
              sameCnt = 1;
            }
          }
          arr = this.removeMultiIdx(arr, indices);
          return {
            removeIdxArr: removeIdxArr,
            arr: arr
          };
        };
        ArrayUtil.isAllSame = function isAllSame(arr, property) {
          if (property) return arr.every(function (val) {
            return val[property] === arr[0][property];
          });else return arr.every(function (val) {
            return val === arr[0];
          });
        };
        return ArrayUtil;
      }());
      globalThis.ArrayUtil = ArrayUtil;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Debug.ts', './ResMgr.ts', './Setting.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, AudioSource, game, Game, Component, Debug, ResMgr, Setting;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      game = module.game;
      Game = module.Game;
      Component = module.Component;
    }, function (module) {
      Debug = module.Debug;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Setting = module.Setting;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2;
      cclegacy._RF.push({}, "79432KzY8JGh7M/c0pay+I1", "AudioMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var Tag = 'AudioMgr';

      //需要手动拖放到场景中
      var AudioMgr = exports('AudioMgr', (_dec = ccclass('Manager/AudioMgr'), _dec2 = requireComponent(AudioSource), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioMgr, _Component);
        function AudioMgr() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = AudioMgr.prototype;
        _proto.onLoad = function onLoad() {
          globalThis.AudioMgr = AudioMgr;
          AudioMgr.audio = this.getComponent(AudioSource);
          game.on(Game.EVENT_HIDE, this.onHide, this);
          game.on(Game.EVENT_SHOW, this.onShow, this);
        };
        _proto.onHide = function onHide() {
          AudioMgr.pauseBgm();
          Debug.Log(Tag, '进入后台');
        };
        _proto.onShow = function onShow() {
          AudioMgr.resumeBgm();
          Debug.Log(Tag, '回到前台');
        };
        AudioMgr.playBgm = function playBgm(bgm, volume, loop) {
          if (volume === void 0) {
            volume = 1;
          }
          if (loop === void 0) {
            loop = true;
          }
          if (bgm) this.curBgm = bgm;
          if (!Setting.BgmEnabled) return;
          var clip = ResMgr.getRes(this.bundleName, this.curBgm);
          if (!clip) return;
          this.audio.stop();
          this.audio.clip = clip;
          this.audio.loop = loop;
          this.audio.volume = volume;
          this.audio.play();
        };
        AudioMgr.pauseBgm = function pauseBgm() {
          Setting.BgmEnabled && this.audio.pause();
        };
        AudioMgr.resumeBgm = function resumeBgm() {
          Setting.BgmEnabled && this.audio.play();
        };
        AudioMgr.stopBgm = function stopBgm() {
          this.audio.stop();
          this.audio.clip = null;
        };
        AudioMgr.playSfx = function playSfx(sfxName, volumeScale) {
          if (volumeScale === void 0) {
            volumeScale = 1;
          }
          if (!Setting.SfxEnabled) return;
          var clip = ResMgr.getRes(this.bundleName, sfxName);
          if (!clip) return;
          this.audio.playOneShot(clip, volumeScale);
        };
        _createClass(AudioMgr, null, [{
          key: "Audio",
          get: function get() {
            return this.audio;
          }
        }, {
          key: "CurBgm",
          get: function get() {
            return this.curBgm;
          }
        }]);
        return AudioMgr;
      }(Component), _class2.audio = void 0, _class2.curBgm = null, _class2.bundleName = 'audio', _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardLayout.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, UITransform, v3;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransform = module.UITransform;
      v3 = module.v3;
    }],
    execute: function () {
      exports({
        boundsInSpace: boundsInSpace,
        fitBoard: fitBoard,
        needsPortraitFrame: needsPortraitFrame
      });
      cclegacy._RF.push({}, "9dbeaZIJelOvqqzCxidFVcN", "BoardLayout", undefined);
      // Below this height fixed-size HUD regions consume the entire play area.
      function needsPortraitFrame(width, height) {
        return width > 0 && height > 0 && height / width * 720 < 960;
      }

      /** All values use Stage local design coordinates. Never enlarge the board. */
      function fitBoard(width, height, area, preferredY) {
        if (preferredY === void 0) {
          preferredY = 100;
        }
        var availableWidth = Math.max(0, area.right - area.left);
        var availableHeight = Math.max(0, area.top - area.bottom);
        var scale = width > 0 && height > 0 ? Math.min(1, availableWidth / width, availableHeight / height) : 0;
        var halfHeight = height * scale / 2;
        return {
          scale: scale,
          x: (area.left + area.right) / 2,
          y: Math.max(area.bottom + halfHeight, Math.min(preferredY, area.top - halfHeight))
        };
      }

      /** Includes inactive HUD elements so counters/combos appearing cannot move the board.
       * Peak scales reserve space for animations even while those animations are at rest. */
      function boundsInSpace(root, space, peaks) {
        if (peaks === void 0) {
          peaks = new Map();
        }
        var bounds = {
          left: Infinity,
          right: -Infinity,
          bottom: Infinity,
          top: -Infinity
        };
        var visit = function visit(node) {
          var transform = node.getComponent(UITransform);
          if (transform) {
            for (var _i = 0, _arr = [-transform.width * transform.anchorX, transform.width * (1 - transform.anchorX)]; _i < _arr.length; _i++) {
              var x = _arr[_i];
              for (var _i2 = 0, _arr2 = [-transform.height * transform.anchorY, transform.height * (1 - transform.anchorY)]; _i2 < _arr2.length; _i2++) {
                var y = _arr2[_i2];
                var point = transform.convertToWorldSpaceAR(v3(x, y, 0));
                // Compensate current animated scale, including descendants of buttons.
                for (var parent = node; parent; parent = parent.parent) {
                  var peak = peaks.get(parent);
                  if (peak) {
                    var origin = parent.worldPosition;
                    var sx = peak / Math.max(Math.abs(parent.scale.x), 0.001);
                    var sy = peak / Math.max(Math.abs(parent.scale.y), 0.001);
                    point.x = origin.x + (point.x - origin.x) * sx;
                    point.y = origin.y + (point.y - origin.y) * sy;
                  }
                  if (parent === root) break;
                }
                var local = space.convertToNodeSpaceAR(point);
                bounds.left = Math.min(bounds.left, local.x);
                bounds.right = Math.max(bounds.right, local.x);
                bounds.bottom = Math.min(bounds.bottom, local.y);
                bounds.top = Math.max(bounds.top, local.y);
              }
            }
          }
          for (var _iterator = _createForOfIteratorHelperLoose(node.children), _step; !(_step = _iterator()).done;) {
            var child = _step.value;
            visit(child);
          }
        };
        visit(root);
        return bounds;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Breath.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, tween, v3, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9d4c9kNag1CYLOnxCSHLbtq", "Breath", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Breath = exports('Breath', (_dec = ccclass('Misc/Breath'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Breath, _Component);
        function Breath() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.tw = null;
          return _this;
        }
        var _proto = Breath.prototype;
        _proto.onEnable = function onEnable() {
          this.tw = tween(this.node);
          this.tw.to(0.75, {
            scale: v3(1.1, 1.1, 1)
          }).to(0.75, {
            scale: v3(1, 1, 1)
          }).union().repeatForever().start();
        };
        _proto.onDisable = function onDisable() {
          this.node.scale = v3(1, 1, 1);
          this.tw.stop();
          this.tw = null;
        };
        return Breath;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BtnExtend.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts', './EventType.ts', './UIMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Node, Component, AudioMgr, EventType, UIMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      UIMgr = module.UIMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "e858boYmuRNtaUbAZS8rSGo", "BtnExtend", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        disallowMultiple = _decorator.disallowMultiple,
        requireComponent = _decorator.requireComponent;
      var BtnExtend = exports('BtnExtend', (_dec = ccclass('UIExtend/BtnExtend'), _dec2 = disallowMultiple(true), _dec3 = requireComponent(Button), _dec4 = property({
        range: [0, 1, 0.1],
        slide: true
      }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BtnExtend, _Component);
        function BtnExtend() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "safeTime", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "zoomScale", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "clickSfx", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "openUI", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeUI", _descriptor5, _assertThisInitialized(_this));
          _this.btn = null;
          _this.clickEvents = void 0;
          _this.isSafe = true;
          return _this;
        }
        var _proto = BtnExtend.prototype;
        _proto.onLoad = function onLoad() {
          this.btn = this.getComponent(Button);
          this.btn.zoomScale = this.zoomScale;
          this.btn.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.btn.node.on(EventType.Click, this.onClick, this);
        };
        _proto.onTouchStart = function onTouchStart() {
          this.handleClickSfx();
        };
        _proto.onClick = function onClick() {
          this.handleSafe();
          if (this.openUI) UIMgr.open(this.openUI);
          if (this.closeUI) UIMgr.close(this.closeUI);
        };
        _proto.handleSafe = function handleSafe() {
          var _this2 = this;
          if (!this.isSafe) return;
          this.isSafe = false;
          this.clickEvents = this.btn.clickEvents;
          this.btn.clickEvents = [];
          this.scheduleOnce(function () {
            _this2.isSafe = true;
            _this2.btn.clickEvents = _this2.clickEvents;
          }, this.safeTime);
        };
        _proto.handleClickSfx = function handleClickSfx() {
          this.clickSfx && AudioMgr.playSfx(this.clickSfx);
        };
        return BtnExtend;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "safeTime", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "zoomScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clickSfx", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'btnClick';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "openUI", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "closeUI", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bundle.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "105baVpUGlOC7EYBCfoZ7kt", "Bundle", undefined);
      var Bundle = exports('Bundle', /*#__PURE__*/function (Bundle) {
        Bundle["Resources"] = "resources";
        Bundle["UI"] = "ui";
        Bundle["Game"] = "game";
        Bundle["Level"] = "level";
        Bundle["Font"] = "font";
        Bundle["Audio"] = "audio";
        Bundle["Icon"] = "icon";
        return Bundle;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cfg_icon.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "032eaaUB05H+6HPhAqADpKu", "cfg_icon", undefined);
      var cfg_icon_tp = exports('cfg_icon_tp', [{
        id: 1,
        icon: "tp1"
      }, {
        id: 2,
        icon: "tp2"
      }, {
        id: 3,
        icon: "tp3"
      }, {
        id: 4,
        icon: "tp4"
      }, {
        id: 5,
        icon: "tp5"
      }, {
        id: 6,
        icon: "tp6"
      }, {
        id: 7,
        icon: "tp7"
      }, {
        id: 8,
        icon: "tp8"
      }, {
        id: 9,
        icon: "tp9"
      }, {
        id: 10,
        icon: "tp10"
      }, {
        id: 11,
        icon: "tp11"
      }, {
        id: 12,
        icon: "tp12"
      }, {
        id: 13,
        icon: "tp13"
      }, {
        id: 14,
        icon: "tp14"
      }, {
        id: 15,
        icon: "tp15"
      }, {
        id: 16,
        icon: "tp16"
      }, {
        id: 17,
        icon: "tp17"
      }, {
        id: 18,
        icon: "tp18"
      }, {
        id: 19,
        icon: "tp19"
      }, {
        id: 20,
        icon: "tp20"
      }, {
        id: 21,
        icon: "tp21"
      }, {
        id: 22,
        icon: "tp22"
      }, {
        id: 23,
        icon: "tp23"
      }, {
        id: 24,
        icon: "tp24"
      }, {
        id: 25,
        icon: "tp25"
      }, {
        id: 26,
        icon: "tp26"
      }, {
        id: 27,
        icon: "tp27"
      }, {
        id: 28,
        icon: "tp28"
      }, {
        id: 29,
        icon: "tp29"
      }, {
        id: 30,
        icon: "tp30"
      }, {
        id: 31,
        icon: "tp31"
      }, {
        id: 32,
        icon: "tp32"
      }, {
        id: 33,
        icon: "tp33"
      }, {
        id: 34,
        icon: "tp34"
      }, {
        id: 35,
        icon: "tp35"
      }, {
        id: 36,
        icon: "tp36"
      }, {
        id: 37,
        icon: "tp37"
      }]);
      var cfg_icon_gs = exports('cfg_icon_gs', [{
        id: 1,
        icon: "gs1"
      }, {
        id: 2,
        icon: "gs2"
      }, {
        id: 3,
        icon: "gs3"
      }, {
        id: 4,
        icon: "gs4"
      }, {
        id: 5,
        icon: "gs5"
      }, {
        id: 6,
        icon: "gs6"
      }, {
        id: 7,
        icon: "gs7"
      }, {
        id: 8,
        icon: "gs8"
      }, {
        id: 9,
        icon: "gs9"
      }, {
        id: 10,
        icon: "gs10"
      }, {
        id: 11,
        icon: "gs11"
      }, {
        id: 12,
        icon: "gs12"
      }, {
        id: 13,
        icon: "gs13"
      }, {
        id: 14,
        icon: "gs14"
      }, {
        id: 15,
        icon: "gs15"
      }, {
        id: 16,
        icon: "gs16"
      }, {
        id: 17,
        icon: "gs17"
      }, {
        id: 18,
        icon: "gs18"
      }, {
        id: 19,
        icon: "gs19"
      }, {
        id: 20,
        icon: "gs20"
      }, {
        id: 21,
        icon: "gs21"
      }, {
        id: 22,
        icon: "gs22"
      }, {
        id: 23,
        icon: "gs23"
      }, {
        id: 24,
        icon: "gs24"
      }, {
        id: 25,
        icon: "gs25"
      }, {
        id: 26,
        icon: "gs26"
      }, {
        id: 27,
        icon: "gs27"
      }, {
        id: 28,
        icon: "gs28"
      }, {
        id: 29,
        icon: "gs29"
      }, {
        id: 30,
        icon: "gs30"
      }, {
        id: 31,
        icon: "gs31"
      }, {
        id: 32,
        icon: "gs32"
      }, {
        id: 33,
        icon: "gs33"
      }, {
        id: 34,
        icon: "gs34"
      }, {
        id: 35,
        icon: "gs35"
      }, {
        id: 36,
        icon: "gs36"
      }, {
        id: 37,
        icon: "gs37"
      }, {
        id: 38,
        icon: "gs38"
      }, {
        id: 39,
        icon: "gs39"
      }]);
      var cfg_icon_ls = exports('cfg_icon_ls', [{
        id: 1,
        icon: "ls1"
      }, {
        id: 2,
        icon: "ls2"
      }, {
        id: 3,
        icon: "ls3"
      }, {
        id: 4,
        icon: "ls4"
      }, {
        id: 5,
        icon: "ls5"
      }, {
        id: 6,
        icon: "ls6"
      }, {
        id: 7,
        icon: "ls7"
      }, {
        id: 8,
        icon: "ls8"
      }, {
        id: 9,
        icon: "ls9"
      }, {
        id: 10,
        icon: "ls10"
      }, {
        id: 11,
        icon: "ls11"
      }, {
        id: 12,
        icon: "ls12"
      }, {
        id: 13,
        icon: "ls13"
      }, {
        id: 14,
        icon: "ls14"
      }, {
        id: 15,
        icon: "ls15"
      }, {
        id: 16,
        icon: "ls16"
      }, {
        id: 17,
        icon: "ls17"
      }, {
        id: 18,
        icon: "ls18"
      }, {
        id: 19,
        icon: "ls19"
      }, {
        id: 20,
        icon: "ls20"
      }, {
        id: 21,
        icon: "ls21"
      }, {
        id: 22,
        icon: "ls22"
      }, {
        id: 23,
        icon: "ls23"
      }, {
        id: 24,
        icon: "ls24"
      }, {
        id: 25,
        icon: "ls25"
      }, {
        id: 26,
        icon: "ls26"
      }, {
        id: 27,
        icon: "ls27"
      }, {
        id: 28,
        icon: "ls28"
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cfg_level.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "589e3TdcuNGWZgjWDycD6B7", "cfg_level", undefined);
      var cfg_level_gs = exports('cfg_level_gs', [{
        id: 1,
        group: 4,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[0, 1, 1], [1, 0, 1], [1, 1, 0]]
      }, {
        id: 2,
        group: 15,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 3,
        group: 25,
        time: 250,
        GoodsTypeCnt: 11,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 4,
        group: 50,
        time: 270,
        GoodsTypeCnt: 11,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1]]
      }, {
        id: 5,
        group: 55,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 6,
        group: 41,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 1,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 7,
        group: 46,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 8,
        group: 51,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 9,
        group: 56,
        time: 300,
        GoodsTypeCnt: 14,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [0, 1, 1], [0, 1, 1], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 10,
        group: 65,
        time: 300,
        GoodsTypeCnt: 15,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 11,
        group: 66,
        time: 280,
        GoodsTypeCnt: 21,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 12,
        group: 71,
        time: 300,
        GoodsTypeCnt: 22,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 13,
        group: 76,
        time: 315,
        GoodsTypeCnt: 23,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [1, 1, 0], [1, 1, 0], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 14,
        group: 81,
        time: 335,
        GoodsTypeCnt: 24,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 0], [0, 1, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 15,
        group: 96,
        time: 390,
        GoodsTypeCnt: 25,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 16,
        group: 91,
        time: 375,
        GoodsTypeCnt: 26,
        lockCnt: 0,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 17,
        group: 96,
        time: 400,
        GoodsTypeCnt: 27,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 18,
        group: 101,
        time: 420,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 19,
        group: 100,
        time: 410,
        GoodsTypeCnt: 29,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [0, 1, 1], [0, 1, 1], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 20,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 21,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 3,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 22,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 23,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[1, 0, 1], [0, 1, 0], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 24,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 1], [0, 1, 1], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 25,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 26,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 27,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 28,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 29,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 30,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 31,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [0, 1, 1]]
      }, {
        id: 32,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]]
      }, {
        id: 33,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 34,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 35,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1]]
      }]);
      var cfg_level_tp = exports('cfg_level_tp', [{
        id: 1,
        group: 4,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
      }, {
        id: 2,
        group: 15,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 0, 1]]
      }, {
        id: 3,
        group: 25,
        time: 250,
        GoodsTypeCnt: 11,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 4,
        group: 50,
        time: 270,
        GoodsTypeCnt: 11,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 5,
        group: 55,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 0]]
      }, {
        id: 6,
        group: 41,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 7,
        group: 46,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 8,
        group: 51,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 0]]
      }, {
        id: 9,
        group: 56,
        time: 300,
        GoodsTypeCnt: 14,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 10,
        group: 65,
        time: 300,
        GoodsTypeCnt: 15,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 11,
        group: 66,
        time: 280,
        GoodsTypeCnt: 21,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 12,
        group: 71,
        time: 300,
        GoodsTypeCnt: 22,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 13,
        group: 76,
        time: 315,
        GoodsTypeCnt: 23,
        lockCnt: 3,
        shelveMap: [[1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 14,
        group: 81,
        time: 335,
        GoodsTypeCnt: 24,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 1], [0, 1, 0], [1, 1, 1]]
      }, {
        id: 15,
        group: 96,
        time: 390,
        GoodsTypeCnt: 25,
        lockCnt: 4,
        shelveMap: [[0, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0]]
      }, {
        id: 16,
        group: 91,
        time: 375,
        GoodsTypeCnt: 26,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [0, 1, 1]]
      }, {
        id: 17,
        group: 96,
        time: 400,
        GoodsTypeCnt: 27,
        lockCnt: 1,
        shelveMap: [[1, 1, 0], [1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 1], [0, 1, 1]]
      }, {
        id: 18,
        group: 101,
        time: 420,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 19,
        group: 100,
        time: 410,
        GoodsTypeCnt: 29,
        lockCnt: 4,
        shelveMap: [[1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 0, 1]]
      }, {
        id: 20,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 5,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 21,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 22,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 3,
        shelveMap: [[0, 1, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 0]]
      }, {
        id: 23,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 24,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 25,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 0, 1], [1, 1, 1], [0, 1, 0], [0, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 26,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 27,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [0, 0, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 28,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 29,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 1]]
      }, {
        id: 30,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[0, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 31,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 1,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 32,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 0, 0]]
      }, {
        id: 33,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 34,
        group: 100,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 35,
        group: 105,
        time: 410,
        GoodsTypeCnt: 30,
        lockCnt: 4,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, 1], [0, 1, 1]]
      }]);
      var cfg_level_ls = exports('cfg_level_ls', [{
        id: 1,
        group: 4,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[0, 1, 1], [1, 2, 1], [1, 1, 0]]
      }, {
        id: 2,
        group: 15,
        time: 210,
        GoodsTypeCnt: 10,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 2, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 2, 1]]
      }, {
        id: 3,
        group: 25,
        time: 250,
        GoodsTypeCnt: 11,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 4,
        group: 50,
        time: 270,
        GoodsTypeCnt: 11,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 2, 1], [1, 0, 1], [1, 0, 1]]
      }, {
        id: 5,
        group: 55,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 2,
        shelveMap: [[2, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 2], [1, 0, 1], [2, 1, 1]]
      }, {
        id: 6,
        group: 41,
        time: 300,
        GoodsTypeCnt: 12,
        lockCnt: 1,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 7,
        group: 46,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 2, 1], [1, 2, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 8,
        group: 51,
        time: 300,
        GoodsTypeCnt: 13,
        lockCnt: 3,
        shelveMap: [[1, 2, 1], [0, 1, 0], [1, 1, 1], [1, 2, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 9,
        group: 56,
        time: 300,
        GoodsTypeCnt: 14,
        lockCnt: 2,
        shelveMap: [[1, 2, 1], [0, 1, 1], [0, 1, 1], [1, 2, 0], [1, 1, 0], [1, 2, 1]]
      }, {
        id: 10,
        group: 65,
        time: 300,
        GoodsTypeCnt: 15,
        lockCnt: 3,
        shelveMap: [[1, 0, 1], [1, 2, 1], [1, 0, 1], [1, 2, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 11,
        group: 66,
        time: 280,
        GoodsTypeCnt: 21,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 2, 1], [1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 12,
        group: 71,
        time: 300,
        GoodsTypeCnt: 22,
        lockCnt: 1,
        shelveMap: [[1, 0, 1], [2, 1, 2], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 13,
        group: 76,
        time: 315,
        GoodsTypeCnt: 23,
        lockCnt: 3,
        shelveMap: [[1, 1, 2], [1, 1, 0], [1, 1, 0], [2, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 14,
        group: 81,
        time: 335,
        GoodsTypeCnt: 24,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 2, 0], [0, 1, 0], [0, 2, 0], [1, 1, 1], [1, 2, 1]]
      }, {
        id: 15,
        group: 96,
        time: 390,
        GoodsTypeCnt: 25,
        lockCnt: 3,
        shelveMap: [[0, 1, 1], [0, 1, 1], [1, 2, 0], [1, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 16,
        group: 91,
        time: 375,
        GoodsTypeCnt: 26,
        lockCnt: 0,
        shelveMap: [[0, 0, 0], [1, 2, 1], [1, 0, 1], [2, 0, 2], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 17,
        group: 96,
        time: 400,
        GoodsTypeCnt: 27,
        lockCnt: 1,
        shelveMap: [[1, 2, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 2, 1]]
      }, {
        id: 18,
        group: 101,
        time: 420,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 19,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 3,
        shelveMap: [[1, 1, 1], [0, 2, 1], [0, 2, 1], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 20,
        group: 105,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 1,
        shelveMap: [[1, 1, 1], [1, 0, 1], [1, 2, 1], [1, 0, 1], [1, 2, 1], [1, 1, 1]]
      }, {
        id: 21,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 3,
        shelveMap: [[0, 0, 0], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 2, 1], [1, 1, 1]]
      }, {
        id: 22,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [2, 0, 2], [1, 0, 1], [1, 0, 1], [1, 2, 1], [1, 1, 1]]
      }, {
        id: 23,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 1,
        shelveMap: [[1, 0, 1], [0, 1, 0], [1, 2, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 24,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 1, 1], [0, 1, 1], [1, 1, 0], [1, 1, 0], [1, 1, 1]]
      }, {
        id: 25,
        group: 105,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 3,
        shelveMap: [[1, 0, 1], [1, 0, 1], [1, 2, 1], [1, 2, 1], [1, 0, 1], [1, 0, 1]]
      }, {
        id: 26,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 1,
        shelveMap: [[0, 0, 1], [1, 2, 1], [1, 1, 1], [1, 1, 1], [1, 2, 1], [1, 0, 0]]
      }, {
        id: 27,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [0, 1, 1], [1, 1, 2], [2, 1, 2], [0, 1, 1], [1, 0, 1]]
      }, {
        id: 28,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [1, 1, 0], [0, 1, 1], [1, 1, 0], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 29,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 2,
        shelveMap: [[1, 1, 1], [1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 30,
        group: 105,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 3,
        shelveMap: [[1, 0, 1], [1, 1, 2], [1, 0, 2], [2, 0, 1], [2, 0, 1], [1, 1, 1]]
      }, {
        id: 31,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 1,
        shelveMap: [[1, 1, 0], [0, 2, 0], [1, 1, 1], [1, 1, 0], [0, 2, 1], [0, 1, 1]]
      }, {
        id: 32,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[1, 1, 1], [0, 2, 1], [1, 2, 0], [0, 1, 1], [1, 2, 1], [1, 1, 0]]
      }, {
        id: 33,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 2,
        shelveMap: [[1, 0, 1], [1, 0, 1], [1, 2, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]]
      }, {
        id: 34,
        group: 100,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 0,
        shelveMap: [[0, 2, 0], [2, 0, 2], [1, 2, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
      }, {
        id: 35,
        group: 105,
        time: 410,
        GoodsTypeCnt: 28,
        lockCnt: 4,
        shelveMap: [[1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 0, 1], [0, 2, 0], [1, 0, 1]]
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cfg_passReward.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d2576gg+39CgpNSYy24NLn8", "cfg_passReward", undefined);
      var CfgPassReward = exports('CfgPassReward', [{
        id: 0,
        itemId: 0,
        cnt: 100,
        weight: 30
      }, {
        id: 1,
        itemId: 0,
        cnt: 200,
        weight: 20
      }, {
        id: 2,
        itemId: 1,
        cnt: 1,
        weight: 10
      }, {
        id: 3,
        itemId: 2,
        cnt: 1,
        weight: 15
      }, {
        id: 4,
        itemId: 3,
        cnt: 1,
        weight: 15
      }, {
        id: 5,
        itemId: 4,
        cnt: 1,
        weight: 10
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CfgCombo.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "060b37UrIZGjLWVUacodUnI", "CfgCombo", undefined);
      var CfgCombo = exports('CfgCombo', [{
        id: 0,
        durarion: -1,
        icon: ''
      }, {
        id: 1,
        durarion: 8,
        icon: ''
      }, {
        id: 2,
        durarion: 7,
        icon: ''
      }, {
        id: 3,
        durarion: 6,
        icon: ''
      }, {
        id: 4,
        durarion: 5,
        icon: 'image/pl'
      }, {
        id: 5,
        durarion: 4,
        icon: 'image/zb'
      }, {
        id: 6,
        durarion: 3,
        icon: 'image/wm'
      }, {
        id: 7,
        durarion: 2,
        icon: 'image/hjc'
      }, {
        id: 8,
        durarion: 1,
        icon: 'image/csl'
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CfgItem.ts", ['cc', './Bundle.ts', './ItemType.ts', './SkillType.ts'], function (exports) {
  var cclegacy, Bundle, ItemType, SkillType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      ItemType = module.ItemType;
    }, function (module) {
      SkillType = module.SkillType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2ef25I11RRIUrJ+H0hYm0Ro", "CfgItem", undefined);
      var CfgItem = exports('CfgItem', [{
        id: 0,
        name: '星星币',
        type: ItemType.Coin,
        bundle: Bundle.Icon,
        icon: 'item/icon_xxb'
      }, {
        id: 1,
        name: '冰冻道具',
        type: ItemType.Skill,
        skillType: SkillType.FreezeTime,
        bundle: Bundle.Icon,
        icon: 'item/icon_bd'
      }, {
        id: 2,
        name: '灯泡道具',
        type: ItemType.Skill,
        skillType: SkillType.EraseGroup,
        bundle: Bundle.Icon,
        icon: 'item/icon_dp'
      }, {
        id: 3,
        name: '转换道具',
        type: ItemType.Skill,
        skillType: SkillType.RefreshPosition,
        bundle: Bundle.Icon,
        icon: 'item/icon_sx'
      }, {
        id: 4,
        name: '星星道具',
        type: ItemType.Skill,
        skillType: SkillType.DoubleCoin,
        bundle: Bundle.Icon,
        icon: 'item/icon_xxx2'
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CfgLoginReward.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a7a37hutLVCuY7vo6dP1uSM", "CfgLoginReward", undefined);
      var CfgLoginReward = exports('CfgLoginReward', [{
        id: 0,
        itemId: 0,
        cnt: 100
      }, {
        id: 1,
        itemId: 1,
        cnt: 1
      }, {
        id: 2,
        itemId: 2,
        cnt: 1
      }, {
        id: 3,
        itemId: 3,
        cnt: 1
      }, {
        id: 4,
        itemId: 4,
        cnt: 1
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CfgLuckySpin.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ed4fct49zJCbqBkrPRyAKAX", "CfgLuckySpin", undefined);
      var CfgLuckySpin = exports('CfgLuckySpin', [{
        id: 0,
        itemId: 3,
        cnt: 1
      }, {
        id: 1,
        itemId: 0,
        cnt: 400
      }, {
        id: 2,
        itemId: 4,
        cnt: 1
      }, {
        id: 3,
        itemId: 0,
        cnt: 200
      }, {
        id: 4,
        itemId: 1,
        cnt: 1
      }, {
        id: 5,
        itemId: 2,
        cnt: 1
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CfgSkillInfo.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "25e99peI09FgoTilgJMTZp7", "CfgSkillInfo", undefined);
      var CfgSkillInfo = exports('CfgSkillInfo', [{
        id: 0,
        name: '冰冻道具',
        desc: '冰冻时间20秒',
        icon: 'item/icon_bd'
      }, {
        id: 1,
        name: '灯泡道具',
        desc: '立即消除三组物品',
        icon: 'item/icon_dp'
      }, {
        id: 2,
        name: '转换道具',
        desc: '重置所有物品的位置',
        icon: 'item/icon_sx'
      }, {
        id: 3,
        name: '星星道具',
        desc: '获得星星双倍30秒',
        icon: 'item/icon_xxx2'
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoinItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bundle.ts', './EventType.ts', './AudioMgr.ts', './EventMgr.ts', './ResMgr.ts', './LabelTick.ts', './CoinMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, math, tween, v3, Node, Sprite, Component, Bundle, EventType, AudioMgr, EventMgr, ResMgr, LabelTick, CoinMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      tween = module.tween;
      v3 = module.v3;
      Node = module.Node;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      LabelTick = module.LabelTick;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "c3b43fuycJEPLI1Et7usH3D", "CoinItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CoinItem = exports('CoinItem', (_dec = ccclass('UIItem/CoinItem'), _dec2 = property(LabelTick), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoinItem, _Component);
        function CoinItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelTick", _descriptor, _assertThisInitialized(_this));
          _this.coin = 0;
          return _this;
        }
        var _proto = CoinItem.prototype;
        _proto.onLoad = function onLoad() {
          EventMgr.emit(EventType.CoinItemShow, this);
          EventMgr.on(EventType.CoinItemShow, this.onShow, this);
          EventMgr.on(EventType.CoinItemHide, this.onHide, this);
          EventMgr.on(EventType.UpdateCoin, this.updateCoin, this);
        };
        _proto.onDisable = function onDisable() {
          this.unscheduleAllCallbacks();
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.emit(EventType.CoinItemHide, this);
          this.unscheduleAllCallbacks();
          EventMgr.off(EventType.UpdateCoin, this.updateCoin, this);
          EventMgr.off(EventType.CoinItemShow, this.onShow, this);
          EventMgr.off(EventType.CoinItemHide, this.onHide, this);
        };
        _proto.onShow = function onShow(other) {
          if (this === other) return;
          this.node.active = false;
        };
        _proto.onHide = function onHide(other) {
          if (this === other) return;
          this.node.active = true;
          this.init(CoinMgr.CurCoin);
        };
        _proto.init = function init(coin) {
          this.coin = coin;
          this.labelTick.init(coin);
        };
        _proto.updateCoin = function updateCoin(coin, playAnim) {
          var _this2 = this;
          if (playAnim === void 0) {
            playAnim = true;
          }
          if (!this.node.active) return;
          this.coin = coin;
          this.labelTick.tickLabel(coin);
          var rangeX = 50;
          var rangeY = 100;
          if (playAnim) {
            AudioMgr.playSfx('获得金币');
            this.schedule(function () {
              var flyCoin = _this2.createFlyCoin();
              var posX = math.randomRangeInt(-rangeX, rangeX);
              var posY = math.randomRangeInt(-rangeY, -50);
              var tw = tween(flyCoin);
              tw.to(0.5, {
                position: v3(posX, posY)
              }, {
                easing: 'cubicOut'
              });
              tw.to(1, {
                position: _this2.node.position
              }, {
                easing: 'backIn'
              });
              tw.call(function () {
                AudioMgr.playSfx('获得金币1');
                flyCoin.destroy();
              });
              tw.start();
            }, 0.1, 5);
          }
        };
        _proto.createFlyCoin = function createFlyCoin() {
          var flyCoin = new Node();
          var sp = flyCoin.addComponent(Sprite);
          sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.UI, 'xingxing', 'common/');
          this.node.parent.addChild(flyCoin);
          return flyCoin;
        };
        _createClass(CoinItem, [{
          key: "Coin",
          get: function get() {
            return this.coin;
          }
        }]);
        return CoinItem;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelTick", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoinMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ItemMgr.ts'], function (exports) {
  var _createClass, cclegacy, ItemMgr;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dad9e++GnNNAq62LJJad40y", "CoinMgr", undefined);
      var CoinMgr = exports('CoinMgr', /*#__PURE__*/function () {
        function CoinMgr() {}
        _createClass(CoinMgr, null, [{
          key: "CurCoin",
          get: function get() {
            return ItemMgr.getCnt(0);
          }
        }]);
        return CoinMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ComboBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts', './CfgCombo.ts', './GameMgr.ts', './ResMgr.ts', './Bundle.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, ProgressBar, Label, math, Node, Sprite, UIOpacity, tween, v3, Component, Global, CfgCombo, GameMgr, ResMgr, Bundle;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      math = module.math;
      Node = module.Node;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      CfgCombo = module.CfgCombo;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "75d5bkvGiFM3oYCJK1pcaui", "ComboBox", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ComboBox = exports('ComboBox', (_dec = ccclass('Game/ComboBox'), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ComboBox, _Component);
        function ComboBox() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "progressBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lbCombo", _descriptor2, _assertThisInitialized(_this));
          _this.curCombo = 0;
          _this.speed = 0;
          return _this;
        }
        var _proto = ComboBox.prototype;
        _proto.start = function start() {
          this.CurCombo = 0;
        };
        _proto.update = function update(dt) {
          if (GameMgr.Pause) return;
          if (this.curCombo <= 0) return;
          this.progressBar.progress = math.clamp(this.progressBar.progress - this.speed * dt, 0, 1);
          if (this.progressBar.progress <= 0) {
            this.CurCombo = 0;
          }
        };
        _proto.createFloatText = function createFloatText(shelveWorldPos) {
          var floatText = new Node();
          var sp = floatText.addComponent(Sprite);
          var uiOpacity = floatText.addComponent(UIOpacity);
          var comboData = CfgCombo[this.curCombo];
          var icon = comboData.icon;
          if (!icon) return;
          sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, icon);
          GameMgr.EffectsLayer.addChild(floatText);
          floatText.setWorldPosition(shelveWorldPos);
          var tw = tween(floatText);
          tw.set({
            scale: v3(0.5, 0.5, 1)
          });
          tw.to(0.5, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          });
          tw.by(0.5, {
            position: v3(0, 50, 0)
          }, {
            easing: 'sineOut'
          });
          tw.call(function () {
            floatText.destroy();
          });
          tw.start();
          tween(uiOpacity).delay(0.5).to(0.5, {
            opacity: 0
          }, {
            easing: 'sineOut'
          }).start();
        };
        _createClass(ComboBox, [{
          key: "CurCombo",
          get: function get() {
            return this.curCombo;
          },
          set: function set(v) {
            this.curCombo = math.clamp(v, 0, Global.Max_Combo);
            this.node.active = this.curCombo > 0;
            if (this.curCombo <= 0) return;
            this.lbCombo.string = "x" + this.curCombo;
            var comboData = CfgCombo[this.curCombo];
            var durarion = comboData.durarion;
            this.speed = 1 / durarion;
            this.progressBar.progress = 1;
          }
        }]);
        return ComboBox;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbCombo", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ComboMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts', './TimeMgr.ts'], function (exports) {
  var _createClass, cclegacy, math, Global, TimeMgr;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      TimeMgr = module.TimeMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7e33dktx3hEJZh58S/WeMXj", "ComboMgr", undefined);
      var ComboMgr = exports('ComboMgr', /*#__PURE__*/function () {
        function ComboMgr() {}
        _createClass(ComboMgr, null, [{
          key: "CurCombo",
          get: function get() {
            return this.curCombo;
          },
          set: function set(v) {
            this.curCombo = math.clamp(v, 0, Global.Max_Combo);
            TimeMgr.delay();
          }
        }]);
        return ComboMgr;
      }());
      ComboMgr.curCombo = 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommonShelve.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './ResMgr.ts', './Bundle.ts', './Goods.ts', './EventMgr.ts', './EventType.ts', './ArrayUtil.ts', './ShelveBase.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, macro, v3, Vec3, instantiate, GameMgr, ResMgr, Bundle, Goods, EventMgr, EventType, ArrayUtil, ShelveBase, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      macro = module.macro;
      v3 = module.v3;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      Goods = module.Goods;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }, function (module) {
      ShelveBase = module.ShelveBase;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "a681aMn/NVED75E5Qcqy+AM", "CommonShelve", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CommonShelve = exports('CommonShelve', (_dec = ccclass('Game/CommonShelve'), _dec2 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_ShelveBase) {
        _inheritsLoose(CommonShelve, _ShelveBase);
        function CommonShelve() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ShelveBase.call.apply(_ShelveBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "layers", _descriptor, _assertThisInitialized(_this));
          //slotId goodsId
          _this.layer0GoodsMap = new Map();
          return _this;
        }
        var _proto = CommonShelve.prototype;
        _proto.onLoad = function onLoad() {
          _ShelveBase.prototype.onLoad.call(this);
          GameMgr.shelveArr.push(this);
        };
        _proto.start = function start() {
          _ShelveBase.prototype.start.call(this);
          this.init();
          this.schedule(this.onTrySupplyGoods, 0.25, macro.REPEAT_FOREVER);
          this.schedule(this.onCheckMerge, 0.15, macro.REPEAT_FOREVER);
        };
        _proto.init = function init(bounceDelay) {
          if (bounceDelay === void 0) {
            bounceDelay = 0;
          }
          this.createLayerGoods(0, bounceDelay);
          this.createLayerGoods(1, bounceDelay);
        };
        _proto.createLayerGoods = function createLayerGoods(layer, bounceDelay) {
          var _GameMgr$goodsData$th;
          if (bounceDelay === void 0) {
            bounceDelay = 0;
          }
          var shelveData = (_GameMgr$goodsData$th = GameMgr.goodsData[this.id]) != null ? _GameMgr$goodsData$th : {};
          for (var slot in shelveData) {
            if (Object.prototype.hasOwnProperty.call(shelveData, slot)) {
              var goodsArr = shelveData[slot];
              if (goodsArr.length <= 0) continue;
              var goodsId = goodsArr.shift();
              if (!Goods.isValidId(goodsId)) continue;
              var goods = this.createGoods(goodsId, Number(slot), layer);
              goods == null || goods.bounce(bounceDelay);
            }
          }
        }

        //如果第一层为空，则尝试补充新物品
        ;

        _proto.onTrySupplyGoods = function onTrySupplyGoods() {
          if (GameMgr.Pause || GameMgr.IsRefreshing) return;
          var layer0 = this.layers[0];
          var layer1 = this.layers[1];
          if (layer0.children.length <= 0) {
            //将第二层的物品前移至第一层
            var _layer = this.layers[1];
            var layer1GoodsArr = _layer.getComponentsInChildren(Goods);
            for (var i = 0; i < layer1GoodsArr.length; i++) {
              var goods = layer1GoodsArr[i];
              var pos = goods.node.getPosition();
              goods.Layer = 0;
              goods.node.setParent(layer0);
              pos.y -= Global.Goods_Offset;
              goods.node.setPosition(pos);
              this.layer0GoodsMap.set(goods.Slot, goods.Id);
              goods == null || goods.bounce();
            }

            // //补充第二层的物品
            // this.createLayerGoods(1)
          }

          if (layer1.children.length <= 0) {
            this.createLayerGoods(1, 0);
          }
        };
        _proto.getSlot = function getSlot(goodsPos) {
          var disArr = [];
          var offsetX = 0.5 * this.uiTrans.width / 3;
          var posArr = [v3(-offsetX, 0, 0), v3(0, 0, 0), v3(offsetX, 0, 0)];
          for (var i = 0; i < posArr.length; i++) {
            var pos = posArr[i];
            var dis = Vec3.distance(goodsPos, pos);
            disArr.push({
              slotId: i,
              dis: dis
            });
          }
          disArr.sort(function (a, b) {
            return a.dis - b.dis;
          });
          for (var _i = 0; _i < disArr.length; _i++) {
            var data = disArr[_i];
            var slotId = data.slotId;
            if (!this.isSlotOccupied(slotId)) return slotId;
          }
          return -1;
        };
        _proto.createGoods = function createGoods(goodsId, slotId, layer) {
          if (!Goods.isValidId(goodsId)) return null;
          var goodsPre = ResMgr.getRes(Bundle.Game, 'Goods');
          var goodsNode = instantiate(goodsPre);
          var goods = goodsNode.getComponent(Goods);
          var layerNode = this.layers[layer];
          var pos = v3();
          pos.x = (slotId - 1) * (this.uiTrans.width - 10) / 3;
          pos.y = layer * Global.Goods_Offset;
          layerNode.addChild(goodsNode);
          goodsNode.setPosition(pos);
          goods.Id = goodsId;
          goods.Layer = layer;
          goods.Slot = slotId;
          if (layer === 0) this.layer0GoodsMap.set(slotId, goodsId);
          return goods;
        };
        _proto.isSlotOccupied = function isSlotOccupied(slotId) {
          return this.layer0GoodsMap.has(slotId);
        };
        _proto.isAllSlotOccupied = function isAllSlotOccupied() {
          return this.layer0GoodsMap.size === 3;
        };
        _proto.placeGoods = function placeGoods(goodsId, slotId) {
          var goods = this.createGoods(goodsId, slotId, 0);
          goods == null || goods.bounce();
        };
        _proto.onPlaceGoods = function onPlaceGoods() {
          var layer0 = this.layers[0];
          var layer0GoodsArr = layer0.getComponentsInChildren(Goods);
          for (var i = 0; i < layer0GoodsArr.length; i++) {
            var goods = layer0GoodsArr[i];
            if (goods.Visible) continue;
            goods.node.destroy();
            this.layer0GoodsMap["delete"](goods.Slot);
          }
        };
        _proto.onCheckMerge = function onCheckMerge() {
          if (GameMgr.Pause || GameMgr.IsRefreshing) return;
          var goodsCnt = this.layer0GoodsMap.size;
          if (goodsCnt < 3) return;
          var layer0 = this.layers[0];
          var layer0GoodsArr = layer0.getComponentsInChildren(Goods);

          // A drag retains its source node until a successful drop. Never consume that source.
          if (layer0GoodsArr.length !== 3 || layer0GoodsArr.some(function (goods) {
            return !goods.Visible || goods.isRemoving;
          })) return;
          var isAllSame = ArrayUtil.isAllSame(layer0GoodsArr, 'Id');
          if (!isAllSame) return;

          //合并第一层的物品
          for (var i = 0; i < layer0GoodsArr.length; i++) {
            var goods = layer0GoodsArr[i];
            goods.remove();
          }
          this.layer0GoodsMap.clear();
          EventMgr.emit(EventType.MergeGoods, this.node.getWorldPosition());
        };
        _proto.clear = function clear() {
          this.layer0GoodsMap.clear();
          for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            layer.destroyAllChildren();
          }
        };
        _proto.removeGoods = function removeGoods(goods) {
          var Layer = goods.Layer,
            Slot = goods.Slot;
          if (Layer === 0) {
            this.layer0GoodsMap["delete"](Slot);
          }
          goods.remove();
        };
        _createClass(CommonShelve, [{
          key: "isEmpty",
          get: function get() {
            // Removal animations keep nodes alive after the goods have left the board.
            return this.GoodsIdArr.length === 0;
          }
        }, {
          key: "GoodsIdArr",
          get: function get() {
            var goodsIdArr = [];
            for (var i = 0; i < this.layers.length; i++) {
              var layer = this.layers[i];
              var layerGoodsArr = layer.getComponentsInChildren(Goods);
              for (var j = 0; j < layerGoodsArr.length; j++) {
                var goods = layerGoodsArr[j];
                if (!goods.isRemoving) goodsIdArr.push(goods.Id);
              }
            }
            return goodsIdArr;
          }
        }, {
          key: "GoodsInfo",
          get: function get() {
            var info = {};
            for (var i = 0; i < this.layers.length; i++) {
              var layer = this.layers[i];
              if (!info.hasOwnProperty(i)) {
                info[i] = {};
              }
              var layerGoodsArr = layer.getComponentsInChildren(Goods);
              for (var j = 0; j < layerGoodsArr.length; j++) {
                var goods = layerGoodsArr[j];
                if (goods.isRemoving) continue;
                var Slot = goods.Slot,
                  Id = goods.Id;
                info[i][Slot] = goods;
              }
            }
            return info;
          }
        }]);
        return CommonShelve;
      }(ShelveBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "layers", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CustomComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Debug.ts'], function () {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, Component, find, UITransform, assetManager, Prefab, instantiate, Debug;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      find = module.find;
      UITransform = module.UITransform;
      assetManager = module.assetManager;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
    }, function (module) {
      Debug = module.Debug;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ae38OhjMRHuoq4SZegyA3K", "CustomComponent", undefined);
      var Tag = 'Component';
      {
        Component.prototype.findNode = function (path, referenceNode) {
          if (!referenceNode) referenceNode = this.node;
          return find(path, referenceNode);
        };
        Component.prototype.findComp = function (path, comp, referenceNode) {
          if (!referenceNode) referenceNode = this.node;
          var n = find(path, referenceNode);
          return n == null ? void 0 : n.getComponent(comp);
        };
        Component.prototype.instantiate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(bundleName, path, parent) {
          var _this = this;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  if (!parent) parent = _this.node;
                  var bundle = assetManager.getBundle(bundleName);
                  if (!bundle) {
                    Debug.Warn(Tag, "bundle " + bundleName + " not exist or loaded");
                    reject();
                    return;
                  }
                  var startTime = Date.now();
                  var prefab = bundle.get(path, Prefab);
                  var node = null;
                  if (prefab) {
                    node = instantiate(prefab);
                    parent.addChild(node);
                    Debug.Log(Tag, "prefab " + path + " instantiate success, cost " + (Date.now() - startTime) + " ms");
                    resolve(node);
                  } else {
                    bundle.load(path, Prefab, function (err, prefab) {
                      if (err) {
                        reject();
                      } else {
                        if (!_this.isValid) return;
                        node = instantiate(prefab);
                        parent.addChild(node);
                        Debug.Log(Tag, "prefab " + path + " instantiate success, cost " + (Date.now() - startTime) + " ms");
                        resolve(node);
                      }
                    });
                  }
                }));
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        Object.defineProperty(Component.prototype, 'uiTrans', {
          get: function get() {
            return this.node.getComponent(UITransform);
          }
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CustomNode.ts", ['cc'], function () {
  var cclegacy, Node, UITransform;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      UITransform = module.UITransform;
    }],
    execute: function () {
      cclegacy._RF.push({}, "459b6g6Dx1Jl6l5jtUn6El1", "CustomNode", undefined);
      {
        Object.defineProperty(Node.prototype, 'uiTrans', {
          get: function get() {
            return this.getComponent(UITransform);
          }
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CustomSprite.ts", ['cc', './Debug.ts'], function () {
  var cclegacy, Sprite, assetManager, SpriteFrame, Debug;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      assetManager = module.assetManager;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      Debug = module.Debug;
    }],
    execute: function () {
      cclegacy._RF.push({}, "13bb9TshclOBrsQ2KwyYVbo", "CustomSprite", undefined);
      var Tag = 'Sprite';
      {
        Sprite.prototype.loadSpriteFrame = function (bundleName, path) {
          var _this = this;
          var bundle = assetManager.getBundle(bundleName);
          if (!bundle) {
            Debug.Warn(Tag, "bundle " + bundleName + " not exist or loaded");
            return;
          }
          var spfPath = path + '/spriteFrame';
          var spf = bundle.get(spfPath, SpriteFrame);
          if (spf) {
            if (!this.isValid) return;
            this.spriteFrame = spf;
          } else {
            bundle.load(spfPath, SpriteFrame, function (err, res) {
              if (err) {
                Debug.Error(Tag, err.message);
              } else {
                if (!_this.isValid) return;
                _this.spriteFrame = res;
              }
            });
          }
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Debug.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "24152lr7B5ApJuM1SRUJV/V", "Debug", undefined);
      var Debug = exports('Debug', /*#__PURE__*/function () {
        function Debug() {}
        Debug.Log = function Log(tag) {
          var _console;
          for (var _len = arguments.length, msg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            msg[_key - 1] = arguments[_key];
          }
          (_console = console).log.apply(_console, [tag + " --> "].concat(msg));
        };
        Debug.Warn = function Warn(tag) {
          var _console2;
          for (var _len2 = arguments.length, msg = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            msg[_key2 - 1] = arguments[_key2];
          }
          (_console2 = console).warn.apply(_console2, [tag + " --> "].concat(msg));
        };
        Debug.Error = function Error(tag) {
          var _console3;
          for (var _len3 = arguments.length, msg = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            msg[_key3 - 1] = arguments[_key3];
          }
          (_console3 = console).error.apply(_console3, [tag + " --> "].concat(msg));
        };
        return Debug;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoIconCfg.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "653c59U1OJLW6iZPU6MlFj6", "DtoIconCfg", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoIconData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f65592eRapGr7LbjHBnpASv", "DtoIconData", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoItem.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bb0abRdj4JHJ5cBJHqC60Pg", "DtoItem", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoLevelCfg.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0f4bdwzf71MN4qMqBDPCF95", "DtoLevelCfg", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoLevelData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f9945j9F5lO9o1YtpeS08F7", "DtoLevelData", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoPassReward.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "93fb6FVmrxD4amnZOdFWZ9V", "DtoPassReward", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoReward.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "858f0EjULFKeZbkcqeyYP2/", "DtoReward", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DtoUI.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "865caVG9sJJx43oQLndbIh/", "DtoUI", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectFreeze.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts', './EventType.ts', './EventMgr.ts', './AudioMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, isValid, Component, Global, EventType, EventMgr, AudioMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "9e7aexhG2pDCacTPHtgSOhx", "EffectFreeze", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var EffectFreeze = exports('EffectFreeze', (_dec = ccclass('Game/EffectFreeze'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectFreeze, _Component);
        function EffectFreeze() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = EffectFreeze.prototype;
        _proto.onLoad = function onLoad() {
          EventMgr.on(EventType.UseSkillFreezeTime, this.onRemove, this);
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.off(EventType.UseSkillFreezeTime, this.onRemove, this);
          this.unscheduleAllCallbacks();
        };
        _proto.start = function start() {
          this.scheduleOnce(this.onRemove, Global.Freeze_Time);
          AudioMgr.playSfx('冰冻道具');
        };
        _proto.onRemove = function onRemove() {
          if (isValid(this.node)) this.node.destroy();
        };
        return EffectFreeze;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectMgr.ts", ['cc'], function (exports) {
  var cclegacy, instantiate;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
    }],
    execute: function () {
      cclegacy._RF.push({}, "99a40aze3xOO67617VY8NcF", "EffectMgr", undefined);
      var EffectMgr = exports('EffectMgr', /*#__PURE__*/function () {
        function EffectMgr() {}
        EffectMgr.create = function create(effectPre, parent, worldPos) {
          var effectNode = instantiate(effectPre);
          parent.addChild(effectNode);
          worldPos && effectNode.setWorldPosition(worldPos);
          return effectNode;
        };
        return EffectMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectRedAlert.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventMgr.ts', './EventType.ts', './Global.ts', './AudioMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, UIOpacity, tween, isValid, Component, EventMgr, EventType, Global, AudioMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "b7f21+tVI1AOoD8l7luTPtj", "EffectRedAlert", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var EffectRedAlert = exports('EffectRedAlert', (_dec = ccclass('Game/EffectRedAlert'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectRedAlert, _Component);
        function EffectRedAlert() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.uiOpacity = null;
          return _this;
        }
        var _proto = EffectRedAlert.prototype;
        _proto.onLoad = function onLoad() {
          this.uiOpacity = this.getComponent(UIOpacity);
          EventMgr.on(EventType.TimeOutAlert, this.onTimeOutAlert, this);
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.off(EventType.TimeOutAlert, this.onTimeOutAlert, this);
        };
        _proto.start = function start() {
          var tw = tween(this.uiOpacity);
          tw.sequence(tween(this.uiOpacity).to(0.5, {
            opacity: 0
          }), tween(this.uiOpacity).to(0.5, {
            opacity: 255
          }));
          tw.repeatForever();
          tw.start();
          this.scheduleOnce(this.onTimeOutAlert, Global.Time_Out_Alert_Time);
          AudioMgr.playSfx('倒计时');
        };
        _proto.onTimeOutAlert = function onTimeOutAlert() {
          this.unscheduleAllCallbacks();
          if (isValid(this.node)) this.node.destroy();
        };
        return EffectRedAlert;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "9a7eeGxAlpJtL+cEC8eYEST", "EventMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var EventMgr = exports('EventMgr', (_dec = ccclass('Manager/EventMgr'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EventMgr, _Component);
        function EventMgr() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = EventMgr.prototype;
        _proto.onLoad = function onLoad() {
          EventMgr._node = this.node;
          director.addPersistRootNode(this.node);
        };
        EventMgr.on = function on(type, callback, target, useCapture) {
          this._node.on(type, callback, target, useCapture);
        };
        EventMgr.once = function once(type, callback, target, useCapture) {
          this._node.once(type, callback, target, useCapture);
        };
        EventMgr.emit = function emit(type, arg0, arg1, arg2, arg3, arg4) {
          this._node.emit(type, arg0, arg1, arg2, arg3, arg4);
        };
        EventMgr.off = function off(type, callback, target, useCapture) {
          this._node.off(type, callback, target, useCapture);
        };
        EventMgr.offAll = function offAll(target) {
          this._node.targetOff(target);
        };
        EventMgr.has = function has(type, callback, target) {
          return this._node.hasEventListener(type, callback, target);
        };
        return EventMgr;
      }(Component), _class2._node = void 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c7fa9QGmtBBIYbVwCza1OPL", "EventType", undefined);
      var EventType = exports('EventType', /*#__PURE__*/function (EventType) {
        EventType["Click"] = "click";
        EventType["WxOnShow"] = "WxOnShow";
        EventType["WxOnHide"] = "WxOnHide";
        EventType["UpdateRedPoint"] = "UpdateRedPoint";
        EventType["Pause"] = "Pause";
        EventType["Resume"] = "Resume";
        EventType["OpenUI"] = "OpenUI";
        EventType["CloseUI"] = "CloseUI";
        EventType["PlaceGoods"] = "PlaceGoods";
        EventType["MergeGoods"] = "MergeGoods";
        EventType["TimeTick"] = "TimeTick";
        EventType["TimeOut"] = "TimeOut";
        EventType["TimeReset"] = "TimeReset";
        EventType["Revive"] = "Revive";
        EventType["Win"] = "Win";
        EventType["Fail"] = "Fail";
        EventType["UseSkillFreezeTime"] = "UseSkillFreezeTime";
        EventType["UseSkillEraseGroup"] = "UseSkillEraseGroup";
        EventType["UseSkillRefreshPosition"] = "UseSkillRefreshPosition";
        EventType["UseSkillDoubleCoin"] = "UseSkillDoubleCoin";
        EventType["AddSkillFreezeTime"] = "AddSkillFreezeTime";
        EventType["AddSkillEraseOneGroup"] = "AddSkillEraseOneGroup";
        EventType["AddSkillRefreshPosition"] = "AddSkillRefreshPosition";
        EventType["AddSkillDoubleCoin"] = "AddSkillDoubleCoin";
        EventType["AddSkill"] = "AddSkill";
        EventType["UpdateSkillCnt"] = "UpdateSkillCnt";
        EventType["UpdateLevel"] = "UpdateLevel";
        EventType["UpdateCoin"] = "UpdateCoin";
        EventType["CoinItemShow"] = "CoinItemShow";
        EventType["CoinItemHide"] = "CoinItemHide";
        EventType["TimeOutAlert"] = "TimeOutAlert";
        EventType["GetPassReward"] = "GetPassReward";
        EventType["ModeUnlocked"] = "ModeUnlocked";
        return EventType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Floaty.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, tween, v3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "eaa9aoMVFhCBY75R+3rE22h", "Floaty", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Floaty = exports('Floaty', (_dec = ccclass('Misc/Floaty'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Floaty, _Component);
        function Floaty() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "floatInterval", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "floatOffset", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Floaty.prototype;
        _proto.start = function start() {
          var tw = tween(this.node);
          tw.sequence(tween(this.node).by(this.floatInterval, {
            position: v3(0, this.floatOffset, 0)
          }), tween(this.node).by(this.floatInterval, {
            position: v3(0, -this.floatOffset, 0)
          })).repeatForever().start();
        };
        return Floaty;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "floatInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "floatOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResMgr.ts', './Bundle.ts', './EventMgr.ts', './EventType.ts', './ShelveLocker.ts', './Mode.ts', './AudioMgr.ts', './SkillType.ts', './SkillMgr.ts', './ItemMgr.ts', './RewardMgr.ts', './GameSave.ts', './RecoveryMgr.ts', './UIMgr.ts', './UI.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, Node, instantiate, Sprite, UITransform, v3, isValid, Component, ResMgr, Bundle, EventMgr, EventType, ShelveLocker, Mode, ModeName, AudioMgr, SkillType, SkillMgr, ItemMgr, RewardMgr, failure, success, GameSave, RecoveryMgr, UIMgr, UI;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      v3 = module.v3;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ShelveLocker = module.ShelveLocker;
    }, function (module) {
      Mode = module.Mode;
      ModeName = module.ModeName;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      SkillType = module.SkillType;
    }, function (module) {
      SkillMgr = module.SkillMgr;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      failure = module.failure;
      success = module.success;
      GameSave = module.GameSave;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UI = module.UI;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "fc7ab3uDQZMAr967dLrCODL", "GameMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PickOffset = 80;
      var GameMgr = exports('GameMgr', (_dec = ccclass('Manager/GameMgr'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameMgr, _Component);
        function GameMgr() {
          return _Component.apply(this, arguments) || this;
        }
        GameMgr.registerStage = function registerStage(stage) {
          this.activeStage = stage;
        };
        GameMgr.unregisterStage = function unregisterStage(stage) {
          if (this.activeStage === stage) this.activeStage = null;
        };
        GameMgr.isCurrentRound = function isCurrentRound(id) {
          return this.roundActive && id === this.roundId;
        };
        GameMgr.canClaimSkill = function canClaimSkill(skill) {
          return this.roundActive && Number.isInteger(skill) && skill >= 0 && skill < 4 && !this.claimedSkills.has(skill) && !SkillMgr.hasSkill(skill) && !this.IsRefreshing && !this.isPicking && !(skill === SkillType.DoubleCoin && this.IsDoubleCoinActive);
        };
        GameMgr.claimSkill = function claimSkill(skill) {
          if (!this.canClaimSkill(skill)) return failure('unavailable');
          var result = ItemMgr.tryApplyRewards([{
            itemId: SkillMgr.getSkillId(skill),
            cnt: 1
          }]);
          if (!result.ok) return result;
          this.claimedSkills.add(skill);
          SkillMgr.animateAdded(skill);
          return success();
        };
        GameMgr.useSkill = function useSkill(skill, recovering) {
          if (recovering === void 0) {
            recovering = false;
          }
          if (!Number.isInteger(skill) || skill < 0 || skill > 3 || !this.roundActive || this.Pause && !recovering || this.isPicking || !this.activeStage) return failure('unavailable');
          var prepared = this.activeStage.prepareSkill(skill);
          if (!prepared.ok) return failure(prepared.reason);
          var id = SkillMgr.getSkillId(skill);
          if (id < 0 || ItemMgr.getCnt(id) <= 0) return failure('unavailable');
          var saved = GameSave.transact(function (next) {
            if (next.items[id] <= 0) return failure('unavailable');
            next.items[id]--;
            return success();
          });
          if (!saved.ok) return saved;
          var events = [EventType.UseSkillFreezeTime, EventType.UseSkillEraseGroup, EventType.UseSkillRefreshPosition, EventType.UseSkillDoubleCoin];
          EventMgr.emit(events[skill], prepared.value);
          return success();
        };
        GameMgr.tryRevive = function tryRevive() {
          if (!this.CanRevive) return false;
          this.reviveUsed = true;
          return true;
        };
        GameMgr.settleRound = function settleRound() {
          var _this = this;
          if (!this.roundActive) return failure('unavailable');
          if (!this.pendingWin) this.pendingWin = RewardMgr.rollWinReward(this.CurLevel);
          var reward = this.pendingWin;
          if (!reward) return failure('invalid_config');
          var result = GameSave.transact(function (next) {
            var applied = ItemMgr.applyTo(next, [{
              itemId: 0,
              cnt: reward.amount
            }]);
            if (!applied.ok) return failure(applied.reason);
            next.levels[_this.mode]++;
            if (_this.mode === Mode.tp && next.levels[0] >= 15 && !next.unlockedModes.includes(Mode.gs)) next.unlockedModes.push(Mode.gs);
            if (_this.mode === Mode.gs && next.levels[1] >= 10 && !next.unlockedModes.includes(Mode.ls)) next.unlockedModes.push(Mode.ls);
            return success(reward);
          });
          if (!result.ok) return result;
          this.roundResult = reward;
          this.pendingWin = null;
          this.roundActive = false;
          this.Pause = true;
          return result;
        };
        GameMgr.recover = function recover(retry, done, message) {
          var _this2 = this;
          var id = this.roundId;
          RecoveryMgr.show({
            title: '保存未完成',
            message: message != null ? message : '本次操作未保存，请重试或离开本局。',
            actions: [{
              label: '重试保存',
              run: function run() {
                return _this2.isCurrentRound(id) ? retry() : failure('unavailable');
              },
              onSuccess: done
            }, {
              label: '重新挑战',
              run: function run() {
                return success();
              },
              onSuccess: function onSuccess() {
                _this2.closeRoundPopups();
                _this2.startGame();
              }
            }, {
              label: '返回首页',
              run: function run() {
                return success();
              },
              onSuccess: function onSuccess() {
                _this2.closeRoundPopups();
                _this2.quitGame();
                UIMgr.open(UI.Main);
              }
            }]
          });
        };
        GameMgr.closeRoundPopups = function closeRoundPopups() {
          for (var _i = 0, _arr = [UI.GetSkill, UI.TimeOut, UI.Pause, UI.Win]; _i < _arr.length; _i++) {
            var ui = _arr[_i];
            UIMgr.close(ui);
          }
        };
        var _proto = GameMgr.prototype;
        _proto.onLoad = function onLoad() {
          globalThis.GameMgr = GameMgr;
          GameMgr._inst = this;
          GameMgr._node = this.node;
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchFinish, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchFinish, this);
        };
        GameMgr.unlockMode = function unlockMode(mode) {
          return GameSave.transact(function (next) {
            if (!next.unlockedModes.includes(mode)) next.unlockedModes.push(mode);
            return success();
          });
        };
        GameMgr.createStage = function createStage() {
          var stagePre = ResMgr.getRes(Bundle.Game, 'Stage');
          var stageNode = instantiate(stagePre);
          this._node.addChild(stageNode);
        };
        GameMgr.startGame = function startGame() {
          var _this3 = this;
          this.reset();
          var id = ++this.roundId;
          this.leavingHome = false;
          this.activeStage = null;
          this.pendingWin = null;
          this.claimedSkills.clear();
          this.reviveUsed = false;
          this.roundResult = null;
          this.roundActive = true;
          this.Pause = false;
          this._node.destroyAllChildren();
          this._inst.scheduleOnce(function () {
            if (_this3.isCurrentRound(id)) _this3.createStage();
          });
        };
        GameMgr.quitGame = function quitGame() {
          this.roundId++;
          this.roundActive = false;
          this.roundResult = null;
          this.pendingWin = null;
          this.activeStage = null;
          this.claimedSkills.clear();
          this.reviveUsed = false;
          this.Pause = false;
          this._node.destroyAllChildren();
          this.reset();
        };
        GameMgr.pick = function pick(goods, uiPos) {
          var _this$activeStage;
          if (!this.roundActive || this.Pause || this.isPicking || (_this$activeStage = this.activeStage) != null && _this$activeStage.isBusy) return false;
          this._pickedGoods = goods;
          this._holdGoods = new Node();
          var sp = this._holdGoods.addComponent(Sprite);
          sp.spriteFrame = goods.Sp.spriteFrame;
          this.EffectsLayer.addChild(this._holdGoods);
          this._holdGoods.setWorldScale(goods.Sp.node.worldScale);
          uiPos.y += PickOffset;
          var localPos = this._holdGoods.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(uiPos.x, uiPos.y, 0));
          this._holdGoods.setPosition(localPos);
          AudioMgr.playSfx('点击消除物');
          return true;
        };
        GameMgr.release = function release() {
          if (!isValid(this._holdGoods) || !this._pickedGoods) return;
          if (!isValid(this._pickedGoods.node) || this._pickedGoods.isRemoving) {
            this.cancelPick();
            return;
          }
          var isSuccess = false;
          var holdGoodsWorldPos = this._holdGoods.getWorldPosition();
          for (var i = 0; i < this.shelveArr.length; i++) {
            var shelve = this.shelveArr[i];
            if (shelve.getComponentInChildren(ShelveLocker)) continue;
            var uiTrans = shelve.getComponent(UITransform);
            var goodsLocalPos = uiTrans.convertToNodeSpaceAR(holdGoodsWorldPos);
            if (goodsLocalPos.x >= -uiTrans.width * uiTrans.anchorX && goodsLocalPos.x < uiTrans.width * (1 - uiTrans.anchorX) && goodsLocalPos.y >= -uiTrans.height * uiTrans.anchorY && goodsLocalPos.y < uiTrans.height * (1 - uiTrans.anchorY)) {
              var slotId = shelve.getSlot(goodsLocalPos);
              if (slotId < 0 || shelve.isSlotOccupied(slotId)) break;
              var goodsId = this._pickedGoods.Id;
              shelve.placeGoods(goodsId, slotId);
              isSuccess = true;
              break;
            }
          }
          if (isSuccess) {
            EventMgr.emit(EventType.PlaceGoods);
          } else {
            this._pickedGoods.Visible = true;
          }
          this._pickedGoods = null;
          this._holdGoods.destroy();
          this._holdGoods = null;
          AudioMgr.playSfx('放下消除物');
        };
        GameMgr.cancelPick = function cancelPick() {
          var _this$_pickedGoods;
          if (isValid((_this$_pickedGoods = this._pickedGoods) == null ? void 0 : _this$_pickedGoods.node)) this._pickedGoods.Visible = true;
          if (isValid(this._holdGoods)) this._holdGoods.destroy();
          this._pickedGoods = null;
          this._holdGoods = null;
        };
        _proto.onTouchMove = function onTouchMove(e) {
          var holdGoods = GameMgr._holdGoods;
          if (!isValid(holdGoods)) return;
          var uiPos = e.getUILocation();
          uiPos.y += PickOffset;
          var localPos = holdGoods.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(uiPos.x, uiPos.y, 0));
          holdGoods.setPosition(localPos);
        };
        _proto.onTouchFinish = function onTouchFinish(e) {
          if (!isValid(GameMgr._holdGoods)) return;
          GameMgr.release();
        };
        GameMgr.reset = function reset() {
          this._pickedGoods = null;
          this._holdGoods = null;
          this.shelveArr = [];
          this.shelveLockerArr = [];
          this.goodsArr = [];
          this.goodsData = {};
        };
        GameMgr.isModeUnlocked = function isModeUnlocked(mode) {
          var _GameSave$Data$unlock, _GameSave$Data;
          return (_GameSave$Data$unlock = (_GameSave$Data = GameSave.Data) == null ? void 0 : _GameSave$Data.unlockedModes.includes(mode)) != null ? _GameSave$Data$unlock : false;
        };
        _createClass(GameMgr, null, [{
          key: "Stage",
          get: function get() {
            return this._node.children[0];
          }
        }, {
          key: "CurLevel",
          get: function get() {
            var _GameSave$Data$levels, _GameSave$Data2;
            return (_GameSave$Data$levels = (_GameSave$Data2 = GameSave.Data) == null ? void 0 : _GameSave$Data2.levels[this.mode]) != null ? _GameSave$Data$levels : 0;
          }
        }, {
          key: "CurPassedLevel",
          get: function get() {
            var _GameSave$Data$levels2, _GameSave$Data3;
            return (_GameSave$Data$levels2 = (_GameSave$Data3 = GameSave.Data) == null ? void 0 : _GameSave$Data3.levels.reduce(function (a, b) {
              return a + b;
            }, 0)) != null ? _GameSave$Data$levels2 : 0;
          }
        }, {
          key: "isHardLevel",
          get: function get() {
            return (this.CurLevel + 1) % 5 === 0;
          }
        }, {
          key: "EffectsLayer",
          get: function get() {
            var _this$activeStage$eff, _this$activeStage2;
            return (_this$activeStage$eff = (_this$activeStage2 = this.activeStage) == null ? void 0 : _this$activeStage2.effectsLayer) != null ? _this$activeStage$eff : this.Stage;
          }
        }, {
          key: "IsDoubleCoinActive",
          get: function get() {
            var _this$activeStage$Dou, _this$activeStage3;
            return (_this$activeStage$Dou = (_this$activeStage3 = this.activeStage) == null ? void 0 : _this$activeStage3.DoubleCoinActive) != null ? _this$activeStage$Dou : false;
          }
        }, {
          key: "IsRefreshing",
          get: function get() {
            var _this$activeStage$isB, _this$activeStage4;
            return (_this$activeStage$isB = (_this$activeStage4 = this.activeStage) == null ? void 0 : _this$activeStage4.isBusy) != null ? _this$activeStage$isB : false;
          }
        }, {
          key: "CanRevive",
          get: function get() {
            return this.roundActive && !this.reviveUsed;
          }
        }, {
          key: "Pause",
          get: function get() {
            return this.pause;
          },
          set: function set(v) {
            this.pause = v;
            EventMgr.emit(EventType.Pause, v);
          }
        }, {
          key: "isPicking",
          get: function get() {
            return !!this._pickedGoods;
          }
        }, {
          key: "isModeAllUnlocked",
          get: function get() {
            var _GameSave$Data$unlock2, _GameSave$Data4;
            return ((_GameSave$Data$unlock2 = (_GameSave$Data4 = GameSave.Data) == null ? void 0 : _GameSave$Data4.unlockedModes.length) != null ? _GameSave$Data$unlock2 : 0) >= ModeName.length;
          }
        }, {
          key: "isStucked",
          get: function get() {
            for (var i = 0; i < this.shelveArr.length; i++) {
              var shelve = this.shelveArr[i];
              if (!shelve.isAllSlotOccupied()) return false;
            }
            return true;
          }
        }]);
        return GameMgr;
      }(Component), _class2._inst = null, _class2._node = null, _class2.mode = Mode.tp, _class2._pickedGoods = null, _class2._holdGoods = null, _class2.shelveArr = [], _class2.shelveLockerArr = [], _class2.goodsArr = [], _class2.goodsData = {}, _class2.roundId = 0, _class2.leavingHome = false, _class2.claimedSkills = new Set(), _class2.reviveUsed = false, _class2.roundActive = false, _class2.roundResult = null, _class2.pendingWin = null, _class2.activeStage = null, _class2.pause = false, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameSave.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global.ts', './EventMgr.ts', './EventType.ts'], function (exports) {
  var _createClass, _extends, cclegacy, sys, Global, EventMgr, EventType;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }],
    execute: function () {
      exports({
        failure: failure,
        success: success
      });
      cclegacy._RF.push({}, "e8276cE4S9Hg4dt+KdeZgcN", "GameSave", undefined);
      function success(value) {
        return {
          ok: true,
          value: value
        };
      }
      function failure(reason) {
        return {
          ok: false,
          reason: reason
        };
      }
      var GameSave = exports('GameSave', /*#__PURE__*/function () {
        function GameSave() {}
        GameSave.defaults = function defaults() {
          return {
            version: 1,
            items: _extends({}, Global.Default_Item),
            levels: [0, 0, 0],
            unlockedModes: [0],
            dailyClaimDate: null,
            lastPassReward: 0,
            settings: {
              sfxEnabled: true,
              bgmEnabled: true,
              vibrateEnabled: true
            }
          };
        };
        GameSave.valid = function valid(data) {
          var count = function count(n) {
            return Number.isSafeInteger(n) && n >= 0;
          };
          var day = data == null ? void 0 : data.dailyClaimDate;
          var validDay = day === null || typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(Date.parse(day + 'T00:00:00Z')) && new Date(day + 'T00:00:00Z').toISOString().slice(0, 10) === day;
          return !!data && data.version === 1 && !!data.items && [0, 1, 2, 3, 4].every(function (id) {
            return count(data.items[id]);
          }) && data.items[0] <= 9999999 && Array.isArray(data.levels) && data.levels.length === 3 && data.levels.every(count) && Array.isArray(data.unlockedModes) && data.unlockedModes.includes(0) && data.unlockedModes.every(function (n) {
            return Number.isInteger(n) && n >= 0 && n < 3;
          }) && new Set(data.unlockedModes).size === data.unlockedModes.length && validDay && count(data.lastPassReward) && data.lastPassReward % 5 === 0 && data.lastPassReward <= data.levels.reduce(function (sum, level) {
            return sum + level;
          }, 0) && !!data.settings && ['sfxEnabled', 'bgmEnabled', 'vibrateEnabled'].every(function (key) {
            return typeof data.settings[key] === 'boolean';
          });
        };
        GameSave.init = function init() {
          if (this.state) return success();
          var raw;
          try {
            raw = sys.localStorage.getItem(this.Key);
          } catch (_unused) {
            return failure('storage_error');
          }
          if (raw === null) return this.createNew();
          var data;
          try {
            data = JSON.parse(raw);
          } catch (_unused2) {
            return failure('corrupt_save');
          }
          if (!this.valid(data)) return failure('corrupt_save');
          this.state = data;
          return success();
        };
        GameSave.createNew = function createNew() {
          var next = this.defaults();
          try {
            sys.localStorage.setItem(this.Key, JSON.stringify(next));
          } catch (_unused3) {
            return failure('storage_error');
          }
          this.state = next;
          return success();
        };
        GameSave.transact = function transact(change) {
          var next = this.Data;
          if (!next) return failure('storage_error');
          var result = change(next);
          if (!result.ok) return result;
          if (!this.valid(next)) return failure('invalid_config');
          try {
            sys.localStorage.setItem(this.Key, JSON.stringify(next));
          } catch (_unused4) {
            return failure('storage_error');
          }
          var previous = this.state;
          this.state = next;
          if (next.items[0] !== previous.items[0]) EventMgr.emit(EventType.UpdateCoin, next.items[0], false);
          for (var _id = 1; _id <= 4; _id++) {
            if (next.items[_id] !== previous.items[_id]) EventMgr.emit(EventType.UpdateSkillCnt, _id - 1, next.items[_id]);
          }
          if (JSON.stringify(next.unlockedModes) !== JSON.stringify(previous.unlockedModes)) EventMgr.emit(EventType.ModeUnlocked);
          return result;
        };
        _createClass(GameSave, null, [{
          key: "Data",
          get: function get() {
            return this.state ? JSON.parse(JSON.stringify(this.state)) : null;
          }
        }]);
        return GameSave;
      }());
      GameSave.Key = 'hgxcds_game_v1';
      GameSave.state = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameUtil.ts", ['cc'], function (exports) {
  var cclegacy, sys, game;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
      game = module.game;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b956eqLejpFnJDRlZtO5TSN", "GameUtil", undefined);
      var GameUtil = exports('GameUtil', /*#__PURE__*/function () {
        function GameUtil() {}
        GameUtil.exit = function exit() {
          switch (sys.platform) {
            case sys.Platform.MOBILE_BROWSER:
            case sys.Platform.DESKTOP_BROWSER:
            case sys.Platform.ANDROID:
              game.end();
              break;
          }
        };
        return GameUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Global.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8b9a7NpOe9NkL6FuWN5ugvn", "Global", undefined);
      var Global = exports('Global', function Global() {});
      Global.Version = '1.0.0';
      Global.Default_Item = {
        0: 0,
        1: 3,
        2: 3,
        3: 3,
        4: 3
      };
      Global.Goods_Offset = 15;
      Global.Normal_Level_Coin_Default_Cnt = 100;
      Global.Normal_Level_Coin_Add_Cnt = 10;
      Global.Level_Time = 0;
      Global.Freeze_Time = 20;
      Global.Revive_Add_Time = 60;
      Global.Time_Out_Alert_Time = 5;
      Global.Max_Combo = 8;
      Global.Double_Coin_Duration = 30;
      Global.Lucky_Spin_Coin_Cost = 400;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Goods.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './ResMgr.ts', './Bundle.ts', './EffectMgr.ts', './Mode.ts', './cfg_icon.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, UIOpacity, Sprite, Node, tween, v3, Color, color, Component, GameMgr, ResMgr, Bundle, EffectMgr, Mode, cfg_icon_tp, cfg_icon_gs, cfg_icon_ls;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      UIOpacity = module.UIOpacity;
      Sprite = module.Sprite;
      Node = module.Node;
      tween = module.tween;
      v3 = module.v3;
      Color = module.Color;
      color = module.color;
      Component = module.Component;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      EffectMgr = module.EffectMgr;
    }, function (module) {
      Mode = module.Mode;
    }, function (module) {
      cfg_icon_tp = module.cfg_icon_tp;
      cfg_icon_gs = module.cfg_icon_gs;
      cfg_icon_ls = module.cfg_icon_ls;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "11c98MJgY1AT7pHyH/0IZ9r", "Goods", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Goods = exports('Goods', (_dec = ccclass('Game/Goods'), _dec2 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Goods, _Component);
        function Goods() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.uiOpacity = null;
          _this.sp = null;
          _initializerDefineProperty(_this, "parMergePre", _descriptor, _assertThisInitialized(_this));
          _this.isRemoving = false;
          _this.visible = true;
          _this.id = 0;
          _this.layer = 0;
          _this.slot = 0;
          return _this;
        }
        Goods.isValidId = function isValidId(id) {
          var config = [cfg_icon_tp, cfg_icon_gs, cfg_icon_ls][GameMgr.mode];
          return Number.isInteger(id) && id > 0 && !!(config != null && config.some(function (item) {
            return item.id === id;
          }));
        };
        var _proto = Goods.prototype;
        _proto.onLoad = function onLoad() {
          this.uiOpacity = this.getComponent(UIOpacity);
          this.sp = this.getComponentInChildren(Sprite);
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        };
        _proto.onTouchStart = function onTouchStart(e) {
          if (this.layer !== 0 || this.isRemoving) return;
          if (GameMgr.isPicking) return;
          var uiPos = e.getUILocation();
          if (!GameMgr.pick(this, uiPos)) return;
          this.Visible = false;
        };
        _proto.remove = function remove() {
          var _this2 = this;
          if (this.isRemoving) return;
          this.isRemoving = true;
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          var tw = tween(this.sp.node);
          tw.to(0.15, {
            scale: v3(1.1, 0.9, 1)
          });
          tw.to(0.15, {
            scale: v3(0.9, 1.1, 1)
          });
          tw.call(function () {
            if (_this2.layer === 0) {
              var worldPos = _this2.node.getWorldPosition();
              worldPos.y -= 30;
              EffectMgr.create(_this2.parMergePre, GameMgr.EffectsLayer, worldPos);
            }
            _this2.node.destroy();
          });
          tw.start();
        };
        _proto.bounce = function bounce(delay) {
          if (delay === void 0) {
            delay = 0;
          }
          tween(this.sp.node).delay(delay).to(0.1, {
            scale: v3(0.9, 1.1, 1)
          }).to(0.1, {
            scale: v3(1.1, 0.9, 1)
          }).to(0.1, {
            scale: v3(1, 1, 1)
          }).start();
        };
        _createClass(Goods, [{
          key: "Sp",
          get: function get() {
            return this.sp;
          }
        }, {
          key: "Visible",
          get: function get() {
            return this.visible;
          },
          set: function set(v) {
            this.visible = v;
            this.uiOpacity = this.getComponent(UIOpacity);
            this.uiOpacity.opacity = this.visible ? 255 : 0;
          }
        }, {
          key: "Id",
          get: function get() {
            return this.id;
          },
          set: function set(v) {
            if (!Goods.isValidId(v)) {
              this.node.destroy();
              return;
            }
            this.id = v;
            switch (GameMgr.mode) {
              case Mode.tp:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, "tp" + v, 'tp/');
                break;
              case Mode.gs:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, "gs" + v, 'gs/');
                break;
              case Mode.ls:
                this.sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, "ls" + v, 'ls/');
                break;
            }
          }
        }, {
          key: "Layer",
          get: function get() {
            return this.layer;
          },
          set: function set(v) {
            this.layer = v;
            var isFront = this.layer === 0;
            this.sp.color = isFront ? Color.WHITE : color(100, 100, 100, 255);
          }
        }, {
          key: "Slot",
          get: function get() {
            return this.slot;
          },
          set: function set(v) {
            this.slot = v;
          }
        }]);
        return Goods;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "parMergePre", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GoodsLayout.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ArrayUtil.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, ArrayUtil;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }],
    execute: function () {
      exports({
        distributeGoods: distributeGoods,
        goodsCounts: goodsCounts,
        validGoodsId: validGoodsId
      });
      cclegacy._RF.push({}, "4bc68I7UmZAv6HiiVXcJyRL", "GoodsLayout", undefined);
      function validGoodsId(id, maxId) {
        return Number.isInteger(id) && id > 0 && id <= maxId;
      }
      function goodsCounts(ids, maxId) {
        var counts = {};
        ids.filter(function (id) {
          return validGoodsId(id, maxId);
        }).forEach(function (id) {
          var _counts$id;
          counts[id] = ((_counts$id = counts[id]) != null ? _counts$id : 0) + 1;
        });
        return JSON.stringify(Object.keys(counts).sort(function (a, b) {
          return Number(a) - Number(b);
        }).map(function (id) {
          return [Number(id), counts[id]];
        }));
      }
      function distributeGoods(shelves, ids, maxId) {
        if (!Number.isInteger(maxId) || maxId <= 0 || new Set(shelves.map(function (s) {
          return s.id;
        })).size !== shelves.length) return null;
        var remaining = ids.filter(function (id) {
          return validGoodsId(id, maxId);
        });
        ArrayUtil.shuffle(remaining);
        var data = {};
        for (var _iterator = _createForOfIteratorHelperLoose(shelves), _step; !(_step = _iterator()).done;) {
          var _shelf = _step.value;
          data[_shelf.id] = _shelf.small ? {
            0: []
          } : {
            0: [],
            1: [],
            2: []
          };
        }
        for (var _iterator2 = _createForOfIteratorHelperLoose(shelves.filter(function (s) {
            return s.small;
          })), _step2; !(_step2 = _iterator2()).done;) {
          var _shelf2 = _step2.value;
          for (var i = 0; i < 3; i++) {
            var _remaining$shift;
            data[_shelf2.id][0].push((_remaining$shift = remaining.shift()) != null ? _remaining$shift : -1);
          }
        }
        var slots = [];
        for (var _iterator3 = _createForOfIteratorHelperLoose(shelves.filter(function (s) {
            return !s.small;
          })), _step3; !(_step3 = _iterator3()).done;) {
          var _shelf3 = _step3.value;
          for (var _slot = 0; _slot < 3; _slot++) slots.push({
            shelf: _shelf3.id,
            slot: _slot
          });
        }
        if (remaining.length && !slots.length) return null;
        var _loop = function _loop() {
            var before = remaining.length;
            var order = slots.map(function (_, i) {
              return i;
            });
            ArrayUtil.shuffle(order);
            var empty = slots.length <= 6 ? 2 : 4 + Math.floor(Math.random() * 2);
            var chosen = new Set(order.slice(0, Math.max(1, slots.length - empty)));
            slots.forEach(function (place, i) {
              var _remaining$shift2;
              return data[place.shelf][place.slot].push(chosen.has(i) ? (_remaining$shift2 = remaining.shift()) != null ? _remaining$shift2 : -1 : -1);
            });
            if (before === remaining.length) return {
              v: null
            };
          },
          _ret;
        while (remaining.length) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
        var allocated = [];
        Object.values(data).forEach(function (s) {
          return Object.values(s).forEach(function (q) {
            return allocated.push.apply(allocated, q);
          });
        });
        return goodsCounts(ids, maxId) === goodsCounts(allocated, maxId) ? data : null;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InputBlock.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, BlockInputEvents, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BlockInputEvents = module.BlockInputEvents;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2;
      cclegacy._RF.push({}, "9b7dfe7eXxHR4G7BQOM8lL3", "InputBlock", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent,
        disallowMultiple = _decorator.disallowMultiple;
      var InputBlock = exports('InputBlock', (_dec = ccclass('Misc/InputBlock'), _dec2 = disallowMultiple(true), _dec3 = requireComponent(BlockInputEvents), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(InputBlock, _Component);
        function InputBlock() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = InputBlock.prototype;
        _proto.onLoad = function onLoad() {
          InputBlock._inst = this;
          InputBlock.Active = false;
        };
        InputBlock.setActive = function setActive(duration) {
          this._inst.unscheduleAllCallbacks();
          this.Active = true;
          this._inst.scheduleOnce(function () {
            InputBlock.Active = false;
          }, duration);
        };
        _createClass(InputBlock, null, [{
          key: "Active",
          set: function set(v) {
            this._inst.node.active = v;
          }
        }]);
        return InputBlock;
      }(Component), _class2._inst = void 0, _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CfgItem.ts', './GameSave.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, CfgItem, GameSave, failure, success;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CfgItem = module.CfgItem;
    }, function (module) {
      GameSave = module.GameSave;
      failure = module.failure;
      success = module.success;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8a5f49UPdhHBq9JLMhh6us4", "ItemMgr", undefined);
      var ItemMgr = exports('ItemMgr', /*#__PURE__*/function () {
        function ItemMgr() {}
        ItemMgr.getCnt = function getCnt(id) {
          var _GameSave$Data$items$, _GameSave$Data;
          return (_GameSave$Data$items$ = (_GameSave$Data = GameSave.Data) == null ? void 0 : _GameSave$Data.items[id]) != null ? _GameSave$Data$items$ : 0;
        };
        ItemMgr.getType = function getType(id) {
          var _CfgItem$id;
          return (_CfgItem$id = CfgItem[id]) == null ? void 0 : _CfgItem$id.type;
        }

        /** Only mutate a transaction draft; the caller commits inventory and source markers together. */;
        ItemMgr.applyTo = function applyTo(next, rewards, coinCost) {
          if (coinCost === void 0) {
            coinCost = 0;
          }
          if (!Number.isSafeInteger(coinCost) || coinCost < 0 || !rewards.length || rewards.some(function (r) {
            return !Number.isInteger(r.itemId) || !CfgItem[r.itemId] || !Number.isSafeInteger(r.cnt) || r.cnt <= 0;
          })) return failure('invalid_config');
          if (next.items[0] < coinCost) return failure('insufficient_coins');
          next.items[0] -= coinCost;
          for (var _iterator = _createForOfIteratorHelperLoose(rewards), _step; !(_step = _iterator()).done;) {
            var reward = _step.value;
            next.items[reward.itemId] += reward.cnt;
          }
          next.items[0] = Math.min(9999999, next.items[0]);
          return success();
        };
        ItemMgr.tryApplyRewards = function tryApplyRewards(rewards, coinCost) {
          var _this = this;
          if (coinCost === void 0) {
            coinCost = 0;
          }
          return GameSave.transact(function (next) {
            return _this.applyTo(next, rewards, coinCost);
          });
        };
        return ItemMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "41e94mhPxZNyIeHSVzn2TyK", "ItemType", undefined);
      var ItemType = exports('ItemType', /*#__PURE__*/function (ItemType) {
        ItemType[ItemType["Coin"] = 0] = "Coin";
        ItemType[ItemType["Skill"] = 1] = "Skill";
        ItemType[ItemType["Collection"] = 2] = "Collection";
        return ItemType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LabelTick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, CCInteger, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      CCInteger = module.CCInteger;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "51142RfrX9DBphTxuZVxIcR", "LabelTick", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var LabelTick = exports('LabelTick', (_dec = ccclass("UIExtend/LabelTick"), _dec2 = requireComponent(Label), _dec3 = property(CCInteger), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LabelTick, _Component);
        function LabelTick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefix", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "suffix", _descriptor2, _assertThisInitialized(_this));
          //保留小数点后几位
          _initializerDefineProperty(_this, "decimalPlaces", _descriptor3, _assertThisInitialized(_this));
          _this.label = null;
          _this.curNumber = 0;
          _this.intervalPerUpdate = 0;
          _this.finalNumber = 0;
          return _this;
        }
        var _proto = LabelTick.prototype;
        _proto.onLoad = function onLoad() {
          this.label = this.getComponent(Label);
        };
        _proto.onEnable = function onEnable() {};
        _proto.onDisable = function onDisable() {
          this.unscheduleAllCallbacks();
        };
        _proto.init = function init(n) {
          this.curNumber = n;
          this.label.string = "" + this.prefix + this.curNumber.toFixed(this.decimalPlaces) + this.suffix;
        };
        _proto.tickLabel = function tickLabel(finalNumber, duration) {
          if (duration === void 0) {
            duration = 0.5;
          }
          if (this.curNumber === finalNumber) {
            this.curNumber = finalNumber;
            this.finalNumber = finalNumber;
            this.label.string = "" + this.prefix + this.finalNumber.toFixed(this.decimalPlaces) + this.suffix;
          } else {
            this.finalNumber = finalNumber;
            this.intervalPerUpdate = (finalNumber - this.curNumber) / (duration * 33);
            this.unschedule(this.updateForNumber);
            this.schedule(this.updateForNumber, 0.03);
            this.label.string = "" + this.prefix + this.curNumber.toFixed(this.decimalPlaces) + this.suffix;
          }
        };
        _proto.updateForNumber = function updateForNumber(dt) {
          this.curNumber += this.intervalPerUpdate;
          if (this.intervalPerUpdate > 0 && this.curNumber > this.finalNumber || this.intervalPerUpdate < 0 && this.curNumber < this.finalNumber) {
            this.curNumber = this.finalNumber;
            this.unschedule(this.updateForNumber);
          }
          this.label.string = "" + this.prefix + this.curNumber.toFixed(this.decimalPlaces) + this.suffix;
        };
        _proto.stop = function stop() {
          this.unschedule(this.updateForNumber);
          this.curNumber = null;
          this.finalNumber = null;
        };
        return LabelTick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefix", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "suffix", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "decimalPlaces", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Global.ts', './Main.ts', './Setting.ts', './CfgCombo.ts', './CfgItem.ts', './CfgLoginReward.ts', './CfgLuckySpin.ts', './CfgSkillInfo.ts', './cfg_icon.ts', './cfg_level.ts', './cfg_passReward.ts', './CustomComponent.ts', './CustomNode.ts', './CustomSprite.ts', './DtoIconCfg.ts', './DtoIconData.ts', './DtoItem.ts', './DtoLevelCfg.ts', './DtoLevelData.ts', './DtoPassReward.ts', './DtoReward.ts', './DtoUI.ts', './Bundle.ts', './EventType.ts', './ItemType.ts', './Mode.ts', './ShelveType.ts', './SkillType.ts', './UI.ts', './UIType.ts', './BoardLayout.ts', './ComboBox.ts', './CommonShelve.ts', './EffectFreeze.ts', './EffectRedAlert.ts', './Goods.ts', './GoodsLayout.ts', './ShelveLocker.ts', './SkillBox.ts', './SmallShelve.ts', './Stage.ts', './AudioMgr.ts', './CoinMgr.ts', './ComboMgr.ts', './EffectMgr.ts', './EventMgr.ts', './GameMgr.ts', './GameSave.ts', './ItemMgr.ts', './RecoveryMgr.ts', './ResMgr.ts', './RewardMgr.ts', './SkillMgr.ts', './TimeMgr.ts', './TransMgr.ts', './UIMgr.ts', './Breath.ts', './Floaty.ts', './InputBlock.ts', './Rotate.ts', './Shake.ts', './ShelveBase.ts', './UIBase.ts', './UIGame.ts', './UIGetReward.ts', './UIGetSkill.ts', './UILoading.ts', './UILoginReward.ts', './UILuckySpin.ts', './UIMain.ts', './UIPassReward.ts', './UIPause.ts', './UIRecovery.ts', './UISetting.ts', './UIStageTip.ts', './UITimeOut.ts', './UIToast.ts', './UIWin.ts', './BtnExtend.ts', './LabelTick.ts', './Switcher.ts', './ToggleExtend.ts', './CoinItem.ts', './MainItem.ts', './PassRewardItem.ts', './TimeItem.ts', './ArrayUtil.ts', './Debug.ts', './GameUtil.ts', './MathUtil.ts', './ObjUtil.ts', './TimeUtil.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UI.ts', './Bundle.ts', './ResMgr.ts', './UIMgr.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, view, ResolutionPolicy, UI, Bundle, ResMgr, UIMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      UIMgr = module.UIMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "92bdbvKAAdD+ZRAMRSW3Jtb", "Main", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Scene/Main'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Main, _Component);
        function Main() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = Main.prototype;
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // The home/loading UI uses the same portrait frame as gameplay, including on desktop.
                  view.setResolutionPolicy(ResolutionPolicy.SHOW_ALL);
                  _context.next = 3;
                  return ResMgr.loadDir(Bundle.Resources);
                case 3:
                  UIMgr.open(UI.Loading, null, {
                    uiBundle: Bundle.Resources
                  });
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        return Main;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MainItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Mode.ts', './GameMgr.ts', './TransMgr.ts', './UIMgr.ts', './UI.ts', './RecoveryMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Enum, Component, Mode, GameMgr, TransMgr, UIMgr, UI, RecoveryMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Enum = module.Enum;
      Component = module.Component;
    }, function (module) {
      Mode = module.Mode;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      TransMgr = module.TransMgr;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "c23355pf51HnrCLBl2fKRjQ", "MainItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MainItem = exports('MainItem', (_dec = ccclass('UIItem/MainItem'), _dec2 = property(Node), _dec3 = property({
        type: Enum(Mode)
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MainItem, _Component);
        function MainItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "tip", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mode", _descriptor2, _assertThisInitialized(_this));
          _this.btnStart = null;
          _this.btnUnlock = null;
          return _this;
        }
        var _proto = MainItem.prototype;
        _proto.onLoad = function onLoad() {
          this.btnStart = this.node.getChildByName('BtnStart');
          this.btnUnlock = this.node.getChildByName('BtnUnlock');
        };
        _proto.start = function start() {
          this.updateState();
        };
        _proto.updateState = function updateState() {
          this.tip.active = false;
          this.btnUnlock.active = false;
        };
        _proto.onBtnStartClick = /*#__PURE__*/function () {
          var _onBtnStartClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!GameMgr.leavingHome) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  GameMgr.leavingHome = true;
                  _context.next = 5;
                  return TransMgr.Inst.fadeIn();
                case 5:
                  TransMgr.Inst.fadeOut();
                  UIMgr.close(UI.Main);
                  GameMgr.mode = this.mode;
                  GameMgr.startGame();
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onBtnStartClick() {
            return _onBtnStartClick.apply(this, arguments);
          }
          return onBtnStartClick;
        }();
        _proto.onBtnUnlockClick = function onBtnUnlockClick() {
          var _this2 = this;
          var commit = function commit() {
            return GameMgr.unlockMode(_this2.mode);
          };
          var result = commit();
          if (result.ok) this.updateState();else RecoveryMgr.retry(commit, function () {
            return _this2.updateState();
          });
        };
        return MainItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Mode.tp;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  var cclegacy, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c0d0eKNUodPMpvHFwYAailX", "MathUtil", undefined);
      var MathUtil = exports('MathUtil', /*#__PURE__*/function () {
        function MathUtil() {}
        MathUtil.IsInRange = function IsInRange(v, min, max) {
          if (v < min) return false;
          if (v > max) return false;
          return true;
        };
        MathUtil.randWeight = function randWeight(weight_arr) {
          if (!(weight_arr != null && weight_arr.length) || weight_arr.some(function (w) {
            return !Number.isFinite(w) || w < 0;
          })) return -1;
          var total = weight_arr.reduce(function (sum, weight) {
            return sum + weight;
          }, 0);
          if (!Number.isFinite(total) || total <= 0) return -1;
          var remaining = math.randomRange(0, total);
          for (var i = 0; i < weight_arr.length; i++) {
            if (weight_arr[i] > 0 && remaining < weight_arr[i]) return i;
            remaining -= weight_arr[i];
          }
          return -1;
        };
        return MathUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Mode.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "51e1axOM+VCwrP9FDuFyide", "Mode", undefined);
      var Mode = exports('Mode', /*#__PURE__*/function (Mode) {
        Mode[Mode["tp"] = 0] = "tp";
        Mode[Mode["gs"] = 1] = "gs";
        Mode[Mode["ls"] = 2] = "ls";
        return Mode;
      }({}));
      var ModeName = exports('ModeName', ['tp', 'gs', 'ls']);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObjUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f8d2eYTnyVHsraF02+wD5vV", "ObjUtil", undefined);
      var ObjUtil = exports('ObjUtil', /*#__PURE__*/function () {
        function ObjUtil() {}
        ObjUtil.has = function has(obj, key) {
          if (!obj) return false;
          return obj.hasOwnProperty(key);
        };
        ObjUtil.get = function get(obj, key, defaultValue) {
          if (!obj) return defaultValue;
          if (!obj.hasOwnProperty(key)) return defaultValue;
          return obj[key];
        };
        return ObjUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PassRewardItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './RewardMgr.ts', './EventMgr.ts', './EventType.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ProgressBar, Label, Component, GameMgr, RewardMgr, EventMgr, EventType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "9dcc4Z2wSFM/LXwf99wJrU6", "PassRewardItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PassRewardItem = exports('PassRewardItem', (_dec = ccclass('UIItem/PassRewardItem'), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PassRewardItem, _Component);
        function PassRewardItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "progressBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lbProgress", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = PassRewardItem.prototype;
        _proto.onLoad = function onLoad() {
          EventMgr.on(EventType.GetPassReward, this.onUpdateState, this);
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.off(EventType.GetPassReward, this.onUpdateState, this);
        };
        _proto.start = function start() {
          this.onUpdateState();
        };
        _proto.onUpdateState = function onUpdateState() {
          var target = RewardMgr.NextPassTarget;
          var progress = Math.min(GameMgr.CurPassedLevel, target);
          this.progressBar.progress = progress / target;
          this.lbProgress.string = progress + "/" + target;
        };
        return PassRewardItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RecoveryMgr.ts", ['cc', './EventMgr.ts', './EventType.ts', './UI.ts', './GameSave.ts'], function (exports) {
  var cclegacy, EventMgr, EventType, UI, success;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      success = module.success;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78b3bfzHvVJpo8cicf+bJeK", "RecoveryMgr", undefined);
      var RecoveryMgr = exports('RecoveryMgr', /*#__PURE__*/function () {
        function RecoveryMgr() {}
        RecoveryMgr.message = function message(reason) {
          var _storage_error$corrup;
          return (_storage_error$corrup = {
            storage_error: '无法保存进度，请重试。',
            corrupt_save: '存档无法读取，可重试或新建存档。',
            insufficient_coins: '星星币不足，消除商品或通关可获得。',
            invalid_config: '当前配置异常，请返回后重试。',
            unavailable: '当前无法执行此操作。'
          }[reason]) != null ? _storage_error$corrup : '操作未完成，请重试。';
        };
        RecoveryMgr.show = function show(options) {
          EventMgr.emit(EventType.OpenUI, UI.Recovery, options);
        };
        RecoveryMgr.retry = function retry(_retry, onSuccess, message) {
          if (message === void 0) {
            message = '无法保存进度，请重试。';
          }
          this.show({
            title: '操作未完成',
            message: message,
            actions: [{
              label: '重试保存',
              run: _retry,
              onSuccess: onSuccess
            }, {
              label: '返回',
              run: function run() {
                return success();
              }
            }]
          });
        };
        return RecoveryMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ArrayUtil.ts', './Debug.ts'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, assetManager, ArrayUtil, Debug;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }, function (module) {
      Debug = module.Debug;
    }],
    execute: function () {
      cclegacy._RF.push({}, "18c3dVw309B54avl/M3OpJz", "ResMgr", undefined);
      var Tag = 'ResMgr';
      var ResMgr = exports('ResMgr', /*#__PURE__*/function () {
        function ResMgr() {}
        ResMgr.loadBundle = function loadBundle(Bundle, onComplete) {
          if (onComplete === void 0) {
            onComplete = null;
          }
          return new Promise(function (resolve, reject) {
            var startTime = Date.now();
            if (assetManager.getBundle(Bundle)) {
              Debug.Warn(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u5DF2\u52A0\u8F7D,\u65E0\u9700\u91CD\u590D\u52A0\u8F7D");
              resolve(assetManager.getBundle(Bundle));
            } else {
              Debug.Log(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u5F00\u59CB\u52A0\u8F7D");
              assetManager.loadBundle(Bundle, function (err, bundle) {
                if (err) {
                  Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u52A0\u8F7D\u5931\u8D25 err:" + err);
                  reject(err);
                } else {
                  var endTime = Date.now();
                  Debug.Log(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u52A0\u8F7D\u5B8C\u6BD5,\u7528\u65F6" + (endTime - startTime) + "ms");
                  onComplete && onComplete(bundle);
                  resolve(bundle);
                }
              });
            }
          });
        };
        ResMgr.preloadDir = /*#__PURE__*/function () {
          var _preloadDir = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(Bundle, dir) {
            var bundle;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (dir === void 0) {
                    dir = "./";
                  }
                  // Await before creating the callback promise so bundle failures reject the caller.
                  bundle = assetManager.getBundle(Bundle);
                  if (bundle) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 5;
                  return this.loadBundle(Bundle);
                case 5:
                  bundle = _context.sent;
                case 6:
                  return _context.abrupt("return", new Promise(function (resolve, reject) {
                    Debug.Log(Tag, "\u5F00\u59CB\u9884\u52A0\u8F7D\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir);
                    var startTime = Date.now();
                    bundle.preloadDir(dir, function (err, items) {
                      if (err) {
                        Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir + "\u9884\u52A0\u8F7D\u5931\u8D25,err:" + err);
                        reject(err);
                      } else {
                        var endTime = Date.now();
                        Debug.Log(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir + "\u9884\u52A0\u8F7D\u5B8C\u6BD5,\u7528\u65F6" + (endTime - startTime) + "ms");
                        resolve();
                      }
                    });
                  }));
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function preloadDir(_x, _x2) {
            return _preloadDir.apply(this, arguments);
          }
          return preloadDir;
        }();
        ResMgr.loadDir = /*#__PURE__*/function () {
          var _loadDir = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(Bundle, dir, ref) {
            var _this = this;
            var bundle;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (dir === void 0) {
                    dir = "./";
                  }
                  if (ref === void 0) {
                    ref = false;
                  }
                  // Await before creating the callback promise so bundle failures reject the caller.
                  bundle = assetManager.getBundle(Bundle);
                  if (bundle) {
                    _context2.next = 7;
                    break;
                  }
                  _context2.next = 6;
                  return this.loadBundle(Bundle);
                case 6:
                  bundle = _context2.sent;
                case 7:
                  return _context2.abrupt("return", new Promise(function (resolve, reject) {
                    Debug.Log(Tag, "\u5F00\u59CB\u52A0\u8F7D\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir);
                    var startTime = Date.now();
                    bundle.loadDir(dir, function (err, assets) {
                      if (err) {
                        Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir + "\u52A0\u8F7D\u5931\u8D25,err:" + err);
                        reject(err);
                      } else {
                        if (ref) {
                          if (!_this._loadedRefRes.hasOwnProperty(Bundle)) {
                            _this._loadedRefRes[Bundle] = [];
                          }
                          for (var i = 0; i < assets.length; i++) {
                            var asset = assets[i];
                            if (!ArrayUtil.has(_this._loadedRefRes[Bundle], asset)) {
                              _this._loadedRefRes[Bundle].push(asset);
                              asset.addRef();
                            }
                          }
                        }
                        var endTime = Date.now();
                        Debug.Log(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6\u5939" + dir + "\u52A0\u8F7D\u5B8C\u6BD5,\u7528\u65F6" + (endTime - startTime) + "ms");
                        resolve();
                      }
                    });
                  }));
                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function loadDir(_x3, _x4, _x5) {
            return _loadDir.apply(this, arguments);
          }
          return loadDir;
        }();
        ResMgr.loadRes = /*#__PURE__*/function () {
          var _loadRes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(Bundle, resName, relative_path, ref) {
            var _this2 = this;
            var bundle;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (relative_path === void 0) {
                    relative_path = "";
                  }
                  if (ref === void 0) {
                    ref = false;
                  }
                  // Await before creating the callback promise so bundle failures reject the caller.
                  bundle = assetManager.getBundle(Bundle);
                  if (bundle) {
                    _context3.next = 7;
                    break;
                  }
                  _context3.next = 6;
                  return this.loadBundle(Bundle);
                case 6:
                  bundle = _context3.sent;
                case 7:
                  return _context3.abrupt("return", new Promise(function (resolve, reject) {
                    var path = relative_path + resName;
                    Debug.Log(Tag, "\u5F00\u59CB\u52A0\u8F7D\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6" + path);
                    var startTime = Date.now();
                    bundle.load(path, function (err, asset) {
                      if (err) {
                        Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6" + path + "\u52A0\u8F7D\u5931\u8D25,err:" + err);
                        reject(err);
                      } else {
                        var endTime = Date.now();
                        if (ref) {
                          if (!_this2._loadedRefRes.hasOwnProperty(Bundle)) {
                            _this2._loadedRefRes[Bundle] = [];
                          }
                          if (!ArrayUtil.has(_this2._loadedRefRes[Bundle], asset)) {
                            _this2._loadedRefRes[Bundle].push(asset);
                            asset.addRef();
                          }
                        }
                        Debug.Log(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u4E0B\u7684\u6587\u4EF6" + path + "\u52A0\u8F7D\u5B8C\u6BD5,\u7528\u65F6" + (endTime - startTime) + "ms");
                        resolve(asset);
                      }
                    });
                  }));
                case 8:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function loadRes(_x6, _x7, _x8, _x9) {
            return _loadRes.apply(this, arguments);
          }
          return loadRes;
        }();
        ResMgr.getRes = function getRes(Bundle, resName, relative_path) {
          if (relative_path === void 0) {
            relative_path = "";
          }
          var bundle = assetManager.getBundle(Bundle);
          if (!bundle) {
            Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u6682\u672A\u52A0\u8F7D,\u65E0\u6CD5\u83B7\u53D6\u8D44\u6E90" + resName);
            return null;
          }
          var path = relative_path + resName;
          var res = bundle.get(path);
          if (!res) {
            Debug.Warn(Tag, '资源获取失败', path);
          }
          return res;
        };
        ResMgr.isLoaded = function isLoaded(Bundle, resName, relative_path) {
          if (relative_path === void 0) {
            relative_path = "";
          }
          var bundle = assetManager.getBundle(Bundle);
          if (!bundle) {
            Debug.Error(Tag, "\u8D44\u6E90\u5305" + Bundle + "\u6682\u672A\u52A0\u8F7D");
            return false;
          }
          var path = relative_path + resName;
          return !!bundle.get(path);
        };
        ResMgr.release = function release(Bundle) {
          if (!this._loadedRefRes.hasOwnProperty(Bundle)) {
            Debug.Warn(this.name, "\u6682\u672A\u8BB0\u5F55\u8D44\u6E90\u5305" + Bundle + "\u4E2D\u4EFB\u4F55\u8D44\u6E90\uFF0C\u65E0\u9700\u91CA\u653E");
            return;
          }
          var assets = this._loadedRefRes[Bundle];
          var len = assets.length;
          for (var i = 0; i < len; i++) {
            var asset = assets[i];
            if (!asset.isValid) {
              Debug.Warn(this.name, "\u5FFD\u7565\u65E0\u6548\u8D44\u6E90," + asset.name + ":" + asset.uuid);
              continue;
            }
            asset.decRef();
          }
          delete this._loadedRefRes[Bundle];
          Debug.Log(this.name, "\u91CA\u653E\u8D44\u6E90\u5305" + Bundle + "\u4E2D\u7684" + len + "\u4E2A\u8D44\u6E90");
        };
        ResMgr.getSpriteFrame = function getSpriteFrame(Bundle, resName, relative_path) {
          if (relative_path === void 0) {
            relative_path = "";
          }
          return this.getRes(Bundle, resName + "/spriteFrame", relative_path);
        };
        _createClass(ResMgr, null, [{
          key: "Assets",
          get: function get() {
            return assetManager.assets;
          }
        }, {
          key: "LoadedRes",
          get: function get() {
            return this._loadedRefRes;
          }
        }]);
        return ResMgr;
      }());
      ResMgr._loadedRefRes = {};
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RewardMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CfgLoginReward.ts', './CfgLuckySpin.ts', './cfg_passReward.ts', './Global.ts', './MathUtil.ts', './GameSave.ts', './ItemMgr.ts'], function (exports) {
  var _createClass, cclegacy, CfgLoginReward, CfgLuckySpin, CfgPassReward, Global, MathUtil, GameSave, failure, success, ItemMgr;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CfgLoginReward = module.CfgLoginReward;
    }, function (module) {
      CfgLuckySpin = module.CfgLuckySpin;
    }, function (module) {
      CfgPassReward = module.CfgPassReward;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      MathUtil = module.MathUtil;
    }, function (module) {
      GameSave = module.GameSave;
      failure = module.failure;
      success = module.success;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e9b11WOJXRM353UWyH5IdTr", "RewardMgr", undefined);
      var RewardMgr = exports('RewardMgr', /*#__PURE__*/function () {
        function RewardMgr() {}
        RewardMgr.day = function day(now) {
          var date = new Date(now);
          return date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
        };
        RewardMgr.canClaimDaily = function canClaimDaily(now) {
          if (now === void 0) {
            now = Date.now();
          }
          return !!GameSave.Data && GameSave.Data.dailyClaimDate !== this.day(now);
        };
        RewardMgr.claimDaily = function claimDaily(now) {
          if (now === void 0) {
            now = Date.now();
          }
          var day = this.day(now);
          var rewards = CfgLoginReward.map(function (_ref) {
            var itemId = _ref.itemId,
              cnt = _ref.cnt;
            return {
              itemId: itemId,
              cnt: cnt
            };
          });
          return GameSave.transact(function (next) {
            if (next.dailyClaimDate === day) return failure('unavailable');
            var applied = ItemMgr.applyTo(next, rewards);
            if (!applied.ok) return failure(applied.reason);
            next.dailyClaimDate = day;
            return success(rewards);
          });
        };
        RewardMgr.claimPassReward = function claimPassReward() {
          var idx = MathUtil.randWeight(CfgPassReward.map(function (r) {
            return r.weight;
          }));
          var reward = CfgPassReward[idx];
          if (!reward) return failure('invalid_config');
          var rewards = [{
            itemId: reward.itemId,
            cnt: reward.cnt
          }];
          return GameSave.transact(function (next) {
            var target = next.lastPassReward + 5;
            if (next.levels.reduce(function (a, b) {
              return a + b;
            }, 0) < target) return failure('unavailable');
            var applied = ItemMgr.applyTo(next, rewards);
            if (!applied.ok) return failure(applied.reason);
            next.lastPassReward = target;
            return success(rewards);
          });
        };
        RewardMgr.claimSpinReward = function claimSpinReward(index) {
          var reward = CfgLuckySpin[index];
          if (!Number.isInteger(index) || !reward) return failure('invalid_config');
          var rewards = [{
            itemId: reward.itemId,
            cnt: reward.cnt
          }];
          var result = ItemMgr.tryApplyRewards(rewards, Global.Lucky_Spin_Coin_Cost);
          return result.ok ? success(rewards) : failure(result.reason);
        };
        RewardMgr.rollWinReward = function rollWinReward(levelIndex) {
          var slotIndex = MathUtil.randWeight([5, 1, 1, 1, 1]);
          if (slotIndex < 0) return null;
          var multiplier = [2, 3, 5, 3, 4][slotIndex];
          var base = Global.Normal_Level_Coin_Default_Cnt + levelIndex * Global.Normal_Level_Coin_Add_Cnt;
          return {
            slotIndex: slotIndex,
            multiplier: multiplier,
            amount: base * multiplier
          };
        };
        _createClass(RewardMgr, null, [{
          key: "NextPassTarget",
          get: function get() {
            var _GameSave$Data$lastPa, _GameSave$Data;
            return ((_GameSave$Data$lastPa = (_GameSave$Data = GameSave.Data) == null ? void 0 : _GameSave$Data.lastPassReward) != null ? _GameSave$Data$lastPa : 0) + 5;
          }
        }]);
        return RewardMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Rotate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "6b9acTOKxRPKb2/9uu/YoaF", "Rotate", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Rotate = exports('Rotate', (_dec = ccclass('Misc/Rotate'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Rotate, _Component);
        function Rotate() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "rotate_speed", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Rotate.prototype;
        _proto.update = function update(deltaTime) {
          this.node.angle += this.rotate_speed * deltaTime;
        };
        return Rotate;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "rotate_speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Setting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameSave.ts'], function (exports) {
  var _createClass, cclegacy, GameSave, success;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameSave = module.GameSave;
      success = module.success;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0e05aoaPd5CY4kLpLQPu/rr", "Setting", undefined);
      var Setting = exports('Setting', /*#__PURE__*/function () {
        function Setting() {}
        Setting.set = function set(key, value) {
          return GameSave.transact(function (next) {
            next.settings[key] = value;
            return success();
          });
        };
        _createClass(Setting, null, [{
          key: "VibrateEnabled",
          get: function get() {
            var _GameSave$Data$settin, _GameSave$Data;
            return (_GameSave$Data$settin = (_GameSave$Data = GameSave.Data) == null ? void 0 : _GameSave$Data.settings.vibrateEnabled) != null ? _GameSave$Data$settin : true;
          }
        }, {
          key: "SfxEnabled",
          get: function get() {
            var _GameSave$Data$settin2, _GameSave$Data2;
            return (_GameSave$Data$settin2 = (_GameSave$Data2 = GameSave.Data) == null ? void 0 : _GameSave$Data2.settings.sfxEnabled) != null ? _GameSave$Data$settin2 : true;
          }
        }, {
          key: "BgmEnabled",
          get: function get() {
            var _GameSave$Data$settin3, _GameSave$Data3;
            return (_GameSave$Data$settin3 = (_GameSave$Data3 = GameSave.Data) == null ? void 0 : _GameSave$Data3.settings.bgmEnabled) != null ? _GameSave$Data$settin3 : true;
          }
        }]);
        return Setting;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Shake.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "2840flXNXFIw61GRpqk0Yl7", "Shake", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Shake = exports('Shake', (_dec = ccclass('Misc/Shake'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Shake, _Component);
        function Shake() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "shakeAngle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shakeInterval", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "delay", _descriptor3, _assertThisInitialized(_this));
          _this.tw = null;
          return _this;
        }
        var _proto = Shake.prototype;
        _proto.onEnable = function onEnable() {
          this.tw = tween(this.node);
          this.tw.sequence(tween(this.node).delay(this.delay), tween(this.node).to(this.shakeInterval, {
            angle: this.shakeAngle
          }), tween(this.node).to(this.shakeInterval, {
            angle: -this.shakeAngle
          }), tween(this.node).to(this.shakeInterval, {
            angle: this.shakeAngle
          }), tween(this.node).to(this.shakeInterval, {
            angle: -this.shakeAngle
          }), tween(this.node).to(this.shakeInterval, {
            angle: 0
          })).repeatForever().start();
        };
        _proto.onDisable = function onDisable() {
          this.node.angle = 0;
          this.tw.stop();
          this.tw = null;
        };
        return Shake;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "shakeAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shakeInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShelveBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventType.ts', './EventMgr.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, Component, EventType, EventMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      EventMgr = module.EventMgr;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "04238mGxFJID6A6C9vG2iZQ", "ShelveBase", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShelveBase = exports('ShelveBase', (_dec = ccclass('ScriptBase/ShelveBase'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShelveBase, _Component);
        function ShelveBase() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.id = 0;
          return _this;
        }
        var _proto = ShelveBase.prototype;
        _proto.onLoad = function onLoad() {
          this.id = this.node.getSiblingIndex();
          EventMgr.on(EventType.PlaceGoods, this.onPlaceGoods, this);
        };
        _proto.start = function start() {};
        _proto.onDestroy = function onDestroy() {
          this.unscheduleAllCallbacks();
          EventMgr.off(EventType.PlaceGoods, this.onPlaceGoods, this);
        };
        _proto.init = function init(bounceDelay) {};
        _proto.getSlot = function getSlot(pos) {
          return 0;
        };
        _proto.onPlaceGoods = function onPlaceGoods() {};
        _proto.isSlotOccupied = function isSlotOccupied(slotId) {
          return false;
        };
        _proto.isAllSlotOccupied = function isAllSlotOccupied() {
          return false;
        };
        _proto.createGoods = function createGoods(goodsId, slotId, layer) {};
        _proto.placeGoods = function placeGoods(goodsId, slotId) {};
        _proto.createLayerGoods = function createLayerGoods(layer, bounceDelay) {};
        _proto.removeGoods = function removeGoods(goods) {};
        _proto.clear = function clear() {};
        _createClass(ShelveBase, [{
          key: "Id",
          get: function get() {
            return this.id;
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return false;
          }
        }, {
          key: "GoodsIdArr",
          get: function get() {
            return [];
          }
        }, {
          key: "GoodsInfo",
          get: function get() {
            return null;
          }
        }]);
        return ShelveBase;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShelveLocker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './EventMgr.ts', './EventType.ts', './ArrayUtil.ts', './ResMgr.ts', './Bundle.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Label, Sprite, tween, v3, UIOpacity, Component, GameMgr, EventMgr, EventType, ArrayUtil, ResMgr, Bundle;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Sprite = module.Sprite;
      tween = module.tween;
      v3 = module.v3;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "2b95fT+AlBNDITnn29g4dF4", "ShelveLocker", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ShelveLocker = exports('ShelveLocker', (_dec = ccclass('Game/ShelveLocker'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShelveLocker, _Component);
        function ShelveLocker() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "lbBg", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lbCnt", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "glass", _descriptor3, _assertThisInitialized(_this));
          // @property(Button)
          // private btnUnlock: Button = null
          _initializerDefineProperty(_this, "chain", _descriptor4, _assertThisInitialized(_this));
          _this.unlockCnt = 0;
          return _this;
        }
        var _proto = ShelveLocker.prototype;
        _proto.onLoad = function onLoad() {
          this.lbCnt = this.getComponentInChildren(Label);
          this.glass = this.node.getChildByName('Glass').getComponent(Sprite);
          GameMgr.shelveLockerArr.push(this);
          EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this);
        };
        _proto.onDestroy = function onDestroy() {
          ArrayUtil.remove(GameMgr.shelveLockerArr, this);
          EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this);
        };
        _proto.onMergeGoods = function onMergeGoods() {
          if (this !== GameMgr.shelveLockerArr[0]) return;
          this.UnlockCnt--;
        };
        _proto.onBtnUnlockClick = function onBtnUnlockClick() {
          // this.UnlockCnt = 0
        };
        _createClass(ShelveLocker, [{
          key: "UnlockCnt",
          get: function get() {
            return this.unlockCnt;
          },
          set: function set(v) {
            var _this2 = this;
            this.unlockCnt = Math.max(0, v);
            this.lbCnt.string = "" + v;
            var spfName = this.unlockCnt === 1 ? 'bl2' : 'bl1';
            this.glass.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, spfName, 'image/');
            if (this.unlockCnt > 0) return;
            // this.btnUnlock.interactable = false
            this.lbBg.active = false;
            this.lbCnt.node.active = false;
            this.glass.node.active = false;
            // tween(this.btnUnlock.node).by(0.5, { position: v3(0, 50, 0) }).start()
            // const btnOpacity: UIOpacity = this.btnUnlock.addComponent(UIOpacity)
            // tween(btnOpacity).to(0.5, { opacity: 0 }).start()

            tween(this.chain).by(0.5, {
              position: v3(0, -50, 0)
            }).start();
            var chainOpacity = this.chain.addComponent(UIOpacity);
            tween(chainOpacity).to(0.5, {
              opacity: 0
            }).start();
            this.scheduleOnce(function () {
              _this2.node.destroy();
            }, 0.5);
          }
        }]);
        return ShelveLocker;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbCnt", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "glass", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "chain", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShelveType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d2131w1y1xCTZl85kBVVdmb", "ShelveType", undefined);
      var ShelveType = exports('ShelveType', /*#__PURE__*/function (ShelveType) {
        ShelveType[ShelveType["Empty"] = 0] = "Empty";
        ShelveType[ShelveType["Common"] = 1] = "Common";
        return ShelveType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkillBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SkillMgr.ts', './SkillType.ts', './UIMgr.ts', './UI.ts', './EventMgr.ts', './EventType.ts', './ResMgr.ts', './Bundle.ts', './CfgSkillInfo.ts', './GameMgr.ts', './Shake.ts', './Breath.ts', './RecoveryMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, macro, Node, Sprite, tween, v3, Component, SkillMgr, SkillType, UIMgr, UI, EventMgr, EventType, ResMgr, Bundle, CfgSkillInfo, GameMgr, Shake, Breath, RecoveryMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      macro = module.macro;
      Node = module.Node;
      Sprite = module.Sprite;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      SkillMgr = module.SkillMgr;
    }, function (module) {
      SkillType = module.SkillType;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      CfgSkillInfo = module.CfgSkillInfo;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      Shake = module.Shake;
    }, function (module) {
      Breath = module.Breath;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "91afeFPhJ5NMIErfu4XaCg6", "SkillBox", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SkillBox = exports('SkillBox', (_dec = ccclass('Game/SkillBox'), _dec2 = property([Label]), _dec3 = property(Breath), _dec4 = property(Shake), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SkillBox, _Component);
        function SkillBox() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "skillCntTips", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tipBreath", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "iconShake", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SkillBox.prototype;
        _proto.onLoad = function onLoad() {
          EventMgr.on(EventType.UpdateSkillCnt, this.onUpdateSkillCnt, this);
          EventMgr.on(EventType.AddSkill, this.onAddSkill, this);
        };
        _proto.start = function start() {
          for (var i = 0; i < this.skillCntTips.length; i++) {
            var skillCntTip = this.skillCntTips[i];
            var cnt = SkillMgr.skillCnt(i);
            skillCntTip.string = "" + cnt;
            skillCntTip.node.parent.active = cnt > 0;
          }
          this.schedule(this.onCheckStuck, 1, macro.REPEAT_FOREVER);
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.off(EventType.UpdateSkillCnt, this.onUpdateSkillCnt, this);
          EventMgr.off(EventType.AddSkill, this.onAddSkill, this);
        };
        _proto.onCheckStuck = function onCheckStuck() {
          var isStucked = GameMgr.isStucked;
          this.tipBreath.node.active = isStucked;
          this.tipBreath.enabled = isStucked;
          this.iconShake.enabled = isStucked;
        };
        _proto.onUpdateSkillCnt = function onUpdateSkillCnt(skill, cnt) {
          var skillCntTip = this.skillCntTips[skill];
          skillCntTip.string = "" + cnt;
          skillCntTip.node.parent.active = cnt > 0;
        };
        _proto.onAddSkill = function onAddSkill(skill) {
          var flySkillNode = new Node();
          var sp = flySkillNode.addComponent(Sprite);
          sp.spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, CfgSkillInfo[skill].icon);
          GameMgr.EffectsLayer.addChild(flySkillNode);
          var btnSkillNode = this.node.children[skill];
          var tw = tween(flySkillNode);
          tw.set({
            scale: v3(0, 0, 0)
          });
          tw.to(0.2, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          });
          tw.delay(0.1);
          tw.parallel(tween(flySkillNode).to(0.5, {
            worldPosition: btnSkillNode.worldPosition
          }), tween(flySkillNode).to(0.5, {
            scale: v3(0.5, 0.5, 0.5)
          }));
          tw.call(function () {
            flySkillNode.destroy();
            tween(btnSkillNode).to(0.2, {
              scale: v3(1.2, 1.2, 1)
            }).to(0.2, {
              scale: v3(1, 1, 1)
            }).start();
          });
          tw.start();
        };
        _proto.handleSkill = function handleSkill(skill) {
          if (GameMgr.Pause || GameMgr.IsRefreshing || GameMgr.isPicking) return;
          if (skill === SkillType.DoubleCoin && GameMgr.IsDoubleCoinActive) {
            UIMgr.open(UI.Toast, '效果生效中');
            return;
          }
          if (!SkillMgr.hasSkill(skill)) {
            if (GameMgr.canClaimSkill(skill)) UIMgr.open(UI.GetSkill, skill);else UIMgr.open(UI.Toast, '本局补领已用完');
            return;
          }
          var result = GameMgr.useSkill(skill);
          if (result.ok) return;
          if (result.reason === 'storage_error') GameMgr.recover(function () {
            return GameMgr.useSkill(skill, true);
          }, function () {});else UIMgr.open(UI.Toast, skill === SkillType.RefreshPosition ? '暂时无法刷新，请稍后重试' : RecoveryMgr.message(result.reason));
        };
        _proto.onBtnFreezeTimeClick = function onBtnFreezeTimeClick() {
          this.handleSkill(SkillType.FreezeTime);
        };
        _proto.onBtnEraseOneGroupClick = function onBtnEraseOneGroupClick() {
          this.handleSkill(SkillType.EraseGroup);
        };
        _proto.onBtnRefreshPositionClick = function onBtnRefreshPositionClick() {
          this.handleSkill(SkillType.RefreshPosition);
        };
        _proto.onBtnDoubleCoinClick = function onBtnDoubleCoinClick() {
          this.handleSkill(SkillType.DoubleCoin);
        };
        return SkillBox;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "skillCntTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tipBreath", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iconShake", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkillMgr.ts", ['cc', './CfgItem.ts', './ItemMgr.ts', './EventMgr.ts', './EventType.ts'], function (exports) {
  var cclegacy, CfgItem, ItemMgr, EventMgr, EventType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CfgItem = module.CfgItem;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "504d35+dRRDg7MeOuS5p6nZ", "SkillMgr", undefined);
      var SkillMgr = exports('SkillMgr', /*#__PURE__*/function () {
        function SkillMgr() {}
        SkillMgr.getSkillId = function getSkillId(skill) {
          var _CfgItem$find$id, _CfgItem$find;
          return (_CfgItem$find$id = (_CfgItem$find = CfgItem.find(function (item) {
            return item.skillType === skill;
          })) == null ? void 0 : _CfgItem$find.id) != null ? _CfgItem$find$id : -1;
        };
        SkillMgr.skillCnt = function skillCnt(skill) {
          return ItemMgr.getCnt(this.getSkillId(skill));
        };
        SkillMgr.hasSkill = function hasSkill(skill) {
          return this.skillCnt(skill) > 0;
        };
        SkillMgr.animateAdded = function animateAdded(skill) {
          EventMgr.emit(EventType.AddSkill, skill);
        };
        return SkillMgr;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkillType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "33fdaV78DhHR7dAPW9O4uUX", "SkillType", undefined);
      var SkillType = exports('SkillType', /*#__PURE__*/function (SkillType) {
        SkillType[SkillType["FreezeTime"] = 0] = "FreezeTime";
        SkillType[SkillType["EraseGroup"] = 1] = "EraseGroup";
        SkillType[SkillType["RefreshPosition"] = 2] = "RefreshPosition";
        SkillType[SkillType["DoubleCoin"] = 3] = "DoubleCoin";
        return SkillType;
      }({}));
      var SkillName = exports('SkillName', ['冰冻道具', '灯泡道具', '转换道具', '星星道具']);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SmallShelve.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Bundle.ts', './ResMgr.ts', './Goods.ts', './GameMgr.ts', './ShelveBase.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, ProgressBar, Node, macro, instantiate, v3, Bundle, ResMgr, Goods, GameMgr, ShelveBase, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Node = module.Node;
      macro = module.macro;
      instantiate = module.instantiate;
      v3 = module.v3;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Goods = module.Goods;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      ShelveBase = module.ShelveBase;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "92a17HsV4RFPph7yMxO3f4E", "SmallShelve", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SmallShelve = exports('SmallShelve', (_dec = ccclass('Game/SmallShelve'), _dec2 = property(ProgressBar), _dec3 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_ShelveBase) {
        _inheritsLoose(SmallShelve, _ShelveBase);
        function SmallShelve() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ShelveBase.call.apply(_ShelveBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "progressBar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "layers", _descriptor2, _assertThisInitialized(_this));
          //layer goodsId
          _this.layerGoodsMap = new Map();
          return _this;
        }
        var _proto = SmallShelve.prototype;
        _proto.onLoad = function onLoad() {
          _ShelveBase.prototype.onLoad.call(this);
          GameMgr.shelveArr.push(this);
          globalThis.smallShelve = this;
        };
        _proto.start = function start() {
          _ShelveBase.prototype.start.call(this);
          this.init();
          this.schedule(this.onTrySupplyGoods, 0.25, macro.REPEAT_FOREVER);
        };
        _proto.init = function init(bounceDelay) {
          if (bounceDelay === void 0) {
            bounceDelay = 0;
          }
          this.createLayerGoods(0, bounceDelay);
          this.createLayerGoods(1, bounceDelay);
          this.createLayerGoods(2, bounceDelay);
        };
        _proto.onTrySupplyGoods = function onTrySupplyGoods() {
          if (GameMgr.Pause || GameMgr.IsRefreshing) return;
          for (var i = 0; i < 3; i++) {
            var layerGoods = this.layers[i].getComponentInChildren(Goods);
            if (layerGoods) continue;
            if (i === 2) continue;
            var nextLayer = i + 1;
            var nextLayerGoods = this.layers[nextLayer].getComponentInChildren(Goods);
            if (!nextLayerGoods) continue;
            var nextLayerGoodsPos = nextLayerGoods.node.getPosition();
            nextLayerGoods.Layer = i;
            nextLayerGoods.node.setParent(this.layers[i]);
            nextLayerGoodsPos.y -= Global.Goods_Offset;
            nextLayerGoods.node.setPosition(nextLayerGoodsPos);
            this.layerGoodsMap["delete"](nextLayer);
            this.layerGoodsMap.set(i, nextLayerGoods.Id);
            nextLayerGoods.bounce();
          }
          this.progressBar.progress = this.layerGoodsMap.size / 3;
        };
        _proto.createGoods = function createGoods(goodsId, slotId, layer) {
          if (!Goods.isValidId(goodsId)) return null;
          var goodsPre = ResMgr.getRes(Bundle.Game, 'Goods');
          var goodsNode = instantiate(goodsPre);
          var goods = goodsNode.getComponent(Goods);
          var layerNode = this.layers[layer];
          var pos = v3();
          pos.y = layer * Global.Goods_Offset;
          layerNode.addChild(goodsNode);
          goodsNode.setPosition(pos);
          goods.Id = goodsId;
          goods.Layer = layer;
          goods.Slot = slotId;
          this.layerGoodsMap.set(layer, goodsId);
          return goods;
        };
        _proto.createLayerGoods = function createLayerGoods(layer, bounceDelay) {
          var _GameMgr$goodsData$th;
          if (bounceDelay === void 0) {
            bounceDelay = 0;
          }
          var shelveData = (_GameMgr$goodsData$th = GameMgr.goodsData[this.id]) != null ? _GameMgr$goodsData$th : {};
          for (var slot in shelveData) {
            if (Object.prototype.hasOwnProperty.call(shelveData, slot)) {
              var goodsArr = shelveData[slot];
              if (goodsArr.length <= 0) continue;
              var goodsId = goodsArr.shift();
              if (!Goods.isValidId(goodsId)) continue;
              var goods = this.createGoods(goodsId, Number(slot), layer);
              goods == null || goods.bounce(bounceDelay);
            }
          }
        };
        _proto.placeGoods = function placeGoods(goodsId, slotId) {
          this.layerGoodsMap.clear();
          var layerGoodsArr = [];
          for (var i = 0; i < 2; i++) {
            var layer = this.layers[i];
            var layerGoods = layer.getComponentInChildren(Goods);
            if (!layerGoods) break;
            layerGoodsArr.push(layerGoods);
          }
          for (var _i = 0; _i < layerGoodsArr.length; _i++) {
            var _layerGoods = layerGoodsArr[_i];
            var layerGoodsPos = _layerGoods.node.getPosition();
            var nextlayer = _i + 1;
            _layerGoods.Layer = nextlayer;
            _layerGoods.node.setParent(this.layers[nextlayer]);
            layerGoodsPos.y += Global.Goods_Offset;
            _layerGoods.node.setPosition(layerGoodsPos);
            this.layerGoodsMap.set(nextlayer, _layerGoods.Id);
          }
          var goods = this.createGoods(goodsId, 0, 0);
          goods == null || goods.bounce();
        };
        _proto.onPlaceGoods = function onPlaceGoods() {
          var layer0 = this.layers[0];
          var layer0Goods = layer0.getComponentInChildren(Goods);
          if (!layer0Goods || layer0Goods.Visible) return;
          layer0Goods.node.destroy();
          this.layerGoodsMap["delete"](0);
        };
        _proto.isSlotOccupied = function isSlotOccupied(slot) {
          var layer0Goods = this.layers[0].getComponentInChildren(Goods);
          if (layer0Goods && layer0Goods.Visible === false) return true;
          return this.layerGoodsMap.size >= 3;
        };
        _proto.isAllSlotOccupied = function isAllSlotOccupied() {
          return this.layerGoodsMap.size === 3;
        };
        _proto.getSlot = function getSlot(pos) {
          return 0;
        };
        _proto.clear = function clear() {
          this.layerGoodsMap.clear();
          for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            layer.destroyAllChildren();
          }
        };
        _proto.removeGoods = function removeGoods(goods) {
          this.layerGoodsMap["delete"](goods.Layer);
          goods.remove();
        };
        _createClass(SmallShelve, [{
          key: "isEmpty",
          get: function get() {
            // Removal animations keep nodes alive after the goods have left the board.
            return this.GoodsIdArr.length === 0;
          }
        }, {
          key: "GoodsIdArr",
          get: function get() {
            var goodsIdArr = [];
            for (var i = 0; i < this.layers.length; i++) {
              var layer = this.layers[i];
              var layerGoodsArr = layer.getComponentsInChildren(Goods);
              for (var j = 0; j < layerGoodsArr.length; j++) {
                var goods = layerGoodsArr[j];
                if (!goods.isRemoving) goodsIdArr.push(goods.Id);
              }
            }
            return goodsIdArr;
          }
        }, {
          key: "GoodsInfo",
          get: function get() {
            var info = {};
            for (var i = 0; i < this.layers.length; i++) {
              var layer = this.layers[i];
              if (!info.hasOwnProperty(i)) {
                info[i] = {};
              }
              var layerGoodsArr = layer.getComponentsInChildren(Goods);
              for (var j = 0; j < layerGoodsArr.length; j++) {
                var goods = layerGoodsArr[j];
                if (goods.isRemoving) continue;
                var Slot = goods.Slot,
                  Id = goods.Id;
                info[i][Slot] = goods;
              }
            }
            return info;
          }
        }]);
        return SmallShelve;
      }(ShelveBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layers", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Stage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './ArrayUtil.ts', './ShelveLocker.ts', './ShelveBase.ts', './CommonShelve.ts', './SmallShelve.ts', './UIMgr.ts', './UI.ts', './Mode.ts', './cfg_level.ts', './cfg_icon.ts', './ResMgr.ts', './Bundle.ts', './Global.ts', './EventMgr.ts', './EventType.ts', './ComboBox.ts', './Goods.ts', './AudioMgr.ts', './SkillType.ts', './GameSave.ts', './ItemMgr.ts', './GoodsLayout.ts', './BoardLayout.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Sprite, Node, Prefab, view, KeyCode, macro, ResolutionPolicy, UITransform, instantiate, math, Component, Widget, GameMgr, ArrayUtil, ShelveLocker, ShelveBase, CommonShelve, SmallShelve, UIMgr, UI, ModeName, Mode, cfg_level_ls, cfg_level_gs, cfg_level_tp, cfg_icon_ls, cfg_icon_gs, cfg_icon_tp, ResMgr, Bundle, Global, EventMgr, EventType, ComboBox, Goods, AudioMgr, SkillType, failure, success, ItemMgr, distributeGoods, needsPortraitFrame, boundsInSpace, fitBoard;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Node = module.Node;
      Prefab = module.Prefab;
      view = module.view;
      KeyCode = module.KeyCode;
      macro = module.macro;
      ResolutionPolicy = module.ResolutionPolicy;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      math = module.math;
      Component = module.Component;
      Widget = module.Widget;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      ArrayUtil = module.ArrayUtil;
    }, function (module) {
      ShelveLocker = module.ShelveLocker;
    }, function (module) {
      ShelveBase = module.ShelveBase;
    }, function (module) {
      CommonShelve = module.CommonShelve;
    }, function (module) {
      SmallShelve = module.SmallShelve;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      ModeName = module.ModeName;
      Mode = module.Mode;
    }, function (module) {
      cfg_level_ls = module.cfg_level_ls;
      cfg_level_gs = module.cfg_level_gs;
      cfg_level_tp = module.cfg_level_tp;
    }, function (module) {
      cfg_icon_ls = module.cfg_icon_ls;
      cfg_icon_gs = module.cfg_icon_gs;
      cfg_icon_tp = module.cfg_icon_tp;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ComboBox = module.ComboBox;
    }, function (module) {
      Goods = module.Goods;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      SkillType = module.SkillType;
    }, function (module) {
      failure = module.failure;
      success = module.success;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }, function (module) {
      distributeGoods = module.distributeGoods;
    }, function (module) {
      needsPortraitFrame = module.needsPortraitFrame;
      boundsInSpace = module.boundsInSpace;
      fitBoard = module.fitBoard;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "c58abNYUNtGTaELPAn63nuw", "Stage", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Stage = exports('Stage', (_dec = ccclass('Game/Stage'), _dec2 = property(Sprite), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(ComboBox), _dec7 = property(Node), _dec8 = property(Prefab), _dec9 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Stage, _Component);
        function Stage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "bg", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shelveBox", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "effectsLayer", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "skillBox", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comboBox", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tip", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shelveLockerPre", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shelvePreArr", _descriptor8, _assertThisInitialized(_this));
          _this.levelCfg = null;
          _this.levelData = null;
          _this.iconCfg = null;
          _this.shelveArr = [];
          _this.doubleCoinLeft = 0;
          _this.roundId = 0;
          _this.disposed = false;
          _this.winRecovery = false;
          _this.layoutQueued = false;
          _this.boardReady = false;
          _this.originalPolicy = null;
          _this.letterboxed = false;
          _this.isBusy = false;
          return _this;
        }
        var _proto = Stage.prototype;
        _proto.onLoad = function onLoad() {
          this.originalPolicy = view.getResolutionPolicy();
          this.roundId = GameMgr.roundId;
          GameMgr.registerStage(this);
          this.node.on(Node.EventType.SIZE_CHANGED, this.queueBoardLayout, this);
          view.on('canvas-resize', this.queueBoardLayout, this);
          var bgName = 'bg_' + ModeName[GameMgr.mode];
          this.bg.spriteFrame = ResMgr.getSpriteFrame(Bundle.Game, bgName, 'image/');
          EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this);
          EventMgr.on(EventType.TimeOut, this.onTimeOut, this);
          EventMgr.on(EventType.TimeOutAlert, this.onTimeOutAlert, this);
          EventMgr.on(EventType.UseSkillFreezeTime, this.onUseSkillFreezeTime, this);
          EventMgr.on(EventType.UseSkillDoubleCoin, this.onUseDoubleCoin, this);
          EventMgr.on(EventType.UseSkillRefreshPosition, this.onUseRefreshPos, this);
          EventMgr.on(EventType.UseSkillEraseGroup, this.onUseEraseGroup, this);
        };
        _proto.onPreviewKey = function onPreviewKey(e) {
          if (e.keyCode === KeyCode.KEY_Q && !GameMgr.Pause && !this.disposed && GameMgr.isCurrentRound(this.roundId)) this.showWin();
        };
        _proto.onDestroy = function onDestroy() {
          this.disposed = true;
          this.node.off(Node.EventType.SIZE_CHANGED, this.queueBoardLayout, this);
          view.off('canvas-resize', this.queueBoardLayout, this);
          if (this.letterboxed) {
            this.letterboxed = false;
            view.setResolutionPolicy(this.originalPolicy);
          }
          this.isBusy = false;
          this.doubleCoinLeft = 0;
          GameMgr.unregisterStage(this);
          UIMgr.close(UI.Game);
          this.unscheduleAllCallbacks();
          EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this);
          EventMgr.off(EventType.TimeOut, this.onTimeOut, this);
          EventMgr.off(EventType.TimeOutAlert, this.onTimeOutAlert, this);
          EventMgr.off(EventType.UseSkillFreezeTime, this.onUseSkillFreezeTime, this);
          EventMgr.off(EventType.UseSkillDoubleCoin, this.onUseDoubleCoin, this);
          EventMgr.off(EventType.UseSkillRefreshPosition, this.onUseRefreshPos, this);
          EventMgr.off(EventType.UseSkillEraseGroup, this.onUseEraseGroup, this);
        };
        _proto.update = function update(dt) {
          if (!GameMgr.Pause && GameMgr.isCurrentRound(this.roundId)) this.doubleCoinLeft = Math.max(0, this.doubleCoinLeft - dt);
        };
        _proto.prepareSkill = function prepareSkill(skill) {
          if (this.disposed || this.isBusy || !GameMgr.isCurrentRound(this.roundId)) return failure('unavailable');
          if (skill === SkillType.DoubleCoin && this.doubleCoinLeft > 0) return failure('unavailable');
          if (skill !== SkillType.RefreshPosition) return success();
          var ids = [].concat(GameMgr.goodsArr);
          for (var _i = 0, _Object$values = Object.values(GameMgr.goodsData); _i < _Object$values.length; _i++) {
            var shelf = _Object$values[_i];
            for (var _i2 = 0, _Object$values2 = Object.values(shelf); _i2 < _Object$values2.length; _i2++) {
              var queue = _Object$values2[_i2];
              ids.push.apply(ids, queue);
            }
          }
          for (var _iterator = _createForOfIteratorHelperLoose(this.shelveArr), _step; !(_step = _iterator()).done;) {
            var _shelf = _step.value;
            ids.push.apply(ids, _shelf.GoodsIdArr);
          }
          var candidate = distributeGoods(this.layoutShelves(), ids, this.iconCfg.length);
          return candidate ? success(candidate) : failure('invalid_config');
        };
        _proto.layoutShelves = function layoutShelves() {
          return this.shelveArr.filter(function (s) {
            return s instanceof CommonShelve || s instanceof SmallShelve;
          }).map(function (s) {
            return {
              id: s.Id,
              small: s instanceof SmallShelve
            };
          });
        };
        _proto.start = function start() {
          UIMgr.open(UI.Game);
          this.tip.active = GameMgr.mode === Mode.tp && GameMgr.CurLevel === 0;
          this.scheduleOnce(function () {
            if (GameMgr.isHardLevel) UIMgr.open(UI.StageTip, '难度飙升');
          }, 1);
          switch (GameMgr.mode) {
            case Mode.tp:
              this.levelCfg = cfg_level_tp;
              this.iconCfg = cfg_icon_tp;
              break;
            case Mode.gs:
              this.levelCfg = cfg_level_gs;
              this.iconCfg = cfg_icon_gs;
              break;
            case Mode.ls:
              this.levelCfg = cfg_level_ls;
              this.iconCfg = cfg_icon_ls;
              break;
          }
          if (GameMgr.CurLevel >= this.levelCfg.length) {
            this.levelData = ArrayUtil.pickItem(this.levelCfg);
          } else {
            this.levelData = this.levelCfg[GameMgr.CurLevel];
          }
          var shelveMap = this.levelData.shelveMap;
          var group = this.levelData.group;
          var lockCnt = this.levelData.lockCnt;
          var goodsTypeCnt = this.levelData.GoodsTypeCnt;
          Global.Level_Time = this.levelData.time;
          // Global.Level_Time = 10

          EventMgr.emit(EventType.TimeReset);
          this.createShelves(shelveMap);
          this.createShelveLockers(lockCnt);
          this.createGoodsArr(group, goodsTypeCnt);
          if (!this.createGoodsData()) {
            GameMgr.recover(function () {
              return failure('invalid_config');
            }, function () {}, '关卡货架配置异常，可重新挑战或返回首页。');
            return;
          }
          this.boardReady = true;
          this.queueBoardLayout();
          this.schedule(this.onCheckWin, 0.5, macro.REPEAT_FOREVER);
        };
        _proto.queueBoardLayout = function queueBoardLayout() {
          if (this.disposed || !this.boardReady || this.layoutQueued) return;
          this.layoutQueued = true;
          GameMgr.cancelPick();
          this.scheduleOnce(this.applyBoardLayout);
        };
        _proto.updateViewportPolicy = function updateViewportPolicy() {
          var frame = view.getFrameSize();
          var letterbox = needsPortraitFrame(frame.width, frame.height);
          if (letterbox === this.letterboxed) return;
          if (!this.originalPolicy) this.originalPolicy = view.getResolutionPolicy();
          this.letterboxed = letterbox;
          view.setResolutionPolicy(letterbox ? ResolutionPolicy.SHOW_ALL : this.originalPolicy);
        };
        _proto.applyBoardLayout = function applyBoardLayout() {
          var _UIMgr$get;
          if (this.disposed || !GameMgr.isCurrentRound(this.roundId)) {
            this.layoutQueued = false;
            return;
          }
          this.updateViewportPolicy();
          var gameUI = (_UIMgr$get = UIMgr.get(UI.Game)) == null ? void 0 : _UIMgr$get.node;
          var stageTransform = this.node.getComponent(UITransform);
          // Resolve anchored HUD positions before measuring, regardless of frame ordering.
          var align = function align(node) {
            var widget = node.getComponent(Widget);
            if (widget != null && widget.enabled) widget.updateAlignment();
            for (var _iterator2 = _createForOfIteratorHelperLoose(node.children), _step2; !(_step2 = _iterator2()).done;) {
              var child = _step2.value;
              align(child);
            }
          };
          align(this.node);
          if (gameUI) align(gameUI);
          var peaks = new Map();
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.skillBox.children), _step3; !(_step3 = _iterator3()).done;) {
            var button = _step3.value;
            peaks.set(button, 1.2);
          }
          var top = stageTransform.height * (1 - stageTransform.anchorY);
          if (gameUI) {
            for (var _i3 = 0, _arr = ['SettingItem', 'TimeItem', 'CoinItem']; _i3 < _arr.length; _i3++) {
              var name = _arr[_i3];
              var item = gameUI.getChildByName(name);
              if (!item) continue;
              var clock = item.getChildByName('nz');
              if (clock) peaks.set(clock, 1.2);
              top = Math.min(top, boundsInSpace(item, stageTransform, peaks).bottom);
            }
          }
          var bottom = Math.max(boundsInSpace(this.skillBox, stageTransform, peaks).top, boundsInSpace(this.comboBox.node, stageTransform).top);
          var area = {
            left: -stageTransform.width * stageTransform.anchorX + 24,
            right: stageTransform.width * (1 - stageTransform.anchorX) - 24,
            bottom: bottom + 24,
            top: top - 24
          };
          var board = this.shelveBox.getComponent(UITransform);
          var fit = fitBoard(board.width, board.height, area);
          this.shelveBox.setScale(fit.scale, fit.scale, 1);
          this.shelveBox.setPosition(fit.x, fit.y, 0);
          this.layoutQueued = false;
        };
        _proto.createShelves = function createShelves(shelveMap) {
          var row = shelveMap.length;
          var col = shelveMap[0].length;
          var uiTrans = this.shelveBox.getComponent(UITransform);
          var spaceX = 0;
          var spaceY = 0;
          uiTrans.width = col * 230 + spaceX * (col - 1);
          uiTrans.height = row * 145 + spaceY * (row - 1);
          for (var i = 0; i < shelveMap.length; i++) {
            for (var j = 0; j < shelveMap[i].length; j++) {
              var type = shelveMap[i][j];
              var shelvePre = this.shelvePreArr[type];
              var shelveNode = instantiate(shelvePre);
              this.shelveBox.addChild(shelveNode);
            }
          }
          this.shelveArr = this.shelveBox.getComponentsInChildren(ShelveBase);
        };
        _proto.createShelveLockers = function createShelveLockers(lockCnt) {
          if (lockCnt <= 0) return;
          var shelves = ArrayUtil.pickItems(this.shelveArr, lockCnt, true);
          for (var i = 0; i < shelves.length; i++) {
            var shelve = shelves[i];
            var shelveLockerNode = instantiate(this.shelveLockerPre);
            shelve.node.addChild(shelveLockerNode);
            var shelveLocker = shelveLockerNode.getComponent(ShelveLocker);
            shelveLocker.UnlockCnt = math.randomRangeInt(3, 6);
          }
        };
        _proto.createGoodsArr = function createGoodsArr(group, goodsTypeCnt) {
          var idxArr = ArrayUtil.pickIndexs(this.iconCfg, goodsTypeCnt, true);
          GameMgr.goodsArr = [];
          for (var i = 0; i < group; i++) {
            var goodsId = ArrayUtil.pickItem(idxArr) + 1;
            GameMgr.goodsArr.push(goodsId, goodsId, goodsId);
          }
          ArrayUtil.shuffle(GameMgr.goodsArr);
        };
        _proto.createGoodsData = function createGoodsData() {
          var data = distributeGoods(this.layoutShelves(), GameMgr.goodsArr, this.iconCfg.length);
          if (!data) return false;
          GameMgr.goodsData = data;
          GameMgr.goodsArr = [];
          return true;
        };
        _proto.showWin = function showWin() {
          var _this2 = this;
          if (this.winRecovery || this.disposed || !GameMgr.isCurrentRound(this.roundId)) return;
          var done = function done(reward) {
            _this2.winRecovery = false;
            _this2.unschedule(_this2.onCheckWin);
            UIMgr.open(UI.Win, reward);
          };
          var result = GameMgr.settleRound();
          if (result.ok) done(result.value);else {
            this.winRecovery = true;
            GameMgr.recover(function () {
              return GameMgr.settleRound();
            }, done, '通关结果尚未保存。重试将保留本次倍率，或选择重新挑战、返回首页。');
          }
        };
        _proto.onCheckWin = function onCheckWin() {
          if (GameMgr.Pause) return;
          var isWin = this.checkWin();
          if (!isWin) return;
          if (this.isBusy) return;
          this.showWin();
        };
        _proto.checkWin = function checkWin() {
          if (GameMgr.goodsArr.some(function (id) {
            return Goods.isValidId(id);
          })) return false;
          for (var _i4 = 0, _Object$values3 = Object.values(GameMgr.goodsData); _i4 < _Object$values3.length; _i4++) {
            var shelf = _Object$values3[_i4];
            if (Object.values(shelf).some(function (queue) {
              return queue.some(function (id) {
                return Goods.isValidId(id);
              });
            })) return false;
          }
          for (var i = 0; i < this.shelveArr.length; i++) {
            var shelve = this.shelveArr[i];
            if (!shelve.isEmpty) return false;
          }
          return true;
        };
        _proto.onTimeOut = function onTimeOut() {
          var isWin = this.checkWin();
          if (isWin) return;
          UIMgr.open(UI.TimeOut);
        };
        _proto.onTimeOutAlert = function onTimeOutAlert() {
          var effectRedAlertPre = ResMgr.getRes(Bundle.Game, 'EffectRedAlert');
          var effectRedAlertNode = instantiate(effectRedAlertPre);
          this.effectsLayer.addChild(effectRedAlertNode);
        };
        _proto.onUseSkillFreezeTime = function onUseSkillFreezeTime() {
          var effectFreezePre = ResMgr.getRes(Bundle.Game, 'EffectFreeze');
          var effectFreezeNode = instantiate(effectFreezePre);
          this.effectsLayer.addChild(effectFreezeNode);
        };
        _proto.onMergeGoods = function onMergeGoods(shelveWorldPos) {
          this.comboBox.CurCombo++;
          AudioMgr.playSfx("bomb_" + this.comboBox.CurCombo);
          var amount = this.doubleCoinLeft > 0 ? this.comboBox.CurCombo * 2 : this.comboBox.CurCombo;
          var grant = function grant() {
            return ItemMgr.tryApplyRewards([{
              itemId: 0,
              cnt: amount
            }]);
          };
          var result = grant();
          if (!result.ok) GameMgr.recover(grant, function () {});
          this.comboBox.createFloatText(shelveWorldPos);
        };
        _proto.onUseDoubleCoin = function onUseDoubleCoin() {
          if (this.doubleCoinLeft > 0) return;
          AudioMgr.playSfx('星星道具');
          this.doubleCoinLeft = Global.Double_Coin_Duration;
        };
        _proto.onUseRefreshPos = function onUseRefreshPos(data) {
          var _this3 = this;
          if (!data || this.isBusy || this.disposed || !GameMgr.isCurrentRound(this.roundId)) return;
          this.isBusy = true;
          AudioMgr.playSfx('转换道具');
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.shelveArr), _step4; !(_step4 = _iterator4()).done;) {
            var shelf = _step4.value;
            shelf.clear();
          }
          GameMgr.goodsData = data;
          GameMgr.goodsArr = [];
          var id = this.roundId;
          this.scheduleOnce(function () {
            if (_this3.disposed || !GameMgr.isCurrentRound(id)) return;
            for (var _iterator5 = _createForOfIteratorHelperLoose(_this3.shelveArr), _step5; !(_step5 = _iterator5()).done;) {
              var shelf = _step5.value;
              shelf.init();
            }
            _this3.scheduleOnce(function () {
              if (!_this3.disposed && GameMgr.isCurrentRound(id)) _this3.isBusy = false;
            }, 0.5);
          });
        };
        _proto.onUseEraseGroup = function onUseEraseGroup() {
          AudioMgr.playSfx('灯泡道具');

          //先统计场上的物品
          var goodsMap = {};
          for (var i = 0; i < this.shelveArr.length; i++) {
            var shelve = this.shelveArr[i];
            var info = shelve.GoodsInfo;
            for (var layer in info) {
              if (Object.prototype.hasOwnProperty.call(info, layer)) {
                for (var slot in info[layer]) {
                  if (Object.prototype.hasOwnProperty.call(info[layer], slot)) {
                    var goods = info[layer][slot];
                    var goodsId = goods.Id;
                    if (!goodsMap.hasOwnProperty(goodsId)) {
                      goodsMap[goodsId] = [];
                    }
                    goodsMap[goodsId].push(goods);
                  }
                }
              }
            }
            for (var _goodsId in goodsMap) {
              if (Object.prototype.hasOwnProperty.call(goodsMap, _goodsId)) {
                ArrayUtil.shuffle(goodsMap[_goodsId]);
              }
            }
          }

          //筛选出超过三个的物品
          var map2 = {};
          for (var _goodsId2 in goodsMap) {
            if (Object.prototype.hasOwnProperty.call(goodsMap, _goodsId2)) {
              if (goodsMap[_goodsId2].length >= 3) {
                map2[_goodsId2] = goodsMap[_goodsId2];
              }
            }
          }

          //从中挑选三组
          var map3 = {};
          var cnt = 0;
          for (var _goodsId3 in map2) {
            if (Object.prototype.hasOwnProperty.call(map2, _goodsId3)) {
              map3[_goodsId3] = map2[_goodsId3];
              cnt++;
              if (cnt >= 3) break;
            }
          }

          //将这三组中随机三个物品消除
          for (var _goodsId4 in map3) {
            if (Object.prototype.hasOwnProperty.call(map3, _goodsId4)) {
              var goodsArr = map3[_goodsId4];
              var pickedGoodsArr = ArrayUtil.pickItems(goodsArr, 3, true);
              for (var _i5 = 0; _i5 < pickedGoodsArr.length; _i5++) {
                var _goods = pickedGoodsArr[_i5];
                var _shelve = _goods.node.parent.parent.getComponent(ShelveBase);
                if (!_shelve) {
                  continue;
                }
                _shelve.removeGoods(_goods);
              }
            }
          }
        };
        _createClass(Stage, [{
          key: "DoubleCoinActive",
          get: function get() {
            return this.doubleCoinLeft > 0;
          }
        }]);
        return Stage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shelveBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "effectsLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "skillBox", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "comboBox", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tip", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "shelveLockerPre", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "shelvePreArr", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Switcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Button, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "4772djXcEtGA6kLkEpQOZ0P", "Switcher", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent,
        executeInEditMode = _decorator.executeInEditMode;
      var Switcher = exports('Switcher', (_dec = ccclass('UIExtend/Switcher'), _dec2 = requireComponent(Button), _dec3 = executeInEditMode(true), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Switcher, _Component);
        function Switcher() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "on", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "off", _descriptor2, _assertThisInitialized(_this));
          _this._isOn = true;
          return _this;
        }
        _createClass(Switcher, [{
          key: "IsOn",
          get: function get() {
            return this._isOn;
          },
          set: function set(v) {
            this._isOn = v;
            if (this.on) this.on.active = v;
            if (this.off) this.off.active = !v;
          }
        }]);
        return Switcher;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "on", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "off", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "IsOn", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "IsOn"), _class2.prototype)), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TimeUtil.ts', './EventMgr.ts', './EventType.ts', './GameMgr.ts', './Debug.ts', './Global.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Label, tween, v3, Color, Component, TimeUtil, EventMgr, EventType, GameMgr, Debug, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      tween = module.tween;
      v3 = module.v3;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      TimeUtil = module.TimeUtil;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      Debug = module.Debug;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "593ddSYq4ZHBoj/JdZW6MVk", "TimeItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Tag = 'TimeItem';
      var TimeItem = exports('TimeItem', (_dec = ccclass('UIItem/TimeItem'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TimeItem, _Component);
        function TimeItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "nz", _descriptor, _assertThisInitialized(_this));
          _this._label = null;
          _this.leftTime = 0;
          _this._freezeTime = 0;
          _this._freeze = false;
          _this._pause = false;
          _this._tw = null;
          return _this;
        }
        var _proto = TimeItem.prototype;
        _proto.onLoad = function onLoad() {
          this._label = this.getComponentInChildren(Label);
          globalThis.TimeItem = this;
          EventMgr.on(EventType.Revive, this.onRevive, this);
          EventMgr.on(EventType.UseSkillFreezeTime, this.onUseSkillFreeze, this);
          EventMgr.on(EventType.TimeReset, this.onTimeReset, this);
        };
        _proto.onDestroy = function onDestroy() {
          EventMgr.off(EventType.Revive, this.onRevive, this);
          EventMgr.off(EventType.UseSkillFreezeTime, this.onUseSkillFreeze, this);
          EventMgr.off(EventType.TimeReset, this.onTimeReset, this);
        };
        _proto.update = function update(dt) {
          if (this._pause) return;
          if (GameMgr.Pause) return;
          if (Global.Level_Time === -1) return;
          if (this._freeze) {
            this._freezeTime -= dt;
            if (this._freezeTime <= 0) {
              this._freeze = false;
              Debug.Log(Tag, '结束冰冻');
            }
          } else {
            var preTime = this.leftTime;
            this.LeftTime -= dt;
            if (preTime > Global.Time_Out_Alert_Time && this.leftTime <= Global.Time_Out_Alert_Time) {
              EventMgr.emit(EventType.TimeOutAlert);
              if (this._tw) this._tw.stop();
              this._tw = tween(this.nz).sequence(tween(this.nz).to(0.5, {
                scale: v3(1.2, 1.2, 1)
              }), tween(this.nz).to(0.5, {
                scale: v3(1, 1, 1)
              })).repeatForever().start();
            }
            if (this.leftTime <= 0) {
              this._pause = true;
              EventMgr.emit(EventType.TimeOut);
            }
          }
        };
        _proto.onTimeReset = function onTimeReset() {
          this._pause = false;
          this.LeftTime = Global.Level_Time;
          this.nz.scale = v3(1, 1, 1);
          if (this._tw) {
            this._tw.stop();
            this._tw = null;
          }
        };
        _proto.onRevive = function onRevive() {
          this._pause = false;
          this.LeftTime = Global.Revive_Add_Time;
          this.nz.scale = v3(1, 1, 1);
          if (this._tw) {
            this._tw.stop();
            this._tw = null;
          }
        };
        _proto.onUseSkillFreeze = function onUseSkillFreeze() {
          this._freeze = true;
          this._freezeTime = Global.Freeze_Time;
          Debug.Log(Tag, '开始冰冻');
        };
        _createClass(TimeItem, [{
          key: "LeftTime",
          get: function get() {
            return this.leftTime;
          },
          set: function set(v) {
            this.leftTime = Math.max(v, 0);
            EventMgr.emit(EventType.TimeTick, this.leftTime);
            this._label.string = TimeUtil.formatTime_HHMMSS(Math.round(this.leftTime) * 1000);
            this._label.color = this.leftTime <= 5 ? Color.RED : Color.WHITE;
          }
        }]);
        return TimeItem;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "nz", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "9a36f5tW91Gnp7BUUKYgzAc", "TimeMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Max_Timer_Cnt = 10000;

      /**
       * 时间管理
       */
      var TimeMgr = exports('TimeMgr', (_dec = ccclass('Manager/TimeMgr'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TimeMgr, _Component);
        function TimeMgr() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = TimeMgr.prototype;
        _proto.onLoad = function onLoad() {
          TimeMgr._inst = this;
          director.addPersistRootNode(this.node);
        };
        TimeMgr.delay = /*#__PURE__*/function () {
          var _delay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(time) {
            var _this = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (time === void 0) {
                    time = 0;
                  }
                  return _context.abrupt("return", new Promise(function (resolve, reject) {
                    _this._inst.scheduleOnce(function () {
                      resolve();
                    }, time);
                  }));
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          function delay(_x) {
            return _delay.apply(this, arguments);
          }
          return delay;
        }()
        /**
         * 设置一个计时器
         * @param callback 计时器回调 使用格式 function.bind(this)
         * @param interval 间隔时间
         * @param repeat 回调次数
         * @returns 返回计时器id
         */;

        TimeMgr.setTimer = function setTimer(callback, interval, repeat) {
          var _this2 = this;
          if (repeat === void 0) {
            repeat = 1;
          }
          var curCount = 0;
          var id = this.nextId++;
          if (id > Max_Timer_Cnt) id = 0;
          var timerCallback = function timerCallback() {
            callback && callback();
            ++curCount >= repeat && _this2.clearTimer(id);
          };
          this._timerMap.set(id, timerCallback);
          this._inst.schedule(timerCallback, interval, repeat);
          return id;
        }

        /**
         * 清除一个计时器
         * @param timerId 计时器id 
         */;
        TimeMgr.clearTimer = function clearTimer(timerId) {
          if (this._timerMap.has(timerId)) {
            this._inst.unschedule(this._timerMap.get(timerId));
            this._timerMap["delete"](timerId);
          }
        };
        return TimeMgr;
      }(Component), _class2._inst = null, _class2._timerMap = new Map(), _class2.nextId = 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimeUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "07102ahwgBFAZu9HS4Vb7oI", "TimeUtil", undefined);
      var TimeUtil = exports('TimeUtil', /*#__PURE__*/function () {
        function TimeUtil() {}
        /**
         * 获取当前时间戳
         * @returns 
        */
        TimeUtil.getCurrTimeStamp = function getCurrTimeStamp() {
          return Date.now();
        }

        /**
         * 获取当前时间对象
         * @returns 
         */;
        TimeUtil.getCurrTimeDate = function getCurrTimeDate() {
          return new Date(this.getCurrTimeStamp());
        }

        /**
         * 获取星期几  1 - 7
         * @returns 
         */;
        TimeUtil.getCurWeekDay = function getCurWeekDay() {
          var day = this.getCurrTimeDate().getDay();
          return day == 0 ? 7 : day;
        }

        /**
         * 是否为同一天
         * @returns 
         */;
        TimeUtil.isSameDay = function isSameDay(timeStamp1, timeStamp2) {
          var date1 = new Date(timeStamp1);
          var date2 = new Date(timeStamp2);
          return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
        }

        /**
         * 是否为同一周
         * @param timestamp 与当前时间对比的时间戳
         */;
        TimeUtil.isSameWeek = function isSameWeek(timestamp) {
          var currTime = this.getCurrTimeStamp();
          var currWeek = this.getCurWeekDay();
          var date = new Date(timestamp);
          var strDate = date.toLocaleDateString();
          for (var i = 1; i <= 7; i++) {
            if (strDate == new Date(currTime + (i - currWeek) * 24 * 3600 * 1000).toLocaleDateString()) {
              return true;
            }
          }
          return false;
        }
        /**
         * 获取指定时间戳
         * @param time  格式为:YYYY/MM/DD HH:MM:SS  例如 2021/5/31 18:53
         * @returns 
         */;
        TimeUtil.getAssignTimestamp = function getAssignTimestamp(time) {
          time = time.replace(/-/g, '/');
          var date = new Date(time);
          var sTime = date.getTime();
          return sTime;
        }

        /**
         * 时间格式化 时:分:秒
         * @param millisecond 毫秒
         * @returns 
         */;
        TimeUtil.formatTime_HHMMSS = function formatTime_HHMMSS(millisecond) {
          var second = millisecond / 1000;
          var hour = (Array(2).join('0') + Math.floor(second / 3600)).slice(-2);
          var min = (Array(2).join('0') + Math.floor(second % 3600 / 60)).slice(-2);
          var sec = (Array(2).join('0') + Math.floor(second) % 60).slice(-2);
          if (hour == "00") {
            return min + ":" + sec;
          } else {
            return hour + ":" + min + ":" + sec;
          }
        }

        /**
         * 时间格式化 10天1小时20分50秒
         * @param millisecond 毫秒
         * @returns 
         */;
        TimeUtil.formatTime_DDHHMMSS = function formatTime_DDHHMMSS(millisecond) {
          var dval = millisecond / 1000;
          var ss = dval % 60;
          dval = Math.floor(dval / 60);
          var mm = dval % 60;
          dval = Math.floor(dval / 60);
          var hh = dval % 24;
          dval = Math.floor(dval / 24);
          var dd = dval;
          var ret = "";
          if (dd > 0) {
            ret = dd + "天";
            if (hh > 0) {
              ret += hh + "小时";
            }
          } else {
            if (hh > 0) {
              ret += hh + "小时";
            }
            if (mm > 0) {
              ret += mm + "分";
            } else if (hh > 0) {
              ret += "零";
            }
            if (ss > 0) {
              ret += Math.floor(ss) + "秒";
            }
          }
          return ret;
        };
        return TimeUtil;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToggleExtend.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Toggle, Component, AudioMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Toggle = module.Toggle;
      Component = module.Component;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "659835HTWVKuJmTmyMhYpAf", "ToggleExtend", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        disallowMultiple = _decorator.disallowMultiple,
        requireComponent = _decorator.requireComponent;
      var ToggleExtend = exports('ToggleExtend', (_dec = ccclass('UIExtend/ToggleExtend'), _dec2 = disallowMultiple(true), _dec3 = requireComponent(Toggle), _dec4 = property({
        range: [0, 1, 0.1],
        slide: true
      }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleExtend, _Component);
        function ToggleExtend() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "safeTime", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "clickSfx", _descriptor2, _assertThisInitialized(_this));
          _this.toggle = null;
          _this.checkEvents = void 0;
          _this.isSafe = true;
          return _this;
        }
        var _proto = ToggleExtend.prototype;
        _proto.onLoad = function onLoad() {
          this.toggle = this.getComponent(Toggle);
        };
        _proto.start = function start() {
          this.toggle.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
        };
        _proto.onToggle = function onToggle() {
          this.handleSafe();
          this.handleClickSfx();
        };
        _proto.handleSafe = function handleSafe() {
          var _this2 = this;
          if (!this.isSafe) return;
          this.isSafe = false;
          this.scheduleOnce(function () {
            _this2.checkEvents = _this2.toggle.checkEvents;
            _this2.toggle.checkEvents = [];
            _this2.scheduleOnce(_this2.recover, _this2.safeTime);
          });
        };
        _proto.handleClickSfx = function handleClickSfx() {
          if (!this.clickSfx) return;
          AudioMgr.playSfx(this.clickSfx);
        };
        _proto.recover = function recover() {
          this.isSafe = true;
          this.toggle.checkEvents = this.checkEvents;
        };
        return ToggleExtend;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "safeTime", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clickSfx", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'btnClick';
        }
      })), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TransMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, UITransform, Node, v3, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Node = module.Node;
      v3 = module.v3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "88497k+5f9KULRgNBBQ+4rG", "TransMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TransMgr = exports('TransMgr', (_dec = ccclass('Manager/TransMgr'), _dec2 = property(UITransform), _dec3 = property(UITransform), _dec4 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TransMgr, _Component);
        function TransMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gc1UiTrans", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gc2UiTrans", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "logo", _descriptor3, _assertThisInitialized(_this));
          _this.gc1OrgHeight = 0;
          _this.gc2OrgHeight = 0;
          return _this;
        }
        var _proto = TransMgr.prototype;
        _proto.onLoad = function onLoad() {
          TransMgr.inst = this;
          this.gc1OrgHeight = this.gc1UiTrans.height;
          this.gc2OrgHeight = this.gc2UiTrans.height;
          this.node.active = false;
        };
        _proto.fadeIn = function fadeIn() {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.node.active = true;
            _this2.logo.setScale(v3(0, 0, 1));
            tween(_this2.logo).delay(0.2).to(0.5, {
              scale: v3(1, 1, 1)
            }, {
              easing: 'backOut'
            }).start();
            tween(_this2.gc1UiTrans).set({
              height: 0
            }).to(0.2, {
              height: _this2.gc1OrgHeight
            }).start();
            var tw = tween(_this2.gc2UiTrans);
            tw.set({
              height: 0
            });
            tw.to(1, {
              height: _this2.gc2OrgHeight
            }, {
              easing: 'cubicOut'
            });
            tw.call(function () {
              resolve();
            });
            tw.start();
          });
        };
        _proto.fadeOut = function fadeOut() {
          var _this3 = this;
          return new Promise(function (resolve, reject) {
            tween(_this3.logo).to(0.5, {
              scale: v3()
            }, {
              easing: 'backIn'
            }).start();
            tween(_this3.gc1UiTrans).delay(0.8).to(0.2, {
              height: 0
            }).start();
            var tw = tween(_this3.gc2UiTrans);
            tw.to(1, {
              height: 0
            }, {
              easing: 'cubicIn'
            });
            tw.call(function () {
              _this3.node.active = false;
              resolve();
            });
            tw.start();
          });
        };
        _createClass(TransMgr, null, [{
          key: "Inst",
          get: function get() {
            return this.inst;
          }
        }]);
        return TransMgr;
      }(Component), _class3.inst = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gc1UiTrans", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gc2UiTrans", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "logo", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UI.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c8a08FNqdVHerPY3SIR/1mx", "UI", undefined);
      var UI = exports('UI', /*#__PURE__*/function (UI) {
        UI["Main"] = "UIMain";
        UI["Recovery"] = "UIRecovery";
        UI["Level"] = "UILevel";
        UI["Game"] = "UIGame";
        UI["Pause"] = "UIPause";
        UI["Win"] = "UIWin";
        UI["SuperWin"] = "UISuperWin";
        UI["Fail"] = "UIFail";
        UI["Confirm"] = "UIConfirm";
        UI["Setting"] = "UISetting";
        UI["Top"] = "UITop";
        UI["Toast"] = "UIToast";
        UI["SideBar"] = "UISideBar";
        UI["Rank"] = "UIRank";
        UI["Replay"] = "UIReplay";
        UI["Revive"] = "UIRevive";
        UI["GetSkill"] = "UIGetSkill";
        UI["Transition"] = "UITransition";
        UI["Collect"] = "UICollect";
        UI["CollectInfo"] = "UICollectInfo";
        UI["Gashapon"] = "UIGashapon";
        UI["GetReward"] = "UIGetReward";
        UI["Decoration"] = "UIDecoration";
        UI["ShareVideo"] = "UIShareVideo";
        UI["StageTip"] = "UIStageTip";
        UI["Home"] = "UIHome";
        UI["PassReward"] = "UIPassReward";
        UI["Privacy"] = "UIPrivacy";
        UI["Loading"] = "UILoading";
        UI["TimeOut"] = "UITimeOut";
        UI["LuckySpin"] = "UILuckySpin";
        UI["LoginReward"] = "UILoginReward";
        UI["MainTip"] = "UIMainTip";
        UI["InviteReward"] = "UIInviteReward";
        return UI;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIType.ts', './EventMgr.ts', './EventType.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Widget, Enum, Component, UIType, EventMgr, EventType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Enum = module.Enum;
      Component = module.Component;
    }, function (module) {
      UIType = module.UIType;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "111f5/XxgFNRZIz42m+GGGf", "UIBase", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIBase = exports('UIBase', (_dec = requireComponent(Widget), _dec2 = property({
        "type": Enum(UIType)
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIBase, _Component);
        function UIBase() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "uiType", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = UIBase.prototype;
        _proto.onOpen = function onOpen(data) {};
        _proto.onClose = function onClose(data) {};
        _proto.open = function open(uiName, data, dtoUI) {
          EventMgr.emit(EventType.OpenUI, uiName, data, dtoUI);
        };
        _proto.delayOpen = function delayOpen(time, uiName, data, dtoUI) {
          this.scheduleOnce(this.open.bind(this, uiName, data, dtoUI), time);
        };
        _proto.close = function close(uiName, data) {
          if (!uiName) uiName = this.node.name;
          EventMgr.emit(EventType.CloseUI, uiName, data);
        };
        _proto.delayClose = function delayClose(time, uiName, data) {
          this.scheduleOnce(this.close.bind(this, uiName, data), time);
        };
        _proto.bindClick = function bindClick(btn, node, comp, handler, customData) {
          var clickEventHandler = new Component.EventHandler();
          clickEventHandler.target = node;
          clickEventHandler.component = comp;
          clickEventHandler.handler = handler;
          clickEventHandler.customEventData = customData;
          btn.clickEvents = [clickEventHandler];
        };
        _proto.unbindClick = function unbindClick(btn) {
          btn.clickEvents = [];
        };
        return UIBase;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return UIType.Common;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIGame.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './UI.ts', './GameMgr.ts', './CoinItem.ts', './CoinMgr.ts', './EventType.ts', './EventMgr.ts', './AudioMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Label, math, tween, isValid, UIBase, UI, GameMgr, CoinItem, CoinMgr, EventType, EventMgr, AudioMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
      math = module.math;
      tween = module.tween;
      isValid = module.isValid;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "5a290LFtFJJ5ZYlc/D14Koe", "UIGame", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIGame = exports('UIGame', (_dec = ccclass('UI/UIGame'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIGame, _UIBase);
        function UIGame() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.lbLevel = null;
          _this.coinItem = null;
          return _this;
        }
        var _proto = UIGame.prototype;
        _proto.onLoad = function onLoad() {
          this.lbLevel = this.findComp('SettingItem/LbLevel', Label);
          this.coinItem = this.findComp('CoinItem', CoinItem);
        };
        _proto.onEnable = function onEnable() {
          EventMgr.on(EventType.MergeGoods, this.onMergeGoods, this);
        };
        _proto.onDisable = function onDisable() {
          EventMgr.off(EventType.MergeGoods, this.onMergeGoods, this);
        };
        _proto.onOpen = function onOpen(data) {
          this.lbLevel.string = "\u7B2C" + (GameMgr.CurLevel + 1) + "\u5173";
          this.coinItem.init(CoinMgr.CurCoin);
          AudioMgr.playBgm("\u6E38\u620F\u5185\u97F3\u4E50" + math.randomRangeInt(0, 3));
        };
        _proto.onClose = function onClose(data) {};
        _proto.onBtnSettingClick = function onBtnSettingClick() {
          this.open(UI.Pause);
        };
        _proto.onMergeGoods = function onMergeGoods(worldPos) {
          this.coinItem.updateCoin(CoinMgr.CurCoin, false);
          var flyCoin = this.coinItem.createFlyCoin();
          flyCoin.setWorldPosition(worldPos);
          var tw = tween(flyCoin);
          tw.to(0.5, {
            worldPosition: this.coinItem.node.worldPosition
          }, {
            easing: 'sineOut'
          });
          tw.call(function () {
            if (isValid(flyCoin)) {
              flyCoin.destroy();
            }
          });
          tw.start();
        };
        return UIGame;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIGetReward.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CoinMgr.ts', './ResMgr.ts', './UIBase.ts', './CoinItem.ts', './CfgItem.ts'], function (exports) {
  var _inheritsLoose, _extends, cclegacy, _decorator, Widget, Sprite, Label, tween, v3, CoinMgr, ResMgr, UIBase, CoinItem, CfgItem;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Sprite = module.Sprite;
      Label = module.Label;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      CfgItem = module.CfgItem;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "3dacejXH+FCKJvYNd+LzdQ0", "UIGetReward", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UIGetReward = exports('UIGetReward', (_dec = ccclass('UI/UIGetReward'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIGetReward, _UIBase);
        function UIGetReward() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.rewards = [];
          _this.index = 0;
          _this.processing = false;
          _this.tw = null;
          return _this;
        }
        var _proto = UIGetReward.prototype;
        _proto.onOpen = function onOpen(data) {
          var _this2 = this;
          this.rewards = (data != null ? data : []).map(function (reward) {
            return _extends({}, reward);
          });
          this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin);
          if (!this.rewards.length) {
            this.processing = true;
            this.scheduleOnce(function () {
              return _this2.close();
            });
            return;
          }
          this.showReward();
        };
        _proto.showReward = function showReward() {
          var reward = this.rewards[this.index];
          var item = CfgItem[reward.itemId];
          var icon = this.findComp('Icon', Sprite);
          icon.spriteFrame = ResMgr.getSpriteFrame(item.bundle, item.icon);
          this.findComp('LbCnt', Label).string = "x" + reward.cnt + "\uFF08\u5DF2\u5230\u8D26\uFF09";
          if (this.tw) this.tw.stop();
          this.tw = tween(icon.node).set({
            scale: v3()
          }).to(0.3, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
        };
        _proto.onBtnNormalGetClick = function onBtnNormalGetClick() {
          var _this3 = this;
          if (this.processing) return;
          this.processing = true;
          this.index++;
          if (this.index >= this.rewards.length) {
            this.close();
            return;
          }
          this.showReward();
          this.scheduleOnce(function () {
            _this3.processing = false;
          }, 0.3);
        };
        _proto.onClose = function onClose() {
          if (this.tw) this.tw.stop();
          this.unscheduleAllCallbacks();
        };
        return UIGetReward;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIGetSkill.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './UIBase.ts', './CfgSkillInfo.ts', './ResMgr.ts', './Bundle.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Label, Sprite, Button, GameMgr, UIBase, CfgSkillInfo, ResMgr, Bundle;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
      Sprite = module.Sprite;
      Button = module.Button;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      CfgSkillInfo = module.CfgSkillInfo;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Bundle = module.Bundle;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "333753Gd1FCyY4QcMBJbrLh", "UIGetSkill", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UIGetSkill = exports('UIGetSkill', (_dec = ccclass('UI/UIGetSkill'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIGetSkill, _UIBase);
        function UIGetSkill() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.skill = null;
          _this.processing = false;
          return _this;
        }
        var _proto = UIGetSkill.prototype;
        _proto.onOpen = function onOpen(data) {
          GameMgr.Pause = true;
          this.skill = data;
          var info = CfgSkillInfo[this.skill];
          this.findComp('LbTitle', Label).string = info.name;
          this.findComp('Icon', Sprite).spriteFrame = ResMgr.getSpriteFrame(Bundle.Icon, info.icon);
          this.updateState();
        };
        _proto.updateState = function updateState() {
          var available = GameMgr.canClaimSkill(this.skill);
          this.findComp('BtnGet', Button).interactable = available;
          var status = available ? '每局可免费补领1个' : '本局补领已用完';
          this.findComp('LbDesc', Label).string = CfgSkillInfo[this.skill].desc + "\n" + status;
        };
        _proto.onClose = function onClose() {
          GameMgr.Pause = false;
        };
        _proto.onBtnGetClick = function onBtnGetClick() {
          var _this2 = this;
          if (this.processing) return;
          this.processing = true;
          var result = GameMgr.claimSkill(this.skill);
          if (result.ok) this.close();else {
            this.processing = false;
            this.updateState();
            if (result.reason === 'storage_error') GameMgr.recover(function () {
              return GameMgr.claimSkill(_this2.skill);
            }, function () {
              return _this2.close();
            });
          }
        };
        return UIGetSkill;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UILoading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './Bundle.ts', './ResMgr.ts', './UI.ts', './GameSave.ts', './RecoveryMgr.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Widget, Node, UITransform, Label, Color, Button, math, ProgressBar, macro, UIBase, Bundle, ResMgr, UI, GameSave, success, RecoveryMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Node = module.Node;
      UITransform = module.UITransform;
      Label = module.Label;
      Color = module.Color;
      Button = module.Button;
      math = module.math;
      ProgressBar = module.ProgressBar;
      macro = module.macro;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      Bundle = module.Bundle;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      GameSave = module.GameSave;
      success = module.success;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "463adtvr1NIE7o+HgOS2qHr", "UILoading", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UILoading = exports('UILoading', (_dec = ccclass('UI/UILoading'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UILoading, _UIBase);
        function UILoading() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.progressBar = null;
          _this.loaded = false;
          _this.loading = false;
          _this.retryNode = null;
          return _this;
        }
        var _proto = UILoading.prototype;
        _proto.onLoad = /*#__PURE__*/function () {
          var _onLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.progressBar = this.getComponentInChildren(ProgressBar);
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onLoad() {
            return _onLoad.apply(this, arguments);
          }
          return onLoad;
        }();
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.loadResources();
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.loadResources = /*#__PURE__*/function () {
          var _loadResources = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(this.loading || this.loaded || !this.isValid)) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  this.loading = true;
                  if (this.retryNode) this.retryNode.active = false;
                  this.progressBar.progress = 0;
                  this.schedule(this.updateProgress, 0.25, macro.REPEAT_FOREVER);
                  _context3.prev = 6;
                  _context3.next = 9;
                  return this.loadBundle();
                case 9:
                  _context3.next = 11;
                  return this.loadRes();
                case 11:
                  if (this.isValid) this.loaded = true;
                  _context3.next = 17;
                  break;
                case 14:
                  _context3.prev = 14;
                  _context3.t0 = _context3["catch"](6);
                  if (this.isValid) {
                    this.unschedule(this.updateProgress);
                    this.showLoadFailure();
                  }
                case 17:
                  _context3.prev = 17;
                  this.loading = false;
                  return _context3.finish(17);
                case 20:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this, [[6, 14, 17, 20]]);
          }));
          function loadResources() {
            return _loadResources.apply(this, arguments);
          }
          return loadResources;
        }();
        _proto.showLoadFailure = function showLoadFailure() {
          // The UI bundle may itself have failed. This retry control only needs builtin components.
          if (!this.retryNode) {
            var node = this.retryNode = new Node('LoadingRetry');
            node.layer = this.node.layer;
            this.node.addChild(node);
            node.addComponent(UITransform).setContentSize(640, 110);
            var label = node.addComponent(Label);
            label.string = '资源加载失败，请检查网络\n【点击重试】';
            label.fontSize = 28;
            label.lineHeight = 42;
            label.color = new Color(40, 40, 80, 255);
            var widget = node.addComponent(Widget);
            widget.isAlignBottom = true;
            widget.bottom = 230;
            widget.isAlignHorizontalCenter = true;
            widget.alignMode = Widget.AlignMode.ALWAYS;
            widget.updateAlignment();
            node.addComponent(Button);
            node.on(Button.EventType.CLICK, this.loadResources, this);
          }
          this.retryNode.active = true;
        };
        _proto.onOpen = function onOpen(data) {};
        _proto.onClose = function onClose(data) {
          this.unscheduleAllCallbacks();
        };
        _proto.loadBundle = function loadBundle() {
          return Promise.all([ResMgr.loadBundle(Bundle.Icon), ResMgr.loadBundle(Bundle.Audio), ResMgr.loadBundle(Bundle.Game), ResMgr.loadBundle(Bundle.UI)]);
        };
        _proto.loadRes = function loadRes() {
          return Promise.all([ResMgr.loadDir(Bundle.Icon), ResMgr.loadDir(Bundle.Audio), ResMgr.loadDir(Bundle.Game), ResMgr.loadDir(Bundle.UI)]);
        };
        _proto.updateProgress = function updateProgress() {
          var progressAdd = math.randomRange(0.1, 0.3);
          this.progressBar.progress = Math.min(this.progressBar.progress + progressAdd, 0.9);
          if (this.loaded) {
            this.progressBar.progress = 1.0;
            this.unschedule(this.updateProgress);
            this.onLoadCompleted();
          }
        };
        _proto.onLoadCompleted = function onLoadCompleted() {
          var _this2 = this;
          var ready = function ready() {
            _this2.scheduleOnce(function () {
              _this2.close();
              _this2.open(UI.Main);
            });
          };
          var result = GameSave.init();
          if (result.ok) {
            ready();
            return;
          }
          RecoveryMgr.show({
            title: '无法加载进度',
            message: RecoveryMgr.message(result.reason),
            actions: [{
              label: '重试读取',
              run: function run() {
                return GameSave.init();
              },
              onSuccess: ready
            }, {
              label: '新建存档',
              run: function run() {
                // Require a separate, explicit confirmation before replacing a damaged new-format save.
                return success();
              },
              onSuccess: function onSuccess() {
                return RecoveryMgr.show({
                  title: '新建存档',
                  message: '将重置新版游戏进度、金币和道具，确定继续吗？',
                  actions: [{
                    label: '确定新建',
                    run: function run() {
                      return GameSave.createNew();
                    },
                    onSuccess: ready
                  }, {
                    label: '返回',
                    run: function run() {
                      return success();
                    },
                    onSuccess: function onSuccess() {
                      return _this2.onLoadCompleted();
                    }
                  }]
                });
              }
            }]
          });
        };
        return UILoading;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UILoginReward.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './UI.ts', './RewardMgr.ts', './RecoveryMgr.ts', './GameSave.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Button, UIBase, UI, RewardMgr, RecoveryMgr, failure;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Button = module.Button;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      failure = module.failure;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "097caW3VFlD54SnGMMx5aKh", "UILoginReward", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UILoginReward = exports('UILoginReward', (_dec = ccclass('UI/UILoginReward'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UILoginReward, _UIBase);
        function UILoginReward() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.processing = false;
          return _this;
        }
        var _proto = UILoginReward.prototype;
        _proto.onOpen = function onOpen() {
          this.findComp('BtnGetAll', Button).interactable = RewardMgr.canClaimDaily();
        };
        _proto.onBtnCloseClick = function onBtnCloseClick() {
          if (!this.processing) this.close();
        };
        _proto.onBtnGetAllClick = function onBtnGetAllClick() {
          var _this2 = this;
          if (this.processing) return;
          this.processing = true;
          var grant = function grant() {
            return _this2.isValid ? RewardMgr.claimDaily() : failure('unavailable');
          };
          var done = function done(rewards) {
            _this2.close();
            _this2.open(UI.GetReward, rewards);
          };
          var result = grant();
          if (result.ok) {
            done(result.value);
            return;
          }
          this.processing = false;
          if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done);else {
            this.close();
            this.open(UI.Toast, RecoveryMgr.message(result.reason));
          }
        };
        return UILoginReward;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UILuckySpin.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './CoinItem.ts', './CoinMgr.ts', './UI.ts', './AudioMgr.ts', './RewardMgr.ts', './RecoveryMgr.ts', './GameSave.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, math, Button, Toggle, tween, UIBase, CoinItem, CoinMgr, UI, AudioMgr, RewardMgr, RecoveryMgr, failure;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      math = module.math;
      Button = module.Button;
      Toggle = module.Toggle;
      tween = module.tween;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      failure = module.failure;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "e07d7Xty35CRJ9f9kca17D7", "UILuckySpin", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UILuckySpin = exports('UILuckySpin', (_dec = ccclass('UI/UILuckySpin'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UILuckySpin, _UIBase);
        function UILuckySpin() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.spinning = false;
          _this.tw = null;
          return _this;
        }
        var _proto = UILuckySpin.prototype;
        _proto.onOpen = function onOpen() {
          this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin);
        };
        _proto.onBtnSpinClick = function onBtnSpinClick() {
          var _this2 = this;
          if (this.spinning) return;
          this.spinning = true;
          var wheel = this.findNode('ZhuanPan');
          var targetAngle = wheel.angle - (720 + 60 * math.randomRangeInt(0, 6));
          var index = Math.round((6 + targetAngle % 360 / 60) % 6);
          var grant = function grant() {
            return _this2.isValid ? RewardMgr.claimSpinReward(index) : failure('unavailable');
          };
          var done = function done(rewards) {
            return _this2.playSpin(targetAngle, rewards);
          };
          var result = grant();
          if (result.ok) done(result.value);else {
            this.spinning = false;
            if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done);else this.open(UI.Toast, RecoveryMgr.message(result.reason));
          }
        };
        _proto.playSpin = function playSpin(targetAngle, rewards) {
          var _this3 = this;
          this.spinning = true;
          var wheel = this.findNode('ZhuanPan');
          this.findComp('CoinItem', CoinItem).updateCoin(CoinMgr.CurCoin, false);
          this.findComp('BtnSpin', Button).interactable = false;
          this.findComp('BtnClose', Button).interactable = false;
          AudioMgr.playSfx('抽奖转盘');
          var lights = this.findComp('Lights', Toggle);
          this.schedule(function () {
            lights.isChecked = !lights.isChecked;
          }, 0.25, 10);
          this.tw = tween(wheel).to(3, {
            angle: targetAngle
          }, {
            easing: 'sineInOut'
          }).call(function () {
            _this3.findComp('BtnSpin', Button).interactable = true;
            _this3.findComp('BtnClose', Button).interactable = true;
            _this3.open(UI.GetReward, rewards);
            _this3.scheduleOnce(function () {
              _this3.spinning = false;
            });
          }).start();
        };
        _proto.onBtnCloseClick = function onBtnCloseClick() {
          if (!this.spinning) this.close();
        };
        _proto.onClose = function onClose() {
          if (this.tw) this.tw.stop();
          this.unscheduleAllCallbacks();
        };
        return UILuckySpin;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMain.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './UI.ts', './GameMgr.ts', './CoinItem.ts', './CoinMgr.ts', './AudioMgr.ts', './RewardMgr.ts', './UIMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, PageView, tween, v3, UIBase, UI, GameMgr, CoinItem, CoinMgr, AudioMgr, RewardMgr, UIMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      PageView = module.PageView;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      UIMgr = module.UIMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "42a4bWaBc5LXqIzmJWG7ZBL", "UIMain", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIMain = exports('UIMain', (_dec = ccclass('UI/UIMain'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIMain, _UIBase);
        function UIMain() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.pageView = null;
          _this.coinItem = null;
          _this.hand = null;
          return _this;
        }
        var _proto = UIMain.prototype;
        _proto.onLoad = function onLoad() {
          this.pageView = this.findComp('PageView', PageView);
          this.coinItem = this.findComp('CoinItem', CoinItem);
          this.hand = this.findNode('Tip/Hand');
        };
        _proto.start = function start() {
          tween(this.hand).to(1, {
            position: v3(200, 0, 0)
          }).to(1, {
            position: v3(-200, 0, 0)
          }).union().repeatForever().start();
        };
        _proto.onOpen = function onOpen(data) {
          var _this2 = this;
          GameMgr.leavingHome = false;
          this.pageView.scrollToPage(GameMgr.mode, 0);
          this.coinItem.init(CoinMgr.CurCoin);
          AudioMgr.playBgm('主界面音乐');
          this.scheduleOnce(function () {
            if (!GameMgr.leavingHome && UIMgr.get(UI.Main) === _this2 && RewardMgr.canClaimDaily()) {
              _this2.open(UI.LoginReward);
            }
          });
        };
        _proto.onClose = function onClose(data) {
          this.unscheduleAllCallbacks();
        };
        _proto.onBtnSettingClick = function onBtnSettingClick() {
          this.open(UI.Setting);
        };
        _proto.onBtnLuckySpinClick = function onBtnLuckySpinClick() {
          this.open(UI.LuckySpin);
        };
        _proto.onBtnPassRewardClick = function onBtnPassRewardClick() {
          this.open(UI.PassReward);
        };
        return UIMain;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Debug.ts', './UIType.ts', './EventMgr.ts', './EventType.ts', './ResMgr.ts', './UIBase.ts', './Bundle.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Component, instantiate, isValid, Debug, UIType, EventMgr, EventType, ResMgr, UIBase, Bundle;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
      instantiate = module.instantiate;
      isValid = module.isValid;
    }, function (module) {
      Debug = module.Debug;
    }, function (module) {
      UIType = module.UIType;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      Bundle = module.Bundle;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "2c522MGUX1PWKPa7gjqU4Ab", "UIMgr", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Tag = 'UIMgr';
      var UIMgr = exports('UIMgr', (_dec = ccclass('Manager/UIMgr'), _dec2 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UIMgr, _Component);
        function UIMgr() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "popUpMask", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = UIMgr.prototype;
        _proto.onLoad = function onLoad() {
          globalThis.UIMgr = UIMgr;
          UIMgr._inst = this;
          UIMgr._node = this.node;
          UIMgr.init();
        };
        UIMgr.init = function init() {
          EventMgr.on(EventType.OpenUI, this.open, this);
          EventMgr.on(EventType.CloseUI, this.close, this);
        };
        UIMgr.open = /*#__PURE__*/function () {
          var _open = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uiName, data, dtoUI) {
            var _dtoUI$uiBundle, _dtoUI$uiType;
            var uiBundle, isUILoaded, uiPrefab, uiNode, ui, uiType, uiParent, idx;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.isOpened(uiName)) {
                    _context.next = 3;
                    break;
                  }
                  Debug.Warn(Tag, uiName + "\u5DF2\u7ECF\u6253\u5F00");
                  return _context.abrupt("return");
                case 3:
                  uiBundle = (_dtoUI$uiBundle = dtoUI == null ? void 0 : dtoUI.uiBundle) != null ? _dtoUI$uiBundle : Bundle.UI;
                  isUILoaded = ResMgr.isLoaded(uiBundle, uiName);
                  if (isUILoaded) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 8;
                  return ResMgr.loadRes(uiBundle, uiName);
                case 8:
                  uiPrefab = ResMgr.getRes(uiBundle, uiName);
                  if (uiPrefab) {
                    _context.next = 12;
                    break;
                  }
                  Debug.Error(Tag, uiName + "\u4E0D\u5B58\u5728");
                  return _context.abrupt("return");
                case 12:
                  uiNode = instantiate(uiPrefab);
                  ui = uiNode.getComponent(UIBase);
                  Debug.Log(Tag, "\u6253\u5F00" + uiName);
                  uiType = (_dtoUI$uiType = dtoUI == null ? void 0 : dtoUI.uiType) != null ? _dtoUI$uiType : ui.uiType;
                  uiParent = this._node.children[uiType];
                  uiParent.addChild(uiNode);
                  ui.onOpen(data);
                  if (uiType === UIType.PopUp) {
                    idx = uiNode.getSiblingIndex();
                    this._inst.popUpMask.active = true;
                    this._inst.popUpMask.setSiblingIndex(idx - 1);
                    this._popUpStack.push(uiName);
                  }
                  if (uiType === UIType.Toast) {
                    isValid(this._toast) && this._toast.destroy();
                    this._toast = uiNode;
                  } else {
                    this._openedUI[uiName] = ui;
                  }
                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function open(_x, _x2, _x3) {
            return _open.apply(this, arguments);
          }
          return open;
        }();
        UIMgr.close = function close(uiName, data) {
          if (!this.isOpened(uiName)) return;
          var ui = this._openedUI[uiName];
          Debug.Log(Tag, "\u5173\u95ED" + uiName);
          var uiType = ui.uiType;
          if (uiType === UIType.PopUp) {
            var idx = this._popUpStack.indexOf(uiName);
            this._popUpStack.splice(idx, 1);
            if (this._popUpStack.length <= 0) {
              this._inst.popUpMask.active = false;
            } else {
              var topWindowName = this._popUpStack[this._popUpStack.length - 1];
              var topWindow = this._openedUI[topWindowName];
              var topWindowIdx = topWindow.node.getSiblingIndex();
              this._inst.popUpMask.setSiblingIndex(Math.max(0, topWindowIdx));
            }
          }
          ui.onClose(data);
          delete this._openedUI[uiName];
          ui.node.destroy();
        };
        UIMgr.get = function get(uiName) {
          return this._openedUI[uiName];
        };
        UIMgr.isOpened = function isOpened(uiName) {
          return this._openedUI.hasOwnProperty(uiName);
        };
        return UIMgr;
      }(Component), _class3._inst = null, _class3._node = null, _class3._openedUI = {}, _class3._popUpStack = [], _class3._toast = null, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "popUpMask", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPassReward.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './GameMgr.ts', './CoinItem.ts', './CoinMgr.ts', './EventMgr.ts', './EventType.ts', './RewardMgr.ts', './RecoveryMgr.ts', './GameSave.ts', './UI.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, UIBase, GameMgr, CoinItem, CoinMgr, EventMgr, EventType, RewardMgr, RecoveryMgr, failure, UI;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      RewardMgr = module.RewardMgr;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      failure = module.failure;
    }, function (module) {
      UI = module.UI;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "a4299iX6cZCU5/ndRDbdW7L", "UIPassReward", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UIPassReward = exports('UIPassReward', (_dec = ccclass('UI/UIPassReward'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIPassReward, _UIBase);
        function UIPassReward() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.processing = false;
          return _this;
        }
        var _proto = UIPassReward.prototype;
        _proto.onOpen = function onOpen() {
          this.updateState();
        };
        _proto.updateState = function updateState() {
          this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin);
          var canGet = GameMgr.CurPassedLevel >= RewardMgr.NextPassTarget;
          this.findNode('BtnGet').active = canGet;
          this.findNode('BtnContinue').active = !canGet;
        };
        _proto.onBtnCloseClick = function onBtnCloseClick() {
          if (!this.processing) this.close();
        };
        _proto.onBtnGetClick = function onBtnGetClick() {
          var _this2 = this;
          if (this.processing) return;
          this.processing = true;
          var grant = function grant() {
            return _this2.isValid ? RewardMgr.claimPassReward() : failure('unavailable');
          };
          var done = function done(rewards) {
            _this2.updateState();
            EventMgr.emit(EventType.GetPassReward);
            _this2.open(UI.GetReward, rewards);
            _this2.scheduleOnce(function () {
              _this2.processing = false;
            }, 0.3);
          };
          var result = grant();
          if (result.ok) done(result.value);else {
            this.processing = false;
            if (result.reason === 'storage_error') RecoveryMgr.retry(grant, done);else this.open(UI.Toast, RecoveryMgr.message(result.reason));
          }
        };
        return UIPassReward;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPause.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './GameMgr.ts', './Switcher.ts', './Setting.ts', './RecoveryMgr.ts', './GameSave.ts', './AudioMgr.ts', './TransMgr.ts', './UI.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Widget, UIBase, GameMgr, Switcher, Setting, RecoveryMgr, failure, AudioMgr, TransMgr, UI;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      Switcher = module.Switcher;
    }, function (module) {
      Setting = module.Setting;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      failure = module.failure;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      TransMgr = module.TransMgr;
    }, function (module) {
      UI = module.UI;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "c45adto9B5CUrySVMJAHfZl", "UIPause", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIPause = exports('UIPause', (_dec = ccclass('UI/UIPause'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIPause, _UIBase);
        function UIPause() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.swBgm = null;
          _this.swSfx = null;
          return _this;
        }
        var _proto = UIPause.prototype;
        _proto.onLoad = function onLoad() {
          this.swBgm = this.findComp('SwBgm', Switcher);
          this.swSfx = this.findComp('SwSfx', Switcher);
        };
        _proto.onOpen = function onOpen(data) {
          GameMgr.Pause = true;
          this.swBgm.IsOn = Setting.BgmEnabled;
          this.swSfx.IsOn = Setting.SfxEnabled;
        };
        _proto.onClose = function onClose(data) {
          GameMgr.Pause = false;
        };
        _proto.onBtnCloseClick = function onBtnCloseClick() {
          this.close();
        };
        _proto.onBtnRestartClick = /*#__PURE__*/function () {
          var _onBtnRestartClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return TransMgr.Inst.fadeIn();
                case 2:
                  GameMgr.startGame();
                  this.close();
                  TransMgr.Inst.fadeOut();
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onBtnRestartClick() {
            return _onBtnRestartClick.apply(this, arguments);
          }
          return onBtnRestartClick;
        }();
        _proto.onBtnBackClick = /*#__PURE__*/function () {
          var _onBtnBackClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return TransMgr.Inst.fadeIn();
                case 2:
                  GameMgr.quitGame();
                  this.close();
                  this.open(UI.Main);
                  TransMgr.Inst.fadeOut();
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onBtnBackClick() {
            return _onBtnBackClick.apply(this, arguments);
          }
          return onBtnBackClick;
        }();
        _proto.changeSetting = function changeSetting(key) {
          var _this2 = this;
          var value = key === 'bgmEnabled' ? !Setting.BgmEnabled : !Setting.SfxEnabled;
          var commit = function commit() {
            return _this2.isValid ? Setting.set(key, value) : failure('unavailable');
          };
          var done = function done() {
            _this2.swBgm.IsOn = Setting.BgmEnabled;
            _this2.swSfx.IsOn = Setting.SfxEnabled;
            if (key === 'bgmEnabled') {
              if (Setting.BgmEnabled) AudioMgr.playBgm();else AudioMgr.stopBgm();
            }
          };
          var result = commit();
          if (result.ok) done();else {
            this.swBgm.IsOn = Setting.BgmEnabled;
            this.swSfx.IsOn = Setting.SfxEnabled;
            RecoveryMgr.retry(commit, done);
          }
        };
        _proto.onSwBgmClick = function onSwBgmClick() {
          this.changeSetting('bgmEnabled');
        };
        _proto.onSwSfxClick = function onSwSfxClick() {
          this.changeSetting('sfxEnabled');
        };
        return UIPause;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIRecovery.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './GameMgr.ts', './RecoveryMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Label, Button, UIBase, GameMgr, RecoveryMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
      Button = module.Button;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "4121fz7NshJL6r1eiDKgdIv", "UIRecovery", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UIRecovery = exports('UIRecovery', (_dec = ccclass('UI/UIRecovery'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIRecovery, _UIBase);
        function UIRecovery() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.options = null;
          _this.processing = false;
          _this.previousPause = false;
          _this.roundId = 0;
          return _this;
        }
        var _proto = UIRecovery.prototype;
        _proto.onOpen = function onOpen(options) {
          this.options = options;
          this.previousPause = GameMgr.Pause;
          this.roundId = GameMgr.roundId;
          GameMgr.Pause = true;
          this.findComp('LbTitle', Label).string = options.title;
          this.findComp('LbDesc', Label).string = options.message;
          for (var i = 0; i < 3; i++) {
            var button = this.findNode("BtnAction" + i);
            button.active = i < options.actions.length;
            if (button.active) this.findComp("BtnAction" + i + "/ActionLabel", Label).string = options.actions[i].label;
          }
        };
        _proto.execute = function execute(index) {
          if (this.processing || !this.options.actions[index]) return;
          this.processing = true;
          for (var i = 0; i < this.options.actions.length; i++) this.findComp("BtnAction" + i, Button).interactable = false;
          var action = this.options.actions[index];
          var result;
          try {
            result = action.run();
          } catch (_unused) {
            result = {
              ok: false,
              reason: 'storage_error'
            };
          }
          if (result.ok) {
            this.close();
            action.onSuccess == null || action.onSuccess(result.value);
          } else {
            this.processing = false;
            this.findComp('LbDesc', Label).string = RecoveryMgr.message(result.reason);
            for (var _i = 0; _i < this.options.actions.length; _i++) this.findComp("BtnAction" + _i, Button).interactable = true;
          }
        };
        _proto.onBtnPrimaryClick = function onBtnPrimaryClick() {
          this.execute(0);
        };
        _proto.onBtnSecondaryClick = function onBtnSecondaryClick() {
          this.execute(1);
        };
        _proto.onBtnTertiaryClick = function onBtnTertiaryClick() {
          this.execute(2);
        };
        _proto.onClose = function onClose() {
          if (GameMgr.roundId === this.roundId) GameMgr.Pause = this.previousPause;
        };
        return UIRecovery;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UISetting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './Switcher.ts', './Setting.ts', './RecoveryMgr.ts', './GameSave.ts', './AudioMgr.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, UIBase, Switcher, Setting, RecoveryMgr, failure, AudioMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      Switcher = module.Switcher;
    }, function (module) {
      Setting = module.Setting;
    }, function (module) {
      RecoveryMgr = module.RecoveryMgr;
    }, function (module) {
      failure = module.failure;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "1688935OTdLTa7kX+us2P+o", "UISetting", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UISetting = exports('UISetting', (_dec = ccclass('UI/UISetting'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UISetting, _UIBase);
        function UISetting() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.swBgm = null;
          _this.swSfx = null;
          return _this;
        }
        var _proto = UISetting.prototype;
        _proto.onLoad = function onLoad() {
          this.swBgm = this.findComp('SwBgm', Switcher);
          this.swSfx = this.findComp('SwSfx', Switcher);
        };
        _proto.onOpen = function onOpen(data) {
          this.swBgm.IsOn = Setting.BgmEnabled;
          this.swSfx.IsOn = Setting.SfxEnabled;
        };
        _proto.onClose = function onClose(data) {};
        _proto.onBtnCloseClick = function onBtnCloseClick() {
          this.close();
        };
        _proto.changeSetting = function changeSetting(key) {
          var _this2 = this;
          var value = key === 'bgmEnabled' ? !Setting.BgmEnabled : !Setting.SfxEnabled;
          var commit = function commit() {
            return _this2.isValid ? Setting.set(key, value) : failure('unavailable');
          };
          var done = function done() {
            _this2.swBgm.IsOn = Setting.BgmEnabled;
            _this2.swSfx.IsOn = Setting.SfxEnabled;
            if (key === 'bgmEnabled') {
              if (Setting.BgmEnabled) AudioMgr.playBgm();else AudioMgr.stopBgm();
            }
          };
          var result = commit();
          if (result.ok) done();else {
            this.swBgm.IsOn = Setting.BgmEnabled;
            this.swSfx.IsOn = Setting.SfxEnabled;
            RecoveryMgr.retry(commit, done);
          }
        };
        _proto.onSwBgmClick = function onSwBgmClick() {
          this.changeSetting('bgmEnabled');
        };
        _proto.onSwSfxClick = function onSwSfxClick() {
          this.changeSetting('sfxEnabled');
        };
        return UISetting;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIStageTip.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Label, UIOpacity, tween, v3, UIBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      UIBase = module.UIBase;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "20f65pXklxMXLCKLZwpj4Q3", "UIStageTip", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIStageTip = exports('UIStageTip', (_dec = ccclass('UI/UIStageTip'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIStageTip, _UIBase);
        function UIStageTip() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.lbTip = null;
          _this.arrow = null;
          _this.uiOpacity = null;
          return _this;
        }
        var _proto = UIStageTip.prototype;
        _proto.onLoad = function onLoad() {
          this.lbTip = this.findComp('LbTip', Label);
          this.arrow = this.findNode('Arrow');
          this.uiOpacity = this.getComponent(UIOpacity);
        };
        _proto.onOpen = function onOpen(data) {
          var _this2 = this;
          this.lbTip.string = data;
          tween(this.lbTip.node).to(0.5, {
            position: v3(0, 0, 0)
          }, {
            easing: 'sineOut'
          }).start();
          tween(this.arrow).to(10, {
            position: v3(850, 0)
          }).start();
          tween(this.uiOpacity).delay(2).to(1, {
            opacity: 0
          }).call(function () {
            _this2.node.destroy();
          }).start();
        };
        _proto.onClose = function onClose(data) {};
        return UIStageTip;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UITimeOut.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts', './EventMgr.ts', './EventType.ts', './TransMgr.ts', './GameMgr.ts', './UI.ts', './AudioMgr.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Widget, Label, UIBase, EventMgr, EventType, TransMgr, GameMgr, UI, AudioMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      EventMgr = module.EventMgr;
    }, function (module) {
      EventType = module.EventType;
    }, function (module) {
      TransMgr = module.TransMgr;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "519a2XuJHhPCIqfzNnvXoyr", "UITimeOut", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UITimeOut = exports('UITimeOut', (_dec = ccclass('UI/UITimeOut'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UITimeOut, _UIBase);
        function UITimeOut() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.processing = false;
          return _this;
        }
        var _proto = UITimeOut.prototype;
        _proto.onOpen = function onOpen() {
          GameMgr.Pause = true;
          AudioMgr.playSfx('通关失败');
          this.findComp('Label', Label).string = GameMgr.CanRevive ? '本局可免费续玩一次，增加60秒' : '本局续玩已用完，可免费重新挑战';
          this.findComp('BtnYes/ActionLabel', Label).string = GameMgr.CanRevive ? '免费续玩' : '重新挑战';
        };
        _proto.onClose = function onClose() {
          GameMgr.Pause = false;
        };
        _proto.onBtnCloseClick = /*#__PURE__*/function () {
          var _onBtnCloseClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.processing) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  this.processing = true;
                  _context.next = 5;
                  return TransMgr.Inst.fadeIn();
                case 5:
                  this.close();
                  GameMgr.quitGame();
                  this.open(UI.Main);
                  TransMgr.Inst.fadeOut();
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onBtnCloseClick() {
            return _onBtnCloseClick.apply(this, arguments);
          }
          return onBtnCloseClick;
        }();
        _proto.onBtnYesClick = /*#__PURE__*/function () {
          var _onBtnYesClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.processing) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  this.processing = true;
                  if (!GameMgr.tryRevive()) {
                    _context2.next = 8;
                    break;
                  }
                  this.close();
                  EventMgr.emit(EventType.Revive);
                  _context2.next = 13;
                  break;
                case 8:
                  _context2.next = 10;
                  return TransMgr.Inst.fadeIn();
                case 10:
                  GameMgr.startGame();
                  this.close();
                  TransMgr.Inst.fadeOut();
                case 13:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onBtnYesClick() {
            return _onBtnYesClick.apply(this, arguments);
          }
          return onBtnYesClick;
        }();
        return UITimeOut;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIToast.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Widget, Label, UIBase;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
    }, function (module) {
      UIBase = module.UIBase;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "77689t//+dLirYhKMrlJsQa", "UIToast", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent;
      var UIToast = exports('UIToast', (_dec = ccclass('UI/UIToast'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIToast, _UIBase);
        function UIToast() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.lbToast = null;
          return _this;
        }
        var _proto = UIToast.prototype;
        _proto.onLoad = function onLoad() {
          this.lbToast = this.getComponentInChildren(Label);
        };
        _proto.onDestroy = function onDestroy() {
          this.unscheduleAllCallbacks();
        };
        _proto.onOpen = function onOpen(data) {
          var _this2 = this;
          this.lbToast.string = "" + data;
          this.scheduleOnce(function () {
            _this2.node.destroy();
          }, 2);
        };
        _proto.onClose = function onClose(data) {};
        return UIToast;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIType.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5e880vRZzdPbr6TDMq95Hni", "UIType", undefined);
      var UIType = exports('UIType', /*#__PURE__*/function (UIType) {
        UIType[UIType["Common"] = 0] = "Common";
        UIType[UIType["PopUp"] = 1] = "PopUp";
        UIType[UIType["Top"] = 2] = "Top";
        UIType[UIType["Toast"] = 3] = "Toast";
        return UIType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIWin.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameMgr.ts', './AudioMgr.ts', './CoinMgr.ts', './UI.ts', './UIBase.ts', './CoinItem.ts', './TransMgr.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Widget, Label, math, tween, v3, Button, GameMgr, AudioMgr, CoinMgr, UI, UIBase, CoinItem, TransMgr;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      Label = module.Label;
      math = module.math;
      tween = module.tween;
      v3 = module.v3;
      Button = module.Button;
    }, function (module) {
      GameMgr = module.GameMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      CoinMgr = module.CoinMgr;
    }, function (module) {
      UI = module.UI;
    }, function (module) {
      UIBase = module.UIBase;
    }, function (module) {
      CoinItem = module.CoinItem;
    }, function (module) {
      TransMgr = module.TransMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "53080JFSltPuag+WxVvfmJN", "UIWin", undefined);
      var ccclass = _decorator.ccclass,
        requireComponent = _decorator.requireComponent;
      var UIWin = exports('UIWin', (_dec = ccclass('UI/UIWin'), _dec2 = requireComponent(Widget), _dec(_class = _dec2(_class = /*#__PURE__*/function (_UIBase) {
        _inheritsLoose(UIWin, _UIBase);
        function UIWin() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _UIBase.call.apply(_UIBase, [this].concat(args)) || this;
          _this.ready = false;
          _this.processing = false;
          _this.tw = null;
          return _this;
        }
        var _proto = UIWin.prototype;
        _proto.onOpen = function onOpen(reward) {
          var _this2 = this;
          if (!reward) {
            this.scheduleOnce(function () {
              return _this2.close();
            });
            return;
          }
          AudioMgr.stopBgm();
          AudioMgr.playSfx('通关成功');
          GameMgr.Pause = true;
          this.setButtons(false);
          this.findComp('CoinItem', CoinItem).init(CoinMgr.CurCoin);
          this.findComp('LbCoin', Label).string = "x" + reward.amount;
          var pointer = this.findNode('Pointer');
          var ranges = [[-120, -74], [-72, -18], [-17, 29], [32, 86], [90, 120]];
          var range = ranges[reward.slotIndex];
          var x = math.randomRangeInt(range[0], range[1]);
          this.tw = tween(pointer).to(0.5, {
            position: v3(120, -25)
          }).to(0.5, {
            position: v3(-120, -25)
          }).to(0.35, {
            position: v3(x, -25)
          }, {
            easing: 'sineOut'
          }).call(function () {
            _this2.ready = true;
            _this2.setButtons(true);
          }).start();
        };
        _proto.setButtons = function setButtons(enabled) {
          this.findComp('BtnNext', Button).interactable = enabled;
          this.findComp('BtnClose', Button).interactable = enabled;
        };
        _proto.onClose = function onClose() {
          if (this.tw) this.tw.stop();
          GameMgr.Pause = false;
        };
        _proto.onBtnNextClick = /*#__PURE__*/function () {
          var _onBtnNextClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(!this.ready || this.processing)) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  this.processing = true;
                  this.setButtons(false);
                  _context.next = 6;
                  return TransMgr.Inst.fadeIn();
                case 6:
                  GameMgr.startGame();
                  this.close();
                  TransMgr.Inst.fadeOut();
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function onBtnNextClick() {
            return _onBtnNextClick.apply(this, arguments);
          }
          return onBtnNextClick;
        }();
        _proto.onBtnCloseClick = /*#__PURE__*/function () {
          var _onBtnCloseClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(!this.ready || this.processing)) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  this.processing = true;
                  this.setButtons(false);
                  _context2.next = 6;
                  return TransMgr.Inst.fadeIn();
                case 6:
                  this.close();
                  GameMgr.quitGame();
                  this.open(UI.Main);
                  TransMgr.Inst.fadeOut();
                case 10:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function onBtnCloseClick() {
            return _onBtnCloseClick.apply(this, arguments);
          }
          return onBtnCloseClick;
        }();
        return UIWin;
      }(UIBase)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map