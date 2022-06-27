'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('prop-types');
var observeRect = require('@reach/observe-rect');
var useIsomorphicLayoutEffect = require('@reach/utils/use-isomorphic-layout-effect');
var typeCheck = require('@reach/utils/type-check');
require('tiny-warning');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var observeRect__default = /*#__PURE__*/_interopDefault(observeRect);

/**
 * Welcome to @reach/rect!
 *
 * Measures DOM elements (aka. bounding client rect).
 *
 * @see getBoundingClientRect https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * @see Docs                  https://reach.tech/rect
 * @see Source                https://github.com/reach/reach-ui/tree/main/packages/rect
 */

/**
 * Rect
 *
 * @param props
 */

var Rect = function Rect(_ref) {
  var onChange = _ref.onChange,
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? true : _ref$observe,
      children = _ref.children;
  var ref = React.useRef(null);
  var rect = useRect(ref, {
    observe: observe,
    onChange: onChange
  });
  return children({
    ref: ref,
    rect: rect
  });
};


/**
 * useRect
 *
 * @param nodeRef
 * @param observe
 * @param onChange
 */
function useRect(nodeRef, observeOrOptions, deprecated_onChange) {
  var observe;
  var onChange;

  if (typeCheck.isBoolean(observeOrOptions)) {
    observe = observeOrOptions;
  } else {
    var _observeOrOptions$obs;

    observe = (_observeOrOptions$obs = observeOrOptions == null ? void 0 : observeOrOptions.observe) != null ? _observeOrOptions$obs : true;
    onChange = observeOrOptions == null ? void 0 : observeOrOptions.onChange;
  }

  if (typeCheck.isFunction(deprecated_onChange)) {
    onChange = deprecated_onChange;
  }

  var _React$useState = React.useState(nodeRef.current),
      element = _React$useState[0],
      setElement = _React$useState[1];

  var initialRectIsSet = React.useRef(false);
  var initialRefIsSet = React.useRef(false);

  var _React$useState2 = React.useState(null),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var onChangeRef = React.useRef(onChange); // eslint-disable-next-line react-hooks/exhaustive-deps

  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(function () {
    onChangeRef.current = onChange;

    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(function () {
    if (element && !initialRectIsSet.current) {
      initialRectIsSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(function () {
    if (!observe) {
      return;
    }

    var elem = element; // State initializes before refs are placed, meaning the element state will
    // be undefined on the first render. We still want the rect on the first
    // render, so initially we'll use the nodeRef that was passed instead of
    // state for our measurements.

    if (!initialRefIsSet.current) {
      initialRefIsSet.current = true;
      elem = nodeRef.current;
    }

    if (!elem) {

      return;
    }

    var observer = observeRect__default['default'](elem, function (rect) {
      onChangeRef.current == null ? void 0 : onChangeRef.current(rect);
      setRect(rect);
    });
    observer.observe();
    return function () {
      observer.unobserve();
    };
  }, [observe, element, nodeRef]);
  return rect;
}

exports.Rect = Rect;
exports.default = Rect;
exports.useRect = useRect;
