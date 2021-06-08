// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Core = require("@material-ui/core");
var MaterialUi_Checkbox = require("@jsiebern/bs-material-ui/src/MaterialUi_Checkbox.bs.js");
var MaterialUi_IconButton = require("@jsiebern/bs-material-ui/src/MaterialUi_IconButton.bs.js");
var DockerListModuleCss = require("./DockerList.module.css");
var $$Error = require("@material-ui/icons/Error").default;

var styles = DockerListModuleCss;

var ErrorIcon = {};

function DockerListItem(Props) {
  var container = Props.container;
  var onSelect = Props.onSelect;
  var id = container.Id;
  var state = container.State;
  var status = container.Status;
  var isRunning = state === "running";
  var isExited = state === "exited";
  var isUnexpected = !isRunning && !isExited;
  var name = container.Names.map(function (name) {
          return name.slice(1);
        }).join(" ");
  return React.createElement("div", undefined, React.createElement(Core.ListItem, {
                  button: true,
                  children: null,
                  dense: true,
                  onClick: (function (_ev) {
                      return Curry._1(onSelect, /* DockerContainer */{
                                  _0: container
                                });
                    })
                }, React.createElement(Core.ListItemIcon, {
                      children: React.createElement(Core.Checkbox, {
                            edge: MaterialUi_Checkbox.Edge.start,
                            checked: isRunning,
                            inputProps: {
                              "aria-labelledby": id
                            }
                          })
                    }), React.createElement(Core.ListItemText, {
                      primary: name,
                      secondary: status,
                      id: id
                    }), React.createElement(Core.ListItemIcon, {
                      children: isUnexpected ? React.createElement(Core.IconButton, {
                              children: React.createElement($$Error, {
                                    color: "error"
                                  }),
                              edge: MaterialUi_IconButton.Edge._end
                            }) : React.createElement(React.Fragment, undefined)
                    })));
}

var make = DockerListItem;

exports.styles = styles;
exports.ErrorIcon = ErrorIcon;
exports.make = make;
/* styles Not a pure module */
