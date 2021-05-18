// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as DockerListModuleCss from "./DockerList.module.css";
import * as ReasonApi$MdworldHomeremoteDockerlist from "./ReasonApi.bs.js";
import * as StyleUtil$MdworldHomeremoteDockerlist from "./StyleUtil.bs.js";
import * as ConfirmAction$MdworldHomeremoteDockerlist from "./ConfirmAction.bs.js";

var styles = DockerListModuleCss;

function DockerList$DockerListMod(Props) {
  var match = React.useState(function () {
        return [];
      });
  var setContainers = match[1];
  React.useEffect((function () {
          var update = function (param) {
            ReasonApi$MdworldHomeremoteDockerlist.getDockerList(undefined).then(function (containerList) {
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
  var handleClickFetch = function (id, _event) {
    console.log("handleClickFetch");
    ReasonApi$MdworldHomeremoteDockerlist.getDockerList(undefined).then(function (containerList) {
          Curry._1(setContainers, (function (_prev) {
                  return containerList;
                }));
          return Promise.resolve(containerList);
        });
    ReasonApi$MdworldHomeremoteDockerlist.startContainer(id).then(function (containerList) {
          Curry._1(setContainers, (function (_prev) {
                  return containerList;
                }));
          return Promise.resolve(containerList);
        });
    
  };
  var dockerContainersElems = match[0].map(function (dockerContainer) {
        var id = dockerContainer.Id;
        var state = dockerContainer.State;
        var isRunning = state === "running";
        var isExited = state === "exited";
        var isUnexpected = !isRunning && !isExited;
        var className = StyleUtil$MdworldHomeremoteDockerlist.toClassName([
              {
                TAG: /* Name */0,
                _0: styles["button-list-item"]
              },
              {
                TAG: /* Name */0,
                _0: styles["mui-button"]
              },
              {
                TAG: /* NameOn */1,
                _0: styles["button-success"],
                _1: isRunning
              },
              {
                TAG: /* NameOn */1,
                _0: styles["button-error"],
                _1: isUnexpected
              }
            ]);
        var name = dockerContainer.Names.map(function (name) {
                return name.slice(1);
              }).join(" ");
        return React.createElement(ConfirmAction$MdworldHomeremoteDockerlist.make, {
                    onClick: isRunning ? (function (param) {
                          ReasonApi$MdworldHomeremoteDockerlist.stopContainer(id).then(function (_response) {
                                  return ReasonApi$MdworldHomeremoteDockerlist.getDockerList(undefined);
                                }).then(function (containerList) {
                                Curry._1(setContainers, (function (_prev) {
                                        return containerList;
                                      }));
                                return Promise.resolve(containerList);
                              });
                          
                        }) : (function (param) {
                          ReasonApi$MdworldHomeremoteDockerlist.startContainer(id).then(function (_response) {
                                  return ReasonApi$MdworldHomeremoteDockerlist.getDockerList(undefined);
                                }).then(function (containerList) {
                                Curry._1(setContainers, (function (_prev) {
                                        return containerList;
                                      }));
                                return Promise.resolve(containerList);
                              });
                          
                        }),
                    question: isRunning ? "Do you want to stop " + name + "?" : "Do you want to start " + name + "?",
                    className: className,
                    confirmButtonStyle: {
                      backgroundColor: "darkblue",
                      color: "white"
                    },
                    children: null,
                    key: id
                  }, React.createElement("h1", undefined, name), React.createElement("p", undefined, dockerContainer.Status));
      });
  return React.createElement("div", {
              className: styles.root
            }, React.createElement("div", {
                  className: styles["button-list"]
                }, React.createElement(ConfirmAction$MdworldHomeremoteDockerlist.make, {
                      onClick: (function (param) {
                          return handleClickFetch("some-id", param);
                        }),
                      question: "turn on ?? such a long text oh wow so long wow wow wow wow wow",
                      className: styles["button-list-item"] + " " + styles["mui-button"],
                      confirmButtonStyle: {
                        backgroundColor: "darkblue",
                        color: "white"
                      },
                      children: "modal"
                    }), dockerContainersElems), React.createElement("div", {
                  className: styles["button-list"],
                  style: {
                    marginTop: "2rem"
                  }
                }, React.createElement("button", {
                      className: styles["mui-button"],
                      onClick: (function (param) {
                          return handleClickFetch("some-id", param);
                        })
                    }, "modal"), React.createElement("button", {
                      className: styles["mui-button"] + " " + styles["button-error"],
                      onClick: (function (param) {
                          return handleClickFetch("some-id", param);
                        })
                    }, React.createElement("h1", undefined, "Errrr"), React.createElement("p", undefined, "Borked"))));
}

var DockerListMod = {
  make: DockerList$DockerListMod
};

export {
  styles ,
  DockerListMod ,
  
}
/* styles Not a pure module */
