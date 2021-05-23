@module
external styles: {
  "button-list-item": string,
  "mui-button": string,
  "button-success": string,
  "button-error": string,
} = "./DockerList.module.css"

@react.component
let make = (
  ~url: string,
  ~container: DockerUtil.dockerContainer,
  ~setContainers: DockerUtil.setContainersType,
  ~confirmButtonStyle: ReactDOM.Style.t,
  ~onError: string => unit,
) => {
  let id = container["Id"]
  // https://stackoverflow.com/a/32428199: created, restarting, running, paused, exited, dead
  let state = container["State"]
  let isRunning = state == "running"
  let isExited = state == "exited"
  let isUnexpected = !isRunning && !isExited
  let className = DockerUtil.toClassName([
    Name(styles["button-list-item"]),
    Name(styles["mui-button"]),
    NameOn(styles["button-success"], isRunning),
    NameOn(styles["button-error"], isUnexpected),
  ])

  let startContainerAndUpdate = (id: string, _event) => {
    // Note: |> is deprecated in favor of ->, however `a |> fn(b)` converts to `fn(b, a)`
    // where `a -> fn(b)` converts to `fn(a, b)` and `Js.Promise.then_` has not been optimized
    // for this order, e.g. like how Js.Array2 has been optimized for -> while Js.Array is optimized for |>
    // This can be remedied by using the _ pipe placeholder. With the placeholder it is possible to write
    // ```DockerApi.startContainer(url, id, onError)
    // |> Js.Promise.then_(_response => {
    //   DockerApi.getDockerList(url, onError)
    // })```
    // Like:
    // ```DockerApi.startContainer(url, id, onError)
    // -> Js.Promise.then_(_response => {
    //   DockerApi.getDockerList(url, onError)
    // }, _)```
    let _ =
      DockerApi.startContainer(url, id, onError)
      -> Js.Promise.then_(_response => {
        DockerApi.getDockerList(url, onError)
      }, _)
      -> Js.Promise.then_(containerList => {
        setContainers(_prev => containerList)
        Js.Promise.resolve(containerList)
      }, _)
  }

  let stopContainerAndUpdate = (id: string, _event) => {
    let _ =
      DockerApi.stopContainer(url, id, onError)
      |> Js.Promise.then_(_response => {
        DockerApi.getDockerList(url, onError)
      })
      |> Js.Promise.then_(containerList => {
        setContainers(_prev => containerList)
        Js.Promise.resolve(containerList)
      })
  }

  let name =
    container["Names"]
    ->Js.Array2.map(name => Js.String2.sliceToEnd(name, ~from=1))
    ->Js.Array2.joinWith(" ")

  <ButtonWithConfirm
    key={id}
    onClick={if isRunning {
      stopContainerAndUpdate(id)
    } else {
      startContainerAndUpdate(id)
    }}
    className={className}
    question={if isRunning {
      `Do you want to stop ${name}?`
    } else {
      `Do you want to start ${name}?`
    }}
    confirmButtonStyle={confirmButtonStyle}>
    <h1> {name->React.string} </h1> <p> {container["Status"]} </p>
  </ButtonWithConfirm>
}
