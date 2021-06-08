// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Core = require("@material-ui/core");
var DockerListModuleCss = require("./DockerList.module.css");
var Dialog$MdworldHomeremoteDockerlist = require("./Dialog.bs.js");
var DockerApi$MdworldHomeremoteDockerlist = require("./DockerApi.bs.js");
var DockerUtil$MdworldHomeremoteDockerlist = require("./DockerUtil.bs.js");
var DockerListItem$MdworldHomeremoteDockerlist = require("./DockerListItem.bs.js");

var styles = DockerListModuleCss;

function renderAsItem(setSelectedContainer, dockerContainer) {
  return React.createElement(DockerListItem$MdworldHomeremoteDockerlist.make, {
              container: dockerContainer,
              onSelect: (function (c) {
                  return Curry._1(setSelectedContainer, (function (_prev) {
                                return c;
                              }));
                }),
              key: dockerContainer.Id
            });
}

function renderListCreator(setSelectedContainer, arr) {
  return arr.map(function (param) {
              return renderAsItem(setSelectedContainer, param);
            });
}

function DockerList$DockerListMod(Props) {
  var url = Props.url;
  var onError = Props.onError;
  var match = React.useState(function () {
        return [];
      });
  var setContainers = match[1];
  var containers = match[0];
  var match$1 = React.useState(function () {
        return /* NoContainer */0;
      });
  var setSelectedContainer = match$1[1];
  React.useEffect((function () {
          var update = function (param) {
            DockerApi$MdworldHomeremoteDockerlist.getDockerList(url, onError).then(function (containerList) {
                  Curry._1(setContainers, (function (_prev) {
                          return containerList;
                        }));
                  return Promise.resolve(containerList);
                });
            
          };
          update(undefined);
          var interval = setInterval(update, 60000);
          return (function (param) {
                    clearInterval(interval);
                    
                  });
        }), []);
  var nrOfContainers = containers.sort(DockerUtil$MdworldHomeremoteDockerlist.compareDockerContainer).length;
  var middleIndex = nrOfContainers / 2 | 0;
  var containersFirstHalf = containers.sort(DockerUtil$MdworldHomeremoteDockerlist.compareDockerContainer).slice(0, middleIndex);
  var containersSecondHalf = containers.sort(DockerUtil$MdworldHomeremoteDockerlist.compareDockerContainer).slice(middleIndex);
  return React.createElement("div", {
              className: styles.root
            }, React.createElement(Core.List, {
                  children: renderListCreator(setSelectedContainer, containersFirstHalf)
                }), React.createElement(Core.List, {
                  children: renderListCreator(setSelectedContainer, containersSecondHalf)
                }), React.createElement(Dialog$MdworldHomeremoteDockerlist.make, {
                  container: match$1[0],
                  toggleContainerState: DockerApi$MdworldHomeremoteDockerlist.toggleContainerStateCreator(setContainers, url, onError),
                  close: (function (param) {
                      return Curry._1(setSelectedContainer, (function (_prev) {
                                    return /* NoContainer */0;
                                  }));
                    })
                }));
}

var DockerListMod = {
  make: DockerList$DockerListMod
};

exports.styles = styles;
exports.renderAsItem = renderAsItem;
exports.renderListCreator = renderListCreator;
exports.DockerListMod = DockerListMod;
/* styles Not a pure module */
