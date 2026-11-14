function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Modal, Animated, Easing, useWindowDimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardContext } from '../contexts/KeyboardContext';
import { useTimeout } from '../hooks/useTimeout';
import { IsSafeAreaWrapper } from './ConditionalContainer';
export const ModalWithBackdrop = ({
  isOpen,
  backdropPress,
  children,
  ...rest
}) => {
  const {
    height: screenHeight
  } = useWindowDimensions();
  const translateY = React.useRef(new Animated.Value(screenHeight)).current;
  const {
    theme,
    disableSafeArea
  } = React.useContext(KeyboardContext);
  const handleTimeout = useTimeout();
  React.useEffect(() => {
    Animated.timing(translateY, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
      toValue: isOpen ? 0 : screenHeight,
      useNativeDriver: true
    }).start();
  }, [isOpen, screenHeight, translateY]);
  const handleClose = () => {
    Animated.timing(translateY, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
      toValue: screenHeight,
      useNativeDriver: true
    }).start();
    handleTimeout(() => backdropPress(), 200);
  };
  return /*#__PURE__*/React.createElement(Modal, _extends({
    visible: isOpen,
    animationType: "fade",
    transparent: true,
    supportedOrientations: ['portrait', 'portrait-upside-down', 'landscape-left', 'landscape-right']
  }, rest), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.modalContainer, {
      backgroundColor: theme.backdrop
    }],
    activeOpacity: 1,
    onPress: handleClose
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.modalContainer, {
      backgroundColor: theme.backdrop
    }]
  }, /*#__PURE__*/React.createElement(IsSafeAreaWrapper, {
    style: styles.modalContainer,
    isSafeArea: !disableSafeArea
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 1
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      transform: [{
        translateY
      }]
    }
  }, children))))));
};
const styles = StyleSheet.create({
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
