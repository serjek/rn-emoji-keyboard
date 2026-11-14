"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiStaticKeyboard = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _EmojiCategory = require("./EmojiCategory");
var _KeyboardContext = require("../contexts/KeyboardContext");
var _Categories = require("./Categories");
var _SearchBar = require("./SearchBar");
var _useKeyboardStore = require("../store/useKeyboardStore");
var _ConditionalContainer = require("./ConditionalContainer");
var _SkinTones = require("./SkinTones");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isAndroid = _reactNative.Platform.OS === 'android';
const EmojiStaticKeyboard = exports.EmojiStaticKeyboard = React.memo(() => {
  const {
    activeCategoryIndex,
    setActiveCategoryIndex,
    onCategoryChangeFailed,
    enableCategoryChangeGesture,
    categoryPosition,
    enableSearchBar,
    customButtons,
    searchPhrase,
    renderList,
    disableSafeArea,
    theme,
    styles: themeStyles,
    shouldAnimateScroll,
    enableCategoryChangeAnimation,
    width,
    setWidth
  } = React.useContext(_KeyboardContext.KeyboardContext);
  const {
    keyboardState
  } = (0, _useKeyboardStore.useKeyboardStore)();
  const flatListRef = React.useRef(null);
  const hasMomentumBegan = React.useRef(false);
  const getItemLayout = React.useCallback((_, index) => ({
    length: width,
    offset: width * index,
    index
  }), [width]);
  const [keyboardScrollOffsetY, setKeyboardScrollOffsetY] = React.useState(0);
  const [pageHeight, setPageHeight] = React.useState();
  const renderItem = React.useCallback(props => {
    const item = {
      ...props.item,
      data: []
    };
    const shouldRenderEmojis = activeCategoryIndex === props.index || activeCategoryIndex === props.index - 1 || activeCategoryIndex === props.index + 1;
    if (shouldRenderEmojis) {
      return /*#__PURE__*/React.createElement(_EmojiCategory.EmojiCategory, _extends({
        setKeyboardScrollOffsetY: setKeyboardScrollOffsetY
      }, props, {
        activeCategoryIndex: activeCategoryIndex
      }));
    } else {
      return /*#__PURE__*/React.createElement(_EmojiCategory.EmojiCategory, _extends({
        setKeyboardScrollOffsetY: setKeyboardScrollOffsetY
      }, props, {
        item: item,
        activeCategoryIndex: activeCategoryIndex
      }));
    }
  }, [activeCategoryIndex]);

  // A measured page bounds the virtualized grid on native and web.
  const renderPage = React.useCallback(props => /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: pageHeight
    }
  }, renderItem(props)), [renderItem, pageHeight]);
  const scrollEmojiCategoryListToIndex = React.useCallback(index => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: shouldAnimateScroll && enableCategoryChangeAnimation
    });
  }, [enableCategoryChangeAnimation, shouldAnimateScroll]);
  React.useEffect(() => {
    setKeyboardScrollOffsetY(0);
  }, [activeCategoryIndex]);
  const keyExtractor = React.useCallback(item => item.title, []);
  const scrollNav = React.useRef(new _reactNative.Animated.Value(0)).current;
  const handleScroll = React.useCallback(el => {
    const index = el.nativeEvent.contentOffset.x / width;
    scrollNav.setValue(index * _Categories.CATEGORY_ELEMENT_WIDTH);
  }, [scrollNav, width]);
  const onMomentumScrollBegin = React.useCallback(() => {
    hasMomentumBegan.current = true;
  }, []);
  const onMomentumScrollEnd = React.useCallback(el => {
    if (!hasMomentumBegan.current) return;
    const index = el.nativeEvent.contentOffset.x / width;
    setActiveCategoryIndex(Math.round(index));
    hasMomentumBegan.current = false;
  }, [setActiveCategoryIndex, width]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, styles.containerShadow, categoryPosition === 'top' && disableSafeArea && styles.containerReverse, themeStyles.container, {
      backgroundColor: theme.container
    }]
  }, /*#__PURE__*/React.createElement(_ConditionalContainer.ConditionalContainer, {
    condition: !disableSafeArea,
    container: children => /*#__PURE__*/React.createElement(_reactNative.SafeAreaView, {
      style: [styles.flex, categoryPosition === 'top' && styles.containerReverse]
    }, children)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: categoryPosition === 'top' ? [styles.searchContainer, {
      marginBottom: 16
    }] : styles.searchContainer
  }, enableSearchBar && /*#__PURE__*/React.createElement(_SearchBar.SearchBar, {
    scrollEmojiCategoryListToIndex: scrollEmojiCategoryListToIndex
  }), customButtons), /*#__PURE__*/React.createElement(_reactNative.Animated.FlatList, {
    onLayout: e => {
      setWidth(e.nativeEvent.layout.width);
      setPageHeight(e.nativeEvent.layout.height);
    },
    extraData: [keyboardState.recentlyUsed.length, searchPhrase],
    data: renderList,
    keyExtractor: keyExtractor,
    renderItem: renderPage,
    removeClippedSubviews: isAndroid,
    ref: flatListRef,
    onScrollToIndexFailed: onCategoryChangeFailed,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    pagingEnabled: true,
    scrollEventThrottle: 16,
    getItemLayout: getItemLayout,
    scrollEnabled: enableCategoryChangeGesture,
    initialNumToRender: 1,
    maxToRenderPerBatch: 1,
    onScroll: handleScroll,
    keyboardShouldPersistTaps: "handled",
    onMomentumScrollBegin: onMomentumScrollBegin,
    onMomentumScrollEnd: onMomentumScrollEnd
  }), /*#__PURE__*/React.createElement(_Categories.Categories, {
    scrollEmojiCategoryListToIndex: scrollEmojiCategoryListToIndex,
    scrollNav: enableCategoryChangeGesture ? scrollNav : undefined
  }), /*#__PURE__*/React.createElement(_SkinTones.SkinTones, {
    keyboardScrollOffsetY: keyboardScrollOffsetY
  }))));
}, () => true);
const styles = _reactNative.StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    borderRadius: 16
  },
  searchContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  containerReverse: {
    flexDirection: 'column-reverse'
  },
  containerShadow: {
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
//# sourceMappingURL=EmojiStaticKeyboard.js.map
