"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalWithBackdrop = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _KeyboardContext = require("../contexts/KeyboardContext");
var _useTimeout = require("../hooks/useTimeout");
var _ConditionalContainer = require("./ConditionalContainer");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ModalWithBackdrop = ({
  isOpen,
  backdropPress,
  children,
  ...rest
}) => {
  const {
    height: screenHeight
  } = (0, _reactNative.useWindowDimensions)();
  const translateY = React.useRef(new _reactNative.Animated.Value(screenHeight)).current;
  const {
    theme,
    disableSafeArea
  } = React.useContext(_KeyboardContext.KeyboardContext);
  const handleTimeout = (0, _useTimeout.useTimeout)();
  React.useEffect(() => {
    _reactNative.Animated.timing(translateY, {
      duration: 200,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      toValue: isOpen ? 0 : screenHeight,
      useNativeDriver: true
    }).start();
  }, [isOpen, screenHeight, translateY]);
  const handleClose = () => {
    _reactNative.Animated.timing(translateY, {
      duration: 200,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      toValue: screenHeight,
      useNativeDriver: true
    }).start();
    handleTimeout(() => backdropPress(), 200);
  };
  return /*#__PURE__*/React.createElement(_reactNative.Modal, _extends({
    visible: isOpen,
    animationType: "fade",
    transparent: true,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape-left', 'landscape-right']
  }, rest), /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: [styles.modalContainer, {
      backgroundColor: theme.backdrop
    }],
    activeOpacity: 1,
    onPress: handleClose
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.modalContainer, {
      backgroundColor: theme.backdrop
    }]
  }, /*#__PURE__*/React.createElement(_ConditionalContainer.IsSafeAreaWrapper, {
    style: styles.modalContainer,
    isSafeArea: !disableSafeArea
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    activeOpacity: 1
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: {
      transform: [{
        translateY
      }]
    }
  }, children))))));
};
exports.ModalWithBackdrop = ModalWithBackdrop;
const styles = _reactNative.StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    elevation: 10
  }
});
//# sourceMappingURL=ModalWithBackdrop.js.map
