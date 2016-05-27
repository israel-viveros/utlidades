(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = typeof MagazineData !== 'undefined' ? JSON.parse(MagazineData.innerHTML) : null;
var magazine = {
  init: function init() {
    this.dots();
  },
  dots: function dots() {
    console.log("build dots");
    $(document).on('click', '.dot', function () {
      console.log("click");
      var tag = $(this).find('.dot__txt');
      $('.dot__txt').stop(true, true).fadeOut(400, function () {
        if (tag.is(':hidden')) {
          tag.fadeIn(600);
        }
      });
    });

    $(document).click(function (event) {
      var verify = $(event.target).parents('.dot').length;
      console.log(verify);
      if (verify === 0) {
        console.log("entro");
        $('.dot__txt').fadeOut();
      }
    });
  }
};

var Portada = function (_React$Component) {
  _inherits(Portada, _React$Component);

  function Portada() {
    _classCallCheck(this, Portada);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Portada).apply(this, arguments));
  }

  _createClass(Portada, [{
    key: 'render',
    value: function render() {
      console.log("render portada");
      return React.createElement(
        'div',
        null,
        'Soy la portadas'
      );
    }
  }]);

  return Portada;
}(React.Component);

var Pagina = function (_React$Component2) {
  _inherits(Pagina, _React$Component2);

  function Pagina() {
    _classCallCheck(this, Pagina);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pagina).apply(this, arguments));
  }

  _createClass(Pagina, [{
    key: 'render',
    value: function render() {
      console.log("render pagina");
      magazine.init();
      return React.createElement(
        'div',
        null,
        'Soy la Pagina'
      );
    }
  }]);

  return Pagina;
}(React.Component);

var MagazineTIM = function (_React$Component3) {
  _inherits(MagazineTIM, _React$Component3);

  function MagazineTIM() {
    _classCallCheck(this, MagazineTIM);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MagazineTIM).apply(this, arguments));
  }

  _createClass(MagazineTIM, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        { className: 'magazinetim' },
        React.createElement(Portada, null),
        React.createElement(Pagina, null)
      );
    }
  }]);

  return MagazineTIM;
}(React.Component);

if (document.getElementById("MagazineTIM") !== null && data !== null) {
  ReactDOM.render(React.createElement(MagazineTIM, { data: data }), document.getElementById('MagazineTIM'));
} else {
  console.error("Debe existir el ID MagazineTIM y el Json de la información con #MagazineTIM ");
}

},{}]},{},[1]);
